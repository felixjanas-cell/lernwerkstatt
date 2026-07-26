/* Lernwerkstatt – Fortschritts-Sync (geräteübergreifend, Takt = Session-Routine)
   Bausteine:
   1) progress-sync.js (window.SYNC_STATE) = von der PC-Session-Routine gemergter Gesamtstand.
      Wird hier beim Laden in den lokalen localStorage GEMERGT (nie überschrieben).
   2) SYNC.autoExport() – wird von deck.js/exam.js nach jeder abgeschlossenen Runde gerufen:
      lädt den lokalen Stand still als "lernfortschritt-auto.json" in den Downloads-Ordner
      (PC: C:\Users\...\Downloads · iPhone-Safari: iCloud Drive/Downloads).
      Die Session-Routine sammelt diese Dateien ein und merged sie zurück.
   Merge-Regeln (identisch in assets/sync_lernfortschritt.py!):
   - runs je Deck: Vereinigung, Duplikate über date|known|total, sortiert nach Datum
   - q-Flags je Deck: der Stand mit dem NEUEREN letzten Run gewinnt komplett (Gleichstand: lokal)
   - sessions: Vereinigung über date|mode|known|total */
(function () {
  var STORE = 'lernwerkstatt.v1';
  function load() { try { return JSON.parse(localStorage.getItem(STORE)) || { decks: {} }; } catch (e) { return { decks: {} }; } }
  function save(db) { try { localStorage.setItem(STORE, JSON.stringify(db)); } catch (e) {} }
  function lastDate(d) { return (d && d.runs && d.runs.length) ? d.runs[d.runs.length - 1].date : ''; }
  function runKey(r) { return r.date + '|' + r.known + '|' + r.total; }
  function sessKey(s) { return s.date + '|' + s.mode + '|' + s.known + '|' + s.total; }

  function mergeInto(db, remote) {
    var changed = false;
    if (!remote || typeof remote !== 'object') return false;
    db.decks = db.decks || {};
    var rdecks = remote.decks || {};
    Object.keys(rdecks).forEach(function (id) {
      var r = rdecks[id] || {};
      if (!db.decks[id]) { db.decks[id] = { title: r.title || id, runs: [], q: {} }; changed = true; }
      var l = db.decks[id];
      var lLast = lastDate(l), rLast = lastDate(r);   // VOR der Run-Vereinigung merken
      // Runs vereinigen
      l.runs = l.runs || [];
      var seen = {};
      l.runs.forEach(function (x) { seen[runKey(x)] = 1; });
      (r.runs || []).forEach(function (x) {
        if (!seen[runKey(x)]) { l.runs.push(x); seen[runKey(x)] = 1; changed = true; }
      });
      l.runs.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
      // q-Flags: neuerer letzter Run gewinnt
      if (r.q && rLast > lLast) { l.q = r.q; changed = true; }
      if (!l.title && r.title) l.title = r.title;
    });
    // Simulator-/Wiederhol-Sessions vereinigen
    db.sessions = db.sessions || [];
    var sSeen = {};
    db.sessions.forEach(function (s) { sSeen[sessKey(s)] = 1; });
    (remote.sessions || []).forEach(function (s) {
      if (!sSeen[sessKey(s)]) { db.sessions.push(s); sSeen[sessKey(s)] = 1; changed = true; }
    });
    db.sessions.sort(function (a, b) { return a.date < b.date ? -1 : a.date > b.date ? 1 : 0; });
    return changed;
  }

  function strHash(s) { var x = 0; for (var i = 0; i < s.length; i++) { x = (x * 31 + s.charCodeAt(i)) | 0; } return String(x); }

  function autoExport() {
    try {
      var data = localStorage.getItem(STORE) || '{}';
      var h = data.length + ':' + strHash(data);
      if (localStorage.getItem('lw.lastExport') === h) return;   // nichts Neues
      var blob = new Blob([data], { type: 'application/json' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'lernfortschritt-auto.json';
      document.body.appendChild(a); a.click(); a.remove();
      localStorage.setItem('lw.lastExport', h);
    } catch (e) {}
  }

  // Besitzer-Erkennung: file:// und localhost = immer Felix' Geräte.
  // Auf der öffentlichen Website schaltet der einmalige Link "...index.html?ich=felix"
  // das Sync-Verhalten frei (Flag bleibt im Browser gespeichert).
  // Fremde Besucher: starten bei null, kein Merge, keine Auto-Downloads.
  function isOwner() {
    if (location.protocol === 'file:') return true;
    var h = location.hostname;
    if (h === 'localhost' || h === '127.0.0.1') return true;
    try {
      if (/[?&]ich(=|&|$)/.test(location.search)) localStorage.setItem('lw.owner', '1');
    } catch (e) {}
    try { return localStorage.getItem('lw.owner') === '1'; } catch (e) { return false; }
  }

  // Beim Laden: Sync-Stand einmergen (läuft VOR deck.js / exam.js / Hub-Render)
  var OWNER = isOwner();
  if (OWNER && window.SYNC_STATE) {
    var db = load();
    if (mergeInto(db, window.SYNC_STATE)) save(db);
  }
  window.SYNC = { autoExport: function () { if (OWNER) autoExport(); }, mergeInto: mergeInto };

  // --- Mobil-Fix für Obsidian-Deeplinks --------------------------------------
  // Der Desktop-Vault heißt "Zweites_Gehirn", der Handy-Vault "Handy_Gehirn".
  // Fest verdrahtete Links (obsidian://open?vault=Zweites_Gehirn&file=…) öffnen
  // deshalb auf dem iPhone Obsidian, aber nicht die Notiz. Auf Mobilgeräten
  // entfernen wir daher den vault-Parameter → Obsidian öffnet die Notiz im
  // gerade aktiven Vault (= Handy_Gehirn). Das %20/%C3%9C-Encoding im file-Teil
  // bleibt unangetastet. Auf Desktop passiert nichts (early return).
  function fixObsidianLinks() {
    if (!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) return;
    var links = document.querySelectorAll('a[href^="obsidian://"]');
    for (var i = 0; i < links.length; i++) {
      var h = links[i].getAttribute('href');
      var n = h.replace(/([?&])vault=[^&]*(&|$)/, function (m, pre, post) {
        return post === '&' ? pre : '';
      });
      if (n !== h) links[i].setAttribute('href', n);
    }
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixObsidianLinks);
  } else {
    fixObsidianLinks();
  }
})();
