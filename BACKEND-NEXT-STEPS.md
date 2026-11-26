# Backend Next Steps — Real Email + Real Database for Production

This static export stores data in the browser (localStorage) for the demo deploy. For REAL production with many accounts:

## 1. Real Email — Vercel Function /api/send-code.js
```js
// /api/send-code.js — Vercel Serverless Function
export default async function handler(req,res){
  const {email, code} = req.body;
  const r = await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},
    body: JSON.stringify({from: process.env.FROM_EMAIL, to: email, subject:'Your Verification Code - China to Zambia Shipping', html:`<p>Your verification code is: <b>${code}</b></p><p>Expires in 10 minutes.</p>`})
  });
  const data = await r.json();
  res.status(r.ok?200:500).json(data);
}
```
Set in Vercel: RESEND_API_KEY, FROM_EMAIL. Then change sendCode() in index.html to POST to /api/send-code instead of only generating locally.

## 2. Real Database — Supabase (Postgres)
Tables: users, staff, orders/parcels, pickup_logs, email_logs.
- Passwords: bcrypt hash, never plain.
- Customer code: unique 8-char, DB unique constraint.
- Tracking: unique, DB unique constraint.
- lastActiveAt: update on every login/action.
- Use Row Level Security + Supabase Auth for production.

## 3. Do NOT commit secrets
Never put RESEND_API_KEY in index.html or GitHub. Use Vercel Env Vars only.
