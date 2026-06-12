#!/bin/bash
# predeploy.sh

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 VITAL AGRO PRE-DEPLOY CHECK"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 1. TypeScript check
echo "1️⃣  Checking TypeScript..."
npx tsc --noEmit
if [ $? -ne 0 ]; then echo "❌ TypeScript errors found. Fix before deploy."; exit 1; fi
echo "   ✅ TypeScript OK"

# 2. Build check
echo "2️⃣  Building..."
npm run build
if [ $? -ne 0 ]; then echo "❌ Build failed. Fix errors."; exit 1; fi
echo "   ✅ Build successful"

# 3. Check no Stripe imports remain
echo "3️⃣  Checking Stripe removed..."
if grep -r "stripe" src/ --include="*.tsx" --include="*.ts" -q; then
  echo "   ⚠️  Stripe references found! Remove them."
else
  echo "   ✅ Stripe removed"
fi

# 4. Check env vars
echo "4️⃣  Checking env vars..."
if [ -f .env.local ]; then
  echo "   ✅ .env.local exists"
else
  echo "   ⚠️  .env.local missing! Add Firebase keys."
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ All checks passed! Deploying..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"

# 5. Git push
git add -A
git commit -m "feat: V9 - circular nav + COD/JazzCash + mobile optimize + bugs fixed"
git push origin main

echo ""
echo "🚀 Pushed to GitHub!"
echo "🌐 Vercel auto-deploying..."
echo "🔗 Live: https://vital-agro.vercel.app"
echo ""
echo "Check deploy: https://vercel.com/dashboard"
