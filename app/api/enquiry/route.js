const RESEND_API_URL = "https://api.resend.com/emails";

function clean(value, max = 1000) {
  return String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request) {
  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ENQUIRY_TO_EMAIL;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "StackWebApp Enquiry <onboarding@resend.dev>";

  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    body = {};
  }

  // Honeypot spam protection
  if (body.website) {
    return Response.json({ ok: true, message: "Enquiry received." });
  }

  const name = clean(body.name, 120);
  const businessName = clean(body.businessName, 150);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 40);
  const service = clean(body.service, 80);
  const budget = clean(body.budget, 80);
  const message = clean(body.message, 2500);

  if (!name || !email || !isEmail(email) || !phone || !message) {
    return Response.json(
      { ok: false, message: "Please fill in your name, valid email, phone number, and project details." },
      { status: 400 }
    );
  }

  // If email configuration is missing, safely log or return configured response
  if (!resendKey || !toEmail) {
    return Response.json(
      { ok: false, message: "Email service is not configured yet. Please contact us directly via email or WhatsApp." },
      { status: 503 }
    );
  }

  const html = `
    <div style="font-family:'Inter',system-ui,sans-serif;color:#111111;line-height:1.6;max-width:600px;margin:0 auto;border:1px solid #e4e4e4;border-radius:12px;padding:32px;background:#ffffff">
      <div style="border-bottom:2px solid #75C5DE;padding-bottom:16px;margin-bottom:24px">
        <h2 style="margin:0;color:#111111;font-size:24px">New Project Enquiry - StackWebApp</h2>
        <p style="margin:6px 0 0;color:#7A746F;font-size:14px">Submitted via stackwebapp.in enquiry form</p>
      </div>
      
      <table style="width:100%;border-collapse:collapse;font-size:15px">
        <tr>
          <td style="padding:10px 0;color:#7A746F;width:160px;font-weight:600">Client Name:</td>
          <td style="padding:10px 0;color:#111111;font-weight:700">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#7A746F;font-weight:600">Business / Company:</td>
          <td style="padding:10px 0;color:#111111">${escapeHtml(businessName || "Not specified")}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#7A746F;font-weight:600">Email Address:</td>
          <td style="padding:10px 0;color:#111111"><a href="mailto:${escapeHtml(email)}" style="color:#1496bf;text-decoration:none">${escapeHtml(email)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#7A746F;font-weight:600">Phone Number:</td>
          <td style="padding:10px 0;color:#111111"><a href="tel:${escapeHtml(phone)}" style="color:#1496bf;text-decoration:none">${escapeHtml(phone)}</a></td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#7A746F;font-weight:600">Service Required:</td>
          <td style="padding:10px 0;color:#111111;font-weight:600">${escapeHtml(service || "General Enquiry")}</td>
        </tr>
        <tr>
          <td style="padding:10px 0;color:#7A746F;font-weight:600">Project Budget:</td>
          <td style="padding:10px 0;color:#111111;font-weight:600">${escapeHtml(budget || "Not specified")}</td>
        </tr>
      </table>

      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e4e4e4">
        <strong style="display:block;margin-bottom:8px;color:#111111;font-size:15px">Project Description:</strong>
        <div style="white-space:pre-wrap;background:#F4F1E8;padding:18px;border-radius:8px;color:#333333;font-size:14px;border:1px solid rgba(17,17,17,0.08)">${escapeHtml(message)}</div>
      </div>
      
      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e4e4e4;font-size:12px;color:#7A746F">
        <p style="margin:0">StackWebApp · Digital Engineering & Development Studio · <a href="https://stackwebapp.in" style="color:#1496bf">stackwebapp.in</a></p>
      </div>
    </div>
  `;

  try {
    const response = await fetch(RESEND_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `New Project Enquiry: ${service ? service + " - " : ""}${name}${businessName ? ` (${businessName})` : ""}`,
        html
      })
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, message: "Could not send enquiry right now. Please reach out directly." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, message: "Thank you! Your project enquiry has been sent successfully. We will get back to you shortly." });
  } catch (error) {
    return Response.json(
      { ok: false, message: "Unexpected email service error. Please try again or message via WhatsApp." },
      { status: 500 }
    );
  }
}

export function GET() {
  return Response.json(
    { ok: false, message: "Method not allowed" },
    {
      status: 405,
      headers: { Allow: "POST" }
    }
  );
}
