'use strict';

// Build from an immutable, CI-verified commit, outside the source history to avoid
// a self-referential final_commit. This does not publish, create tags, or open PRs.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const ROOT = path.resolve(__dirname, '..');
const REPO = 'ndm2006/ktpmud-bkt-vuontoan-starter';
const FORK = `https://github.com/${REPO}`;
const args = process.argv.slice(2);
const option = name => { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; };
const git = (...values) => execFileSync('git', values, { cwd: ROOT, encoding: 'utf8' }).trim();

function main() {
  const commit = option('--commit');
  const ciUrl = option('--ci-url');
  const date = option('--date');
  if (!/^[a-f0-9]{40}$/.test(commit || '') || !/^\d{4}-\d{2}-\d{2}$/.test(date || '')) {
    throw new Error('Usage: node tools/prepare-submission.js --commit <40-char SHA> --ci-url <passed-run URL> --date YYYY-MM-DD [--require-tag]');
  }
  const match = String(ciUrl).match(/^https:\/\/github\.com\/ndm2006\/ktpmud-bkt-vuontoan-starter\/actions\/runs\/(\d+)$/);
  if (!match) throw new Error('CI URL must belong to the N57 source repository.');
  if (git('rev-parse', `${commit}^{commit}`) !== commit) throw new Error('Source commit is unavailable.');
  const ci = JSON.parse(execFileSync('gh', ['api', `repos/${REPO}/actions/runs/${match[1]}`], { encoding: 'utf8' }));
  if (ci.head_sha !== commit || ci.status !== 'completed' || ci.conclusion !== 'success') {
    throw new Error('CI must have succeeded for exactly the selected source commit.');
  }
  const releaseTag = 'bkt-2026-N57-rc1';
  const frozen = args.includes('--require-tag');
  if (frozen && git('rev-parse', `${releaseTag}^{commit}`) !== commit) throw new Error('Freeze tag must point to the source commit.');
  const output = path.resolve(ROOT, 'out', 'submissions', 'hoang_mai_toan_n57');
  fs.mkdirSync(path.join(output, 'artifacts'), { recursive: true });
  fs.mkdirSync(path.join(output, 'slides'), { recursive: true });
  const source = name => execFileSync('git', ['show', `${commit}:${name}`], { cwd: ROOT, encoding: 'utf8' });
  function fixLinks(markdown, sourceFile) {
    return markdown.replace(/\]\(([^\s)]+)\)/g, (whole, target) => {
      if (/^(?:[a-z]+:|#|\/)/i.test(target)) return whole;
      const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceFile), target));
      return `](${FORK}/blob/${commit}/${resolved})`;
    });
  }
  const files = ['REQUIREMENTS.md', 'DECISIONS.md', 'TEST_REPORT.md', 'SECURITY_PRIVACY_CHECKLIST.md', 'AI_USE.md', 'CONTRIBUTIONS.md'];
  for (const name of files) fs.writeFileSync(path.join(output, 'artifacts', name), fixLinks(source(name), name));
  fs.writeFileSync(path.join(output, 'slides', 'DEMO.md'), fixLinks(source('docs/DEMO.md'), 'docs/DEMO.md'));
  fs.writeFileSync(path.join(output, 'artifacts', 'FINAL_REVIEW.md'), fixLinks(source('docs/FINAL_REVIEW.md'), 'docs/FINAL_REVIEW.md'));
  fs.writeFileSync(path.join(output, 'slides', 'codex-live-result.jpg'), execFileSync('git', ['show', `${commit}:artifacts/review/codex-live-result.jpg`], { cwd: ROOT }));
  const writeJson = (name, value) => fs.writeFileSync(path.join(output, name), JSON.stringify(value, null, 2) + '\n');
  writeJson('submission.json', { case_study_slug: 'hoang_mai_toan', case_study_id: 'KTPMUD-BKT-2026-PILOT',
    group_code: 'N57', members: ['N57-A', 'N57-B'], scenario: 'khong_ap_dung', submitted_at: date });
  writeJson('source-ref.json', { starter_repo: 'fossbk-spec/ktpmud-bkt-vuontoan-starter',
    starter_commit: '057a48205f50f0f30d6260be1a44b343a167a3e7', fork_url: FORK,
    final_commit: commit, release_tag: releaseTag, ci_run_url: ciUrl });
  fs.writeFileSync(path.join(output, 'README.md'), `# N57 — Track B: Ước lượng trước khi tính đúng\n\n` +
    `Trạng thái: ${frozen ? 'đã kiểm tra tag freeze' : 'candidate cho Draft PR; tên tag là dự kiến, chưa xác nhận phát hành'}.\n\n` +
    `Source: [${commit}](${FORK}/tree/${commit}). [CI đạt](${ciUrl}).\n\n` +
    `Nhóm gồm N57-A và N57-B. Ngoại lệ hai thành viên đã được GV chấp thuận theo xác nhận của đại diện nhóm trong chat; không tự suy diễn việc duyệt code cuối. Manifest dùng alias theo yêu cầu BKT về dữ liệu, không chứa họ tên/MSSV.\n\n` +
    `Clean run (Node 22): git clone ${FORK}.git; cd ktpmud-bkt-vuontoan-starter; git checkout ${commit}; npm ci; npm test; npx playwright install chromium; npm run test:e2e; npm start.\n\n` +
    `Từ menu Phòng Luyện Tập → chọn 12 khoảng → lưu/khóa → tính chính xác → nộp. Mỗi câu đạt điểm khi cả hai bước đúng. [Demo 7 phút](slides/DEMO.md). [Review cuối](artifacts/FINAL_REVIEW.md).\n\n` +
    `Chỉ đưa thư mục này vào submissions/hoang_mai_toan_n57 của ktpmud-project. Candidate không thay bước nhóm review, tag/release và xác nhận PC-2.\n`);
  console.log(`Prepared ${output}`);
}
try { main(); } catch (error) { console.error(error.message); process.exitCode = 1; }
