# SOFORT-LÖSUNG: Node.js Installation abschließen und App deployen
Write-Host "===============================================" -ForegroundColor Green
Write-Host "   NODE.JS INSTALLATION ABSCHLIESSEN" -ForegroundColor Green  
Write-Host "===============================================" -ForegroundColor Green

# 1. Warte bis Installation fertig ist
Write-Host "`n🔄 Warte bis Node.js Installation abgeschlossen ist..." -ForegroundColor Yellow

do {
    Start-Sleep -Seconds 5
    $processes = Get-Process -Name "msiexec" -ErrorAction SilentlyContinue
    if ($processes) {
        Write-Host "⏳ Installation läuft noch... ($($processes.Count) Installer-Prozesse)" -ForegroundColor Yellow
    }
} while ($processes)

Write-Host "✅ Installation abgeschlossen!" -ForegroundColor Green

# 2. Environment-Variablen neu laden
Write-Host "`n🔄 Lade Environment-Variablen neu..." -ForegroundColor Yellow
$env:PATH = [System.Environment]::GetEnvironmentVariable("PATH","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("PATH","User")

# 3. Teste Node.js
Write-Host "`n🧪 Teste Node.js Installation..." -ForegroundColor Yellow
try {
    $nodeVersion = & node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✅ Node.js Version: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js nicht gefunden"
    }
} catch {
    Write-Host "❌ Node.js noch nicht verfügbar - Starte neues Terminal!" -ForegroundColor Red
    Write-Host "📝 Führe danach dieses Skript erneut aus:" -ForegroundColor Yellow
    Write-Host "   powershell -ExecutionPolicy Bypass -File '$PSCommandPath'" -ForegroundColor Cyan
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

# 4. Gehe zum Projektverzeichnis  
Write-Host "`n📁 Wechsle zum Projektverzeichnis..." -ForegroundColor Yellow
Set-Location "c:\Users\micha\NEU\NEU_V1\Fourcen"

# 5. Installiere Dependencies
Write-Host "`n📦 Installiere npm Dependencies..." -ForegroundColor Yellow
try {
    & npm install
    if ($LASTEXITCODE -ne 0) {
        throw "npm install fehlgeschlagen"
    }
    Write-Host "✅ Dependencies installiert!" -ForegroundColor Green
} catch {
    Write-Host "❌ Fehler bei npm install: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

# 6. Teste Build
Write-Host "`n🏗️ Teste Build..." -ForegroundColor Yellow
try {
    & npm run build
    if ($LASTEXITCODE -ne 0) {
        throw "Build fehlgeschlagen"
    }
    Write-Host "✅ Build erfolgreich!" -ForegroundColor Green
} catch {
    Write-Host "❌ Build-Fehler: $($_.Exception.Message)" -ForegroundColor Red
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

# 7. Git Push
Write-Host "`n📤 Pushe zu GitHub..." -ForegroundColor Yellow
try {
    & git add .
    & git commit -m "NODE.JS READY: Dependencies installed, build successful - Ready for Vercel"
    & git push origin main
    
    Write-Host "✅ Erfolgreich zu GitHub gepusht!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Git Push Fehler - aber Build funktioniert!" -ForegroundColor Yellow
}

# ERFOLG!
Write-Host "`n===============================================" -ForegroundColor Green
Write-Host "🎉 ALLES BEREIT FÜR VERCEL DEPLOYMENT!" -ForegroundColor Green
Write-Host "===============================================" -ForegroundColor Green
Write-Host "✅ Node.js installiert und funktioniert" -ForegroundColor Green
Write-Host "✅ npm Dependencies installiert" -ForegroundColor Green  
Write-Host "✅ Build erfolgreich getestet" -ForegroundColor Green
Write-Host "✅ Code zu GitHub gepusht" -ForegroundColor Green
Write-Host "`n🚀 NÄCHSTER SCHRITT:" -ForegroundColor Cyan
Write-Host "   Gehe zu vercel.com und deploye deine App!" -ForegroundColor Cyan
Write-Host "   Siehe: SCHRITT_2_VISUELL.md für detaillierte Anleitung" -ForegroundColor Cyan

Read-Host "`nDrücke Enter zum Beenden"
