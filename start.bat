@echo off
echo ====================================================
echo    🌟 Wellness Hub - Ganzheitliches Wohlbefinden
echo ====================================================
echo.

REM Prüfe ob Node.js installiert ist
echo [1/4] Prüfe Node.js Installation...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js ist nicht installiert!
    echo.
    echo Bitte installiere Node.js von: https://nodejs.org/
    echo Empfohlene Version: LTS (Long Term Support)
    echo.
    pause
    exit /b 1
) else (
    echo ✅ Node.js ist installiert
    node --version
)

echo.

REM Prüfe ob npm verfügbar ist
echo [2/4] Prüfe npm Verfügbarkeit...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm ist nicht verfügbar!
    pause
    exit /b 1
) else (
    echo ✅ npm ist verfügbar
    npm --version
)

echo.

REM Installiere Dependencies falls node_modules nicht existiert
echo [3/4] Prüfe und installiere Dependencies...
if not exist "node_modules" (
    echo 📦 Installiere Dependencies...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Fehler beim Installieren der Dependencies!
        pause
        exit /b 1
    )
    echo ✅ Dependencies erfolgreich installiert
) else (
    echo ✅ Dependencies bereits installiert
)

echo.

REM Starte den Entwicklungsserver
echo [4/4] Starte Wellness Hub Entwicklungsserver...
echo.
echo 🚀 Der Entwicklungsserver wird gestartet...
echo 🌐 Öffne http://localhost:3000 in deinem Browser
echo.
echo Drücke Ctrl+C zum Beenden des Servers
echo.

call npm run dev

echo.
echo 👋 Wellness Hub wurde beendet.
pause
