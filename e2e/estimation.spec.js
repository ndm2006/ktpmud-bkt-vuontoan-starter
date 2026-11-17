'use strict';
const { test, expect } = require('@playwright/test');
const values = [42,7,92,14,111,288,26,36,320,304,13,32];
const ranges = ['r2','r2','r2','r1','r3','r2','r2','r3','r1','r3','r2','r1'];

async function openFromMenu(page, username) {
  // External fonts/CDN/Google are deliberately unavailable: the static app must work.
  await page.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1'
    ? route.continue() : route.abort());
  await page.goto('/login.html');
  await page.locator('#studentCodeInput').fill(username);
  await page.locator('#passwordField').fill('123456');
  await page.locator('#passwordField').press('Enter');
  await expect(page).toHaveURL(/index\.html/);
  await page.waitForFunction(name => window.MathApp?.user?.username === name, username);
  const rail = page.viewportSize().width < 768 ? '#app-mobile-nav' : '#app-sidebar';
  const menu = page.locator(`${rail} a[href="exercise.html"]`).first();
  await expect(menu).toBeVisible();
  await menu.focus(); await expect(menu).toBeFocused(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/exercise\.html/);
  await page.locator('#estimate-open').focus(); await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/lesson\.html.*set=uoc-luong-nhan-chia/);
  await expect(page.locator('[data-estimate]')).toHaveCount(36);
}
async function selectRanges(page, choices = ranges) {
  for (let i = 0; i < choices.length; i++) {
    await page.locator(`[name="range-est-set-${String(i+1).padStart(2,'0')}"][value="${choices[i]}"]`).check();
  }
}
async function fillAnswers(page, answers = values) {
  for (let i = 0; i < answers.length; i++) await page.locator('[data-exact]').nth(i).fill(String(answers[i]));
}

test('keyboard path through all 12 questions, refresh, final result and new run', async ({ page }, info) => {
  await openFromMenu(page,'hocsinh21');
  const submit = page.locator('#btn-submit-lesson');
  await submit.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#lesson-error')).toContainText('đủ 12 câu');
  await expect(page.locator('[data-estimate]').first()).toBeFocused();
  // Native radio groups: Space selects, arrows change range, Tab passes the hint.
  for (let i=0;i<12;i++) {
    await page.keyboard.press('Space');
    for(let step=1;step<Number(ranges[i].slice(1));step++) await page.keyboard.press('ArrowRight');
    await page.keyboard.press('Tab'); // hint summary
    await page.keyboard.press('Tab'); // next group (or submit)
  }
  await expect(page.locator('[data-estimate]:checked')).toHaveCount(12);
  await submit.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('[data-exact]')).toHaveCount(12);
  await expect(page.locator('[data-exact]').first()).toBeFocused();
  await expect(page.locator('[data-estimate]')).toHaveCount(0);
  await page.reload(); await expect(page.locator('[data-exact]')).toHaveCount(12);
  await page.locator('[data-exact]').first().focus();
  for(const value of values) { await page.keyboard.type(String(value)); await page.keyboard.press('Tab'); }
  await expect(submit).toBeFocused(); await page.keyboard.press('Enter');
  await expect(page.locator('#estimate-result-title')).toContainText('100%');
  await expect(page.locator('#estimate-result-title')).toBeFocused();
  await expect(page.locator('#lesson-result')).toContainText('40 sao');
  await page.screenshot({ path: info.outputPath('desktop-result.png'), fullPage: true });
  await page.reload(); await expect(page.locator('#estimate-result-title')).toContainText('100%');
  await page.locator('#estimate-new-run').focus(); await page.keyboard.press('Enter');
  await expect(page.locator('[data-estimate]')).toHaveCount(36);
  await expect(page.locator('[data-estimate]:checked')).toHaveCount(0);
});

test('network retries and refresh recover a committed result without duplicate credit', async ({ page }) => {
  await openFromMenu(page,'hocsinh22'); await selectRanges(page);
  await page.route('**/api/estimation-practice/estimates', route => route.abort(), { times: 1 });
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('#lesson-error')).toBeVisible();
  await expect(page.locator('[data-estimate]:checked')).toHaveCount(12);
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('[data-exact]')).toHaveCount(12);
  await page.locator('[data-exact]').first().fill('a');
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('#lesson-error')).toContainText('số nguyên');
  await expect(page.locator('[data-exact]').first()).toBeFocused();
  await fillAnswers(page);
  await page.route('**/api/submissions', async route => { await route.fetch(); await route.abort(); }, { times: 1 });
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('#lesson-error')).toBeVisible();
  await page.reload(); await expect(page.locator('#estimate-result-title')).toContainText('100%');
  const saved = await (await page.request.get('/api/estimation-practice')).json();
  const retry = await (await page.request.post('/api/submissions', { data: { setId: saved.run.setId, runId: saved.run.id, answers: {} } })).json();
  expect(retry).toEqual(saved.run.result);
  const leaderboard = await (await page.request.get('/api/leaderboard')).json();
  expect(leaderboard.leaderboard.find(row=>row.isMe).attempts_count).toBe(1);
});

test('mobile layout and four distinct feedback outcomes', async ({ page }, info) => {
  await page.setViewportSize({ width:390, height:844 });
  await openFromMenu(page,'hocsinh23');
  const chosen=[...ranges];chosen[1]='r1';chosen[3]='r2';
  await selectRanges(page,chosen);await page.locator('#btn-submit-lesson').click();
  const exact=[...values];exact[2]=0;exact[3]=0;await fillAnswers(page,exact);
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('#estimate-result-title')).toContainText('75%');
  const cards=page.locator('.estimate-card');
  await expect(cards.nth(0)).toContainText('Đạt 1/1 điểm');
  await expect(cards.nth(1)).toContainText('Chưa hợp lý');await expect(cards.nth(1)).toContainText('Tính chính xác: Đúng');
  await expect(cards.nth(2)).toContainText('Ước lượng: Hợp lý');await expect(cards.nth(2)).toContainText('Tính chính xác: Chưa đúng');
  await expect(cards.nth(3)).toContainText('Chưa hợp lý');await expect(cards.nth(3)).toContainText('Tính chính xác: Chưa đúng');
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
  await page.screenshot({ path:info.outputPath('mobile-result.png'), fullPage:true });
});

test('practice works when randomUUID is unavailable outside a secure browser context', async ({ page }) => {
  await page.addInitScript(() => Object.defineProperty(Crypto.prototype, 'randomUUID', { value: undefined }));
  await openFromMenu(page, 'hocsinh24');
  await selectRanges(page);
  await page.locator('#btn-submit-lesson').click();
  await expect(page.locator('[data-exact]')).toHaveCount(12);
});
