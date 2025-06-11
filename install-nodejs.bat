@echo off
chcp 65001 >nul
echo ====================================================
echo    🌟 Node.js Installation für Wellness Hub
echo ====================================================
echo.

echo [1/4] Prüfe aktuelle Node.js Installation...
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Node.js ist bereits installiert!
    node --version
    echo.
    echo Möchtest du trotzdem die neueste LTS-Version installieren? (j/n)
    set /p choice="Deine Wahl: "
    if /i "%choice%" neq "j" (
        echo Überspringe Installation.
        goto :dependencies
    )
)

echo.
echo [2/4] Lade Node.js LTS herunter...

REM Erstelle temporäres Verzeichnis
if not exist "%TEMP%\wellness-nodejs" mkdir "%TEMP%\wellness-nodejs"
cd /d "%TEMP%\wellness-nodejs"

echo 📥 Lade Node.js 20.x LTS herunter...
echo Dies kann einige Minuten dauern...

REM Download Node.js 20.x LTS (Windows x64)
powershell -Command "& {[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; Invoke-WebRequest -Uri 'https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi' -OutFile 'node-installer.msi'}"

if not exist "node-installer.msi" (
    echo ❌ Download fehlgeschlagen!
    echo.
    echo Bitte lade Node.js manuell herunter:
    echo https://nodejs.org/en/download/
    echo.
    pause
    exit /b 1
)

echo ✅ Download abgeschlossen!
echo.

echo [3/4] Installiere Node.js...
echo 🔧 Starte Installation (Administrator-Rechte erforderlich)...
echo.

REM Installiere Node.js
msiexec /i "node-installer.msi" /quiet /norestart

echo Warte auf Abschluss der Installation...
timeout /t 30 /nobreak >nul

REM Aktualisiere PATH
echo 🔄 Aktualisiere Umgebungsvariablen...
setx PATH "%PATH%;C:\Program Files\nodejs" >nul 2>&1

REM Neue CMD-Session für aktualisierte PATH
echo 📋 Starte neue Command-Session...
start cmd /c "echo Node.js Installation abgeschlossen! && echo. && echo Teste Installation: && node --version && npm --version && echo. && pause"

:dependencies
echo.
echo [4/4] Zurück zum Wellness Hub...
cd /d "%~dp0"

echo.
echo 🎉 Installation abgeschlossen!
echo.
echo Nächste Schritte:
echo 1. Schließe dieses Fenster
echo 2. Starte wellness-hub.bat neu
echo 3. Wähle Option 3 für Dependencies-Installation
echo.

pause
exit
