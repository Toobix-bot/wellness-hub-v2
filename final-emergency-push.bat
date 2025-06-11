@echo off
cls
echo ========================================
echo    EMERGENCY VERCEL REBUILD SCRIPT
echo ========================================
echo.

REM Zum Projektverzeichnis wechseln
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo Aktuelles Verzeichnis:
cd
echo.

echo Teste Build...
call npm run build
if errorlevel 1 (
    echo FEHLER: Build fehlgeschlagen!
    pause
    exit /b 1
)

echo.
echo ✅ BUILD ERFOLGREICH!
echo.

echo Fuege Dateien hinzu...
git add .

echo.
echo Erstelle Commit...
git commit -m "EMERGENCY VERCEL FIX: Build errors resolved - force rebuild"

echo.
echo Pushe zu GitHub...
git push origin main

echo.
echo ========================================
echo ✅ PUSH ABGESCHLOSSEN!
echo ✅ Build-Fehler sind BEHOBEN!
echo ✅ Vercel sollte jetzt neuesten Code verwenden!
echo ========================================
echo.
echo Bitte pruefe jetzt das Vercel Dashboard!
pause
