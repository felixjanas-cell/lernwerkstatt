/* SA3-Trainer – Aufgabenbank v1 (2026-07-26)
   Stil kalibriert an: BDZ-Aufgabensammlung Meisterprüfung Teil I (2003) –
   Kundenauftrag-Szenario + Anlage + Auftrag. Fehler-Taxonomie aus dem Vault:
   SA3-Notiz, Fachregel 01/02, Flachdächer-IDH, HRB-Grundlagen, DIN 68800, EC5, BbgBO.
   Neue Aufgaben aus sa3-eingang/ werden hier ergänzt. */
window.SA3_TASKS = [
{
 id: "balkon",
 typ: "Fehlersuche",
 titel: "Vorstellbalkon aus Holz",
 kontext: "Kundenauftrag: An ein Wohnhaus in Berlin-Pankow soll ein selbsttragender Vorstellbalkon (Holz) angebaut werden. Ihr Geselle legt Ihnen das nebenstehende Ausführungsdetail zur Freigabe vor.",
 auftrag: "Prüfen Sie das Detail auf Übereinstimmung mit der Fachregel 02 (Balkone und Terrassen). Stellen Sie alle Fehler fest und machen Sie je Fehler einen regelkonformen Lösungsvorschlag.",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <rect x="10" y="30" width="70" height="360" fill="#dcdcdc" stroke="#222"/>
  <text x="18" y="55" transform="rotate(90 18 55)" fill="#555">Bestandswand (Mauerwerk)</text>
  <rect x="80" y="200" width="480" height="36" fill="#e8c896" stroke="#222"/>
  <text x="120" y="224" fill="#222">Hauptträger KVH 12/24, keilgezinkt, frei bewittert</text>
  <rect x="470" y="196" width="12" height="44" fill="none" stroke="#222" stroke-dasharray="4 3"/>
  <line x1="482" y1="200" x2="500" y2="168" stroke="#666"/>
  <text x="380" y="162" fill="#444">Stütze–Träger: Zapfen 4×8, offen</text>
  <rect x="452" y="236" width="36" height="128" fill="#e8c896" stroke="#222"/>
  <text x="497" y="300" fill="#222">Stütze KVH 12/12</text>
  <rect x="410" y="364" width="150" height="24" fill="#c9c9c9" stroke="#222"/>
  <text x="380" y="408" fill="#444">Betonpflaster = OK Gelände ·</text>
  <text x="380" y="424" fill="#444">Stützenfuß direkt aufgesetzt (0 mm)</text>
  <g>
   <rect x="90" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
   <rect x="159" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
   <rect x="228" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
   <rect x="297" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
   <rect x="366" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
   <rect x="435" y="180" width="66" height="14" fill="#d9b380" stroke="#222"/>
  </g>
  <line x1="200" y1="176" x2="260" y2="140" stroke="#666"/>
  <text x="262" y="136" fill="#444">Belagdielen Lärche, direkt auf Träger, Fuge 3 mm, Gefälle 0 %</text>
  <text x="90" y="260" fill="#444">Befestigungsmittel: Stahl verzinkt</text>
 </svg>`,
 punkte: [
  {p: "Zapfenverbindung frei bewittert – offene V-Fugen sammeln Wasser. Richtig: bewitterte Verbindungen ohne Zapfen/Versätze/Blätter ausführen → Stahl-Knagge/Balkenträger, wasserableitend.", reg: "Fachregel 02"},
  {p: "KVH keilgezinkt frei bewittert – Delaminationsrisiko der Keilzinkung. Richtig: keilgezinktes KVH/BSH nicht ungeschützt bewittert einsetzen; Vollholz/Lärche-Douglasie bzw. abgedeckte Konstruktion.", reg: "Fachregel 02"},
  {p: "Stützenfuß direkt auf Belag/Pflaster (0 mm) – Spritz-/Stauwasser am Hirnholz. Richtig: Stahl-Stützenfuß mit ≥ 150 mm Abstand über Belag (über Erdreich ≥ 300 mm), kapillarbrechend.", reg: "Fachregel 02 · DIN 68800-2"},
  {p: "Belag: Fuge 3 mm + Gefälle 0 % + Dielen direkt auf Träger – Wasser steht in den Fugen und auf dem Träger. Richtig: Fugen ≥ 6 mm (bei Nadelholz ≥ 8 mm), Gefälle ~2 % in Längsrichtung, Abstandhalter/Trennstreifen zwischen Diele und UK.", reg: "Fachregel 02"},
  {p: "Befestigung 'Stahl verzinkt' bewittert – Korrosion + Gerbsäure bei Lärche. Richtig: nichtrostender Stahl A2, bei gerbstoffreichen Hölzern (Lärche/Douglasie/Eiche) A4.", reg: "Fachregel 02 · DIN EN 14592"}
 ],
 merksatz: "Bewitterte Holzkonstruktion = konstruktiver Holzschutz zuerst: Wasser fernhalten, ableiten, Trocknung ermöglichen – und keine zimmermannsmäßigen Verbindungen in der Bewitterung."
},
{
 id: "flachdach",
 typ: "Fehlersuche",
 titel: "Dachterrasse über Wohnraum",
 kontext: "Kundenauftrag: Auf einem Anbau (Holzbalkendecke) soll eine Dachterrasse mit Türausgang entstehen. Der Planer schickt Ihnen den nebenstehenden Aufbau zur Stellungnahme – inklusive Bauablauf-Vermerk.",
 auftrag: "Nehmen Sie fachlich Stellung: Welche Punkte widersprechen den Fachregeln für Flachdächer in Holzbauweise bzw. der DIN 18531? Formulieren Sie Ihre Bedenken wie gegenüber dem Planer (mit Begründung und Alternative).",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <rect x="40" y="120" width="60" height="180" fill="#dcdcdc" stroke="#222"/>
  <text x="34" y="112" fill="#444">Attika, ohne Notüberlauf</text>
  <rect x="100" y="238" width="420" height="10" fill="#444"/>
  <line x1="300" y1="238" x2="330" y2="200" stroke="#666"/>
  <text x="332" y="196" fill="#444">Abdichtung, Gefälle 0 %</text>
  <g>
   <rect x="110" y="216" width="80" height="16" fill="#d9d9d9" stroke="#222"/>
   <rect x="200" y="216" width="80" height="16" fill="#d9d9d9" stroke="#222"/>
   <rect x="290" y="216" width="80" height="16" fill="#d9d9d9" stroke="#222"/>
   <rect x="380" y="216" width="80" height="16" fill="#d9d9d9" stroke="#222"/>
  </g>
  <text x="112" y="208" fill="#444">Plattenbelag auf Stelzlagern</text>
  <rect x="100" y="248" width="420" height="60" fill="#f2e2a8" stroke="#222"/>
  <text x="120" y="284" fill="#222">Gefachdämmung voll, unbelüftet · PE-Folie raumseitig (Typ III)</text>
  <rect x="100" y="308" width="420" height="26" fill="#e8c896" stroke="#222"/>
  <text x="120" y="326" fill="#222">Holzbalkendecke 10/24</text>
  <rect x="520" y="120" width="34" height="188" fill="#cfd8e6" stroke="#222"/>
  <text x="560" y="140" fill="#444">Terrassentür</text>
  <line x1="537" y1="232" x2="537" y2="216" stroke="#b00" stroke-width="2"/>
  <text x="560" y="226" fill="#b00">OK Belag → UK Türprofil: 50 mm, ohne Rinne</text>
  <rect x="70" y="356" width="580" height="52" fill="#fdf6dd" stroke="#c9b25e"/>
  <text x="82" y="378" fill="#555">Bauablauf-Vermerk: „Abdichtung erfolgt nach Innenausbau.</text>
  <text x="82" y="396" fill="#555">Bis dahin Baufolie (PE) als provisorischer Schutz, ca. 3 Wochen."</text>
 </svg>`,
 punkte: [
  {p: "Gefälle 0 % – stehendes Wasser. Richtig: planmäßiges Gefälle ≥ 2 %; darunter gilt das Dach als Sonderkonstruktion mit erhöhten Anforderungen (nicht anstreben).", reg: "DIN 18531 · IDH Flachdächer 2019"},
  {p: "Anschlusshöhe an der Tür nur 50 mm ohne Zusatzmaßnahme. Richtig: ≥ 150 mm über OK Belag; Reduzierung nur mit Entwässerungsrinne + spritzwassergeschützter Ausführung (barrierefreie Sonderlösung).", reg: "DIN 18531-5 · Fachregel"},
  {p: "Aufbau = Flachdach-Typ III (voll gedämmt, unbelüftet, beidseitig dampfdicht) – feuchtetechnische Sonderkonstruktion, rechnerisch kaum nachweisbar, hohes Schadensrisiko. Richtig: Typ I (Aufdachdämmung, Balkenlage warm) oder feuchtevariable Dampfbremse + Trocknungsreserve mit Nachweis n. DIN EN 15026.", reg: "IDH Flachdächer 2019"},
  {p: "Keine Notentwässerung – bei verstopftem Ablauf Überflutung/Überlastung. Richtig: Notüberläufe mit freiem Auslauf über die Fassade, hydraulisch bemessen.", reg: "DIN 1986-100 · DIN 18531"},
  {p: "PE-Folie 3 Wochen als Provisorium – nicht regensicher, mechanisch ungeeignet. Richtig: Behelfsabdichtung (z. B. verschweißte Bahn); Witterungsschutz der Bauphase ist eine Besondere Leistung nach VOB/C → anbieten und vergüten lassen.", reg: "IDH Feuchtemanagement 2024 · ATV DIN 18334"}
 ],
 merksatz: "Flachdach in Holz: Gefälle ≥ 2 %, Anschlüsse 15 cm, Notentwässerung über die Fassade, Typ III meiden – und die Bauphase gehört zum Feuchteschutzkonzept."
},
{
 id: "fassade",
 typ: "Fehlersuche",
 titel: "Hinterlüftete Holzfassade – Sockeldetail",
 kontext: "Kundenauftrag: Ein Wohnhaus erhält eine hinterlüftete Bekleidung aus horizontaler Nut-und-Feder-Schalung (Fichte). Die Zeichnung zeigt den Sockelpunkt aus der Werkplanung.",
 auftrag: "Prüfen Sie das Sockeldetail nach Fachregel 01 (Außenwandbekleidungen aus Holz). Stellen Sie die Fehler fest und beschreiben Sie die regelkonforme Ausführung.",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <rect x="240" y="20" width="120" height="300" fill="#f0e6cf" stroke="#222"/>
  <text x="252" y="46" fill="#555">Wand (HRB)</text>
  <rect x="360" y="20" width="10" height="300" fill="#fff" stroke="#222"/>
  <line x1="365" y1="150" x2="430" y2="120" stroke="#666"/>
  <text x="432" y="116" fill="#b00">Hinterlüftungsspalt: 8 mm</text>
  <g>
   <rect x="370" y="30" width="26" height="40" fill="#e8c896" stroke="#222"/>
   <rect x="370" y="74" width="26" height="40" fill="#e8c896" stroke="#222"/>
   <rect x="370" y="118" width="26" height="40" fill="#e8c896" stroke="#222"/>
   <rect x="370" y="162" width="26" height="40" fill="#e8c896" stroke="#222"/>
   <rect x="370" y="206" width="26" height="40" fill="#e8c896" stroke="#222"/>
   <rect x="370" y="250" width="26" height="40" fill="#e8c896" stroke="#222"/>
  </g>
  <path d="M 396 74 L 404 66 L 404 82 Z" fill="#b00"/>
  <text x="410" y="76" fill="#b00">Nut-Feder horizontal, Feder nach unten</text>
  <text x="404" y="270" fill="#444">Schalung Fichte 19,5 mm · Befestigung: Nägel blank</text>
  <line x1="370" y1="292" x2="370" y2="320" stroke="#222"/>
  <text x="404" y="304" fill="#b00">unterer Abschluss offen, ohne Gitter</text>
  <rect x="120" y="320" width="480" height="20" fill="#b7a27d" stroke="#222"/>
  <text x="126" y="360" fill="#444">Gelände / Beet</text>
  <line x1="383" y1="290" x2="383" y2="320" stroke="#b00" stroke-width="2"/>
  <text x="398" y="336" fill="#b00">UK Bekleidung → Gelände: 100 mm</text>
 </svg>`,
 punkte: [
  {p: "Hinterlüftungsspalt 8 mm – keine wirksame Durchlüftung/Entwässerung. Richtig: Hinterlüftung ≥ 20 mm, oben und unten offene Querschnitte (≥ 50 cm²/m Wand).", reg: "Fachregel 01"},
  {p: "Feder nach unten – Wasser läuft in die Nut. Richtig: bei horizontaler N+F-Schalung Feder nach oben, Wasserführung nach außen.", reg: "Fachregel 01"},
  {p: "Abstand Unterkante Bekleidung–Gelände 100 mm – Spritzwasserzone. Richtig: ≥ 300 mm; Reduzierung auf ≥ 150 mm nur über Kiesbett/entwässerter Fläche.", reg: "Fachregel 01 · DIN 68800-2"},
  {p: "Offene Zuluft ohne Schutz – Insekten/Nager in der Hinterlüftungsebene. Richtig: Lüftungsöffnungen mit Kleintierschutz (Gitter/Lochblech, Maschenweite ≤ 10 mm) sichern.", reg: "Fachregel 01"},
  {p: "Blanke Nägel – Korrosionsspuren/Abläufer auf der Fassade. Richtig: nichtrostender Stahl A2 (Sichtbereich), ausreichende Einschlagtiefe, nicht im Federbereich quetschen.", reg: "Fachregel 01"}
 ],
 merksatz: "Fassade lebt von der Hinterlüftung: 20 mm Luft, offene aber geschützte Querschnitte, Wasser immer nach außen führen – und Abstand zum Boden halten."
},
{
 id: "sparren",
 typ: "Fehlersuche",
 titel: "Werkplan-Detail: Sparren auf Fußpfette",
 kontext: "Situationsaufgabe: Im Abbundplan eines Pfettendachs (Sparren 8/22, e = 80 cm, DN 35°) finden Sie das nebenstehende Auflagerdetail samt Aussteifungsvermerk.",
 auftrag: "Stellen Sie die statisch-konstruktiven Fehler fest. Bewerten Sie je Fehler das Risiko und nennen Sie die fachgerechte Lösung.",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <polygon points="150,320 560,120 610,120 620,170 210,360 150,360" fill="#e8c896" stroke="#222"/>
  <text x="380" y="180" transform="rotate(-23 380 180)" fill="#222">Sparren 8/22</text>
  <polygon points="216,318 268,293 268,318" fill="#fff" stroke="#222"/>
  <line x1="242" y1="300" x2="300" y2="250" stroke="#666"/>
  <text x="302" y="246" fill="#b00">Kerve t = 9 cm</text>
  <polygon points="150,360 210,360 210,392 150,392" fill="#fff" stroke="#b00" stroke-dasharray="4 3"/>
  <text x="70" y="412" fill="#b00">Ausklinkung am Auflager, rechtwinklig, unverstärkt</text>
  <rect x="176" y="318" width="90" height="42" fill="#d9b380" stroke="#222"/>
  <text x="180" y="345" fill="#222">Fußpfette 12/12</text>
  <rect x="140" y="360" width="160" height="30" fill="#dcdcdc" stroke="#222"/>
  <text x="306" y="382" fill="#555">Deckenauflager</text>
  <line x1="540" y1="150" x2="300" y2="330" stroke="#888" stroke-width="3" stroke-dasharray="9 6"/>
  <text x="392" y="300" fill="#b00">Windrispenband: nur am First</text>
  <text x="392" y="318" fill="#b00">genagelt, durchhängend</text>
  <text x="310" y="404" fill="#444">Sparren–Pfette: 1 Sparrennagel · Windsog: „entfällt"</text>
 </svg>`,
 punkte: [
  {p: "Kerve 9 cm bei h = 22 cm – Querschnitt um > 40 % geschwächt. Richtig: Kerventiefe ≤ h/4 (hier ≤ 5,5 cm); Restquerschnitt für den Biege-/Schubnachweis ansetzen.", reg: "EC5 · Zimmererregel"},
  {p: "Rechtwinklige, unverstärkte Ausklinkung am Auflager – Querzugrisse ab der einspringenden Ecke. Richtig: Ausklinkung ausrunden/abschrägen und Nachweis führen; bei Bedarf Vollgewindeschrauben als Querzugverstärkung.", reg: "EC5 6.5.2"},
  {p: "Windrispenband lose und nur am First befestigt – Scheibenwirkung = null. Richtig: diagonal über die gesamte Dachfläche, vorgespannt, an jedem Sparren vernagelt, Enden kraftschlüssig verankert (Ringbalken/Traufe).", reg: "EC5 · DIN 4103/Aussteifung"},
  {p: "Abhebesicherung „entfällt“ mit einem Sparrennagel – Windsog reißt die Traufe hoch. Richtig: Windsognachweis n. EC1 führen; Verankerung je Sparren mit Sturmwinkel/Bandstahl bemessen.", reg: "EC1/EC5"}
 ],
 merksatz: "Am Auflager entscheidet sich das Dach: Kerve ≤ h/4, keine unverstärkten Ausklinkungen, Rispenband gespannt und verankert, Windsog immer nachweisen."
},
{
 id: "holzliste",
 typ: "Fehlersuche",
 titel: "Holz- & Materialliste Carport",
 kontext: "Kundenauftrag: Für einen frei bewitterten Doppelcarport (GK 3.1) legt Ihnen der Auszubildende folgende Bestell-Liste vor.",
 auftrag: "Prüfen Sie die Liste auf Material- und Ausführungsfehler, bevor bestellt wird. Begründen Sie jede Beanstandung mit dem passenden Regelwerk.",
 html: `<table class="sa3tab"><thead><tr><th>Pos.</th><th>Bauteil</th><th>Material / Angabe</th></tr></thead><tbody>
 <tr><td>1</td><td>Stützen (frei stehend, h = 2,75 m)</td><td>KVH Fichte C24, <b>6/6 cm</b>, Fußpunkt: Erdverbau in Beton</td></tr>
 <tr><td>2</td><td>Kopfbänder</td><td>KVH Fichte, <b>keilgezinkt</b></td></tr>
 <tr><td>3</td><td>Pfetten/Träger</td><td>BSH GL24h 12/24</td></tr>
 <tr><td>4</td><td>Verbindungsmittel</td><td>Nägel + Schrauben, <b>galv. verzinkt</b></td></tr>
 <tr><td>5</td><td>Lieferzustand</td><td>Holzfeuchte <b>u ≈ 25 %</b>, Einbau sofort</td></tr>
 </tbody></table>`,
 punkte: [
  {p: "Stütze 6/6 bei h = 2,75 m: Schlankheit λ ≈ 160 > 150 – knickgefährdet und unzulässig unwirtschaftlich. Richtig: Querschnitt vergrößern (z. B. 12/12) und Knicknachweis nach EC5 führen.", reg: "EC5 6.3 (Knicken)"},
  {p: "Fußpunkt einbetoniert = Erdkontakt → GK 4, Fichte dort nicht dauerhaft. Richtig: aufgeständerter Stahl-Stützenfuß ≥ 150 mm über Belag / ≥ 300 mm über Erdreich, kapillarbrechend.", reg: "DIN 68800-2 · Fachregel 02"},
  {p: "Keilgezinktes KVH frei bewittert (Kopfbänder) – unzulässig wegen Delaminationsrisiko. Richtig: Vollholz ohne Keilzinkung oder geschützte Lage.", reg: "Fachregel 02 · Verwendbarkeitsregeln KVH"},
  {p: "Galvanisch verzinkte Verbindungsmittel bewittert – Korrosion. Richtig: nichtrostender Stahl A2 (bei Lärche/Douglasie A4).", reg: "DIN EN 14592 · Fachregel"},
  {p: "Einbaufeuchte 25 % – Schwindrisse, Pilzrisiko, Maßabweichungen. Richtig: Einbau mit u ≤ 18 % (ATV DIN 18334 für KVH), technisch getrocknet, Messung protokollieren.", reg: "ATV DIN 18334 · DIN 68800-2"}
 ],
 merksatz: "Bestell-Listen sind die letzte Chance vor dem Fehler auf der Baustelle: Querschnitt, Dauerhaftigkeit, Korrosionsschutz, Holzfeuchte – alle vier prüfen."
},
{
 id: "baustelle",
 typ: "Analyse",
 titel: "Gefährdungs-Analyse: Dachstuhl-Montage",
 kontext: "Sie kommen morgens auf Ihre Baustelle (Aufstockung, Traufhöhe 6,5 m) und sehen die dargestellte Situation. Der Kran hebt gerade das nächste Sparrenpaket.",
 auftrag: "Erörtern Sie die Situation: Welche Gefährdungen erkennen Sie, welche Sofortmaßnahmen ordnen Sie an, und was muss organisatorisch nachgezogen werden (Gefährdungsbeurteilung)?",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <rect x="120" y="200" width="300" height="180" fill="#efe7d5" stroke="#222"/>
  <polygon points="100,200 270,90 440,200" fill="none" stroke="#222" stroke-width="2"/>
  <circle cx="352" cy="142" r="9" fill="none" stroke="#222" stroke-width="2"/>
  <line x1="352" y1="151" x2="352" y2="176" stroke="#222" stroke-width="2"/>
  <line x1="352" y1="158" x2="338" y2="170" stroke="#222" stroke-width="2"/>
  <line x1="352" y1="158" x2="366" y2="170" stroke="#222" stroke-width="2"/>
  <line x1="352" y1="176" x2="342" y2="194" stroke="#222" stroke-width="2"/>
  <line x1="352" y1="176" x2="362" y2="194" stroke="#222" stroke-width="2"/>
  <text x="452" y="130" fill="#b00">Kollege arbeitet an der Dachkante,</text>
  <text x="452" y="148" fill="#b00">kein Seitenschutz, keine PSAgA</text>
  <line x1="452" y1="140" x2="372" y2="146" stroke="#888"/>
  <line x1="90" y1="380" x2="180" y2="205" stroke="#8a6d3b" stroke-width="5"/>
  <line x1="104" y1="380" x2="194" y2="205" stroke="#8a6d3b" stroke-width="5"/>
  <circle cx="152" cy="268" r="8" fill="none" stroke="#222" stroke-width="2"/>
  <line x1="152" y1="276" x2="150" y2="300" stroke="#222" stroke-width="2"/>
  <text x="20" y="404" fill="#b00">Montagearbeiten von der Anlegeleiter (Standhöhe ~4 m)</text>
  <rect x="392" y="182" width="52" height="16" fill="#c9a063" stroke="#222"/>
  <rect x="396" y="166" width="52" height="16" fill="#c9a063" stroke="#222"/>
  <text x="452" y="186" fill="#b00">Materialstapel ungesichert an der Traufkante</text>
  <line x1="640" y1="20" x2="640" y2="230" stroke="#222" stroke-width="2"/>
  <polygon points="620,230 660,230 654,260 626,260" fill="#c9a063" stroke="#222"/>
  <circle cx="628" cy="330" r="8" fill="none" stroke="#222" stroke-width="2"/><line x1="628" y1="338" x2="628" y2="360" stroke="#222" stroke-width="2"/>
  <circle cx="658" cy="330" r="8" fill="none" stroke="#222" stroke-width="2"/><line x1="658" y1="338" x2="658" y2="360" stroke="#222" stroke-width="2"/>
  <text x="470" y="392" fill="#b00">Last über zwei Kollegen, kein Sperrbereich</text>
  <line x1="0" y1="380" x2="720" y2="380" stroke="#222"/>
 </svg>`,
 punkte: [
  {p: "Absturzgefahr an der Dachkante (6,5 m) ohne Sicherung. Sofort: Arbeiten stoppen; Seitenschutz/Dachfanggerüst stellen – technische Maßnahmen VOR persönlicher Sicherung (PSAgA nur als Rückfallebene, T-O-P-Prinzip).", reg: "DGUV Vorschrift 38 · ArbSchG"},
  {p: "Montagearbeiten von der Anlegeleiter in 4 m Standhöhe – Leiter ist Verkehrsweg, kein Arbeitsplatz für solche Arbeiten. Richtig: Gerüst/Hubarbeitsbühne; Leiterarbeiten nur kurzzeitig und mit geringem Kraftaufwand.", reg: "TRBS 2121-2"},
  {p: "Kranlast schwenkt über Personen, kein Sperrbereich. Sofort: Schwenkbereich absperren, Einweiser mit Sichtkontakt/Funk, niemals unter schwebende Lasten.", reg: "DGUV Vorschrift 52"},
  {p: "Ungesichertes Material an der Absturzkante – herabfallende Teile. Richtig: Lagerflächen weg von Kanten, Bordbretter, ggf. Schutzdach/Absperrung des Gefahrenbereichs darunter.", reg: "DGUV 38"},
  {p: "Organisatorisch: Gefährdungsbeurteilung für die Montagephase erstellen/aktualisieren, Unterweisung dokumentieren, Montageanweisung mit Sicherungskonzept auf die Baustelle.", reg: "ArbSchG §§ 5/6 · BaustellV"}
 ],
 merksatz: "T-O-P: erst Technisch (Gerüst/Seitenschutz), dann Organisatorisch (Absperrung, Unterweisung), zuletzt Persönlich (PSAgA). Und der Meister haftet für die Organisation."
},
{
 id: "bad-hrb",
 typ: "Analyse",
 titel: "Bad im Holzrahmenbau",
 kontext: "Kundenauftrag: In einem Neubau in Holzrahmenbauweise wird das Duschbad geplant. Die Werkplanung sieht den dargestellten Wand-/Bodenaufbau vor.",
 auftrag: "Analysieren Sie den Aufbau: Welche Punkte müssen Sie ändern, damit das Bad dauerhaft schadenfrei bleibt? Ordnen Sie die Flächen den Wassereinwirkungsklassen zu und begründen Sie Ihre Änderungen.",
 svg: `<svg viewBox="0 0 720 430" xmlns="http://www.w3.org/2000/svg" font-family="Segoe UI, sans-serif" font-size="12.5">
  <rect x="0" y="0" width="720" height="430" fill="#fff"/>
  <rect x="60" y="40" width="26" height="300" fill="#f0e6cf" stroke="#222"/>
  <rect x="86" y="40" width="14" height="300" fill="#e0cfa8" stroke="#222"/>
  <text x="110" y="66" fill="#444">Wand: HRB-Ständer + OSB/3 15 mm</text>
  <rect x="100" y="40" width="10" height="300" fill="#c8dbe8" stroke="#222"/>
  <text x="120" y="90" fill="#b00">Fliesen direkt auf OSB geklebt, keine Abdichtung</text>
  <path d="M 150 120 q 20 0 20 18" fill="none" stroke="#222" stroke-width="3"/>
  <circle cx="172" cy="142" r="5" fill="#222"/>
  <text x="184" y="146" fill="#555">Dusche (bodengleich)</text>
  <rect x="60" y="340" width="560" height="30" fill="#e8c896" stroke="#222"/>
  <text x="330" y="360" fill="#222">Holzbalkendecke + OSB-Verlegeplatte</text>
  <rect x="60" y="330" width="560" height="10" fill="#c8dbe8" stroke="#222"/>
  <text x="240" y="312" fill="#b00">Bodenfliesen direkt, keine Verbundabdichtung (AIV)</text>
  <circle cx="200" cy="336" r="9" fill="#fff" stroke="#222"/>
  <text x="216" y="322" fill="#b00">Ablauf ohne Dichtmanschette</text>
  <rect x="380" y="80" width="300" height="66" fill="#fdf6dd" stroke="#c9b25e"/>
  <text x="392" y="104" fill="#555">Planungsvermerk: „Wandständer im Duschbereich</text>
  <text x="392" y="122" fill="#555">vorsorglich chemisch geschützt (Ib-Salz),</text>
  <text x="392" y="140" fill="#555">Abdichtung entfällt wegen Fliesenbelag."</text>
 </svg>`,
 punkte: [
  {p: "Keine Verbundabdichtung im Spritzwasserbereich – Fliesen + Fugen sind NICHT wasserdicht. Richtig: Duschbereich = W2-I → Verbundabdichtung (AIV) auf Wand + Boden, Dichtbänder in Ecken, Manschetten an Durchdringungen.", reg: "DIN 18534"},
  {p: "Fliesen direkt auf OSB – Verformung + Haftungsprobleme. Richtig: geeigneter Untergrund (zementäre Bauplatte oder Entkopplung) + Abdichtung, Herstellerfreigabe beachten.", reg: "DIN 18534 · Fachinfo Fliese/Holz"},
  {p: "Chemischer Holzschutz statt Abdichtung – falsches Werkzeug: Im Innenraum gilt GK 0 durch konstruktive Maßnahmen; chemischer Schutz ersetzt keine Abdichtung und ist in Aufenthaltsräumen zu vermeiden.", reg: "DIN 68800-1/-2"},
  {p: "Bodenablauf ohne Dichtmanschette/Anschluss an die AIV – klassische Leckstelle. Richtig: Ablauf mit Flansch + Manschette in die Verbundabdichtung einbinden; bodengleiche Dusche mit geprüftem Systemaufbau.", reg: "DIN 18534"}
 ],
 merksatz: "Im Holzbau-Bad gilt: GK 0 konstruktiv sichern heißt Wasser GAR NICHT erst ans Holz lassen – Verbundabdichtung ist Pflicht, Chemie ist keine Abdichtung."
},
{
 id: "gaube",
 typ: "Analyse",
 titel: "Schleppgaube im Bestand – Werkplan & Genehmigung",
 kontext: "Kundenauftrag: Bestands-EFH (GK 1) in Brandenburg. Für den Dachausbau ist eine Schleppgaube geplant. Aus der Werkplanung liegen Ihnen folgende Vermerke vor.",
 auftrag: "Nehmen Sie Stellung: Was ist baurechtlich und konstruktiv zu korrigieren? Welche Chance bietet § 65 BbgBO gerade Ihnen als Zimmerermeister?",
 html: `<table class="sa3tab"><thead><tr><th>#</th><th>Werkplan-Vermerk</th></tr></thead><tbody>
 <tr><td>1</td><td>„Gaube ist <b>verfahrensfrei nach § 61 BbgBO</b> – es werden keine Bauvorlagen erstellt."</td></tr>
 <tr><td>2</td><td>„Kehlbalken im Gaubenbereich wird <b>entfernt</b>; Sparren bleiben unverändert. <b>Statischer Nachweis: nicht erforderlich</b> (Bestand)."</td></tr>
 <tr><td>3</td><td>„Gaubenfenster-Anschluss: Deckung mit <b>Kompriband, einlagig</b> an den Blendrahmen."</td></tr>
 <tr><td>4</td><td>„Seitliche Gaubenwange: Anschluss der Deckung <b>50 mm</b> hoch geführt."</td></tr>
 </tbody></table>`,
 punkte: [
  {p: "„Verfahrensfrei“ ist falsch: Eine Gaube ändert Dachkonstruktion UND äußere Gestalt → genehmigungspflichtig (vereinfachtes Verfahren § 64 BbgBO). Verfahrensfrei nach § 61 sind nur untergeordnete Maßnahmen (z. B. Dachdeckung/Dämmung).", reg: "BbgBO §§ 61/64"},
  {p: "Chance § 65 BbgBO: Für Änderungen der Dachkonstruktion und Gauben an Gebäuden GK 1–2 ist der Zimmerermeister bauvorlageberechtigt (Buchst. e) → Sie können die Bauvorlagen selbst einreichen – Kerngeschäft und Zusatzleistung!", reg: "BbgBO § 65"},
  {p: "Kehlbalken entfernen ohne Nachweis – das Tragsystem ändert sich (Sparren verlieren die Zwischenstützung). Richtig: statischer Nachweis für den geänderten Zustand, Wechsel-/Auswechslungskonstruktion bemessen.", reg: "EC5 · BbgBO § 12"},
  {p: "Fensteranschluss nur mit Kompriband einlagig – keine Sicherheit gegen Treibregen. Richtig: zweite wasserführende Ebene am Gaubenfenster (Anschlussfolie/Blech unter der Deckung).", reg: "Fachregeln des Dachdeckerhandwerks/ZVDH"},
  {p: "Seitlicher Anschluss 50 mm – zu niedrig. Richtig: wasserführende Anschlüsse an aufgehende Bauteile ≥ 150 mm über Deckung hochführen.", reg: "ZVDH-Regelwerk"}
 ],
 merksatz: "Gaube = Statik + Baurecht + Wasserführung. Und § 65 BbgBO macht dich dabei zum Bauvorlagenberechtigten – das ist ein Verkaufsargument."
}
];
