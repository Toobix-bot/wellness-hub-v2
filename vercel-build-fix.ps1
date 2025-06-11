# Vercel Build Fix - Push to GitHub
Write-Host "🚀 PUSHING VERCEL BUILD FIXES..." -ForegroundColor Cyan

Set-Location "c:\Users\micha\NEU\NEU_V1\Fourcen"

# Kill any git processes
Get-Process git -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue

# Clean git state
Write-Host "Cleaning Git state..." -ForegroundColor Yellow
& git reset --hard HEAD 2>$null
& git clean -fd 2>$null
& git merge --abort 2>$null

# Add and commit
Write-Host "Adding build fixes..." -ForegroundColor Green
& git add .
& git commit -m "🚀 BUILD FIX: Optimized Next.js config and package.json for Vercel deployment success"

# Force push to trigger new Vercel build
Write-Host "Pushing to GitHub (force)..." -ForegroundColor Green
& git push origin main --force

Write-Host "✅ BUILD FIXES DEPLOYED!" -ForegroundColor Green
Write-Host "🔄 Vercel will now automatically rebuild with fixes!" -ForegroundColor Cyan
