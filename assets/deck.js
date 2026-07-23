/* Lernwerkstatt – Karteikarten-Deck v3
   - Active Recall + Scoring + localStorage (Durchläufe)
   - Ergebnis pro Frage gespeichert (db.decks[id].q[n] = true/false) → Wiederhol-Deck
   - Rechen-Check: Fragen mit q.ergebnis {wert,einheit,tol,hinweis} bekommen Zahleneingabe mit Auto-Feedback
   Erwartet: window.DECK_CFG={id,title}; <script id="deck-data" type="application/json">[...]</script>; <div id="deck"></div> */
(function () {
  var raw = document.getElementById('deck-data'); if (!raw) return;
  var DATA = JSON.parse(raw.textContent);
  var CFG = window.DECK_CFG || { id: 'unknown', title: 'Selbsttest' };
  var host = document.getElementById('deck');
  var TYP = { v: ['v', 'Verständnis'], p: ['p', 'Rechnen / Anwenden'] };
  var STORE = 'lernwerkstatt.v1';

  var mode = 'run', list = DATA.slice(), idx = 0, results = {};

  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || { decks: {} }; } catch (e) { return { decks: {} }; } }
  function todayYMD() { var d = new Date(); return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function saveRun(known, total) {
    var db = load();
    if (!db.decks[CFG.id]) db.decks[CFG.id] = { title: CFG.title, runs: [], q: {} };
    var d = db.decks[CFG.id]; d.title = CFG.title; d.q = d.q || {};
    d.runs.push({ date: todayYMD(), known: known, total: total, pct: Math.round((known / total) * 100) });
    Object.keys(results).forEach(function (n) { d.q[n] = results[n]; });   // letztes Ergebnis je Frage
    try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) {}
  }
  function deckAmpel() {
    var db = load(), d = db.decks[CFG.id];
    if (!d || !d.runs.length) return { c: '🔴', n: 0 };
    var last = d.runs[d.runs.length - 1], good = {};
    d.runs.forEach(function (r) { if (r.pct >= 90) good[r.date] = 1; });
    if (Object.keys(good).length >= 2) return { c: '🟢', n: d.runs.length };
    if (last.pct < 60) return { c: '🔴', n: d.runs.length };
    return { c: '🟡', n: d.runs.length };
  }

  function metaHtml(q) {
    var t = TYP[q.typ] || ['v', 'Frage'];
    return '<div class="meta">' +
      '<span class="badge ' + t[0] + '">' + t[1] + '</span>' +
      '<span class="badge">' + (q.kennung || CFG.id.toUpperCase()) + '</span>' +
      '<span class="badge">Stufe: ' + (q.tax || '–') + '</span>' +
      (q.ergebnis ? '<span class="badge p">🔢 Rechen-Check</span>' : '') + '</div>';
  }

  function render() {
    if (idx >= list.length) return finish();
    var q = list[idx];
    var pct = Math.round((idx / list.length) * 100);
    var correct = Object.keys(results).filter(function (k) { return results[k]; }).length;
    host.innerHTML =
      '<div class="deck-bar"><span>' + (mode === 'practice' ? '🎯 Wackler ' : '') + 'Frage&nbsp;<b>' + (idx + 1) + '</b>&nbsp;/&nbsp;' + list.length + '</span>' +
      '<div class="track"><div class="fill" style="width:' + pct + '%"></div></div>' +
      '<span class="known">' + correct + ' richtig</span></div>' +
      '<div class="card">' + metaHtml(q) +
      '<div class="frage">' + q.frage + '</div>' +
      '<div class="feynman">' + (q.typ === 'p'
        ? '🧑‍🏫 Erst SELBST rechnen (Papier), dann prüfen – Active Recall.'
        : '🧑‍🏫 Feynman: Erklär die Antwort zuerst laut in eigenen Worten (wie einem Azubi), dann aufdecken.') + '</div>' +
      '<div id="checkBox"></div>' +
      '<div class="actions" id="revealBtns"></div>' +
      '<div id="hintBox"></div><div id="solBox"></div><div id="rateBox"></div></div>';

    // WICHTIG: erst ALLE Buttons ins DOM, dann Handler setzen.
    // (innerHTML += nach dem Verdrahten wuerde die Listener wegwerfen - Bugfix 23.07.)
    var rb = document.getElementById('revealBtns');
    rb.innerHTML = '<button class="btn ghost" id="hintBtn">💡 Erläuterung</button>' +
      (q.ergebnis ? '<button class="btn no" id="giveBtn">✗ Aufgeben / Lösung</button>'
                  : '<button class="btn primary" id="solBtn">Musterlösung zeigen →</button>');
    document.getElementById('hintBtn').onclick = function () {
      var b = document.getElementById('hintBox');
      if (b.innerHTML) { b.innerHTML = ''; return; }
      b.innerHTML = '<div class="reveal hint"><h4>Erläuterung · Denkanstoß</h4>' + q.erklaerung + '</div>';
    };

    if (q.ergebnis) {
      var e = q.ergebnis;
      document.getElementById('checkBox').innerHTML =
        '<div class="rate" style="border-top:none;padding-top:0"><p>Dein Ergebnis eingeben' + (e.einheit ? ' (in ' + e.einheit + ')' : '') + ':</p>' +
        '<div class="actions"><input id="numIn" type="text" inputmode="decimal" style="font:inherit;padding:0.5rem 0.7rem;border:1px solid var(--grid);border-radius:6px;width:9rem" placeholder="z. B. 20">' +
        '<button class="btn primary" id="checkBtn">Prüfen</button></div><div class="fb" id="numFb"></div></div>';
      document.getElementById('checkBtn').onclick = function () { doCheck(q); };
      document.getElementById('numIn').addEventListener('keydown', function (ev) { if (ev.key === 'Enter') doCheck(q); });
      document.getElementById('giveBtn').onclick = function () { revealSolution(q, false, true); };
    } else {
      document.getElementById('solBtn').onclick = function () { revealSolution(q, null, false); };
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function doCheck(q) {
    var e = q.ergebnis, inp = document.getElementById('numIn').value.replace(',', '.').trim();
    var val = parseFloat(inp);
    var fb = document.getElementById('numFb');
    if (isNaN(val)) { fb.className = 'fb no'; fb.textContent = 'Bitte eine Zahl eingeben.'; return; }
    var tol = Math.max((e.tol || 0.03) * Math.abs(e.wert), 0.0001);
    var ok = Math.abs(val - e.wert) <= tol;
    fb.className = 'fb ' + (ok ? 'ok' : 'no');
    fb.innerHTML = ok ? '✓ Richtig! (' + e.wert + (e.einheit ? ' ' + e.einheit : '') + ')'
                      : '✗ Nicht ganz – Ziel ≈ ' + e.wert + (e.einheit ? ' ' + e.einheit : '') + (e.hinweis ? ' · ' + e.hinweis : '');
    revealSolution(q, ok, true);
  }

  // knew: true/false wenn schon entschieden (Rechen-Check/Aufgeben), null = manuell werten
  function revealSolution(q, knew, auto) {
    document.getElementById('solBox').innerHTML = '<div class="reveal"><h4>✓ Musterlösung &amp; Korrektur</h4>' + q.loesung + '</div>';
    document.getElementById('revealBtns').style.display = 'none';
    var cb = document.getElementById('checkBox'); if (cb && auto) { /* Eingabe stehen lassen */ }
    if (knew === null) {
      document.getElementById('rateBox').innerHTML =
        '<div class="rate"><p>Stimmte deine Antwort im Wesentlichen?</p><div class="actions">' +
        '<button class="btn ok" id="okBtn">✓ Richtig gewusst</button>' +
        '<button class="btn no" id="noBtn">✗ Falsch / nicht gewusst</button></div></div>';
      document.getElementById('okBtn').onclick = function () { rate(q, true); };
      document.getElementById('noBtn').onclick = function () { rate(q, false); };
    } else {
      document.getElementById('rateBox').innerHTML =
        '<div class="rate"><div class="actions"><button class="btn primary" id="nextBtn">Weiter →</button></div></div>';
      document.getElementById('nextBtn').onclick = function () { rate(q, knew); };
    }
  }

  function rate(q, ok) { results[q.n] = ok; idx++; render(); }

  function finish() {
    var total = list.length, known = Object.keys(results).filter(function (k) { return results[k]; }).length;
    var pct = Math.round((known / total) * 100), wrong = list.filter(function (q) { return !results[q.n]; });
    if (mode === 'run') saveRun(known, total);
    if (window.SYNC) SYNC.autoExport();   // Fortschritt still in Downloads sichern (Geräte-Sync)
    var amp = deckAmpel();
    var txt = amp.c === '🟢' ? 'prüfungsreif (2× ≥90%)' : amp.c === '🟡' ? 'dran – noch nicht grün' : 'Grundlagen wiederholen';
    host.innerHTML = '<div class="card result"><div class="score">' + known + '/' + total + '</div>' +
      '<div class="ampel">' + amp.c + ' ' + txt + ' &middot; ' + pct + '% &middot; Durchlauf Nr. ' + amp.n + '</div>' +
      (wrong.length ? '<p><b>Diese solltest du nochmal:</b></p><ul>' + wrong.map(function (q) { return '<li>' + strip(q.frage).slice(0, 95) + '…</li>'; }).join('') + '</ul>' : '<p>🎉 Alles richtig gewusst!</p>') +
      '<div class="actions" style="justify-content:center">' +
      (wrong.length ? '<button class="btn primary" id="practice">🎯 Nur die ' + wrong.length + ' Wackler</button>' : '') +
      '<button class="btn" id="again">🔁 Ganzes Set neu</button>' +
      '<a class="btn ghost" href="../index.html">← Zurück zum Hub</a></div>' +
      '<p class="muted" style="margin-top:1.2rem">Gespeichert. Melde mir „' + CFG.id.toUpperCase() + ' ' + known + '/' + total + '“ → ich pflege die Vault-Lernampel.</p></div>';
    var p = document.getElementById('practice'); if (p) p.onclick = function () { start('practice', wrong.slice()); };
    document.getElementById('again').onclick = function () { start('run', DATA.slice()); };
  }

  function start(m, set) { mode = m; list = set; idx = 0; results = {}; render(); }
  function strip(s) { var d = document.createElement('div'); d.innerHTML = s; return d.textContent || ''; }
  render();
})();
