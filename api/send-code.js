// /api/send-code.js - Vercel Serverless Function - Resend
// Env Vars in Vercel: RESEND_API_KEY, FROM_EMAIL
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  try {
    const { email, code } = req.body || {};
    if (!email || !code) return res.status(400).json({ error: 'Missing email or code' });
    if (!process.env.RESEND_API_KEY) return res.status(500).json({ error: 'RESEND_API_KEY not set in Vercel' });
    const from = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: email,
        subject: 'Your Verification Code - China to Zambia Shipping',
        html: `<div style="font-family:Arial;padding:20px"><h2>China to Zambia Shipping</h2><p>Your verification code is:</p><h1 style="font-size:36px;letter-spacing:4px">${code}</h1><p>It expires in 10 minutes.</p><p>If you did not request this, ignore this email.</p></div>`,
        text: `Your verification code is: ${code}. It expires in 10 minutes.`
      })
    });
    const data = await r.json();
    if (!r.ok) return res.status(500).json({ error: data?.message || 'Resend failed', data });
    return res.status(200).json({ ok: true, id: data.id });
  } catch (e) {
    return res.status(500).json({ error: String(e.message || e) });
  }
}
