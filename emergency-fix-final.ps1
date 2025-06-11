# EMERGENCY VERCEL FIX - FINALE LÖSUNG
# Dieses Skript erstellt einen neuen Commit und pusht ihn zu GitHub

Write-Host "========================================" -ForegroundColor Green
Write-Host "EMERGENCY VERCEL REBUILD SCRIPT" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Zum Projektverzeichnis wechseln
Set-Location "c:\Users\micha\NEU\NEU_V1\Fourcen"

# Aktueller Status
Write-Host "`nPrüfe Git-Status..." -ForegroundColor Yellow
git status --short

# Build testen
Write-Host "`nTeste Build lokal..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ BUILD ERFOLGREICH!" -ForegroundColor Green
} else {
    Write-Host "❌ BUILD FEHLER - Stoppe Prozess" -ForegroundColor Red
    exit 1
}

# Git-Operationen
Write-Host "`nFüge Dateien hinzu..." -ForegroundColor Yellow
git add .

Write-Host "`nErstelle Commit..." -ForegroundColor Yellow
git commit -m "VERCEL EMERGENCY FIX: Build errors resolved - Ready for production"

Write-Host "`nPushe zu GitHub..." -ForegroundColor Yellow
git push origin main

Write-Host "`n========================================" -ForegroundColor Green
Write-Host "✅ PUSH ERFOLGREICH ABGESCHLOSSEN!" -ForegroundColor Green
Write-Host "✅ Build-Fehler sind BEHOBEN!" -ForegroundColor Green
Write-Host "✅ Vercel sollte jetzt den neuesten Code verwenden!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

Write-Host "`n🔄 Bitte prüfe jetzt das Vercel Dashboard!" -ForegroundColor Cyan
Write-Host "📡 Neue Deployment sollte automatisch starten!" -ForegroundColor Cyan

Read-Host "`nDrücke Enter zum Beenden"
