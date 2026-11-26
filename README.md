# China to Zambia Shipping — REAL, NO DEMO — Deploy to GitHub + Vercel

## This version is REAL
- NO demo accounts, NO demo parcels, NO demo tracking numbers, NO demo customer codes, NO pre-filled logins, NO fake parcels.
- Database starts EMPTY. First real signup / first real order creates the first real code / tracking number.
- Stats on Home are your real business totals: 21,050 / 21,046+ / 100+ — editable only in Admin > Settings. They do NOT reset to 0.
- Verification codes: generated per signup, 6 digits, 10 min expiry. This STATIC file cannot send real email by itself — see Email section below. Use Test Mode ON for testing, OFF for live.

## Deploy — GitHub
1. github.com → New repository → `china-zambia-shipping` → Create (empty)
2. Unzip this folder on your computer, then:
```
git init
git add .
git commit -m "China to Zambia shipping - real version"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/china-zambia-shipping.git
git push -u origin main
```

## Deploy — Vercel
1. vercel.com → Add New → Project → Import `china-zambia-shipping`
2. Framework: Other (static) — Build Command: empty — Output: empty
3. Deploy → https://china-zambia-shipping.vercel.app
4. Every push to `main` auto-redeploys.

## Email — MUST DO for real verification codes
Static sites cannot send email alone. You need Resend + a Vercel Function:
1. resend.com → API Key
2. In Vercel project → Settings → Environment Variables: RESEND_API_KEY, FROM_EMAIL
3. Add `/api/send-code.js` (see BACKEND-NEXT-STEPS.md for full code) — it calls Resend to email the 6-digit code.
4. In site: Admin → Email Settings → Provider Resend → From Email → Save → Test Email
5. Turn Test Mode OFF for live.

## First steps after deploy
1. Admin: use red circle in menu (wait 15s) → create first Admin → login with Email Code + Authenticator
2. Admin → Settings: office address, WhatsApp, Facebook/TikTok/Instagram, Stats
3. Admin → Email Settings: connect Resend, test
4. Test Customer signup with your own email
5. Test Staff signup → Admin approves → Staff login via green circle
6. Test New Order → tracking only appears AFTER save → Track it → Order Pickup → Pay → Pickup form (Name, Surname, NRC, Phone) → Approve

## Features
Home, Buy from us → felixglobalstore.com, CBM Calculator, Track, Customer (In Transit/Delivered/Unpaid/Action/All), Staff (approval, Ship/New Order, Order Pickup), Admin (dashboard, staff approval, 10-stage updates, Order Pickup, PDF/Excel downloads), Order Pickup (search tracking, PAID/NOT PAID, Pay, Proceed blocked if unpaid, pickup form required), Menu circles: black/purple/pink do nothing, green=Staff instant, red=Admin after 15s.
