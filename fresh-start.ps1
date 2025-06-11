# Frischer GitHub Start - Vollständige Repository-Neuinitialisierung
Write-Host "🚀 FRISCHER GITHUB START für Wellness Hub Framework" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan

# Schritt 1: Alle Git-Prozesse beenden
Write-Host "`n1️⃣ Beende alle Git-Prozesse..." -ForegroundColor Yellow
Get-Process git -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

# Schritt 2: .git Verzeichnis löschen (mehrere Versuche)
Write-Host "2️⃣ Lösche altes Git-Repository..." -ForegroundColor Yellow
$gitPath = ".git"
if (Test-Path $gitPath) {
    try {
        # Erst alle Dateien unlocked machen
        Get-ChildItem $gitPath -Recurse -Force | ForEach-Object { $_.Attributes = 'Normal' }
        Remove-Item $gitPath -Recurse -Force -ErrorAction Stop
        Write-Host "✅ .git Verzeichnis erfolgreich gelöscht" -ForegroundColor Green
    }
    catch {
        Write-Host "⚠️ Fehler beim Löschen: $($_.Exception.Message)" -ForegroundColor Red
        # Alternative Methode
        cmd /c "rmdir /s /q .git" 2>$null
        if (-not (Test-Path $gitPath)) {
            Write-Host "✅ .git Verzeichnis mit CMD erfolgreich gelöscht" -ForegroundColor Green
        }
    }
} else {
    Write-Host "✅ Kein .git Verzeichnis gefunden" -ForegroundColor Green
}

# Schritt 3: Neues Git-Repository initialisieren
Write-Host "3️⃣ Initialisiere neues Git-Repository..." -ForegroundColor Yellow
git init
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Git-Repository erfolgreich initialisiert" -ForegroundColor Green
} else {
    Write-Host "❌ Fehler bei Git-Initialisierung" -ForegroundColor Red
    exit 1
}

# Schritt 4: Git-Konfiguration
Write-Host "4️⃣ Konfiguriere Git..." -ForegroundColor Yellow
git config user.name "Toobix-bot"
git config user.email "your-email@example.com"
Write-Host "✅ Git-Benutzer konfiguriert" -ForegroundColor Green

# Schritt 5: .gitignore prüfen
Write-Host "5️⃣ Prüfe .gitignore..." -ForegroundColor Yellow
if (Test-Path ".gitignore") {
    Write-Host "✅ .gitignore bereits vorhanden" -ForegroundColor Green
} else {
    Write-Host "⚠️ .gitignore nicht gefunden - erstelle Standard-.gitignore" -ForegroundColor Orange
    # Standard Next.js .gitignore erstellen falls nötig
}

# Schritt 6: Alle Dateien hinzufügen
Write-Host "6️⃣ Füge alle Dateien zum Repository hinzu..." -ForegroundColor Yellow
git add .
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Alle Dateien erfolgreich hinzugefügt" -ForegroundColor Green
} else {
    Write-Host "❌ Fehler beim Hinzufügen der Dateien" -ForegroundColor Red
    exit 1
}

# Schritt 7: Initial Commit
Write-Host "7️⃣ Erstelle initialen Commit..." -ForegroundColor Yellow
git commit -m "🎉 Initial commit - Wellness Hub Framework mit 38+ Modulen

✨ Features:
- 7 Hauptkategorien mit 38+ Wellness-Modulen
- Next.js 14 mit App Router
- TypeScript & Tailwind CSS
- Responsive Design & Dark Mode
- Framer Motion Animationen
- GDPR-konform & rechtssicher

🚀 Bereit für Vercel Deployment!"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Initial Commit erfolgreich erstellt" -ForegroundColor Green
} else {
    Write-Host "❌ Fehler beim Initial Commit" -ForegroundColor Red
    exit 1
}

# Schritt 8: Status anzeigen
Write-Host "8️⃣ Git Status:" -ForegroundColor Yellow
git status --short

Write-Host "`n🎉 FRISCHER START ABGESCHLOSSEN!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✅ Neues Git-Repository ist bereit" -ForegroundColor Green
Write-Host "✅ Alle Dateien committed" -ForegroundColor Green
Write-Host "🚀 Bereit für GitHub Push!" -ForegroundColor Green
Write-Host "`nNächster Schritt: Neues GitHub Repository erstellen und pushen" -ForegroundColor Cyan
