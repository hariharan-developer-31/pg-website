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
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL || "PG Enquiry <onboarding@resend.dev>";

  if (!resendKey || !toEmail) {
    return Response.json(
      { ok: false, message: "Email service is not configured yet." },
      { status: 503 }
    );
  }

  let body = {};
  try {
    body = await request.json();
  } catch (error) {
    body = {};
  }

  if (body.website) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 180);
  const phone = clean(body.phone, 40);
  const pgCount = clean(body.pgCount, 80);
  const city = clean(body.city, 120);
  const message = clean(body.message, 1600);

  if (!name || !email || !isEmail(email) || !phone || !message) {
    return Response.json(
      { ok: false, message: "Please fill name, email, phone, and message correctly." },
      { status: 400 }
    );
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;color:#111;line-height:1.55">
      <h2 style="margin:0 0 16px">New PG management enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
      <p><strong>City:</strong> ${escapeHtml(city || "Not shared")}</p>
      <p><strong>PG count:</strong> ${escapeHtml(pgCount || "Not shared")}</p>
      <p><strong>Message:</strong><br>${escapeHtml(message)}</p>
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
        subject: `PG Management Enquiry - ${name}`,
        html
      })
    });

    if (!response.ok) {
      return Response.json(
        { ok: false, message: "Could not send enquiry right now." },
        { status: 502 }
      );
    }

    return Response.json({ ok: true, message: "Enquiry sent successfully." });
  } catch (error) {
    return Response.json(
      { ok: false, message: "Unexpected email service error." },
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
