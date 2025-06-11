# NEUER GITHUB START - Automatisches Setup
Write-Host "🚀 FRISCHER GITHUB START" -ForegroundColor Green

$projectPath = "c:\Users\micha\NEU\NEU_V1\Fourcen"
Set-Location $projectPath

Write-Host "🧹 Schritt 1: Altes Git löschen..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Remove-Item ".git" -Recurse -Force
    Write-Host "✅ Altes .git Verzeichnis entfernt" -ForegroundColor Green
}

Write-Host "🔄 Schritt 2: Neues Git Repository initialisieren..." -ForegroundColor Yellow
git init
git config user.name "Toobix-bot"
git config user.email "toobix.bot@example.com"

Write-Host "📦 Schritt 3: Alle Dateien hinzufügen..." -ForegroundColor Yellow
git add .

Write-Host "💾 Schritt 4: Ersten Commit erstellen..." -ForegroundColor Yellow
git commit -m "🌟 Wellness Hub Framework - Frischer Start mit allen Fixes"

Write-Host ""
Write-Host "✅ LOKALES REPOSITORY BEREIT!" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 NÄCHSTE SCHRITTE:" -ForegroundColor White
Write-Host "1. 🌐 Gehe zu: https://github.com/new" -ForegroundColor Cyan
Write-Host "2. 📝 Repository Name: wellness-hub-final" -ForegroundColor Cyan
Write-Host "3. ✅ Public Repository wählen" -ForegroundColor Cyan
Write-Host "4. ❌ NICHT 'Initialize with README' ankreuzen" -ForegroundColor Cyan
Write-Host "5. 🎯 'Create repository' klicken" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Dann sage mir Bescheid und ich verbinde es!" -ForegroundColor Yellow
