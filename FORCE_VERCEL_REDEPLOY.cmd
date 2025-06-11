@echo off
title FORCE VERCEL REDEPLOY
color 0E
cls

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║      🚀 FORCE VERCEL REDEPLOY - NEUER COMMIT         ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.
echo PROBLEM: Vercel buildet noch alten Commit e5601ee
echo LÖSUNG: Force Push + Trigger neuen Build
echo.

cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo [1/6] Dummy-Änderung für neuen Commit...
echo # Force Vercel Redeploy - %date% %time% >> .vercel-trigger

echo [2/6] Änderung hinzufügen...
git add .

echo [3/6] Force Commit erstellen...
git commit -m "🚀 FORCE REDEPLOY: Trigger Vercel to use latest commit with fixes"

echo [4/6] Force Push zu GitHub...
git push --force-with-lease

echo [5/6] GitHub Status prüfen...
git log --oneline -n 3

echo [6/6] VERCEL MANUELL TRIGGERN...
echo.
echo ⚠️  WICHTIG: Gehe JETZT zu Vercel und:
echo    1. Klicke "View Function Logs"
echo    2. Klicke "Redeploy" Button
echo    3. Wähle "Use existing Build Cache: NO"
echo    4. Klicke "Redeploy"
echo.

echo  ╔═══════════════════════════════════════════════════════╗
echo  ║            🎯 FORCE PUSH ABGESCHLOSSEN! 🎯           ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.
echo ✅ Neuer Commit mit Force Push
echo 🔄 Gehe zu Vercel Dashboard
echo 🚀 Klicke "Redeploy" für manuellen Trigger
echo ✅ Wähle neuesten Commit mit Fixes
echo.
pause
