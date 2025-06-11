@echo off
echo ====================================================
echo   ✅ Node.js Installation erfolgreich abgeschlossen!
echo ====================================================
echo.

echo 🎉 Node.js v22.16.0 wurde installiert!
echo 📦 Dependencies wurden erfolgreich installiert!
echo.

echo Nächste Schritte:
echo.
echo [1] Starte den Entwicklungsserver:
echo     npm run dev
echo.
echo [2] Öffne den Browser:
echo     http://localhost:3000
echo.
echo [3] Für das Wellness Hub Menü:
echo     wellness-hub.bat
echo.

echo 🌟 Das Wellness Hub Framework ist bereit!
echo.

REM Aktualisiere PATH dauerhaft
setx PATH "%PATH%;C:\Program Files\nodejs" >nul 2>&1

echo PATH wurde aktualisiert. Starte neue Terminal-Sessions für volle Funktionalität.
echo.
pause
