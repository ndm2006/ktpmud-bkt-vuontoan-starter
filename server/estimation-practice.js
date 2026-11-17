'use strict';

const express = require('express');
const { randomUUID } = require('node:crypto');
const db = require('./db');
const { requireAuth } = require('./auth');
const { record, rangesFor, validateEstimates, score, publicQuestion } = require('./estimation-scoring');
const { SET_ID } = require('./estimation-seed');
const router = express.Router();

function problem(status, message) {
  const error = new Error(message);
  error.status = status;
  throw error;
}

function content(setId) {
  if (setId !== SET_ID) problem(400, 'Bộ bài ước lượng không hợp lệ.');
  const meta = db.prepare('SELECT id,kind,lesson_id,star_reward FROM question_sets WHERE id=?').get(setId);
  const questions = db.prepare('SELECT * FROM questions WHERE set_id=? ORDER BY sort_order,id').all(setId);
  if (!meta || meta.kind !== 'exercise' || !Number.isSafeInteger(meta.star_reward) || meta.star_reward < 0 ||
      typeof meta.lesson_id !== 'string' || !db.prepare('SELECT 1 FROM lessons WHERE id=?').get(meta.lesson_id) ||
      questions.length !== 12 || questions.some(q => q.type !== 'estimate' || q.points !== 1)) {
    problem(409, 'Bộ bài đã thay đổi hoặc chưa đủ 12 câu. Em hãy báo thầy cô.');
  }
  try { questions.forEach(rangesFor); } catch { problem(409, 'Dữ liệu bộ bài đã thay đổi. Em hãy báo thầy cô.'); }
  return { meta, questions };
}

function publicRun(row) {
  if (!row) return null;
  const snapshot = JSON.parse(row.snapshot_json);
  return { id: row.id, setId: row.set_id, status: row.result_json ? 'submitted' : 'exact',
    estimates: JSON.parse(row.estimates_json), questions: snapshot.questions.map(publicQuestion),
    ...(row.result_json ? { result: JSON.parse(row.result_json) } : {}) };
}

function ownedRun(id, userId) {
  if (typeof id !== 'string') problem(409, 'Em hãy lưu phần ước lượng trước khi nộp đáp số.');
  const row = db.prepare('SELECT * FROM estimation_runs WHERE id=? AND user_id=?').get(id, userId);
  if (!row) problem(404, 'Không tìm thấy lượt làm bài của em.');
  return row;
}

function handle(action) {
  return (req, res, next) => {
    try { action(req, res); } catch (error) {
      if (error.status) return res.status(error.status).json({ error: error.message });
      res.status(500).json({ error: 'Chưa lưu được bài trên máy chủ. Em hãy thử lại; phần đã lưu vẫn được giữ.' });
    }
  };
}

router.use(requireAuth, (req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });
router.get('/', handle((req, res) => {
  const setId = req.query.setId || SET_ID;
  if (setId !== SET_ID) problem(400, 'Bộ bài ước lượng không hợp lệ.');
  const row = db.prepare('SELECT * FROM estimation_runs WHERE user_id=? AND set_id=? ORDER BY rowid DESC LIMIT 1').get(req.user.id, setId);
  res.json({ run: publicRun(row) });
}));
router.get('/runs/:id', handle((req, res) => res.json({ run: publicRun(ownedRun(req.params.id, req.user.id)) })));

const lock = db.transaction((userId, body) => {
  if (!record(body) || typeof body.requestId !== 'string' || !/^[a-zA-Z0-9-]{16,80}$/.test(body.requestId)) {
    problem(400, 'Mã lượt làm bài chưa hợp lệ. Em hãy tải lại trang.');
  }
  const existing = db.prepare('SELECT * FROM estimation_runs WHERE user_id=? AND request_id=?').get(userId, body.requestId);
  if (existing) {
    const estimates = validateEstimates(JSON.parse(existing.snapshot_json).questions, body.estimates);
    const encoded = JSON.stringify(estimates);
    if (existing.set_id !== body.setId || existing.estimates_json !== encoded) problem(409, 'Ước lượng của lượt này đã được khóa.');
    return publicRun(existing);
  }
  const snapshot = content(body.setId);
  const estimates = validateEstimates(snapshot.questions, body.estimates);
  const encoded = JSON.stringify(estimates);
  const active = db.prepare('SELECT id FROM estimation_runs WHERE user_id=? AND set_id=? AND attempt_id IS NULL').get(userId, body.setId);
  if (active) problem(409, 'Em đang có một lượt đã khóa ước lượng. Hãy tải lại để tiếp tục lượt đó.');
  const id = randomUUID();
  db.prepare(`INSERT INTO estimation_runs (id,user_id,set_id,request_id,estimates_json,snapshot_json)
    VALUES (?,?,?,?,?,?)`).run(id, userId, body.setId, body.requestId, encoded, JSON.stringify(snapshot));
  return publicRun(ownedRun(id, userId));
});
router.post('/estimates', handle((req, res) => res.json({ run: lock.immediate(req.user.id, req.body) })));

// One transaction covers scoring, attempt, progress, stars and closing the run.
const finish = db.transaction((userId, body) => {
  if (!record(body)) problem(400, 'Dữ liệu nộp bài không hợp lệ.');
  const row = ownedRun(body.runId, userId);
  if (body.setId !== row.set_id) problem(409, 'Lượt làm bài không thuộc bộ đề này.');
  if (Object.hasOwn(body, 'estimates')) problem(400, 'Ước lượng đã khóa, không gửi thay đổi khi nộp đáp số.');
  if (row.result_json) return JSON.parse(row.result_json);
  const snapshot = JSON.parse(row.snapshot_json);
  if (JSON.stringify(content(row.set_id)) !== row.snapshot_json) {
    problem(409, 'Nội dung đã thay đổi từ khi em lưu ước lượng. Hãy báo thầy cô trước khi tiếp tục.');
  }
  const scored = score(snapshot.questions, JSON.parse(row.estimates_json), body.answers);
  const { meta } = snapshot;
  if (!db.prepare('SELECT id FROM lessons WHERE id=?').get(meta.lesson_id)) problem(409, 'Bài học không còn tồn tại.');
  const old = db.prepare('SELECT best_score FROM progress WHERE user_id=? AND lesson_id=?').get(userId, meta.lesson_id);
  const starsEarned = Math.round(Math.max(0, scored.scorePercent - (old?.best_score || 0)) / 100 * meta.star_reward);
  const durationSec = Math.max(0, Math.floor((Date.now() - Date.parse(row.created_at + 'Z')) / 1000));
  const inserted = db.prepare(`INSERT INTO attempts (user_id,kind,ref_id,score_percent,correct_count,total_count,stars_earned,duration_sec,answers_json)
    VALUES (?,?,?,?,?,?,?,?,?)`).run(userId, meta.kind, row.set_id, scored.scorePercent, scored.correctCount,
    scored.totalCount, starsEarned, durationSec, JSON.stringify(scored.answers));
  db.prepare(`INSERT INTO progress (user_id,lesson_id,best_score,completed) VALUES (?,?,?,?)
    ON CONFLICT(user_id,lesson_id) DO UPDATE SET best_score=MAX(best_score,excluded.best_score),
    completed=MAX(completed,excluded.completed),updated_at=datetime('now','localtime')`)
    .run(userId, meta.lesson_id, scored.scorePercent, scored.scorePercent >= 50 ? 1 : 0);
  if (starsEarned) db.prepare('UPDATE users SET total_stars=total_stars+? WHERE id=?').run(starsEarned, userId);
  const result = { attemptId: inserted.lastInsertRowid, scorePercent: scored.scorePercent,
    correctCount: scored.correctCount, totalCount: scored.totalCount, starsEarned,
    totalStars: db.prepare('SELECT total_stars FROM users WHERE id=?').get(userId).total_stars, detail: scored.detail };
  db.prepare('UPDATE estimation_runs SET attempt_id=?,result_json=? WHERE id=? AND attempt_id IS NULL')
    .run(inserted.lastInsertRowid, JSON.stringify(result), row.id);
  return result;
});

function submit(req, res, next) {
  return handle((request, response) => response.json(finish.immediate(request.user.id, request.body)))(req, res, next);
}
module.exports = { router, submit, SET_ID };
