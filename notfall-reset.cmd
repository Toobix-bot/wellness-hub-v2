@echo off
cls
echo.
echo 🚨 WELLNESS HUB - NOTFALL GIT RESET
echo ===================================
echo.

echo Wechsle ins Projektverzeichnis...
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo.
echo 1. Beende alle Git-Prozesse...
taskkill /F /IM git.exe 2>nul
taskkill /F /IM vim.exe 2>nul
taskkill /F /IM nano.exe 2>nul
timeout /t 3 /nobreak >nul

echo.
echo 2. Entferne .git Verzeichnis...
if exist ".git" (
    attrib -r -s -h ".git" /s /d
    rmdir /s /q ".git"
    if not exist ".git" (
        echo ✅ .git erfolgreich entfernt
    ) else (
        echo ❌ .git konnte nicht entfernt werden
        pause
        exit /b 1
    )
) else (
    echo ✅ .git bereits entfernt
)

echo.
echo 3. Neues Git-Repository erstellen...
git init
git config user.name "Toobix-bot"
git config user.email "toobix@example.com"

echo.
echo 4. Alle Dateien hinzufügen...
git add .

echo.
echo 5. Initial Commit erstellen...
git commit -m "🚨 NOTFALL RESET - Wellness Hub Framework - Frischer Start für Deployment"

echo.
echo 6. Status prüfen...
git status --short

echo.
echo 🎉 NOTFALL RESET ERFOLGREICH!
echo =============================
echo ✅ Git-Repository ist sauber
echo ✅ Alle Dateien committed
echo 🚀 Bereit für GitHub Push!
echo.
echo NÄCHSTE SCHRITTE:
echo 1. Neues GitHub Repository erstellen
echo 2. git remote add origin [URL]
echo 3. git push -u origin main
echo 4. Vercel Deployment
echo.
pause
