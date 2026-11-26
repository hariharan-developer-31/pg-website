# StackWebApp – Digital Engineering & Development Studio

Redesigned corporate website and project consultation platform for **StackWebApp** (https://stackwebapp.in/).

StackWebApp positions itself as a complete technology development partner for startups, growing businesses, and enterprises—engineering custom websites, web applications, e-commerce stores, mobile applications, SaaS products, and AI automation.

---

## 🎨 Brand Identity Preserved

- **Logo**: Original high-resolution logo maintained at `app/assets/logo/logo.png`.
- **Palette**: Strict preservation of official design tokens:
  - `--ink`: `#111111`
  - `--paper`: `#F4F1E8`
  - `--mist`: `#E4E4E4`
  - `--blue`: `#75C5DE` (Primary accent)
  - `--green`: `#8CC8A8`
  - `--coral`: `#F08C76`
  - `--muted`: `#7A746F`
- **Typography**: Inter (Google Fonts) with tight display tracking.
- **Components**: Floating dark glass pill navigation (`.nav-pill`), interactive hero tech console, animated curtain splash screen, and responsive mobile menu.

---

## 📐 Homepage Structure (11 Sections)

1. **Hero**: Digital engineering eyebrow, animated word-reveal headline, tech highlights, primary CTA & high-fidelity code/dashboard console visual.
2. **Trust & Value Proposition**: 4 strategic pillars (Business-Focused, Modern Technology, Performance & Security, Built to Scale).
3. **Our Services**: 6 comprehensive service modules with interactive consultation triggers.
4. **Why Choose StackWebApp**: 6 core advantages (Custom Development, Modern UI/UX, Performance First, Secure Architecture, Scalable Solutions, Ongoing Support).
5. **Our Development Process**: 5-step transparent timeline (Discover, Plan & Design, Develop, Test & Deploy, Support & Scale).
6. **Our Work / Portfolio**: Interactive category-filtered project showcases with live metrics and concept tags.
7. **Technology Stack**: Grouped badges across Frontend, Backend, Database, Mobile, Cloud, Payments, and AI.
8. **Industries We Serve**: 6 industry applications (Retail, Healthcare, Education, Hospitality, Automotive, Startups).
9. **FAQ**: 8 expandable interactive accordions answering client concerns.
10. **Final CTA & Enquiry Form**: Server-validated form with budget tiers, services, honeypot protection, and instant WhatsApp chat action.
11. **Footer**: Preserved brand logo, comprehensive navigation columns, verified contact channels, and copyright statement.

---

## 🚀 Environment Variables (Vercel)

For live email delivery of project enquiries via Resend, configure:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
ENQUIRY_TO_EMAIL=hariharansankar4@gmail.com
ENQUIRY_FROM_EMAIL=StackWebApp <onboarding@resend.dev>
```

---

## 🛠 Local Development & Verification

Install dependencies and run:

```bash
npm install
npm test
npm run build
npm run dev
```
