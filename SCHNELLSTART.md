# 🚀 Wellness Hub - Schnellstart-Anleitung

## ⚡ TL;DR - Sofort starten

1. **Node.js installieren** (falls nicht vorhanden):
   - Rechtsklick auf `install-nodejs.ps1` → "Mit PowerShell ausführen"
   - ODER: Download von [nodejs.org](https://nodejs.org/) (LTS Version)

2. **Wellness Hub starten**:
   - Doppelklick auf `wellness-hub.bat`
   - Wähle Option **3** (Dependencies installieren)
   - Wähle Option **1** (Entwicklungsserver starten)

3. **Browser öffnen**: http://localhost:3000

---

## 🔍 Problembehebung

### ❌ "npm ist nicht erkannt"
**Problem**: Node.js ist nicht installiert oder nicht im PATH
**Lösung**: 
```bash
# Führe als Administrator aus:
install-nodejs.ps1
```

### ❌ "Dependencies Installation fehlgeschlagen"
**Problem**: Netzwerkprobleme oder beschädigte npm-Cache
**Lösung**:
```bash
# In wellness-hub.bat wähle Option 4 (Clean Install)
```

### ❌ "Port 3000 ist bereits in Verwendung"
**Problem**: Ein anderer Prozess nutzt Port 3000
**Lösung**:
```bash
# Stoppe alle Node.js Prozesse:
taskkill /f /im node.exe

# Oder verwende anderen Port:
npm run dev -- -p 3001
```

### ❌ Browser öffnet sich nicht automatisch
**Problem**: Firewall oder Antivirus blockiert
**Lösung**:
```bash
# Manuell öffnen:
http://localhost:3000
```

---

## 📁 Dateien-Übersicht

### 🚀 Start-Dateien
- **`start.bat`** - Einfacher Sofort-Start
- **`wellness-hub.bat`** - Vollständiges Menü (EMPFOHLEN)
- **`start.ps1`** - PowerShell-Version mit bunten Ausgaben

### 🔧 Installation
- **`install-nodejs.ps1`** - Automatische Node.js Installation
- **`install-nodejs-choco.bat`** - Installation via Chocolatey
- **`install-nodejs.bat`** - Direkte Installation

### 📋 Projekt-Dateien
- **`package.json`** - Projekt-Konfiguration
- **`README.md`** - Vollständige Dokumentation
- **`src/`** - Quellcode

---

## 🌟 Wellness-Module

Nach dem Start findest du folgende Module:

- **🙏 Dankbarkeit** - Persönliches Dankbarkeits-Journal
- **🧘 Stille & Meditation** - Geführte Meditationen mit Timer
- **📈 Fortschritt** - Ziel-Tracking und Meilensteine
- **🧘‍♀️ Therapie & Heilung** - Selbsthilfe-Ressourcen und Stimmungs-Tracker

---

## 🆘 Hilfe benötigt?

1. **Prüfe die README.md** für ausführliche Dokumentation
2. **Verwende wellness-hub.bat Option 6** für Projekt-Status
3. **Starte den Computer neu** nach Node.js Installation
4. **Führe Clean Install aus** bei persistenten Problemen

---

**🎉 Viel Erfolg mit deiner Wellness-Reise!**
