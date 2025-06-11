@echo off
echo 🚀 FRISCHER GITHUB START für Wellness Hub Framework
echo ===============================================

echo.
echo 1. Beende alle Git-Prozesse...
taskkill /F /IM git.exe 2>nul
taskkill /F /IM vim.exe 2>nul
taskkill /F /IM notepad.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo 2. Lösche .git Verzeichnis...
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"
if exist ".git" (
    rmdir /s /q ".git"
    if not exist ".git" (
        echo ✅ .git Verzeichnis erfolgreich gelöscht
    ) else (
        echo ❌ .git Verzeichnis konnte nicht gelöscht werden
        pause
        exit /b 1
    )
) else (
    echo ✅ .git Verzeichnis bereits gelöscht
)

echo.
echo 3. Initialisiere neues Git-Repository...
git init
if %errorlevel% equ 0 (
    echo ✅ Git-Repository erfolgreich initialisiert
) else (
    echo ❌ Fehler bei Git-Initialisierung
    pause
    exit /b 1
)

echo.
echo 4. Konfiguriere Git...
git config user.name "Toobix-bot"
git config user.email "toobix@example.com"
echo ✅ Git-Konfiguration abgeschlossen

echo.
echo 5. Füge alle Dateien hinzu...
git add .
if %errorlevel% equ 0 (
    echo ✅ Alle Dateien hinzugefügt
) else (
    echo ❌ Fehler beim Hinzufügen der Dateien
    pause
    exit /b 1
)

echo.
echo 6. Erstelle Initial Commit...
git commit -m "🎉 Initial commit - Wellness Hub Framework mit 38+ Modulen"
if %errorlevel% equ 0 (
    echo ✅ Initial Commit erfolgreich
) else (
    echo ❌ Fehler beim Commit
    pause
    exit /b 1
)

echo.
echo 🎉 FRISCHER START ABGESCHLOSSEN!
echo ===============================================
echo ✅ Neues Git-Repository ist bereit
echo ✅ Alle Dateien committed
echo 🚀 Bereit für GitHub Push!
echo.
echo Drücke eine Taste um fortzufahren...
pause >nul
