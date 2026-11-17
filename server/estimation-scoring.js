'use strict';

function record(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
function fail(message) { const error = new Error(message); error.status = 400; throw error; }
function contains(range, value) { return range.min <= value && value <= range.max; }

function rangesFor(question) {
  const ranges = JSON.parse(question.options_json).ranges;
  if (!Array.isArray(ranges) || ranges.length !== 3 ||
      ranges.some((r, i) => !r || typeof r.id !== 'string' || !Number.isSafeInteger(r.min) ||
        !Number.isSafeInteger(r.max) || r.min > r.max || (i > 0 && ranges[i - 1].max >= r.min)) ||
      new Set(ranges.map(r => r.id)).size !== ranges.length || !/^\d{1,3}$/.test(question.correct_answer) ||
      ranges.filter(r => contains(r, Number(question.correct_answer))).length !== 1) {
    throw new Error('Dữ liệu bộ ước lượng không hợp lệ.');
  }
  return ranges;
}

function validateEstimates(questions, estimates) {
  if (!record(estimates) || Object.keys(estimates).length !== questions.length) {
    fail('Em hãy chọn một khoảng cho đủ 12 câu trước khi chuyển bước.');
  }
  const normalized = {};
  for (const q of questions) {
    if (!Object.hasOwn(estimates, q.id) || !rangesFor(q).some(r => r.id === estimates[q.id])) {
      fail(`Khoảng ước lượng của câu ${q.sort_order} chưa hợp lệ.`);
    }
    normalized[q.id] = estimates[q.id];
  }
  return normalized;
}

function normalizeExact(value) {
  if (value === '') return '';
  if (typeof value === 'number' && Number.isInteger(value) && value >= 0 && value <= 999) return String(value);
  if (typeof value === 'string' && /^\d{1,3}$/.test(value.trim())) return String(Number(value.trim()));
  fail('Đáp số phải là số nguyên từ 0 đến 999. Em có thể để trống câu chưa làm.');
}

function score(questions, estimates, answers) {
  if (!record(answers) || Object.keys(answers).some(id => !questions.some(q => q.id === id))) {
    fail('Danh sách đáp số không hợp lệ. Em hãy tải lại bài rồi thử lại.');
  }
  const savedAnswers = {};
  const detail = questions.map(q => {
    const ranges = rangesFor(q);
    const selected = ranges.find(r => r.id === estimates[q.id]);
    const correctRange = ranges.find(r => contains(r, Number(q.correct_answer)));
    const answer = Object.hasOwn(answers, q.id) ? normalizeExact(answers[q.id]) : '';
    savedAnswers[q.id] = answer;
    const estimateCorrect = Boolean(selected && contains(selected, Number(q.correct_answer)));
    const exactCorrect = answer !== '' && answer === String(Number(q.correct_answer));
    return { questionId: q.id, estimateCorrect, exactCorrect, correct: estimateCorrect && exactCorrect,
      rangeId: estimates[q.id], submittedAnswer: answer, correctAnswer: q.correct_answer, correctRange,
      explanation: `${q.prompt}: kết quả là ${q.correct_answer}, thuộc khoảng ${correctRange.min}–${correctRange.max}.` };
  });
  const correctCount = detail.filter(d => d.correct).length;
  return { answers: savedAnswers, detail, correctCount, totalCount: questions.length,
    scorePercent: Math.round(correctCount / questions.length * 100) };
}

function publicQuestion(q) {
  const options = JSON.parse(q.options_json);
  return { id: q.id, type: q.type, prompt: q.prompt, points: q.points, category: q.category,
    options: { ranges: rangesFor(q).map(({ id, min, max }) => ({ id, min, max })), hint: String(options.hint || '') } };
}

module.exports = { record, contains, rangesFor, validateEstimates, normalizeExact, score, publicQuestion };
