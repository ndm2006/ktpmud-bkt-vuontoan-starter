#!/usr/bin/env node
/**
 * Đóng gói Tailwind thành CSS tĩnh (Đợt 3) để web chạy được khi không có Internet.
 * Theme được lấy từ chính public/assets/js/tailwind.config.js (1 nguồn duy nhất),
 * quét toàn bộ class trong thư mục public (HTML + JS, kể cả class sinh bằng JS).
 * Chạy: npm run build:css  (cần chạy lại khi thêm class Tailwind mới vào giao diện)
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
function buildCss(out) {
  const cfgSource = fs.readFileSync(path.join(ROOT, 'public/assets/js/tailwind.config.js'), 'utf8');
  const theme = eval('(' + cfgSource.replace(/^[\s\S]*?tailwind\.config\s*=\s*/, '').replace(/;\s*$/, '') + ')');
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vuon-toan-css-'));
  const config = path.join(tempDir, 'tailwind.config.cjs');
  const input = path.join(tempDir, 'input.css');
  try {
    fs.writeFileSync(config, `module.exports = ${JSON.stringify({
      content: ['./public/**/*.html', './public/**/*.js'],
      darkMode: theme.darkMode || 'class',
      theme: theme.theme,
    })};\n`);
    fs.writeFileSync(input, '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' +
      fs.readFileSync(path.join(ROOT, 'public/assets/css/app.css'), 'utf8'));
    execFileSync(process.execPath, [
      require.resolve('tailwindcss/lib/cli.js'), '-c', config, '-i', input, '-o', out, '--minify',
    ], { cwd: ROOT, stdio: 'inherit' });
  } finally {
    fs.rmSync(config, { force: true });
    fs.rmSync(input, { force: true });
    fs.rmdirSync(tempDir);
  }
}

if (require.main === module) {
  const out = path.join(ROOT, 'public/assets/css/tailwind.build.css');
  buildCss(out);
  console.log(`Đã tạo ${path.relative(ROOT, out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
}

module.exports = { buildCss };
