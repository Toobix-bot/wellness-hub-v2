@echo off
chcp 65001 >nul
echo ====================================================
echo   🍫 Node.js Installation via Chocolatey
echo ====================================================
echo.

echo [1/3] Prüfe Chocolatey Installation...
choco --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️ Chocolatey ist nicht installiert.
    echo.
    echo [1a/3] Installiere Chocolatey...
    echo 🔧 Dies erfordert Administrator-Rechte.
    echo.
    
    REM Installiere Chocolatey
    powershell -NoProfile -InputFormat None -ExecutionPolicy Bypass -Command "iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))"
    
    if %errorlevel% neq 0 (
        echo ❌ Chocolatey Installation fehlgeschlagen!
        echo.
        echo Bitte führe diese Batch-Datei als Administrator aus:
        echo 1. Rechtsklick auf install-nodejs-choco.bat
        echo 2. "Als Administrator ausführen" wählen
        echo.
        pause
        exit /b 1
    )
    
    echo ✅ Chocolatey erfolgreich installiert!
) else (
    echo ✅ Chocolatey ist bereits installiert
    choco --version
)

echo.
echo [2/3] Installiere Node.js via Chocolatey...
echo 📦 Installiere Node.js LTS...

choco install nodejs-lts -y

if %errorlevel% neq 0 (
    echo ❌ Node.js Installation fehlgeschlagen!
    pause
    exit /b 1
)

echo ✅ Node.js erfolgreich installiert!

echo.
echo [3/3] Teste Installation...
echo 🧪 Prüfe Node.js und npm...

REM Aktualisiere PATH für aktuelle Session
set "PATH=%PATH%;%ALLUSERSPROFILE%\chocolatey\bin;C:\Program Files\nodejs"

node --version
npm --version

echo.
echo 🎉 Installation abgeschlossen!
echo.
echo Node.js und npm sind jetzt verfügbar.
echo Du kannst jetzt wellness-hub.bat verwenden!
echo.

pause
