'use strict';

const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { buildCss } = require('./build-css');

const dataDir = path.join(__dirname, '..', 'data');
const reloadPath = '/__dev/reload';
const cssPath = '/assets/css/tailwind.build.css';

function configureDatabase() {
  process.env.DB_PATH ||= path.join(dataDir, 'vuon-toan.dev.db');
}

function enableReload(app, publicDir, aliases) {
  const clients = new Set();
  const bootId = randomUUID();
  const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'vuon-toan-dev-'));
  const devCss = path.join(tempDir, 'tailwind.css');
  let revision = 0;
  let timer;
  let cssDirty = true;

  function rebuildCss() {
    try {
      buildCss(devCss);
    } catch (error) {
      console.error('[dev] Tailwind:', error.message);
    }
  }

  function publish(client) {
    client.write(`data: ${bootId}:${revision}\n\n`);
  }

  function scheduleReload(rebuild = false) {
    cssDirty ||= rebuild;
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (cssDirty) rebuildCss();
      cssDirty = false;
      revision += 1;
      clients.forEach(publish);
    }, 150);
  }

  rebuildCss();
  cssDirty = false;
  fs.watch(publicDir, { recursive: true }, (_event, file) => {
    scheduleReload(!file || /\.(html|js)$/.test(file) || path.basename(file) === 'app.css');
  });
  fs.watch(dataDir, (_event, file) => {
    if (file === 'curriculum.json') scheduleReload();
  });
  process.on('exit', () => {
    if (fs.existsSync(devCss)) fs.unlinkSync(devCss);
    fs.rmdirSync(tempDir);
  });

  app.use((_req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
  });
  app.get(reloadPath, (_req, res) => {
    res.set('Content-Type', 'text/event-stream');
    clients.add(res);
    publish(res);
    res.on('close', () => clients.delete(res));
  });
  app.get('/__dev/client.js', (_req, res) => res.type('js').send(`
    const stream = new EventSource('${reloadPath}');
    let revision = document.currentScript.dataset.revision;
    stream.onmessage = ({ data }) => {
      if (revision === data) return;
      stream.close();
      location.reload();
    };
  `));
  app.get(cssPath, (_req, res, next) => {
    if (!fs.existsSync(devCss)) return next();
    res.sendFile(devCss, { lastModified: false });
  });

  function sendPage(file, res, next) {
    fs.readFile(path.join(publicDir, file), 'utf8', (error, html) => {
      if (error?.code === 'ENOENT') return next();
      if (error) return next(error);
      const script = `<script src="/__dev/client.js" data-revision="${bootId}:${revision}"></script>`;
      res.type('html').send(html.replace(/<\/body\s*>/i, match => script + match));
    });
  }

  app.get(aliases, (req, res, next) => {
    sendPage(req.path === '/' ? 'index.html' : 'muc-luc.html', res, next);
  });
  app.get(/^\/([\w-]+\.html)$/, (req, res, next) => sendPage(req.params[0], res, next));
}

module.exports = { configureDatabase, enableReload };
