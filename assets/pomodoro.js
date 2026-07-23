/* Lernwerkstatt – Pomodoro-Timer (Methode 4: Zeit schützen).
   Läuft seitenübergreifend weiter (Zustand in localStorage), 25 min Fokus / 5 min Pause,
   nach 4 Fokus-Blöcken 15 min Langpause. Ein Widget auf jeder Seite. */
(function () {
  var KEY = 'lw.pomodoro';
  var FOCUS = 25 * 60, BREAK = 5 * 60, LONG = 15 * 60;
  function load() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } }
  function save(s) { try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) {} }
  var s = load();
  if (!s.phase) s = { phase: 'idle', running: false, remaining: FOCUS, endTs: 0, count: s.count || 0 };

  var el = document.createElement('div');
  el.id = 'pomo';
  document.body.appendChild(el);

  function dur(phase) { return phase === 'break' ? BREAK : phase === 'long' ? LONG : FOCUS; }
  function remaining() {
    if (s.running && s.endTs) return Math.max(0, Math.round((s.endTs - Date.now()) / 1000));
    return s.remaining;
  }
  function label() { return s.phase === 'break' ? '☕ Kurze Pause' : s.phase === 'long' ? '🌙 Lange Pause' : s.phase === 'focus' ? '🍅 Fokus' : '🍅 Pomodoro'; }

  function tick() {
    var r = remaining();
    if (s.running && r <= 0) advance();
    render();
  }
  function advance() {
    // Phase abgeschlossen
    if (s.phase === 'focus') {
      s.count = (s.count || 0) + 1;
      var long = (s.count % 4 === 0);
      s.phase = long ? 'long' : 'break';
    } else { // break/long/idle -> neuer Fokus
      s.phase = 'focus';
    }
    s.remaining = dur(s.phase);
    s.endTs = Date.now() + s.remaining * 1000;
    s.running = true;
    save(s);
    try { beep(); } catch (e) {}
  }
  function startPause() {
    if (s.phase === 'idle') { s.phase = 'focus'; s.remaining = FOCUS; }
    if (s.running) { s.remaining = remaining(); s.running = false; s.endTs = 0; }
    else { s.endTs = Date.now() + s.remaining * 1000; s.running = true; }
    save(s); render();
  }
  function reset() { s = { phase: 'idle', running: false, remaining: FOCUS, endTs: 0, count: s.count || 0 }; save(s); render(); }
  function beep() {
    var a = new (window.AudioContext || window.webkitAudioContext)();
    var o = a.createOscillator(), g = a.createGain();
    o.connect(g); g.connect(a.destination); o.frequency.value = 660; g.gain.value = 0.08;
    o.start(); setTimeout(function () { o.stop(); a.close(); }, 320);
  }
  function fmt(sec) { return ('0' + Math.floor(sec / 60)).slice(-2) + ':' + ('0' + (sec % 60)).slice(-2); }

  function render() {
    el.className = s.phase === 'focus' ? 'focus' : (s.phase === 'break' || s.phase === 'long') ? 'break' : '';
    if (el.classList.contains('_col')) el.classList.add('collapsed');
    el.innerHTML =
      '<button class="min" title="ein/aus">' + (el._col ? '▢' : '—') + '</button>' +
      '<div class="ph">' + label() + '</div>' +
      '<div class="clock">' + fmt(remaining()) + '</div>' +
      '<div class="row">' +
        '<button class="main" id="pStart">' + (s.running ? '⏸ Pause' : '▶ Start') + '</button>' +
        '<button id="pReset">↺</button>' +
      '</div>' +
      '<div class="tom">🍅 ' + (s.count || 0) + ' erledigt</div>';
    el.querySelector('#pStart').onclick = startPause;
    el.querySelector('#pReset').onclick = reset;
    el.querySelector('.min').onclick = function () { el._col = !el._col; el.classList.toggle('collapsed'); };
  }

  render();
  setInterval(tick, 1000);
})();
