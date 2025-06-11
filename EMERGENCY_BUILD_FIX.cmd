@echo off
title EMERGENCY BUILD FIX
color 0C
cls

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║        🚨 EMERGENCY BUILD FIX - SOFORT AKTION        ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.
echo PROBLEM: Vercel buildet noch alten Code mit 'use client' Fehler
echo LÖSUNG: Pushe Korrekturen SOFORT zu GitHub
echo.

cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo [1/5] Git-Prozesse beenden...
taskkill /F /IM git.exe >nul 2>&1
timeout /t 1 /nobreak >nul

echo [2/5] Alle Änderungen hinzufügen...
git add .
if %errorlevel% neq 0 (
    echo ❌ Git Add fehlgeschlagen
    pause
    exit /b 1
)

echo [3/5] Commit mit Build-Fix...
git commit -m "🔧 EMERGENCY: Fix use client generateStaticParams conflict - Remove use client directive"
if %errorlevel% neq 0 (
    echo ❌ Commit fehlgeschlagen
    pause
    exit /b 1
)

echo [4/5] Zu GitHub pushen...
git push
if %errorlevel% neq 0 (
    echo ❌ Push fehlgeschlagen
    pause
    exit /b 1
)

echo [5/5] Status prüfen...
git log --oneline -n 2

echo.
echo  ╔═══════════════════════════════════════════════════════╗
echo  ║               🎉 EMERGENCY FIX GEPUSHT! 🎉           ║
echo  ╚═══════════════════════════════════════════════════════╝
echo.
echo ✅ Korrekturen sind auf GitHub
echo 🔄 Vercel startet automatisch neuen Build
echo ⏳ Warte 3-4 Minuten für erfolgreichen Build
echo 🌐 Dann: Live-URL verfügbar!
echo.
echo Gehe zu Vercel und warte auf "Build successful"!
echo.
pause
