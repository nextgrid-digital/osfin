import { NextResponse } from "next/server";
import { contactDelivered } from "@/lib/contact-delivered";

const SHORT_MAX = 500;
const MESSAGE_MAX = 4000;

type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  role?: string;
  message?: string;
  pageUrl?: string;
  referrer?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  let body: ContactBody;
  try {
    body = (await request.json()) as ContactBody;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, work email, and message are required." },
      { status: 400 },
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "Enter a valid work email." }, { status: 400 });
  }

  const pageUrl = typeof body.pageUrl === "string" ? body.pageUrl : "";
  const referrer = typeof body.referrer === "string" ? body.referrer : "";
  const utm = {
    utm_source: typeof body.utm_source === "string" ? body.utm_source : "",
    utm_medium: typeof body.utm_medium === "string" ? body.utm_medium : "",
    utm_campaign: typeof body.utm_campaign === "string" ? body.utm_campaign : "",
    utm_content: typeof body.utm_content === "string" ? body.utm_content : "",
    utm_term: typeof body.utm_term === "string" ? body.utm_term : "",
  };
  const shortValues = [name, email, company, role, pageUrl, referrer, ...Object.values(utm)];
  if (shortValues.some((value) => value.length > SHORT_MAX)) {
    return NextResponse.json({ ok: false, error: "One of the fields is too long." }, { status: 400 });
  }
  if (message.length > MESSAGE_MAX) {
    return NextResponse.json(
      { ok: false, error: "Message must be 4000 characters or fewer." },
      { status: 400 },
    );
  }

  const webhookUrl =
    process.env.CONTACT_WEBHOOK_URL?.trim() ||
    process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    return NextResponse.json(
      {
        ok: false,
        error: "Contact form is not configured yet. Set CONTACT_WEBHOOK_URL.",
      },
      { status: 503 },
    );
  }

  const payload = {
    name,
    email,
    company,
    role,
    message,
    pageUrl,
    referrer,
    ...utm,
    submittedAt: new Date().toISOString(),
    source: "osfin-contact",
  };

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const text = await upstream.text();
    let upstreamJson: { ok?: boolean; error?: string } | null = null;
    try {
      upstreamJson = JSON.parse(text) as { ok?: boolean; error?: string };
    } catch {
      upstreamJson = null;
    }

    if (!contactDelivered(upstream.ok, upstreamJson)) {
      return NextResponse.json(
        {
          ok: false,
          error: upstreamJson?.error || "Could not deliver the message. Please try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Could not reach the contact pipeline. Please try again." },
      { status: 502 },
    );
  }
}
