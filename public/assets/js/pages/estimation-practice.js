'use strict';

// Shared lesson player extension. The server owns locked estimates and final scores.
window.EstimationPlayer = {
  SET_ID: 'uoc-luong-nhan-chia',
  create(setId) {
    const el = id => document.getElementById(id);
    const container = el('questions-container');
    const submitButton = el('btn-submit-lesson');
    const resultBox = el('lesson-result');
    const notice = el('lesson-notice');
    const errorBox = el('lesson-error');
    const api = '/api/estimation-practice';
    const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    let questions = [], estimates = {}, answers = {}, run = null, requestId = crypto.randomUUID();
    let busy = false, ready = false;

    function error(message = '', field) {
      errorBox.textContent = message;
      errorBox.hidden = !message;
      container.querySelectorAll('[aria-invalid]').forEach(input => {
        input.removeAttribute('aria-invalid');
        if (input.dataset.exact) input.setAttribute('aria-describedby', `exact-help-${input.dataset.exact}`);
        else input.removeAttribute('aria-describedby');
      });
      if (field) {
        field.setAttribute('aria-invalid', 'true');
        field.setAttribute('aria-describedby', 'lesson-error');
        field.focus();
      }
    }
    function progress() {
      const count = questions.filter(q => run ? answers[q.id] !== undefined && answers[q.id] !== '' : estimates[q.id]).length;
      el('lesson-progress').style.width = `${questions.length ? Math.round(count / questions.length * 100) : 0}%`;
      el('lesson-progress-text').textContent = run?.status === 'submitted'
        ? 'Đã nộp 12 câu. Kết quả được lưu trên máy chủ.'
        : `${run ? 'Đã nhập đáp số' : 'Đã chọn khoảng'} ${count}/${questions.length} câu`;
    }
    function render() {
      const completed = run?.status === 'submitted';
      const locked = Boolean(run);
      notice.textContent = completed ? 'Em có thể xem lại kết quả hoặc bắt đầu lượt mới.' : locked
        ? 'Bước 2/2: Ước lượng đã lưu và khóa. Nhập kết quả chính xác rồi nộp bài. Đáp số chỉ được lưu sau khi nộp thành công.'
        : 'Bước 1/2: Hãy dùng các mốc dễ nhẩm để chọn khoảng cho cả 12 câu. Sau đó lưu ước lượng để mở bước tính chính xác. Lựa chọn chưa lưu sẽ mất khi tải lại.';
      container.innerHTML = questions.map((q, index) => {
        const feedback = completed ? run.result.detail.find(d => d.questionId === q.id) : null;
        const ranges = q.options.ranges;
        const selected = ranges.find(r => r.id === estimates[q.id]);
        const choices = locked
          ? `<p class="estimate-locked">Ước lượng đã khóa: <strong>${selected.min}–${selected.max}</strong></p>`
          : `<div class="estimate-options">${ranges.map(r => `<label class="estimate-range"><input type="radio" name="range-${escape(q.id)}" data-estimate="${escape(q.id)}" value="${escape(r.id)}" ${estimates[q.id] === r.id ? 'checked' : ''}><span>${r.min}–${r.max}</span></label>`).join('')}</div>
            <details class="estimate-hint"><summary>Gợi ý cách ước lượng</summary><p>${escape(q.options.hint)}</p></details>`;
        const exact = locked && !completed
          ? `<label class="estimate-answer-label" for="exact-${escape(q.id)}">Đáp số chính xác</label>
             <input id="exact-${escape(q.id)}" class="estimate-answer" data-exact="${escape(q.id)}" type="text" inputmode="numeric" maxlength="3" autocomplete="off" value="${escape(answers[q.id] ?? '')}" aria-describedby="exact-help-${escape(q.id)}">
             <p id="exact-help-${escape(q.id)}" class="estimate-input-help">Số nguyên từ 0 đến 999; để trống nếu chưa làm được.</p>` : '';
        const result = feedback ? `<div class="estimate-feedback">
          <p>Ước lượng: <strong>${feedback.estimateCorrect ? 'Hợp lý' : 'Chưa hợp lý'}</strong>.</p>
          <p>Tính chính xác: <strong>${feedback.exactCorrect ? 'Đúng' : 'Chưa đúng'}</strong>. Em nhập: ${escape(feedback.submittedAnswer || 'Chưa trả lời')}.</p>
          <p>${feedback.correct ? 'Đạt 1/1 điểm' : 'Chưa đạt điểm câu này; cần đúng cả hai bước.'}</p>
          <p>${escape(feedback.explanation)}</p></div>` : '';
        return `<fieldset class="estimate-card"><legend>Câu ${index + 1}. ${escape(q.prompt)}</legend>${choices}${exact}${result}</fieldset>`;
      }).join('');
      container.querySelectorAll('[data-estimate]').forEach(input => input.addEventListener('change', () => {
        estimates[input.dataset.estimate] = input.value;
        error(); progress();
      }));
      container.querySelectorAll('[data-exact]').forEach(input => input.addEventListener('input', () => {
        answers[input.dataset.exact] = input.value.trim();
        error(); progress();
      }));
      submitButton.hidden = completed;
      submitButton.disabled = !ready;
      submitButton.textContent = locked ? 'Nộp bài và xem kết quả' : 'Lưu 12 ước lượng và chuyển bước';
      el('set-kind').textContent = '12 câu • 6 phép nhân, 6 phép chia • Mỗi câu 1 điểm khi đúng cả hai bước';
      resultBox.classList.toggle('hidden', !completed);
      if (completed) {
        const r = run.result;
        resultBox.innerHTML = `<h2 id="estimate-result-title" tabindex="-1">Em đạt ${r.scorePercent}% — đúng cả hai bước ${r.correctCount}/${r.totalCount} câu</h2>
          <p>Ước lượng hợp lý: ${r.detail.filter(d => d.estimateCorrect).length}/12. Tính chính xác đúng: ${r.detail.filter(d => d.exactCorrect).length}/12.</p>
          <p>${r.starsEarned ? `Nhận thêm ${r.starsEarned} sao.` : 'Chưa vượt điểm tốt nhất của bài học nên không cộng thêm sao.'} Kết quả đã được lưu.</p>
          <button id="estimate-new-run" class="estimate-primary" type="button">Làm lượt mới</button>`;
        el('estimate-new-run').addEventListener('click', startNew);
      }
      progress();
    }
    function adopt(saved) {
      run = saved;
      if (saved) { questions = saved.questions; estimates = saved.estimates; }
      if (saved?.result) answers = Object.fromEntries(saved.result.detail.map(d => [d.questionId, d.submittedAnswer]));
    }
    async function init() {
      submitButton.disabled = true;
      const data = await window.MathAPI.get(`${api}?setId=${encodeURIComponent(setId)}`);
      if (data.run) adopt(data.run);
      else questions = (await window.MathAPI.get(`/api/question-sets/${encodeURIComponent(setId)}/questions`)).questions;
      ready = true;
      render();
    }
    async function startNew() {
      if (busy) return;
      busy = true;
      const restart = el('estimate-new-run');
      restart.disabled = true;
      try {
        const data = await window.MathAPI.get(`/api/question-sets/${encodeURIComponent(setId)}/questions`);
        questions = data.questions;
        estimates = {}; answers = {}; run = null; requestId = crypto.randomUUID();
        error(); render();
        container.querySelector('input')?.focus();
      } catch (err) { error(err.message); restart.disabled = false; }
      finally { busy = false; }
    }
    async function submit() {
      if (busy || !ready || run?.status === 'submitted') return;
      error();
      if (!run) {
        const missing = questions.find(q => !estimates[q.id]);
        if (missing) return error('Em hãy chọn khoảng cho đủ 12 câu trước khi chuyển bước.', container.querySelector(`[name="range-${missing.id}"]`));
      } else {
        const invalid = questions.find(q => answers[q.id] && !/^\d{1,3}$/.test(answers[q.id]));
        if (invalid) return error('Đáp số phải là số nguyên từ 0 đến 999.', el(`exact-${invalid.id}`));
        const missing = questions.filter(q => !answers[q.id]).length;
        if (missing && !confirm(`Em còn ${missing} câu chưa nhập đáp số. Vẫn nộp bài nhé?`)) return;
      }
      busy = true;
      submitButton.disabled = true;
      container.inert = true;
      const previousLabel = submitButton.textContent;
      submitButton.textContent = 'Đang lưu…';
      try {
        if (!run) {
          const saved = await window.MathAPI.post(`${api}/estimates`, { setId, requestId, estimates: { ...estimates } });
          adopt(saved.run);
        } else {
          const result = await window.MathAPI.post('/api/submissions', { setId, runId: run.id, answers: { ...answers } });
          run = { ...run, status: 'submitted', result };
        }
        render();
        container.inert = false;
        if (run.status === 'submitted') el('estimate-result-title').focus();
        else container.querySelector('[data-exact]')?.focus();
      } catch (err) {
        submitButton.textContent = previousLabel;
        error(`${err.message} Nếu kết nối vừa gián đoạn, hãy tải lại để kiểm tra phần đã lưu.`);
      } finally {
        busy = false; submitButton.disabled = !ready; container.inert = false;
      }
    }
    return { init, submit };
  },
};
