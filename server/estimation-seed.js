'use strict';

const fixtures = require('./estimation-questions');
const { rangesFor } = require('./estimation-scoring');
const SET_ID = 'uoc-luong-nhan-chia';
const LESSON_ID = 'bai-41'; // Existing multiplication/division review, no new curriculum.

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
  })();
}

module.exports = { seedEstimation, SET_ID, LESSON_ID };
