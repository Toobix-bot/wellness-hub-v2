@echo off
echo 🔧 BUILD FIX - Pushe Korrektur zu GitHub
cd /d "c:\Users\micha\NEU\NEU_V1\Fourcen"
git add .
git commit -m "🔧 Fix Next.js build error - Remove use client from generateStaticParams page"
git push
echo ✅ Korrektur gepusht!
pause
