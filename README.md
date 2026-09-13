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
