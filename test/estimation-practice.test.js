'use strict';

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { spawn } = require('node:child_process');
const { once } = require('node:events');
const { mkdtemp, rm } = require('node:fs/promises');
const { createServer } = require('node:net');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const fixtures = require('../server/estimation-questions');
const seed = require('../data/seed.json');

let directory, child, origin, first, second;
const api = '/api/estimation-practice';

async function start() {
  const socket = createServer();
  await new Promise((resolve, reject) => socket.once('error', reject).listen(0, '127.0.0.1', resolve));
  const { port } = socket.address();
  await new Promise(resolve => socket.close(resolve));
  origin = `http://127.0.0.1:${port}`;
  child = spawn(process.execPath, ['server/index.js'], {
    env: { ...process.env, PORT: String(port), DB_PATH: join(directory, 'test.db'), NODE_ENV: 'test' },
  });
  await new Promise((resolve, reject) => {
    let output = '';
    const timeout = setTimeout(() => reject(new Error(`Server chưa khởi động: ${output}`)), 30000);
    child.stdout.on('data', chunk => {
      output += chunk;
      if (output.includes(`http://localhost:${port}`)) {
        clearTimeout(timeout);
        resolve();
      }
    });
    child.stderr.on('data', chunk => { output += chunk; });
    child.once('error', error => { clearTimeout(timeout); reject(error); });
    child.once('exit', code => { clearTimeout(timeout); reject(new Error(`Server dừng (${code}): ${output}`)); });
  });
}

async function stop() {
  if (!child || child.exitCode !== null || child.signalCode) return;
  const exited = once(child, 'exit');
  child.kill();
  await exited;
}

async function call(path, token, body) {
  const response = await fetch(origin + path, {
    method: body === undefined ? 'GET' : 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  return { status: response.status, data: await response.json() };
}

async function login(username) {
  const { status, data } = await call('/api/auth/login', undefined, { username, password: '123456' });
  assert.equal(status, 200);
  return data.token;
}

const send = (id, phase, data, token = first) => call(`${api}/${id}/${phase}`, token, data);
async function state(id, token = first) {
  const { status, data } = await call(api, token);
  assert.equal(status, 200);
  return data.questions.find(question => question.id === id).state;
}

before(async () => {
  directory = await mkdtemp(join(tmpdir(), 'vuon-toan-test-'));
  await start();
  first = await login('hocsinh01');
  second = await login('hocsinh02');
});

after(async () => {
  await stop();
  if (directory) await rm(directory, { recursive: true, force: true });
});

test('12 câu cố định, hai mốc đủ để suy ra đúng một khoảng và có 6 câu mỗi phép', () => {
  assert.equal(fixtures.length, 12);
  assert.equal(new Set(fixtures.map(q => q.id)).size, 12);
  assert.equal(fixtures.filter(q => q.op === '×').length, 6);
  assert.equal(fixtures.filter(q => q.op === '÷').length, 6);
  const expected = [42, 7, 92, 14, 111, 288, 26, 36, 320, 304, 13, 32];
  fixtures.forEach(({ a, b, op, marks: [lo, hi], markFactor, ranges }, index) => {
    const subject = markFactor ? b : a;
    assert.ok(lo < subject && subject < hi);
    if (op === '÷') {
      assert.equal(a % b, 0);
      assert.equal(lo % b, 0);
      assert.equal(hi % b, 0);
    }
    const lower = op === '×' ? lo * (markFactor ?? b) : lo / b;
    const upper = op === '×' ? hi * (markFactor ?? b) : hi / b;
    const value = expected[index];
    assert.equal(op === '×' ? a * b : a / b, value);
    const matching = ranges.filter(([min, max]) => min <= value && value <= max);
    assert.equal(ranges.length, 3);
    assert.equal(matching.length, 1);
    assert.ok(matching[0][0] <= lower + 1 && upper - 1 <= matching[0][1]);
    assert.ok(ranges.every(([min, max], i) => min <= max && (!i || ranges[i - 1][1] < min)));
  });
});

test('tải bài có xác thực, ba chặng và chưa có đáp số hoặc dữ liệu chấm', async () => {
  assert.equal((await call(api)).status, 401);
  const result = await call(api, first);
  assert.equal(result.status, 200);
  assert.deepEqual(result.data.questions.map(q => q.stage), [1,1,1,1,2,2,2,2,3,3,3,3]);
  for (const question of result.data.questions) {
    assert.deepEqual(Object.keys(question).sort(),
      ['choices', 'expression', 'hint', 'id', 'stage', 'state', ...(question.prompt ? ['prompt'] : [])].sort());
    assert.deepEqual(question.state, { phase: 'estimate' });
  }
  assert.equal((await call('/server/estimation-questions.js', first)).status, 404);
});

test('từ chối đi sai thứ tự, câu lạ, khoảng lạ và đáp số sai định dạng', async () => {
  assert.equal((await send('est-06', 'exact', { answer: 288 })).status, 409);
  assert.equal((await send('unknown', 'estimate', { rangeId: 'r1' })).status, 404);
  assert.equal((await send('est-06', 'estimate', { rangeId: 'r4' })).status, 400);
  for (const answer of [null, '288', 1.5, 0, 1000]) {
    assert.equal((await send('est-06', 'exact', { answer })).status, 400);
  }
  assert.deepEqual(await state('est-06'), { phase: 'estimate' });
});

test('lưu khoảng sai vẫn mở bước tính, không lộ lời giải và không đổi tiến độ cũ', async () => {
  const before = await call('/api/me/progress', first);
  const estimate = await send('est-06', 'estimate', { rangeId: 'r3' });
  assert.deepEqual(estimate, { status: 200, data: { state: { phase: 'exact', rangeId: 'r3' } } });
  assert.deepEqual(await state('est-06'), estimate.data.state);
  assert.deepEqual(await state('est-06', second), { phase: 'estimate' });
  const exact = await send('est-06', 'exact', { answer: 288 });
  assert.equal(exact.status, 200);
  assert.equal(exact.data.state.estimateCorrect, false);
  assert.equal(exact.data.state.exactCorrect, true);
  assert.equal(exact.data.state.correctAnswer, 288);
  assert.match(exact.data.state.explanation, /40 × 6 = 240.*50 × 6 = 300.*240–299/);
  assert.deepEqual(await state('est-06'), exact.data.state);
  assert.deepEqual(await call('/api/me/progress', first), before);
});

test('chấm ước lượng và tính độc lập, kiểm tra biên nhập số cho phép chia', async () => {
  await send('est-10', 'estimate', { rangeId: 'r3' });
  const exact = await send('est-10', 'exact', { answer: 320 });
  assert.equal(exact.data.state.estimateCorrect, true);
  assert.equal(exact.data.state.exactCorrect, false);
  assert.equal(exact.data.state.correctAnswer, 304);

  assert.equal((await send('est-12', 'estimate', { rangeId: 'r1' })).status, 200);
  assert.equal((await send('est-12', 'exact', { answer: 100 })).status, 400);
  const boundary = await send('est-12', 'exact', { answer: 99 });
  assert.equal(boundary.status, 200);
  assert.equal(boundary.data.state.estimateCorrect, true);
  assert.equal(boundary.data.state.exactCorrect, false);
});

test('gửi đồng thời hoặc gửi lại giữ nguyên lựa chọn và đáp số đã lưu', async () => {
  const estimates = await Promise.all(['r1', 'r2'].map(rangeId => send('est-03', 'estimate', { rangeId })));
  assert.deepEqual(estimates.map(r => r.status).sort(), [200, 409]);
  const initial = await state('est-03');
  assert.equal((await send('est-03', 'estimate', { rangeId: initial.rangeId })).status, 200);
  const answers = await Promise.all([91, 92].map(answer => send('est-03', 'exact', { answer })));
  assert.deepEqual(answers.map(r => r.status).sort(), [200, 409]);
  const saved = await state('est-03');
  assert.deepEqual((await send('est-03', 'exact', { answer: saved.submittedAnswer })).data.state, saved);
  assert.deepEqual((await send('est-03', 'estimate', { rangeId: initial.rangeId })).data.state,
    { phase: 'completed', rangeId: initial.rangeId });
});

test('giữ cả câu dở và câu đã hoàn thành qua khởi động lại server', async () => {
  assert.equal((await send('est-07', 'estimate', { rangeId: 'r2' })).status, 200);
  await stop();
  await start();
  assert.deepEqual(await state('est-07'), { phase: 'exact', rangeId: 'r2' });
  assert.equal((await state('est-06')).correctAnswer, 288);
  assert.deepEqual(await state('est-06', second), { phase: 'estimate' });
});

test('phiếu luyện tập cũ vẫn lấy câu và chấm theo bộ đề hiện có', async () => {
  const setId = 'phieu-bai-9-10';
  const questions = seed.questionSets[setId].questions;
  const old = await call(`/api/question-sets/${setId}/questions`, second);
  assert.equal(old.status, 200);
  assert.equal(old.data.questions.length, questions.length);
  assert.ok(old.data.questions.every(q => !Object.hasOwn(q, 'correctAnswer')));
  const answers = Object.fromEntries(questions.map(q => [q.id, q.correctAnswer]));
  const submitted = await call('/api/submissions', second, { setId, answers });
  assert.equal(submitted.status, 200);
  assert.equal(submitted.data.scorePercent, 100);
  assert.equal(submitted.data.correctCount, questions.length);
});
