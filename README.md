# Polaris – Teleskop-Kalibrierung

Eine mobile, lokal lauffähige Benutzeroberfläche für die Kalibrierung eines
Push-To-Teleskops. Die Anwendung ist bewusst ohne Framework umgesetzt und kann
dadurch später direkt von einem ESP ausgeliefert werden.

## Lokal starten

```bash
python3 -m http.server 8000
```

Danach `http://localhost:8000` im Browser öffnen.

## Ablauf

1. Kalibrierung starten
2. Fixstern- oder geografische Kalibrierung wählen
3. Den Anweisungen zur Ausrichtung folgen
4. Beispiel-Quaternion anzeigen und speichern

Die eigentliche Kommunikation mit dem ESP ist noch nicht angebunden. Der
Erfolgszustand und der Quaternion-Wert sind momentan Demo-Daten.

Für die spätere ESP-Anbindung steht im Browser bereits eine kleine Schnittstelle
bereit: `PolarisCalibration.complete(true)` zeigt Erfolg und
`PolarisCalibration.complete(false)` den Fehlerzustand an.

## Navigation und Ergebnisanzeige

Die Methodenauswahl besteht auf allen Bildschirmgr��en aus zwei horizontalen
Karten untereinander. Der Hintergrund ist einfarbig, ohne Raster oder Rauschtextur.

�Zur�ck� f�hrt von der Stern- oder geografischen Ausrichtung zur Methodenauswahl
und von dort zum Start. Die Sternauswahl bleibt dabei erhalten.
Nach Erfolg oder Fehler gibt es keinen R�ckweg in die vorige Kalibrierung,
sondern nur �Neue Kalibrierung�, wodurch die Auswahl zur�ckgesetzt wird.
Nach Erfolg bleibt die Ergebnisansicht ge�ffnet. Nur bei einem Fehler wird
ein Countdown angezeigt, der nach 12 Sekunden eine neue Kalibrierung vorbereitet.
