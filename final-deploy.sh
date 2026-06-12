#!/bin/bash
# final-deploy.sh

set -e  # Exit on any error

echo ""
echo "╔══════════════════════════════════════╗"
echo "║   VITAL AGRO — FINAL DEPLOYMENT      ║"
echo "╚══════════════════════════════════════╝"
echo ""

# Step 1: TypeScript check
echo "🔍 Step 1/4: TypeScript check..."
npx tsc --noEmit
echo "   ✅ TypeScript OK"

# Step 2: Build
echo "🏗  Step 2/4: Building production..."
npm run build
echo "   ✅ Build successful"

# Step 3: Git
echo "📦 Step 3/4: Committing..."
git add -A

COMMIT_MSG="feat: V11 - welcome screen + truck preloader + product 3D showcase + COD page"
if [ -n "$1" ]; then COMMIT_MSG="$1"; fi

git commit -m "$COMMIT_MSG" || echo "   ℹ️  Nothing to commit"
git push origin main
echo "   ✅ Pushed to GitHub"

# Step 4: Done
echo ""
echo "╔══════════════════════════════════════╗"
echo "║   🚀 DEPLOYED SUCCESSFULLY!           ║"
echo "║   🌐 vital-agro.vercel.app           ║"
echo "║   ⏱  Live in ~60 seconds             ║"
echo "╚══════════════════════════════════════╝"
echo ""
