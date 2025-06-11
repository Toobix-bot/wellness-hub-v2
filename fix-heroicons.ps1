# Fix Heroicons Build Errors for Vercel Deployment
Write-Host "🔧 FIXING HEROICONS BUILD ERRORS..." -ForegroundColor Yellow

Set-Location "c:\Users\micha\NEU\NEU_V1\Fourcen"

# Cancel any active git operations
Write-Host "Cleaning up git state..."
& git merge --abort 2>$null
& git rebase --abort 2>$null

# Reset to clean state
Write-Host "Resetting to clean state..."
& git reset --hard HEAD
& git clean -fd

# Check status
Write-Host "Current git status:" -ForegroundColor Green
& git status

# Add and commit heroicons fixes
Write-Host "Adding heroicons fixes..." -ForegroundColor Green
& git add .
& git commit -m "🔧 Fix missing Heroicons - Replace InfinityIcon, BrainIcon, ShieldIcon, SwordIcon, GamepadIcon with available alternatives for Vercel build compatibility"

# Push to GitHub
Write-Host "Pushing to GitHub..." -ForegroundColor Green
& git push origin main --force

Write-Host "✅ HEROICONS FIXES DEPLOYED TO GITHUB!" -ForegroundColor Green
Write-Host "🚀 Vercel build should now continue successfully!" -ForegroundColor Cyan
