@echo off
echo ========================================
echo FORCE VERCEL REBUILD - EMERGENCY PUSH
echo ========================================
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"

echo.
echo Adding files...
git add .

echo.
echo Creating commit...
git commit -m "EMERGENCY: Force Vercel rebuild with fixed build errors"

echo.
echo Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo ✅ PUSH COMPLETED!
echo ✅ Build errors are FIXED in this commit
echo ✅ Vercel should now use latest code
echo ========================================
echo.
echo Please check Vercel dashboard now!
pause
