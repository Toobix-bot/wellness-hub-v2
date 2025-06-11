#!/bin/bash
# FORCE VERCEL REDEPLOY SCRIPT
# This script creates a minimal change to trigger Vercel to redeploy with latest code

cd "c:\Users\micha\NEU\NEU_V1\Fourcen"

# Add a deployment timestamp to force Vercel refresh
echo "# DEPLOYMENT TRIGGER - $(date)" >> .vercel-trigger

# Git operations
git add .
git commit -m "FORCE VERCEL REBUILD - Fix build errors with latest code $(date)"
git push origin main

echo "✅ FORCED PUSH COMPLETED - Vercel should now use latest code"
echo "🔄 Please check Vercel dashboard for new deployment"

exit 0
