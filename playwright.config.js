'use strict';
const { defineConfig } = require('@playwright/test');
const { mkdtempSync } = require('node:fs');
const { tmpdir } = require('node:os');
const { join } = require('node:path');
const databaseDir = mkdtempSync(join(tmpdir(), 'vuontoan-browser-'));

module.exports = defineConfig({
  testDir: './e2e', workers: 1, timeout: 45000,
  use: { baseURL: 'http://127.0.0.1:4178', browserName: 'chromium',
    viewport: { width: 1365, height: 900 }, trace: 'retain-on-failure' },
  webServer: {
    command: `"${process.execPath}" server/index.js`, url: 'http://127.0.0.1:4178/api/health',
    timeout: 60000, reuseExistingServer: false,
    env: { PORT: '4178', DB_PATH: join(databaseDir, 'browser.db'), NODE_ENV: 'test' },
  },
});
