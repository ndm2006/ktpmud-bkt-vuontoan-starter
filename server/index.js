'use strict';
/** Điểm vào server: API tại /api/*, giao diện tĩnh tại public/. */
const path = require('path');
const express = require('express');
const dev = process.argv.includes('--dev') ? require('../tools/dev-server') : null;
if (dev) dev.configureDatabase();
const db = require('./db'); // khởi tạo DB + seed (chạy 1 lần khi require)
const { attachUser } = require('./auth');
const api = require('./api');

const app = express();
const PORT = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '..', 'public');
const pages = ['/', '/muc-luc', '/curriculum'];
const servePage = (req, res) => res.sendFile(path.join(publicDir,
  req.path === '/' ? 'index.html' : 'muc-luc.html'));

app.use(express.json({ limit: '256kb' }));
app.use(attachUser(db));
app.use('/api', api);
if (dev) dev.enableReload(app, publicDir, pages);
app.use(express.static(publicDir));

// Trang gốc -> trang chủ
app.get(pages, servePage);

app.use((req, res) => res.status(404).json({ error: 'Không tìm thấy.' }));

app.listen(PORT, dev ? '127.0.0.1' : '0.0.0.0', () => {
  console.log(`🌱 Vườn Toán Lớp 3 đang chạy tại http://localhost:${PORT}`);
  console.log('   Tài khoản mẫu: hocsinh01 / 123456  •  giaovien01 / 123456');
});
