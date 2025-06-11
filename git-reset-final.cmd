@echo off
title Wellness Hub - Git Reset
color 0A
cls

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║          🚨 WELLNESS HUB - GIT NOTFALL RESET         ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.

echo [1/6] Wechsle ins Projektverzeichnis...
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"
if %errorlevel% neq 0 (
    echo ❌ Projektverzeichnis nicht gefunden!
    pause
    exit /b 1
)
echo ✅ Projektverzeichnis gefunden

echo.
echo [2/6] Beende alle Git-Prozesse...
taskkill /F /IM git.exe >nul 2>&1
taskkill /F /IM vim.exe >nul 2>&1
taskkill /F /IM nano.exe >nul 2>&1
timeout /t 2 /nobreak >nul
echo ✅ Git-Prozesse beendet

echo.
echo [3/6] Entferne .git Verzeichnis...
if exist ".git" (
    attrib -r -s -h ".git" /s /d >nul 2>&1
    rmdir /s /q ".git" >nul 2>&1
    if not exist ".git" (
        echo ✅ .git erfolgreich entfernt
    ) else (
        echo ❌ .git konnte nicht entfernt werden
        echo Versuche manuell: rmdir /s /q .git
        pause
        exit /b 1
    )
) else (
    echo ✅ .git bereits entfernt
)

echo.
echo [4/6] Neues Git-Repository erstellen...
git init >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Git-Repository initialisiert
) else (
    echo ❌ Git-Initialisierung fehlgeschlagen
    pause
    exit /b 1
)

echo.
echo [5/6] Git konfigurieren und Dateien hinzufügen...
git config user.name "Toobix-bot" >nul 2>&1
git config user.email "toobix@example.com" >nul 2>&1
git add . >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Dateien hinzugefügt
) else (
    echo ❌ Fehler beim Hinzufügen der Dateien
    pause
    exit /b 1
)

echo.
echo [6/6] Initial Commit erstellen...
git commit -m "🎉 Initial commit - Wellness Hub Framework ready for deployment" >nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ Initial Commit erstellt
) else (
    echo ❌ Commit fehlgeschlagen
    pause
    exit /b 1
)

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║                🎉 RESET ERFOLGREICH! 🎉              ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.
echo ✅ Git-Repository ist sauber
echo ✅ Alle Dateien committed
echo 🚀 Bereit für GitHub Push!
echo.
echo Nächste Schritte:
echo 1. Neues GitHub Repository erstellen
echo 2. git remote add origin [URL]
echo 3. git push -u origin main
echo 4. Vercel Deployment
echo.
echo Drücke eine Taste um Git-Status zu zeigen...
pause >nul

echo.
echo Git Status:
git status --short
echo.
git log --oneline -n 3

echo.
echo Drücke eine Taste zum Beenden...
pause >nul
