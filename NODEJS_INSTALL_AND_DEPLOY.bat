@echo off
cls
echo =====================================
echo   NODE.JS INSTALLATION + SOFORT DEPLOY
echo =====================================
echo.

echo Schritt 1: Warte bis Node.js Installation fertig ist...
echo.

:check_node
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js noch nicht verfuegbar... warte 5 Sekunden
    timeout /t 5 /nobreak >nul
    goto check_node
)

echo ✅ Node.js erfolgreich installiert!
node --version

echo.
echo Schritt 2: Gehe zum Projektverzeichnis...
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo.
echo Schritt 3: Installiere Dependencies...
npm install

echo.
echo Schritt 4: Teste Build...
npm run build

if errorlevel 1 (
    echo ❌ BUILD FEHLER - Check die Logs oben
    pause
    exit /b 1
)

echo.
echo ✅ BUILD ERFOLGREICH!
echo.

echo Schritt 5: Git Push für Vercel...
git add .
git commit -m "NODE.JS INSTALLED - Build ready for Vercel deployment"
git push origin main

echo.
echo =======================================
echo ✅ ALLES FERTIG FÜR VERCEL DEPLOYMENT!
echo ✅ Node.js installiert
echo ✅ Dependencies installiert  
echo ✅ Build erfolgreich getestet
echo ✅ Code zu GitHub gepusht
echo =======================================
echo.
echo 🚀 Jetzt kannst du zu Vercel gehen und deployten!
echo 📝 Siehe SCHRITT_2_VISUELL.md für Anleitung
echo.
pause
