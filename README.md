# Stack PG Management Next.js Website

Next.js PG management webapp showcase with a Vercel-ready enquiry API route.

## Files

- `app/page.jsx` - full responsive website and enquiry form
- `app/globals.css` - global design system and animations
- `app/api/enquiry/route.js` - server-side email sender for Vercel
- `package.json` - Next.js scripts

## Vercel Email Setup

Add these environment variables in Vercel Project Settings:

```txt
RESEND_API_KEY=your_resend_api_key
ENQUIRY_TO_EMAIL=your-receiving-email@example.com
ENQUIRY_FROM_EMAIL=Your Brand <noreply@yourdomain.com>
```

`ENQUIRY_FROM_EMAIL` should use a sender/domain verified in Resend. The API key stays server-side and is never exposed in the browser.

## Local Preview

Install dependencies, then run:

```bash
npm install
```

```bash
npm run dev
```
