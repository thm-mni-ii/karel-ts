# Karel the Robot

http://mormegil.wz.cz/prog/karel/prog_doc.htm

## Levels

### Level 01 - Der Anfang

Bewegen Sie Karel an die Position `(3, 1)`.
Außerdem soll der Beeper auf Position `(2, 1)` abgelegt werden.

#### Karel Features
- `karel.move();`
- `karel.turnLeft();`
- `karel.pickBeeper();`
- `karel.putBeeper();`

#### Lerninhalte
- Aufsetzen einer Webseite in Webstorm mit HTML und TypeScript
- Imperatives Programmieren mit Karel
- `DOMContentLoaded`-Event

---

### Level 02 - Die Plünderung

Bewegen Sie Karel an die Position `(8, 2)`.
Sammeln Sie währenddessen alle Beeper auf.

#### Lerninhalte
- Fehlermeldungen in der Entwicklerkonsole
- Debugging per Breakpoints

---

### Level 03 - Für alle Situationen gewappnet

Bewegen Sie Karel an die Position `(5, 1)`.
Sammeln Sie währenddessen alle Beeper auf.
Achten Sie darauf, dass der Versuch einen Beeper aufzuheben in einem Fehler resultiert, sollte sich kein Beeper auf Karels Position befinden.
Nutzen Sie eine if-Verzweigung mit `karel.isOnBeeper()` um dies zu verhindern.

#### Levelvarianten

Auf den jeweiligen Positionen `(2, 1)` und `(3, 1)` werden sich mit einer Wahrscheinlichkeit von 50% Beeper befinden.
Nutzen Sie die Levelvariante `karel.loadLevel03("fixed");`, um in jedem Fall auf beiden Feldern einen Beeper zu haben.

**Wichtig: Ihre Lösung muss mit allen Varianten (also mit "fixed" und ohne) funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Neue Karel Features
- `karel.isOnBeeper()`

#### Lerninhalte
- Auswahl per `if (...) { ... }`

---

### Level 04 - Die Illusion einer Wahl

Bewegen Sie Karel an die Position `(4, 1)`.
Auf den jeweiligen Positionen `(2, 0)` und `(2, 2)` werden sich mit einer Wahrscheinlichkeit von 50% Wände befinden.
Nutzen Sie eine zweiarmige Auswahl `if (...) { ... } else { ... }` zusammen mit `karel.isWallInfront()` um Karel entweder den oberen oder den unteren Weg gehen zu lassen.

#### Levelvarianten

Nutzen Sie die Levelvariante `karel.loadLevel04("fixed-a");` oder `karel.loadLevel04("fixed-b");`, um die Wand entweder oben oder unten zu haben.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**


#### Neue Karel Features
- `karel.isWallInfront()`

#### Lerninhalte
- Zweiarmige Auswahl mit `if(...) { ... } else { ... }`.

---

### Level 05 - Der Kollektor

Bewegen Sie Karel auf die letze Kachel.
Heben Sie auf dem Weg alle Beeper auf.
Achtung: Die Anzahl an Beepern ist zufällig zwischen 2 und 6.
Allerdings werden sich die Beeper immer in einer Kette befinden, welche ab Position `(2, 0)` beginnt.
Dann folgen zwei leere Felder.

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel05("fixed");` damit das Level immer genau 4 Beeper hat.
- Nutzen Sie die Levelvariante `karel.loadLevel05("fixed-extreme");` damit das Level immer genau 20 Beeper hat.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Lerninhalte
- Schleifen mit `while(...) { ... }`

---

### Level 06 - Der Pinsel

Bewegen Sie Karel auf die letze Kachel.
Legen Sie ab Position `(2, 0)` alle Bepper ab, sodass eine Kette an Beepern entsteht.
Die Anzahl an Beepern zu Beginn ist zufällig zwischen 1 und 4.
Nutzen Sie `karel.getBeeperCount()` um abzufragen, wieviele Beeper sich in der Beeper-Bag befinden.

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel06("fixed");` damit Karel zu Beginn immer 4 Beeper hat.
- Nutzen Sie die Levelvariante `karel.loadLevel06("fixed-extreme");` damit Karel zu Beginn immer 20 Beeper hat.
- Nutzen Sie die Levelvariante `karel.loadLevel06("extreme");` damit Karel zu Beginn zufällig zwischen 5 und 20 Beepern hat.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Neue Karel Features
- `karel.getBeeperCount()`

#### Lerninhalte
- Bool'sche Vergleiche mit `>`
- Umkehrung von bool'schen Werten mit `!`

---

### Level 07 - Karel der Staubsaugerroboter

Heben Sie alle Beeper auf.
Die Welt hat eine zufällige Breite zwischen 1 und 6 und eine zufällige Höhe zwischen 1 und 5.

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel07("fixed");` damit die Welt eine feste Breite von 6 Feldern und eine feste Höhe von 5 Feldern hat.
- Nutzen Sie die Levelvariante `karel.loadLevel07("fixed-extreme");` damit die Welt eine feste Breite von 20 und eine feste Höhe von 20 hat.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Lerninhalte
- Endlosschleifen mit `while(true) { ... }`
- Herausspringen aus einer Schleife per `break;`