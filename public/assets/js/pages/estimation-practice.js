'use strict';

(() => {
  const panel = document.getElementById('uoc-luong');
  const el = name => document.getElementById(`estimate-${name}`);
  const url = '/api/estimation-practice';
  const stageNames = ['Vào bài', 'Tự tìm mốc', 'Áp dụng'];
  let questions = [];
  let currentIndex = -1;
  let busy = false;

  function firstUnfinished() {
    const index = questions.findIndex(question => question.state.phase !== 'completed');
    return index < 0 ? questions.length : index;
  }

  function showError(message = '') {
    el('error').textContent = message;
    el('error').hidden = !message;
  }

  function rangeLabel(range) {
    return `${range.min}–${range.max}`;
  }

  function setLocation(id) {
    const next = new URL(location.href);
    next.hash = id ? `uoc-luong/${id}` : '';
    history.replaceState(null, '', next);
  }

  function render(index, { focus = true } = {}) {
    currentIndex = index;
    const question = questions[index];
    const state = question?.state;
    const finished = questions.filter(item => item.state.phase === 'completed');
    const summary = !question;
    el('open').hidden = true;
    el('activity').hidden = false;
    el('meter').max = questions.length;
    el('meter').value = finished.length;
    el('progress').textContent = summary
      ? `Đã hoàn thành ${finished.length}/${questions.length} câu`
      : `Chặng ${question.stage}/3 · ${stageNames[question.stage - 1]} · Câu ${index % 4 + 1}/4 · Đã làm ${finished.length}/${questions.length}`;
    el('phase').textContent = summary ? 'TỔNG KẾT' : ({
      estimate: 'BƯỚC 1 · ƯỚC LƯỢNG',
      exact: 'BƯỚC 2 · TÍNH CHÍNH XÁC',
      completed: 'KẾT QUẢ CỦA EM',
    })[state.phase];
    el('prompt').textContent = summary ? 'Em đã hoàn thành cả ba chặng!'
      : (state.phase === 'estimate' && question.prompt) || (
        state.phase === 'estimate' ? 'Kết quả nằm trong khoảng nào?' : 'Kết quả của phép tính'
      );
    el('expression').textContent = question?.expression || '';
    el('guide').hidden = state?.phase !== 'estimate' || index > 1;
    el('guide').textContent = index === 0
      ? 'Với phép nhân, hãy tìm hai mốc dễ nhân nằm hai bên số cần ước lượng.'
      : 'Với phép chia, hãy tìm hai mốc nằm hai bên số bị chia và dễ chia nhẩm.';
    el('range-form').hidden = state?.phase !== 'estimate';
    el('exact-form').hidden = state?.phase !== 'exact';
    el('feedback').hidden = state?.phase !== 'completed';
    el('summary').hidden = !summary;

    if (state?.phase === 'estimate') {
      el('options').replaceChildren(...question.choices.map(range => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'range';
        radio.value = range.id;
        radio.required = true;
        label.append(radio, rangeLabel(range));
        return label;
      }));
      el('range-form').querySelector('details').open = false;
      el('hint-text').textContent = question.hint;
    } else if (state?.phase === 'exact') {
      el('chosen').textContent = `Em đã chọn khoảng ${rangeLabel(question.choices.find(range => range.id === state.rangeId))}.`;
      el('answer').value = '';
    } else if (state?.phase === 'completed') {
      el('range-result').textContent = state.estimateCorrect ? 'Ước lượng: hợp lý.' : 'Ước lượng: chưa hợp lý.';
      el('exact-result').textContent = state.exactCorrect
        ? `Tính chính xác: đúng, đáp số là ${state.correctAnswer}.`
        : `Tính chính xác: em nhập ${state.submittedAnswer}. Đáp số đúng là ${state.correctAnswer}.`;
      el('explanation-text').textContent = state.explanation;
      el('explanation').open = !state.estimateCorrect;
      const next = firstUnfinished();
      el('next').textContent = next === questions.length ? 'Xem tổng kết'
        : index % 4 === 3 && next === index + 1 ? 'Sang chặng tiếp theo' : 'Tiếp tục luyện tập';
    } else {
      const estimateCount = finished.filter(item => item.state.estimateCorrect).length;
      const exactCount = finished.filter(item => item.state.exactCorrect).length;
      el('summary-text').textContent = `Ước lượng hợp lý: ${estimateCount}/${questions.length}. Tính chính xác: ${exactCount}/${questions.length}.`;
    }

    el('review').hidden = !finished.length;
    el('review-list').replaceChildren(...finished.map(item => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'estimate-secondary';
      const itemIndex = questions.indexOf(item);
      button.textContent = `Câu ${itemIndex + 1}`;
      button.addEventListener('click', () => {
        if (busy) return;
        showError();
        render(itemIndex);
      });
      return button;
    }));
    setLocation(question?.id || 'tong-ket');
    if (focus) {
      if (state?.phase === 'exact') el('answer').focus({ preventScroll: true });
      else el('prompt').focus({ preventScroll: true });
      panel.scrollIntoView({ block: 'start' });
    }
  }

  async function perform(button, task) {
    if (busy) return;
    busy = true;
    button.disabled = true;
    showError();
    try { await task(); }
    catch (error) { showError(error.message); }
    finally {
      busy = false;
      button.disabled = false;
    }
  }

  function open() {
    perform(el('open'), async () => {
      ({ questions } = await window.MathAPI.get(url));
      const requested = location.hash.split('/')[1];
      const index = questions.findIndex(question => question.id === requested);
      const next = firstUnfinished();
      render(index >= 0 && (index === next || questions[index].state.phase === 'completed') ? index : next);
    });
  }

  el('open').addEventListener('click', open);
  el('pause').addEventListener('click', () => {
    if (busy) return;
    el('activity').hidden = true;
    el('open').hidden = false;
    el('open').textContent = 'Tiếp tục bài ước lượng';
    setLocation('');
    showError();
    el('open').focus();
  });
  el('next').addEventListener('click', () => {
    if (!busy) render(firstUnfinished());
  });
  el('range-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const rangeId = new FormData(form).get('range');
    const question = questions[currentIndex];
    perform(form.querySelector('button'), async () => {
      const { state } = await window.MathAPI.post(`${url}/${question.id}/estimate`, { rangeId });
      if (state.phase === 'completed') {
        const { questions: refreshed } = await window.MathAPI.get(url);
        questions = refreshed;
      } else question.state = state;
      render(currentIndex);
    });
  });
  el('exact-form').addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const value = el('answer').value.trim();
    if (!/^\d{1,3}$/.test(value)) {
      showError('Em hãy nhập đáp số bằng chữ số.');
      el('answer').focus();
      return;
    }
    const question = questions[currentIndex];
    perform(form.querySelector('button'), async () => {
      ({ state: question.state } = await window.MathAPI.post(`${url}/${question.id}/exact`, { answer: Number(value) }));
      render(currentIndex);
    });
  });
  document.addEventListener('mathapp:user-ready', () => {
    if (/^#uoc-luong(?:\/|$)/.test(location.hash)) open();
  });
})();
