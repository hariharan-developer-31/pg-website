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
    name: "John Doe",
    email: "john@example.com",
    phone: "9876543210",
    service: "Web Application",
    budget: "₹50,000 – ₹1,00,000",
    message: "Need a custom SaaS dashboard"
  });
  assert.equal(response.status, 503, "missing email config should return 503");

  process.env.RESEND_API_KEY = "test_resend_key";
  process.env.ENQUIRY_TO_EMAIL = "founder@stackwebapp.in";

  response = await jsonPost({
    name: "John Doe",
    email: "invalid-email-format",
    phone: "9876543210",
    service: "Web Application",
    message: "Need a custom webapp"
  });
  assert.equal(response.status, 400, "invalid email should return 400");

  response = await jsonPost({ website: "bot-trap-value" });
  assert.equal(response.status, 200, "honeypot submissions should return 200 safely");

  response = await GET();
  assert.equal(response.status, 405, "GET should return 405");
  assert.equal(response.headers.get("allow"), "POST", "GET should expose Allow: POST header");

  if (originalKey) process.env.RESEND_API_KEY = originalKey;
  if (originalTo) process.env.ENQUIRY_TO_EMAIL = originalTo;
}

async function runSourceTests() {
  const page = await readFile("app/page.jsx", "utf8");
  const css = await readFile("app/globals.css", "utf8");
  const layout = await readFile("app/layout.jsx", "utf8");
  const robots = await readFile("app/robots.js", "utf8");
  const sitemap = await readFile("app/sitemap.js", "utf8");

  // 1. BRAND PRESERVATION TESTS
  assert.match(page, /import logo from "\.\/assets\/logo\/logo\.png"/, "navbar must use the original logo asset");
  assert.match(page, /className="brand-logo-image"[\s\S]*?src=\{logo\.src\}/, "navbar must render image logo instead of text replacement");
  assert.match(layout, /url:\s*"\/favicon\.ico"/, "metadata must expose favicon.ico");
  assert.match(layout, /shortcut:\s*"\/favicon\.ico"/, "browser shortcut must use favicon.ico");
  assert.match(layout, /apple:\s*"\/apple-icon\.png"/, "apple touch icon must be present");

  // Color variables in globals.css
  assert.match(css, /--ink:\s*#111111/, "brand --ink color must be preserved");
  assert.match(css, /--paper:\s*#F4F1E8/, "brand --paper color must be preserved");
  assert.match(css, /--blue:\s*#75C5DE/, "brand --blue color must be preserved");
  assert.match(css, /--green:\s*#8CC8A8/, "brand --green color must be preserved");
  assert.match(css, /--coral:\s*#F08C76/, "brand --coral color must be preserved");
  assert.match(css, /font-family:\s*"Inter"/, "Inter typography must be preserved");

  // UI Components
  assert.match(css, /\.splash\s*\{/, "brand curtain splash opening animation must be present");
  assert.match(css, /\.nav-pill\s*\{/, "desktop centered nav pill must be preserved");
  assert.match(css, /\.menu-btn\s*\{/, "mobile hamburger menu must be preserved");
  assert.match(css, /\.cta-btn\s*\{/, "cta-btn pill button style must be preserved");
  assert.match(css, /\.ghost-link\s*\{/, "ghost-link button style must be preserved");
  assert.match(css, /\.hero-console\s*\{/, "hero console visual container must be preserved");

  // 2. SEO & METADATA TESTS
  assert.match(layout, /StackWebApp \| Website, Web App & Software Development Company/, "SEO title must match master prompt");
  assert.match(layout, /StackWebApp builds professional business websites, custom web applications/, "SEO description must match master prompt");
  assert.match(robots, /userAgent:\s*"\*"/, "robots.txt rules must allow search engines");
  assert.match(sitemap, /https:\/\/stackwebapp\.in/, "sitemap must include canonical domain");

  // 3. HOMEPAGE 11 SECTIONS VERIFICATION
  // Section 1: Hero
  assert.match(page, /Ideas In\. Innovation Out\./, "hero heading must match master prompt");
  assert.doesNotMatch(page, /hero-eyebrow|DIGITAL ENGINEERING & DEVELOPMENT STUDIO/, "hero eyebrow must be removed as requested");
  assert.doesNotMatch(page, /hero-highlights|Custom-Built Solutions/, "hero highlights must be removed as requested");
  assert.match(page, /growth-visualizer|growth-shell/, "hero must include the animated business growth visualizer");
  assert.match(page, /Before Website|After StackWebApp Launch|\+340% Revenue Growth/, "growth visualizer must illustrate before vs after website sales growth");
  assert.match(page, /Start Your Project/, "hero primary CTA must be Start Your Project");
  assert.match(page, /Explore Our Work/, "hero secondary CTA must be Explore Our Work");

  // Section 2: Trust / Value Proposition (Animated pillar flow)
  assert.match(page, /Technology Built Around Your Business\./, "section 2 heading must match");
  assert.match(page, /value-pillar-card/, "value cards must use the animated pillar cards");
  assert.match(page, /Business-Focused Solutions/, "section 2 must include Business-Focused Solutions");
  assert.match(page, /Performance & Security/, "section 2 must include Performance & Security");
  assert.match(page, /Built to Scale/, "section 2 must include Built to Scale");

  // Section 3: Our Services (6 services with minimal content & icons)
  assert.match(page, /Everything You Need to Build Your Digital Future\./, "section 3 heading must match");
  assert.match(page, /service-icon-wrap/, "service cards must include dedicated icon wrappers");
  assert.match(page, /Business Website Development/, "service 1 must be Business Website Development");
  assert.match(page, /Custom Web Application Development/, "service 2 must be Custom Web Application Development");
  assert.match(page, /E-commerce Website Development/, "service 3 must be E-commerce Website Development");
  assert.match(page, /Mobile Application Development/, "service 4 must be Mobile Application Development");
  assert.match(page, /SaaS & Software Development/, "service 5 must be SaaS & Software Development");
  assert.match(page, /AI Integration & Business Automation/, "service 6 must be AI Integration & Business Automation");

  // Section 4: Why Choose StackWebApp
  assert.match(page, /More Than Development\. We're Your Technology Partner\./, "section 4 heading must match");
  assert.match(page, /Custom Development/, "advantage 1 must be Custom Development");
  assert.match(page, /Modern UI\/UX/, "advantage 2 must be Modern UI/UX");
  assert.match(page, /Performance First/, "advantage 3 must be Performance First");
  assert.match(page, /Secure Architecture/, "advantage 4 must be Secure Architecture");
  assert.match(page, /Scalable Solutions/, "advantage 5 must be Scalable Solutions");
  assert.match(page, /Ongoing Support/, "advantage 6 must be Ongoing Support");

  // Section 5: Development Process (Animative step-by-step flow)
  assert.match(page, /From Idea to Launch\. We Make It Happen\./, "section 5 heading must match");
  assert.match(page, /process-flow-track/, "step-by-step flow track must be present");
  assert.match(page, /DISCOVER/, "process step 1 must be DISCOVER");
  assert.match(page, /PLAN & DESIGN/, "process step 2 must be PLAN & DESIGN");
  assert.match(page, /DEVELOP/, "process step 3 must be DEVELOP");
  assert.match(page, /TEST & DEPLOY/, "process step 4 must be TEST & DEPLOY");
  assert.match(page, /SUPPORT & SCALE/, "process step 5 must be SUPPORT & SCALE");

  // Section 6: Our Work / Portfolio
  assert.match(page, /Ideas Turned Into Digital Solutions\./, "section 6 heading must match");
  assert.match(page, /All Projects/, "portfolio filter must include All Projects");
  assert.match(page, /Corporate Business Website/, "project 1 must be Corporate Business Website");
  assert.match(page, /E-commerce Shopping Platform/, "project 2 must be E-commerce Shopping Platform");
  assert.match(page, /PG Management System/, "project 3 must be PG Management System");
  assert.match(page, /Vehicle Service Management System/, "project 4 must be Vehicle Service Management System");
  assert.match(page, /SaaS Business Dashboard/, "project 5 must be SaaS Business Dashboard");
  assert.match(page, /Campaign Management Web Application/, "project 6 must be Campaign Management Web Application");
  assert.match(page, /On-Demand Delivery & Booking App/, "mobile application project must be present");
  assert.match(page, /Health & Fitness Member App/, "mobile fitness project must be present");

  // Tech stack section removed as requested
  assert.doesNotMatch(page, /Powered by Modern Technologies\./, "tech stack section must be removed as requested");
  assert.doesNotMatch(page, /id="tech-stack"/, "tech-stack id must be removed");

  // Section 8: Industries We Serve
  assert.match(page, /Digital Solutions for Every Industry\./, "section 8 heading must match");
  assert.match(page, /Retail & E-commerce/, "industry 1 must be Retail & E-commerce");
  assert.match(page, /Healthcare & Wellness/, "industry 2 must be Healthcare & Wellness");
  assert.match(page, /Education & Training/, "industry 3 must be Education & Training");
  assert.match(page, /Hospitality & Accommodation/, "industry 4 must be Hospitality & Accommodation");
  assert.match(page, /Automotive & Vehicle Services/, "industry 5 must be Automotive & Vehicle Services");
  assert.match(page, /Startups & Professional Services/, "industry 6 must be Startups & Professional Services");

  // Section 9: FAQ
  assert.match(page, /Frequently Asked Questions\./, "section 9 heading must match");
  assert.match(page, /What types of websites do you develop\?/, "FAQ 1 must be present");
  assert.match(page, /Can you develop custom web applications\?/, "FAQ 2 must be present");
  assert.match(page, /Do you develop e-commerce websites\?/, "FAQ 3 must be present");
  assert.match(page, /Can you redesign my existing website\?/, "FAQ 4 must be present");
  assert.match(page, /Do you provide mobile application development\?/, "FAQ 5 must be present");
  assert.match(page, /How long does a development project take\?/, "FAQ 6 must be present");
  assert.match(page, /Do you provide maintenance and support\?/, "FAQ 7 must be present");
  assert.match(page, /How can I get a quotation\?/, "FAQ 8 must be present");

  // Section 10: Final CTA & Contact Form
  assert.match(page, /Have an Idea\? Let's Build Something Powerful\./, "section 10 heading must match");
  assert.match(page, /name="businessName"/, "form must include businessName field");
  assert.match(page, /name="service"/, "form must include service select field");
  assert.match(page, /name="budget"/, "form must include budget select field");
  assert.doesNotMatch(page, /placeholder=/, "form inputs must not have placeholders for minimal design");
  assert.match(page, /Let's Discuss Your Project/, "submit button text must match master prompt");
  assert.match(page, /Chat on WhatsApp/, "WhatsApp action must be present");

  // Section 11: Footer
  assert.match(page, /© \{new Date\(\)\.getFullYear\(\)\} StackWebApp\. All Rights Reserved\./, "footer copyright must match");
  assert.match(page, /Building Digital Experiences\. Engineering Business Growth\./, "footer must include tagline");
}

async function run() {
  await runApiTests();
  await runSourceTests();
  console.log("All StackWebApp redesign project tests passed successfully.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
