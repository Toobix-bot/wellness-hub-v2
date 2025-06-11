@echo off
title NOTFALL BUILD FIX
echo 🚨 NOTFALL BUILD FIX - Pushe Korrektur sofort!
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo.
echo 1. Beende alle Git-Prozesse...
taskkill /F /IM git.exe >nul 2>&1
timeout /t 2 /nobreak >nul

echo.
echo 2. Git Status prüfen...
git status --porcelain

echo.
echo 3. Alle Änderungen hinzufügen...
git add .

echo.
echo 4. Commit erstellen...
git commit -m "🔧 HOTFIX: Remove use client from generateStaticParams - Fix Vercel build"

echo.
echo 5. Zu GitHub pushen...
git push

echo.
echo ✅ KORREKTUR GEPUSHT!
echo 🔄 Vercel wird automatisch neu builden!
echo ⏳ Warte 2-3 Minuten für neuen Build...
echo.
pause
