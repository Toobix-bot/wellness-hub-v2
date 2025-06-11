# 🚀 Wellness Hub - GitHub & Vercel Deployment Script
# Dieses Skript automatisiert das komplette Deployment

param(
    [string]$commitMessage = "🌟 Update: Wellness Hub Framework",
    [switch]$firstTime,
    [string]$githubUsername = ""
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   🌟 WELLNESS HUB - DEPLOYMENT AUTOMATION        " -ForegroundColor Yellow  
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe Git-Installation
try {
    $gitVersion = git --version
    Write-Host "✅ Git gefunden: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git nicht gefunden! Bitte installiere Git zuerst." -ForegroundColor Red
    Write-Host "   Gehe zu: https://git-scm.com/download/win" -ForegroundColor Yellow
    exit 1
}

# First-time Setup
if ($firstTime) {
    Write-Host "🔧 Erstes Setup..." -ForegroundColor Blue
    
    if (-not $githubUsername) {
        $githubUsername = Read-Host "GitHub Username eingeben"
    }
    
    $userEmail = Read-Host "E-Mail-Adresse eingeben"
    
    # Git konfigurieren
    git config --global user.name $githubUsername
    git config --global user.email $userEmail
    git config --global init.defaultBranch main
    
    Write-Host "✅ Git konfiguriert" -ForegroundColor Green
    
    # Repository initialisieren
    if (-not (Test-Path ".git")) {
        git init
        Write-Host "✅ Git Repository initialisiert" -ForegroundColor Green
    }
    
    # Remote hinzufügen
    $repoUrl = "https://github.com/$githubUsername/wellness-hub-framework.git"
    try {
        git remote add origin $repoUrl
        Write-Host "✅ GitHub Remote hinzugefügt: $repoUrl" -ForegroundColor Green
    } catch {
        Write-Host "⚠️ Remote bereits vorhanden oder Fehler" -ForegroundColor Yellow
    }
}

# Status prüfen
Write-Host "📊 Git Status:" -ForegroundColor Blue
git status --short

# Änderungen hinzufügen
Write-Host "📝 Füge Änderungen hinzu..." -ForegroundColor Blue
git add .

# Commit erstellen
Write-Host "💾 Erstelle Commit: $commitMessage" -ForegroundColor Blue
git commit -m $commitMessage

# Zu GitHub pushen
Write-Host "🚀 Pushe zu GitHub..." -ForegroundColor Blue
try {
    git push origin main
    Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Push fehlgeschlagen. Möglicherweise erster Push?" -ForegroundColor Yellow
    try {
        git push -u origin main
        Write-Host "✅ Initial push successful!" -ForegroundColor Green
    } catch {
        Write-Host "❌ Push fehlgeschlagen. Prüfe GitHub-Verbindung." -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   🎉 DEPLOYMENT ABGESCHLOSSEN!                    " -ForegroundColor Green
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 Nächste Schritte:" -ForegroundColor Yellow
Write-Host "   1. Gehe zu https://vercel.com" -ForegroundColor White
Write-Host "   2. 'Continue with GitHub' klicken" -ForegroundColor White  
Write-Host "   3. Repository 'wellness-hub-framework' importieren" -ForegroundColor White
Write-Host "   4. Deploy klicken" -ForegroundColor White
Write-Host ""
Write-Host "🌐 Deine App wird verfügbar sein unter:" -ForegroundColor Yellow
Write-Host "   https://wellness-hub-framework.vercel.app" -ForegroundColor Cyan
Write-Host ""

# Beispiel-Aufrufe anzeigen
Write-Host "📋 Zukünftige Updates:" -ForegroundColor Yellow
Write-Host "   .\deploy.ps1 -commitMessage '✨ Neues Feature'" -ForegroundColor White
Write-Host "   .\deploy.ps1 -commitMessage '🐛 Bugfix'" -ForegroundColor White
Write-Host "   .\deploy.ps1 -commitMessage '📚 Dokumentation'" -ForegroundColor White
