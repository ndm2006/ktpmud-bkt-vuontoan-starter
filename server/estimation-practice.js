'use strict';

const express = require('express');
const db = require('./db');
const { requireAuth } = require('./auth');
const fixtures = require('./estimation-questions');

const router = express.Router();
const getAnswers = db.prepare('SELECT * FROM estimation_answers WHERE user_id = ?');
const getAnswer = db.prepare('SELECT * FROM estimation_answers WHERE user_id = ? AND question_id = ?');
const insertEstimate = db.prepare('INSERT INTO estimation_answers (user_id, question_id, range_id) VALUES (?, ?, ?)');
const finishAnswer = db.prepare(`UPDATE estimation_answers
  SET exact_answer = ?, estimate_correct = ?, exact_correct = ?, completed_at = CURRENT_TIMESTAMP
  WHERE user_id = ? AND question_id = ? AND exact_answer IS NULL`);

function calculate(a, op, b) {
  return op === '×' ? a * b : a / b;
}

function contains(range, value) {
  return range.min <= value && value <= range.max;
}

const questions = fixtures.map((fixture, index) => {
  const { id, a, b, op, marks, markFactor, prompt, ranges } = fixture;
  const [low, high] = marks;
  const factor = markFactor ?? b;
  const subject = markFactor ? b : a;
  const [lowResult, highResult] = marks.map(mark => calculate(mark, op, factor));
  const answer = calculate(a, op, b);
  const choices = ranges.map(([min, max], n) => ({ id: `r${n + 1}`, min, max }));
  const correct = choices.find(range => contains(range, answer));
  const hint = op === '×'
    ? (markFactor ? 'Thử hai mốc dễ nhân: 5 và 10.' : `Tìm hai số tròn chục nằm hai bên ${subject}.`)
    : `Thử lấy ${low} làm mốc thấp. Em tìm thêm một số lớn hơn ${subject} mà em chia nhẩm được cho ${b}.`;
  const reason = op === '×'
    ? (markFactor ? '5 và 10 là hai mốc dễ nhân' : 'hai mốc này là số tròn chục nên dễ nhân nhẩm')
    : `hai mốc này đều chia hết cho ${b} và dễ chia nhẩm`;
  return {
    id, stage: Math.floor(index / 4) + 1, expression: `${a} ${op} ${b}`, prompt, choices,
    answer, hint, maxAnswer: op === '×' ? 999 : 99,
    explanation: `${subject} nằm giữa ${low} và ${high}. Ta chọn chúng vì ${reason}. `
      + `${low} ${op} ${factor} = ${lowResult} và ${high} ${op} ${factor} = ${highResult}. `
      + `Vậy kết quả nằm trong khoảng ${correct.min}–${correct.max} trong các lựa chọn.`,
  };
});
const byId = new Map(questions.map(question => [question.id, question]));

function stateFor(question, row) {
  if (!row) return { phase: 'estimate' };
  if (row.exact_answer === null) return { phase: 'exact', rangeId: row.range_id };
  return {
    phase: 'completed',
    rangeId: row.range_id,
    submittedAnswer: row.exact_answer,
    estimateCorrect: Boolean(row.estimate_correct),
    exactCorrect: Boolean(row.exact_correct),
    correctAnswer: question.answer,
    explanation: question.explanation,
  };
}

const saveEstimate = db.transaction((userId, question, rangeId) => {
  const previous = getAnswer.get(userId, question.id);
  if (previous && previous.range_id !== rangeId) {
    return { status: 409, error: 'Khoảng ước lượng của câu này đã được lưu.' };
  }
  if (!previous) insertEstimate.run(userId, question.id, rangeId);
  // Phản hồi bước ước lượng chỉ trả dữ liệu của bước này, kể cả khi gửi lại.
  return { state: { phase: previous?.exact_answer != null ? 'completed' : 'exact', rangeId } };
});

const saveExact = db.transaction((userId, question, answer) => {
  const previous = getAnswer.get(userId, question.id);
  if (!previous) return { status: 409, error: 'Em hãy chọn khoảng ước lượng trước.' };
  if (previous.exact_answer !== null) {
    return previous.exact_answer === answer
      ? { state: stateFor(question, previous) }
      : { status: 409, error: 'Đáp số của câu này đã được lưu.' };
  }

  const range = question.choices.find(choice => choice.id === previous.range_id);
  finishAnswer.run(answer, Number(contains(range, question.answer)), Number(answer === question.answer), userId, question.id);
  return { state: stateFor(question, getAnswer.get(userId, question.id)) };
});

router.use(requireAuth, (req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});

router.get('/', (req, res) => {
  const rows = new Map(getAnswers.all(req.user.id).map(row => [row.question_id, row]));
  res.json({ questions: questions.map(question => ({
    id: question.id,
    stage: question.stage,
    expression: question.expression,
    prompt: question.prompt,
    choices: question.choices,
    hint: question.hint,
    state: stateFor(question, rows.get(question.id)),
  })) });
});

router.post('/:id/estimate', (req, res) => {
  const question = byId.get(req.params.id);
  if (!question) return res.status(404).json({ error: 'Không tìm thấy câu hỏi.' });
  const { rangeId } = req.body || {};
  if (!question.choices.some(choice => choice.id === rangeId)) {
    return res.status(400).json({ error: 'Em hãy chọn một trong ba khoảng.' });
  }
  const result = saveEstimate.immediate(req.user.id, question, rangeId);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
});

router.post('/:id/exact', (req, res) => {
  const question = byId.get(req.params.id);
  if (!question) return res.status(404).json({ error: 'Không tìm thấy câu hỏi.' });
  const { answer } = req.body || {};
  if (!Number.isInteger(answer) || answer < 1 || answer > question.maxAnswer) {
    return res.status(400).json({ error: `Em hãy nhập một số nguyên từ 1 đến ${question.maxAnswer}.` });
  }
  const result = saveExact.immediate(req.user.id, question, answer);
  if (result.error) return res.status(result.status).json({ error: result.error });
  res.json(result);
});

module.exports = router;
