# Zeiterfassungs-App-API

Dieses Projekt ist eine einfache API für eine Zeiterfassungs-App, die in TypeScript geschrieben ist. Die API unterstützt das Anlegen von Projekten, Mitarbeitern und das Erfassen von Arbeitszeiten.
Systemanforderungen

    Node.js (v14 oder höher)
    npm

## Installation

	Klone das Repository oder lade den Quellcode herunter und entpacke es.
	Öffne einen Terminal und navigiere zum Hauptverzeichnis des Projekts.
	Führe npm install aus, um alle benötigten Abhängigkeiten zu installieren.

## Ausführen der Anwendung

Führe im Hauptverzeichnis des Projekts den Befehl npm start aus. Der Server startet auf Port 3000 oder dem in der Umgebungsvariable PORT angegebenen Port.
API-Endpunkte

Projekte

    POST /projects: Erstellt ein neues Projekt.

    Request-Struktur:

    json

    {
      "name": "Beispielprojekt",
      "client": "Beispielkunde"
    }

Mitarbeiter

    POST /employees: Erstellt einen neuen Mitarbeiter.

    Request-Struktur:

    json

    {
      "firstName": "Max",
      "lastName": "Mustermann",
      "email": "max.mustermann@example.com"
    }

Zeitbuchungen

    POST /timeEntries: Erfasst Arbeitszeit für einen Mitarbeiter.

    Request-Struktur:

    json

    {
      "employeeId": "EMPLOYEE_ID",
      "projectId": "PROJECT_ID",
      "task": "Beispielaufgabe",
      "minutes": 120
    }

## Anpassungen

Um weitere Funktionen oder Anpassungen an der API vorzunehmen, ändere den TypeScript-Code in der Datei src/server.ts oder füge weitere Dateien hinzu. Vergiss nicht, TypeScript zu kompilieren, bevor du die Anwendung erneut ausführst, indem du tsc ausführst oder die ts-node-Befehlszeile verwendest.
Lizenz

Dieses Projekt ist lizenzfrei.

## BUGS
* Nachdem die Anwendung läuft und versucht ein Mitarbeiter anzulegen (POST http://localhost:3000/employees), bekommt man einen Fehler (Error: connect ECONNREFUSED 127.0.0.1:3000)
* Beim hinzufügen eines Projektes, werden vorhandene Projekte überschrieben

## Offene TODOS
* Es dürfen keine 2 Projekte mit dem gleichen Namen beim gleichen Kunden existieren
* Beim Zeiteintrag soll es möglich sein, das Datum anzugeben
* An einem Tag dürfen nicht mehr als 8 Stunden erfasst werden
* Die Api soll die Abfrage aller Projekte ermöglichen
* Die Api soll die Abfrage aller Mitarbeiter ermöglichen
* Die API soll die Abfrage aller Zeiteinträge für einen Mitarbeiter ermöglichen

## Optimierungspotentiale
* Was könnte man tun, um die Code-Struktur hinsichtlich Flexibilität, Skalierbarkeit und Wartbarkeit zu optimieren?