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

Nutzen Sie die Levelvariante `karel.loadLevel03("a");`, `karel.loadLevel03("b");` und `karel.loadLevel03("c");`, um die Position der Beeper zu variieren.

**Wichtig: Ihre Lösung muss mit allen Levelvarianten (also "a", "b" und "c") funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Neue Karel Features
- `karel.isOnBeeper()`

#### Lerninhalte
- Auswahl per `if (...) { ... }`

---

### Level 04 - Die Illusion einer Wahl

Bewegen Sie Karel an die Position `(4, 1)`.
In den unterschiedlichen Levelvarianten werden sich auf den Positionen `(2, 0)` und `(2, 2)` Wände befinden.
Nutzen Sie eine zweiarmige Auswahl `if (...) { ... } else { ... }` zusammen mit `karel.isWallInfront()` um Karel entweder den oberen oder den unteren Weg gehen zu lassen.

#### Levelvarianten

Nutzen Sie die Levelvariante `karel.loadLevel04("a");` und `karel.loadLevel04("b");`, um die Wand entweder im oberen oder im unteren Teil zu haben.

**Wichtig: Ihre Lösung muss mit allen Levelvarianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**


#### Neue Karel Features
- `karel.isWallInfront()`

#### Lerninhalte
- Zweiarmige Auswahl mit `if(...) { ... } else { ... }`.

---

### Level 05 - Der Kollektor

Bewegen Sie Karel auf die letze Kachel.
Heben Sie auf dem Weg alle Beeper auf.
Nutzen Sie dafür eine `while(...){ ... }`-Schleife
Achtung: Die Anzahl an Beepern ist in den Levelvarianten unterschiedlich.
Allerdings werden sich die Beeper immer in einer Kette befinden, welche ab Position `(2, 0)` beginnt.
Nach den Beepern folgen zwei leere Felder.

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel05("a");` damit das Level 4 Beeper beinhaltet.
- Nutzen Sie die Levelvariante `karel.loadLevel05("b");` damit das Level 20 Beeper beinhaltet.

**Wichtig: Ihre Lösung muss mit allen Levelvarianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen. Außerdem soll Ihre Lösung in der Lage sein, mit einer zufälligen Anzahl an Beepern zurecht zu kommen.**

#### Lerninhalte
- Schleifen mit `while(...) { ... }`

---

### Level 06 - Der Pinsel

Bewegen Sie Karel auf die letze Kachel.
Legen Sie ab Position `(2, 0)` alle Bepper ab, sodass eine Kette an Beepern entsteht.
Nutzen Sie `karel.getBeeperCount()` um abzufragen, wieviele Beeper sich in Karels Beeper-Bag befinden. 

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel06("a");` damit Karel zu Beginn 4 Beeper besitzt.
- Nutzen Sie die Levelvariante `karel.loadLevel06("b");` damit Karel zu Beginn 20 Beeper besitzt.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen.**

#### Neue Karel Features
- `karel.getBeeperCount()`

#### Lerninhalte
- Bool'sche Vergleiche
- Umkehrung von bool'schen Werten mit `!`

---

### Level 07 - Karel der Staubsaugerroboter

Heben Sie alle Beeper auf.

#### Levelvarianten

- Nutzen Sie die Levelvariante `karel.loadLevel07("a");` damit die Welt eine Breite von 6 Feldern und eine Höhe von 5 Feldern hat.
- Nutzen Sie die Levelvariante `karel.loadLevel07("b");` damit die Welt eine feste von 20 und eine Höhe von 20 hat.

**Wichtig: Ihre Lösung muss mit allen Varianten funktionieren, ohne dass Sie Änderungen an Ihrem Code vornehmen. Ihre Lösung muss beliebigen Höhen und Breiten funktionieren. Die Levelvarianten "a" und "b" dienen somit nur als Beispiele.**

#### Lerninhalte
- Endlosschleifen mit `while(true) { ... }`
- Herausspringen aus einer Schleife per `break;`
