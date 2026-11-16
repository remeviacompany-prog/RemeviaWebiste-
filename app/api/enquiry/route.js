import { NextResponse } from 'next/server';

// Receives enquiries from the site's forms and emails them to the Remevia team.
// Email is sent through Resend (https://resend.com). Set these on the server:
//   RESEND_API_KEY  the Resend API key (required to send)
//   ENQUIRY_TO      where enquiries go (default care@remevia.in)
//   ENQUIRY_FROM    a sender on a domain verified in Resend, e.g. "Remevia website <web@remevia.in>"

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELDS = [
  ['type', 'Request type'],
  ['name', 'Name'],
  ['company', 'Company'],
  ['email', 'Email'],
  ['phone', 'Phone / WhatsApp'],
  ['country', 'Country'],
  ['city', 'City'],
  ['business', 'Business type'],
  ['flock', 'Flock size'],
  ['products', 'Products of interest'],
  ['message', 'Message'],
  ['page', 'Sent from page'],
];

const escape = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }

  // Hidden field that people never fill in; bots usually do.
  if (body.website) return NextResponse.json({ ok: true });

  const data = Object.fromEntries(FIELDS.map(([key]) => {
    const value = Array.isArray(body[key]) ? body[key].join(', ') : body[key];
    return [key, String(value ?? '').trim().slice(0, 4000)];
  }));

  // Datasheet requests ask only for name, company and WhatsApp; email is optional there.
  const isDocRequest = body.kind === 'document';
  const emailOk = data.email ? EMAIL.test(data.email) : isDocRequest;
  const complete = isDocRequest ? data.company : data.country;
  if (!data.name || !data.phone || !emailOk || !complete) {
    return NextResponse.json({ ok: false, error: 'Missing required details.' }, { status: 400 });
  }

  const rows = FIELDS.filter(([key]) => data[key]);
  const subject = `New ${data.type || 'website'} enquiry: ${data.name}${data.company ? ` (${data.company})` : ''}`;
  const text = rows.map(([key, label]) => `${label}: ${data[key]}`).join('\n');
  const html = `<h2 style="font-family:sans-serif">${escape(subject)}</h2><table style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([key, label]) => `<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${label}</td><td style="padding:6px 0;white-space:pre-wrap">${escape(data[key])}</td></tr>`)
    .join('')}</table>`;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn('[enquiry] RESEND_API_KEY is not set, so this enquiry was not emailed:\n' + text);
    // In development, accept it so the form can be tested. In production, report the failure
    // so the visitor is told to email instead of the lead being lost.
    if (process.env.NODE_ENV !== 'production') return NextResponse.json({ ok: true, emailed: false });
    return NextResponse.json({ ok: false, error: 'Email is not configured.' }, { status: 503 });
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM || 'Remevia website <onboarding@resend.dev>',
      to: [process.env.ENQUIRY_TO || 'care@remevia.in'],
      ...(data.email ? { reply_to: data.email } : {}),
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error('[enquiry] Resend error', res.status, await res.text());
    return NextResponse.json({ ok: false, error: 'Could not send.' }, { status: 502 });
  }
  return NextResponse.json({ ok: true, emailed: true });
}
