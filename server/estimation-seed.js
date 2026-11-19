'use strict';

const fixtures = require('./estimation-questions');
const { rangesFor } = require('./estimation-scoring');
const SET_ID = 'uoc-luong-nhan-chia';
const LESSON_ID = 'bai-41'; // Existing multiplication/division review, no new curriculum.
const OLD_SIXTH_PROMPT = '48 × 6 — Có 6 hộp bút, mỗi hộp có 48 chiếc. Tổng số bút nằm trong khoảng nào?';

function seedEstimation(db) {
  const insertSet = db.prepare(`INSERT OR IGNORE INTO question_sets
    (id,title,kind,lesson_id,star_reward,duration_minutes) VALUES (?,?,'exercise',?,40,0)`);
  const insert = db.prepare(`INSERT OR IGNORE INTO questions
    (id,set_id,lesson_id,type,prompt,options_json,correct_answer,points,category,sort_order)
    VALUES (@id,@setId,@lessonId,'estimate',@prompt,@options_json,@correct_answer,1,'Ước lượng và tính đúng',@sort_order)`);
  db.transaction(() => {
    insertSet.run(SET_ID, 'Ước lượng trước khi tính đúng', LESSON_ID);
    fixtures.forEach((q, index) => {
      if (!['×', '÷'].includes(q.op) || !Number.isInteger(q.a) || !Number.isInteger(q.b) || q.b <= 0 ||
          (q.op === '÷' && q.a % q.b !== 0)) throw new Error('Fixture phép tính không hợp lệ.');
      const subject = q.markFactor ? q.b : q.a;
      const hint = q.op === '×'
        ? (q.markFactor ? 'Hãy dùng 5 và 10 làm mốc dễ nhân với 6.' : `Tìm hai số tròn chục nằm hai bên ${subject}, rồi nhân nhẩm với ${q.b}.`)
        : `Dùng các số chia hết dễ nhẩm cho ${q.b} nằm hai bên ${q.a} để tìm khoảng kết quả.`;
      const row = { id: `est-set-${String(index + 1).padStart(2, '0')}`, setId: SET_ID, lessonId: LESSON_ID,
        prompt: `${q.a} ${q.op} ${q.b}${q.prompt ? ' — ' + q.prompt : ''}`,
        options_json: JSON.stringify({ ranges: q.ranges.map(([min, max], i) => ({ id: `r${i + 1}`, min, max })), hint }),
        correct_answer: String(q.op === '×' ? q.a * q.b : q.a / q.b), sort_order: index + 1 };
      rangesFor(row);
      insert.run(row);
    });
    // Cosmetic-only migration requested by N57: never overwrite a teacher edit.
    db.prepare('UPDATE questions SET prompt=? WHERE id=? AND set_id=? AND prompt=?')
      .run('48 × 6', 'est-set-06', SET_ID, OLD_SIXTH_PROMPT);
    // Preserve open estimates while applying this exact, non-scoring wording change.
    // Completed result snapshots remain historical evidence and are not rewritten.
    for (const run of db.prepare('SELECT id,snapshot_json FROM estimation_runs WHERE set_id=? AND attempt_id IS NULL').all(SET_ID)) {
      const snapshot = JSON.parse(run.snapshot_json);
      const sixth = snapshot.questions.find(q => q.id === 'est-set-06');
      if (sixth?.prompt === OLD_SIXTH_PROMPT) {
        sixth.prompt = '48 × 6';
        db.prepare('UPDATE estimation_runs SET snapshot_json=? WHERE id=?').run(JSON.stringify(snapshot), run.id);
      }
    }
  })();
}

module.exports = { seedEstimation, SET_ID, LESSON_ID };
