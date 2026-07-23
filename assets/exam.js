/* Lernwerkstatt – Pool-Engine für Prüfungssimulator & Wiederhol-Deck.
   Nutzt window.QUESTION_POOL (aus pool.js). Konfiguration über window.EXAM_CFG:
     { mode:'sim'|'review', count:20, group:'all'|'hf1'..., timerMin:0 }
   Rendert in <div id="exam"></div>. Speichert KEINE Deck-Ampel (Übungsmodus),
   aktualisiert aber db.decks[id].q[n] (falsch/richtig) → hält Wiederhol-Pool aktuell. */
(function () {
  var POOL = window.QUESTION_POOL || [];
  var CFG = window.EXAM_CFG || { mode: 'sim', count: 20, group: 'all', timerMin: 0 };
  var host = document.getElementById('exam');
  var STORE = 'lernwerkstatt.v1';
  var TYP = { v: ['v', 'Verständnis'], p: ['p', 'Rechnen / Anwenden'] };
  var list = [], idx = 0, results = {}, t0 = 0, timerId = null;

  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || { decks: {} }; } catch (e) { return { decks: {} }; } }
  function todayYMD() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function saveSession(known, total) {
    // Simulator-/Wiederhol-Session: zaehlt im Hub fuer Streak + Durchlaeufe (nicht fuer Deck-Ampel)
    var db = load();
    (db.sessions = db.sessions || []).push({ date: todayYMD(), mode: CFG.mode, known: known, total: total });
    try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) {}
  }
  function persistQ(q, ok) {
    var db = load();
    if (!db.decks[q.id]) db.decks[q.id] = { title: q.deck, runs: [], q: {} };
    db.decks[q.id].q = db.decks[q.id].q || {};
    db.decks[q.id].q[q.n] = ok;
    try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) {}
  }
  function shuffle(a) { for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }

  function buildSim() {
    var pool = POOL.filter(function (q) { return CFG.group === 'all' || q.group === CFG.group; });
    return shuffle(pool.slice()).slice(0, CFG.count);
  }
  function buildReview() {
    var db = load(), miss = [];
    POOL.forEach(function (q) {
      var d = db.decks[q.id];
      if (d && d.q && d.q[q.n] === false) miss.push(q);
    });
    return shuffle(miss);
  }

  function startTimer() {
    if (!CFG.timerMin) return;
    t0 = Date.now();
    timerId = setInterval(function () {
      var left = CFG.timerMin * 60 - Math.floor((Date.now() - t0) / 1000);
      var el = document.getElementById('timer');
      if (left <= 0) { clearInterval(timerId); if (el) el.textContent = '⏱️ 00:00'; return finish(); }
      if (el) el.textContent = '⏱️ ' + ('0' + Math.floor(left / 60)).slice(-2) + ':' + ('0' + (left % 60)).slice(-2);
    }, 500);
  }

  function render() {
    if (idx >= list.length) return finish();
    var q = list[idx], t = TYP[q.typ] || ['v', 'Frage'];
    var pct = Math.round((idx / list.length) * 100);
    var correct = Object.keys(results).filter(function (k) { return results[k]; }).length;
    host.innerHTML =
      '<div class="deck-bar"><span>Frage&nbsp;<b>' + (idx + 1) + '</b>&nbsp;/&nbsp;' + list.length + '</span>' +
      '<div class="track"><div class="fill" style="width:' + pct + '%"></div></div>' +
      (CFG.timerMin ? '<span id="timer" class="known">⏱️ --:--</span>' : '<span class="known">' + correct + ' richtig</span>') + '</div>' +
      '<div class="card"><div class="meta">' +
      '<span class="badge">' + q.deck + '</span>' +
      '<span class="badge ' + t[0] + '">' + t[1] + '</span>' +
      '<span class="badge">' + (q.kennung || '') + '</span>' +
      (q.ergebnis ? '<span class="badge p">🔢 Rechen-Check</span>' : '') + '</div>' +
      '<div class="frage">' + q.frage + '</div>' +
      '<div class="feynman">' + (q.typ === 'p' ? '🧑‍🏫 Erst selbst rechnen, dann Lösung.' : '🧑‍🏫 Feynman: in eigenen Worten erklären, dann aufdecken.') + '</div>' +
      '<div class="actions" id="rb"><button class="btn ghost" id="hintBtn">💡 Erläuterung</button>' +
      '<button class="btn primary" id="solBtn">Musterlösung →</button></div>' +
      '<div id="hintBox"></div><div id="solBox"></div><div id="rateBox"></div></div>';
    document.getElementById('hintBtn').onclick = function () {
      var b = document.getElementById('hintBox'); if (b.innerHTML) { b.innerHTML = ''; return; }
      b.innerHTML = '<div class="reveal hint"><h4>Erläuterung</h4>' + q.erklaerung + '</div>';
    };
    document.getElementById('solBtn').onclick = function () {
      document.getElementById('solBox').innerHTML = '<div class="reveal"><h4>✓ Musterlösung' + (q.ergebnis ? ' (Ziel: ' + q.ergebnis.wert + (q.ergebnis.einheit ? ' ' + q.ergebnis.einheit : '') + ')' : '') + '</h4>' + q.loesung + '</div>';
      document.getElementById('rb').style.display = 'none';
      document.getElementById('rateBox').innerHTML =
        '<div class="rate"><p>' + q.deck + ' · stimmte deine Antwort?</p><div class="actions">' +
        '<button class="btn ok" id="okBtn">✓ Richtig</button><button class="btn no" id="noBtn">✗ Falsch</button></div></div>';
      document.getElementById('okBtn').onclick = function () { rate(q, true); };
      document.getElementById('noBtn').onclick = function () { rate(q, false); };
    };
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function rate(q, ok) { results[q.n + '@' + q.id] = ok; persistQ(q, ok); idx++; render(); }

  function finish() {
    if (timerId) clearInterval(timerId);
    var total = list.length, known = Object.keys(results).filter(function (k) { return results[k]; }).length;
    if (total) saveSession(known, total);
    if (window.SYNC) SYNC.autoExport();   // Fortschritt still in Downloads sichern (Geräte-Sync)
    var pct = total ? Math.round((known / total) * 100) : 0;
    var amp = pct >= 90 ? '🟢 stark' : pct >= 70 ? '🟡 solide' : '🔴 nachlegen';
    host.innerHTML = '<div class="card result"><div class="score">' + known + '/' + total + '</div>' +
      '<div class="ampel">' + amp + ' · ' + pct + '%' + (CFG.mode === 'sim' ? ' · Prüfungssimulation' : ' · Wiederholung') + '</div>' +
      '<div class="actions" style="justify-content:center">' +
      '<button class="btn primary" id="againBtn">🔁 Neu</button>' +
      '<a class="btn ghost" href="index.html">← Zum Hub</a></div>' +
      '<p class="muted" style="margin-top:1rem">' + (CFG.mode === 'review'
        ? 'Richtig beantwortete Fragen sind aus dem Wiederhol-Pool entfernt.'
        : 'Übungsmodus – zählt nicht auf die Deck-Ampel, hält aber deinen Wiederhol-Pool aktuell.') + '</p></div>';
    document.getElementById('againBtn').onclick = boot;
  }

  function boot() {
    list = CFG.mode === 'review' ? buildReview() : buildSim();
    idx = 0; results = {};
    if (!list.length) {
      host.innerHTML = '<div class="card result"><p>🎉 Aktuell keine Fragen hier.' +
        (CFG.mode === 'review' ? ' Du hast keine offenen „falsch"-Fragen – stark!' : '') +
        '</p><a class="btn ghost" href="index.html">← Zum Hub</a></div>';
      return;
    }
    render(); startTimer();
  }
  window.EXAM_BOOT = boot;
  boot();
})();
