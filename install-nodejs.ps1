# Node.js Installation für Wellness Hub
# Erfordert Administrator-Rechte

param(
    [switch]$Force
)

Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "   🌟 Node.js Installation für Wellness Hub        " -ForegroundColor Yellow
Write-Host "====================================================" -ForegroundColor Cyan
Write-Host ""

# Prüfe Administrator-Rechte
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $isAdmin) {
    Write-Host "⚠️ Diese Skript benötigt Administrator-Rechte!" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Starte als Administrator neu..." -ForegroundColor Blue
    Start-Process PowerShell -Verb RunAs -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    exit
}

Write-Host "✅ Administrator-Rechte bestätigt" -ForegroundColor Green
Write-Host ""

# Prüfe aktuelle Node.js Installation
Write-Host "[1/4] Prüfe Node.js Installation..." -ForegroundColor Blue
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion -and -not $Force) {
        Write-Host "✅ Node.js ist bereits installiert: $nodeVersion" -ForegroundColor Green
        $choice = Read-Host "Möchtest du trotzdem die neueste LTS-Version installieren? (j/n)"
        if ($choice -ne "j") {
            Write-Host "Installation übersprungen." -ForegroundColor Yellow
            Read-Host "Drücke Enter zum Fortfahren"
            exit
        }
    }
} catch {
    Write-Host "❌ Node.js ist nicht installiert" -ForegroundColor Red
}

Write-Host ""

# Methode 1: Winget (Windows Package Manager)
Write-Host "[2/4] Versuche Installation via Winget..." -ForegroundColor Blue
try {
    $winget = Get-Command winget -ErrorAction SilentlyContinue
    if ($winget) {
        Write-Host "📦 Installiere Node.js LTS via Winget..." -ForegroundColor Green
        winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Node.js erfolgreich via Winget installiert!" -ForegroundColor Green
            $installSuccess = $true
        } else {
            Write-Host "⚠️ Winget Installation fehlgeschlagen, versuche alternative Methode..." -ForegroundColor Yellow
            $installSuccess = $false
        }
    } else {
        Write-Host "⚠️ Winget nicht verfügbar, versuche alternative Methode..." -ForegroundColor Yellow
        $installSuccess = $false
    }
} catch {
    Write-Host "⚠️ Winget Installation fehlgeschlagen, versuche alternative Methode..." -ForegroundColor Yellow
    $installSuccess = $false
}

# Methode 2: Chocolatey
if (-not $installSuccess) {
    Write-Host ""
    Write-Host "[2b/4] Versuche Installation via Chocolatey..." -ForegroundColor Blue
    
    try {
        $choco = Get-Command choco -ErrorAction SilentlyContinue
        if (-not $choco) {
            Write-Host "📥 Installiere Chocolatey..." -ForegroundColor Blue
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
            
            # Aktualisiere PATH
            $env:PATH = [Environment]::GetEnvironmentVariable("PATH", "Machine") + ";" + [Environment]::GetEnvironmentVariable("PATH", "User")
        }
        
        Write-Host "📦 Installiere Node.js LTS via Chocolatey..." -ForegroundColor Green
        choco install nodejs-lts -y
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Node.js erfolgreich via Chocolatey installiert!" -ForegroundColor Green
            $installSuccess = $true
        }
    } catch {
        Write-Host "⚠️ Chocolatey Installation fehlgeschlagen, versuche direkte Installation..." -ForegroundColor Yellow
        $installSuccess = $false
    }
}

# Methode 3: Direkter Download
if (-not $installSuccess) {
    Write-Host ""
    Write-Host "[2c/4] Direkter Download von nodejs.org..." -ForegroundColor Blue
    
    try {
        $tempDir = "$env:TEMP\wellness-nodejs"
        if (-not (Test-Path $tempDir)) {
            New-Item -ItemType Directory -Path $tempDir | Out-Null
        }
        
        Write-Host "📥 Lade Node.js 20.x LTS herunter..." -ForegroundColor Blue
        $url = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
        $output = "$tempDir\node-installer.msi"
        
        [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
        Invoke-WebRequest -Uri $url -OutFile $output -UseBasicParsing
        
        Write-Host "🔧 Installiere Node.js..." -ForegroundColor Blue
        Start-Process msiexec.exe -Wait -ArgumentList "/i `"$output`" /quiet /norestart"
        
        Write-Host "✅ Node.js Installation abgeschlossen!" -ForegroundColor Green
        $installSuccess = $true
        
        # Aufräumen
        Remove-Item $tempDir -Recurse -Force -ErrorAction SilentlyContinue
    } catch {
        Write-Host "❌ Direkte Installation fehlgeschlagen!" -ForegroundColor Red
        Write-Host "Bitte lade Node.js manuell von https://nodejs.org/ herunter" -ForegroundColor Yellow
        $installSuccess = $false
    }
}

if (-not $installSuccess) {
    Write-Host ""
    Write-Host "❌ Alle Installationsmethoden fehlgeschlagen!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Manuelle Installation:" -ForegroundColor Yellow
    Write-Host "1. Gehe zu https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Lade die LTS-Version herunter" -ForegroundColor White
    Write-Host "3. Installiere die .msi-Datei" -ForegroundColor White
    Write-Host "4. Starte den Computer neu" -ForegroundColor White
    Write-Host ""
    Read-Host "Drücke Enter zum Beenden"
    exit 1
}

Write-Host ""
Write-Host "[3/4] Aktualisiere Umgebungsvariablen..." -ForegroundColor Blue

# Aktualisiere PATH
$machinePath = [Environment]::GetEnvironmentVariable("PATH", "Machine")
$userPath = [Environment]::GetEnvironmentVariable("PATH", "User")
$env:PATH = "$machinePath;$userPath;C:\Program Files\nodejs"

Write-Host ""
Write-Host "[4/4] Teste Installation..." -ForegroundColor Blue

Start-Sleep 2

try {
    $nodeVersion = node --version
    $npmVersion = npm --version
    
    Write-Host "✅ Node.js: $nodeVersion" -ForegroundColor Green
    Write-Host "✅ npm: $npmVersion" -ForegroundColor Green
    
    Write-Host ""
    Write-Host "🎉 Installation erfolgreich abgeschlossen!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Nächste Schritte:" -ForegroundColor Cyan
    Write-Host "1. Schließe alle PowerShell/CMD-Fenster" -ForegroundColor White
    Write-Host "2. Starte wellness-hub.bat neu" -ForegroundColor White
    Write-Host "3. Wähle Option 3 für Dependencies-Installation" -ForegroundColor White
    Write-Host ""
    
} catch {
    Write-Host "⚠️ Installation abgeschlossen, aber Node.js ist noch nicht im PATH verfügbar" -ForegroundColor Yellow
    Write-Host "Bitte starte den Computer neu und versuche es erneut." -ForegroundColor Yellow
}

Read-Host "Drücke Enter zum Beenden"
