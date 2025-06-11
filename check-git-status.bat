@echo off
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"
echo === CURRENT DIRECTORY ===
cd
echo.
echo === GIT STATUS ===
git status --short
echo.
echo === LAST 3 COMMITS ===
git log --oneline -3
echo.
echo === REMOTE STATUS ===
git remote -v
echo.
echo === CURRENT BRANCH ===
git branch -v
echo.
echo === PUSH STATUS ===
git log --oneline origin/main..HEAD
pause
