import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { GET, POST } from "../app/api/enquiry/route.js";

async function jsonPost(payload) {
  return POST(
    new Request("http://localhost/api/enquiry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
  );
}

async function runApiTests() {
  const originalKey = process.env.RESEND_API_KEY;
  const originalTo = process.env.ENQUIRY_TO_EMAIL;

  delete process.env.RESEND_API_KEY;
  delete process.env.ENQUIRY_TO_EMAIL;
  let response = await jsonPost({
    name: "Demo Owner",
    email: "owner@example.com",
    phone: "9999999999",
    message: "Need a PG management demo"
  });
  assert.equal(response.status, 503, "missing email config should return 503");

  process.env.RESEND_API_KEY = "test_key";
  process.env.ENQUIRY_TO_EMAIL = "owner@example.com";

  response = await jsonPost({
    name: "Demo Owner",
    email: "bad-email",
    phone: "9999999999",
    message: "Need a PG management demo"
  });
  assert.equal(response.status, 400, "invalid email should return 400");

  response = await jsonPost({ website: "bot-field" });
  assert.equal(response.status, 200, "honeypot submissions should be ignored safely");

  response = await GET();
  assert.equal(response.status, 405, "GET should return 405");
  assert.equal(response.headers.get("allow"), "POST", "GET should expose Allow header");

  if (originalKey) process.env.RESEND_API_KEY = originalKey;
  if (originalTo) process.env.ENQUIRY_TO_EMAIL = originalTo;
}

async function runSourceTests() {
  const page = await readFile("app/page.jsx", "utf8");
  const css = await readFile("app/globals.css", "utf8");
  const layout = await readFile("app/layout.jsx", "utf8");

  assert.match(page, /The Smart Way to Manage Your PG/, "hero headline should use the requested PG-management copy");
  assert.match(page, /index === 1 \|\| index === 2 \? "hero-highlight" : ""/, "Smart Way words should be highlighted");
  assert.doesNotMatch(page, /Run your PG business without spreadsheets/, "old hero headline should not return");
  assert.match(page, /hero-console/, "hero should include PG operations console preview");
  assert.match(page, /Operations Overview|Total PGs|Occupancy health|Pending rent|UPI payment received/, "hero should show PG management dashboard signals");
  assert.doesNotMatch(page, /<span>StayGrid PG<\/span>\s*<strong>Operations Overview<\/strong>/, "console title label should be removed");
  const consoleFlow = page.match(/<div className="console-flow">([\s\S]*?)<\/div>\s*<\/div>\s*<\/div>\s*<\/div>\s*<div className="phone-showcase/)?.[1] || "";
  assert.doesNotMatch(consoleFlow, /Complaint assigned/, "hero console complaint row should be removed");
  assert.doesNotMatch(page + css, /hero-badge|PG owner dashboard/, "hero badge should not be present");
  assert.doesNotMatch(page, /Akash/, "phone preview should not mention Akash");
  assert.match(page, /className="nav-cta" href="#enquiry"/, "desktop enquiry CTA should be inside centered nav pill");
  assert.doesNotMatch(page, /<span className="brand-mark">S<\/span>/, "mobile and tablet brand should not show the round S icon");
  assert.match(page, /import logo from "\.\/assets\/logo\/logo\.png"/, "navbar should use the uploaded logo asset");
  assert.match(page, /className="brand-logo-image" src=\{logo\.src\}/, "navbar should render image logo instead of text brand");
  assert.doesNotMatch(page, /<span>Stack<\/span>/, "navbar should not render the Stack name stack");
  assert.match(layout, /url:\s*"\/favicon\.ico"/, "metadata should expose the ICO favicon");
  assert.match(layout, /shortcut:\s*"\/favicon\.ico"/, "browser shortcut icon should use favicon.ico");
  assert.match(layout, /apple:\s*"\/apple-icon\.png"/, "Apple touch icon should use the logo image");
  assert.match(page, /className=\{`menu-btn \$\{menuOpen \? "open" : ""\}`\}[\s\S]*?<span \/>\s*<span \/>/s, "mobile menu button should render three-bar hamburger structure");
  assert.match(page, /site-header \$\{menuOpen \? "menu-active" : ""\}/, "header should expose active menu state");
  assert.match(page, /const navLinks = \["Dashboard", "Features", "Security", "Reviews"\]/, "center nav should not include enquiry");
  assert.doesNotMatch(page, /Secure enquiry flow for Vercel hosting/, "footer should not show technical hosting copy");
  assert.doesNotMatch(page, /hello@stackpg\.com/, "mobile menu should not show email address");
  assert.doesNotMatch(page, /hero-trust|hero-stats|className="eyebrow"/, "removed hero chips, stat cards, and eyebrow badge should not return");
  assert.doesNotMatch(page + css, /\bprice\b|\bplans\b|TODO|console\.log|Runevery/i, "source should not contain pricing, placeholders, or broken hero text");
  assert.match(css, /\.hero-title\s*\{[^}]*clamp\(/s, "hero title should use responsive clamp sizing");
  assert.match(css, /\.word\s*\{[^}]*margin-right/s, "hero word reveal should preserve visible spacing");
  assert.match(css, /\.hero-highlight\s*\{[^}]*background:\s*linear-gradient\(90deg,[^}]*-webkit-background-clip:\s*text/s, "Smart Way highlight should use smooth gradient text");
  assert.doesNotMatch(css, /\.hero-highlight::after/, "Smart Way highlight should not use an underline accent");
  assert.match(css, /\.cta-btn\s*\{[^}]*background:\s*var\(--ink\)[^}]*color:\s*var\(--paper\)/s, "primary hero CTA should have strong contrast");
  assert.match(css, /\.ghost-link\s*\{[^}]*border:[^}]*background:\s*rgba\(255,255,255,.6\)/s, "secondary hero CTA should be button-like and visible");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.hero-actions\s*\{[^}]*grid-template-columns:\s*minmax\(0,\s*1fr\)\s*minmax\(0,\s*\.95fr\)/s, "mobile hero CTAs should stay in one row");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.cta-circle\s*\{[^}]*flex:\s*0 0 34px/s, "mobile CTA arrow circle should not shrink");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.ghost-link\s*\{[^}]*white-space:\s*nowrap/s, "mobile secondary CTA should not wrap awkwardly");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.hero-layout\s*\{[^}]*gap:\s*22px/s, "mobile hero should keep balanced space above dashboard preview");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.hero-copy\s*\{[^}]*text-align:\s*center/s, "mobile and tablet hero copy should be centered");
  assert.doesNotMatch(css, /\.brand span:last-child\s*\{[^}]*display:\s*none/s, "mobile brand name should remain visible");
  assert.match(css, /\.hero-console\s*\{[^}]*width:\s*min\(100%,\s*610px\)/s, "console preview should have stable desktop width");
  assert.match(css, /@media \(min-width: 760px\) and \(max-width: 1100px\)\s*\{[\s\S]*?\.dashboard-grid\s*\{[^}]*grid-template-columns:\s*1fr/s, "tablet dashboard previews should stack cleanly");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.metric-grid\s*\{[^}]*grid-template-columns:\s*repeat\(2,\s*minmax\(0,\s*1fr\)\)/s, "mobile dashboard metric cards should stay 2x2");
  assert.match(css, /\.phone-showcase\s*\{[^}]*display:\s*none/s, "old phone preview should be hidden");
  assert.match(css, /@media \(min-width: 981px\)\s*\{[\s\S]*?\.hero\s*\{[^}]*height:\s*100vh[^}]*min-height:\s*760px/s, "desktop hero should reserve a full usable first viewport");
  assert.match(css, /@media \(min-width: 981px\)\s*\{[\s\S]*?\.hero-inner\s*\{[^}]*align-items:\s*start[^}]*padding-top:\s*150px/s, "desktop hero content should not have excessive top whitespace");
  assert.match(css, /@media \(min-width: 981px\)\s*\{[\s\S]*?\.hero-layout\s*\{[^}]*transform:\s*translateY\(-92px\)/s, "desktop hero layout should be pulled up to remove dead top space");
  assert.match(css, /@media \(max-width: 520px\)\s*\{[\s\S]*?\.console-kpis\s*\{[^}]*grid-template-columns:\s*repeat\(2/s, "console preview should adapt for mobile");
  assert.doesNotMatch(css, /height:\s*clamp\(540px,\s*calc\(100svh - 170px\),\s*650px\)/, "old overflowing large-desktop phone size should not return");
  assert.match(css, /\.hero-media\s*\{[^}]*#f8fcff[^}]*#edf7ff/s, "hero background should use app-style blue-white colors");
  assert.match(css, /@keyframes consoleFloat/, "console preview should have CSS animation");
  assert.match(css, /@keyframes ringPulse/, "occupancy ring should have CSS animation");
  assert.match(css, /\.site-header\s*\{[^}]*justify-content:\s*center/s, "desktop navbar should be centered");
  assert.match(css, /\.nav-pill\s*\{[^}]*display:\s*flex/s, "desktop navbar should be visible by default");
  assert.match(css, /\.desktop-brand,\s*\.header-cta\s*\{[^}]*display:\s*none/s, "desktop should use a single centered nav pill");
  assert.match(css, /\.nav-cta\s*\{[^}]*background:\s*var\(--paper\)/s, "desktop enquiry CTA should be inside nav pill");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.site-header\s*\{[^}]*background:\s*rgba\(17,17,17,.92\)/s, "mobile and tablet navbar should use a dark readable background");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.site-header\s*\{[^}]*border-radius:\s*0/s, "mobile and tablet navbar should not have rounded corners");
  assert.match(css, /\.brand-logo-image\s*\{[^}]*width:\s*44px[^}]*height:\s*44px[^}]*object-fit:\s*contain/s, "navbar logo image should have stable dimensions");
  assert.doesNotMatch(css, /content:\s*"Stack"|brandShine|brandGlitter|brandSpark/, "navbar CSS should not recreate the Stack text effect");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.desktop-brand\s*\{[^}]*width:\s*48px[^}]*height:\s*48px/s, "mobile and tablet logo should be prominent");
  assert.match(css, /\.menu-btn\s*\{[^}]*border:\s*0[^}]*border-radius:\s*0[^}]*background:\s*transparent/s, "mobile hamburger should not have a background surface");
  assert.match(css, /\.menu-btn span,\s*\.menu-btn::before\s*\{[^}]*width:\s*27px[^}]*height:\s*3px[^}]*background:\s*var\(--blue\)/s, "mobile hamburger bars should match the brand color");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.menu-panel\s*\{[^}]*left:\s*0[^}]*right:\s*0[^}]*width:\s*auto/s, "mobile and tablet menu panel should align with the dark navbar");
  assert.match(css, /\.menu-panel\s*\{[^}]*border-radius:\s*0/s, "mobile menu panel should not have rounded corners");
  assert.match(css, /\.menu-panel a\s*\{[^}]*font-size:\s*24px/s, "mobile menu links should be sized close to the brand");
  assert.match(css, /\.menu-panel a\[href="#enquiry"\]\s*\{[^}]*background:\s*transparent[^}]*color:\s*var\(--blue\)/s, "mobile menu enquiry link should be highlighted by color only");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.review-grid\s*\{[^}]*overflow-x:\s*auto[^}]*scroll-snap-type:\s*x mandatory/s, "mobile and tablet reviews should be swipeable");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.review-card\s*\{[^}]*scroll-snap-align:\s*start/s, "review cards should snap while swiping");
  assert.match(css, /\.site-header\.menu-active \.brand\s*\{[^}]*color:\s*var\(--paper\)/s, "mobile open menu should keep brand text visible");
  assert.match(css, /\.menu-btn\s*\{[^}]*display:\s*none/s, "hamburger should be hidden on desktop");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.nav-pill\s*\{[^}]*display:\s*none/s, "tablet/mobile should hide desktop nav");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.header-cta\s*\{[^}]*display:\s*none/s, "tablet/mobile should hide desktop CTA");
  assert.match(css, /@media \(max-width: 980px\)\s*\{[\s\S]*?\.menu-btn\s*\{[^}]*display:\s*grid/s, "tablet/mobile should show hamburger");
  assert.doesNotMatch(css, /hero-trust|\.eyebrow|\.hero-stats|\.stat\s*\{|occupancy-orbit|bed-grid|revenue-strip|activity-rail/, "removed hero UI CSS should not remain");
  assert.match(css, /@media \(max-width: 520px\)/, "mobile breakpoint should exist");
  assert.match(css, /@media \(max-width: 980px\)/, "tablet breakpoint should exist");
  assert.match(css, /@media \(min-width: 1800px\)/, "large desktop breakpoint should exist");
  assert.match(css, /@media \(min-width: 2600px\)/, "4K breakpoint should exist");
}

await runApiTests();
await runSourceTests();
console.log("All project tests passed.");
