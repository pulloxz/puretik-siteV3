import { COMPANY } from "@/lib/company";
import { validateContact, type ContactInput } from "@/lib/validate-contact";

// Receives the contact form and emails it to the company through Resend.
// Needs RESEND_API_KEY (see docs/contact-email-setup.md). Optional:
// CONTACT_TO (default: the company email) and CONTACT_FROM.
const MAX = { short: 120, email: 200, phone: 40, message: 1500 };

const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  // A hidden field that people never fill in but bots often do.
  if (typeof body.website === "string" && body.website !== "") {
    return Response.json({ ok: true });
  }

  const input: ContactInput = {
    firstName: clean(body.firstName, MAX.short),
    lastName: clean(body.lastName, MAX.short),
    company: clean(body.company, MAX.short),
    email: clean(body.email, MAX.email),
    phone: clean(body.phone, MAX.phone),
    message: clean(body.message, MAX.message),
  };
  if (Object.keys(validateContact(input)).length > 0) {
    return Response.json({ error: "invalid" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "not-configured" }, { status: 503 });
  }

  const name = `${input.firstName} ${input.lastName}`.trim();
  const text = [
    `Name: ${name}`,
    input.company && `Company: ${input.company}`,
    `Email: ${input.email}`,
    input.phone && `Phone: ${input.phone}`,
    "",
    input.message,
  ]
    .filter((line): line is string => typeof line === "string")
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from:
        process.env.CONTACT_FROM ??
        `${COMPANY.name} Website <onboarding@resend.dev>`,
      to: [process.env.CONTACT_TO ?? COMPANY.email],
      reply_to: input.email,
      // Line breaks are stripped so the subject can't be used to inject headers.
      subject: `New message from ${name}`.replace(/[\r\n]+/g, " "),
      text,
    }),
  });

  if (!res.ok) {
    return Response.json({ error: "send-failed" }, { status: 502 });
  }
  return Response.json({ ok: true });
}
