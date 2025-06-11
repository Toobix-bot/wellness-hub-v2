@echo off
chcp 65001 >nul
setlocal EnableDelayedExpansion

echo ====================================================
echo    🌟 Wellness Hub - Entwicklungsmenü
echo ====================================================
echo.

:menu
echo Bitte wähle eine Option:
echo.
echo [1] 🚀 Entwicklungsserver starten (npm run dev)
echo [2] 🔨 Projekt bauen (npm run build)
echo [3] 📦 Dependencies installieren (npm install)
echo [4] 🧹 Dependencies neu installieren (clean install)
echo [5] 🔍 Code-Linting durchführen (npm run lint)
echo [6] 📊 Projekt-Status anzeigen
echo [7] 🌐 Browser öffnen (localhost:3000)
echo [8] ❌ Beenden
echo.

set /p choice="Deine Wahl (1-8): "

if "%choice%"=="1" goto start_dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto install
if "%choice%"=="4" goto clean_install
if "%choice%"=="5" goto lint
if "%choice%"=="6" goto status
if "%choice%"=="7" goto open_browser
if "%choice%"=="8" goto exit

echo ❌ Ungültige Eingabe! Bitte wähle 1-8.
echo.
goto menu

:start_dev
echo.
echo 🚀 Starte Entwicklungsserver...
call :check_node
call :check_dependencies
echo.
echo 🌐 Öffne http://localhost:3000 in deinem Browser
echo 📱 Für mobile Ansicht: http://localhost:3000
echo.
echo Drücke Ctrl+C zum Beenden
echo.
call npm run dev
goto menu

:build
echo.
echo 🔨 Baue Produktionsversion...
call :check_node
call :check_dependencies
call npm run build
if %errorlevel% equ 0 (
    echo ✅ Build erfolgreich abgeschlossen!
) else (
    echo ❌ Build fehlgeschlagen!
)
echo.
pause
goto menu

:install
echo.
echo 📦 Installiere Dependencies...
call :check_node
call npm install
if %errorlevel% equ 0 (
    echo ✅ Dependencies erfolgreich installiert!
) else (
    echo ❌ Installation fehlgeschlagen!
)
echo.
pause
goto menu

:clean_install
echo.
echo 🧹 Führe Clean Install durch...
call :check_node
if exist "node_modules" (
    echo Lösche alte node_modules...
    rmdir /s /q node_modules
)
if exist "package-lock.json" (
    echo Lösche package-lock.json...
    del package-lock.json
)
echo Installiere Dependencies neu...
call npm install
if %errorlevel% equ 0 (
    echo ✅ Clean Install erfolgreich!
) else (
    echo ❌ Clean Install fehlgeschlagen!
)
echo.
pause
goto menu

:lint
echo.
echo 🔍 Führe Code-Linting durch...
call :check_node
call :check_dependencies
call npm run lint
if %errorlevel% equ 0 (
    echo ✅ Linting erfolgreich - Keine Probleme gefunden!
) else (
    echo ⚠️ Linting hat Probleme gefunden!
)
echo.
pause
goto menu

:status
echo.
echo 📊 Projekt-Status:
echo ==================
echo.

REM Node.js Version
echo 🟢 Node.js:
node --version 2>nul || echo ❌ Nicht installiert

echo.

REM npm Version
echo 🟢 npm:
npm --version 2>nul || echo ❌ Nicht verfügbar

echo.

REM Dependencies Status
echo 🟢 Dependencies:
if exist "node_modules" (
    echo ✅ Installiert
    if exist "package-lock.json" (
        echo ✅ package-lock.json vorhanden
    ) else (
        echo ⚠️ package-lock.json fehlt
    )
) else (
    echo ❌ Nicht installiert
)

echo.

REM Projekt-Dateien
echo 🟢 Projekt-Dateien:
if exist "package.json" echo ✅ package.json
if exist "tsconfig.json" echo ✅ tsconfig.json
if exist "tailwind.config.js" echo ✅ tailwind.config.js
if exist "next.config.js" echo ✅ next.config.js
if exist "src\app\page.tsx" echo ✅ Hauptseite
if exist "src\components\MainMenu.tsx" echo ✅ Hauptmenü
if exist "README.md" echo ✅ README.md

echo.

REM Wellness Module
echo 🟢 Wellness Module:
if exist "src\app\dankbarkeit\page.tsx" echo ✅ Dankbarkeit
if exist "src\app\stille\page.tsx" echo ✅ Stille & Meditation
if exist "src\app\fortschritt\page.tsx" echo ✅ Fortschritt
if exist "src\app\therapie\page.tsx" echo ✅ Therapie & Heilung

echo.
pause
goto menu

:open_browser
echo.
echo 🌐 Öffne Browser...
start http://localhost:3000
echo ✅ Browser geöffnet (falls Server läuft)
echo.
pause
goto menu

:check_node
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js ist nicht installiert!
    echo.
    echo Bitte installiere Node.js von: https://nodejs.org/
    echo Empfohlene Version: LTS (Long Term Support)
    echo.
    pause
    exit /b 1
)
exit /b 0

:check_dependencies
if not exist "node_modules" (
    echo ⚠️ Dependencies nicht installiert!
    echo 📦 Installiere automatisch...
    call npm install
    if %errorlevel% neq 0 (
        echo ❌ Installation fehlgeschlagen!
        pause
        exit /b 1
    )
)
exit /b 0

:exit
echo.
echo 👋 Auf Wiedersehen!
echo Vielen Dank für die Nutzung des Wellness Hub Frameworks!
echo.
pause
exit
