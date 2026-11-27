# Osfin contact → Google lead pipeline

The marketing site POSTs one JSON payload to this Apps Script web app. The script:

1. Validates the lead
2. Light-enriches (company from email domain when missing)
3. Appends a Google Sheet row
4. Emails `socials@osfin.ai` via Gmail
5. Posts Slack
6. Creates a HubSpot contact and round-robin assigns an owner

No Resend / Formspree. Secrets stay in Script Properties.

## 1. Sheet

1. Create a Google Sheet (e.g. “Osfin Contact Leads”).
2. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit`
3. Optional: rename the first tab to `Leads` (or set `SHEET_NAME`).

## 2. Apps Script project

1. [script.google.com](https://script.google.com) → **New project**
2. Paste [`Code.gs`](./Code.gs) into `Code.gs`
3. **Project Settings → Script properties** — add:

| Key | Value |
| --- | --- |
| `SHEET_ID` | Google Sheet ID |
| `SHEET_NAME` | `Leads` (optional) |
| `CONTACT_TO` | `socials@osfin.ai` (optional override) |
| `SLACK_WEBHOOK_URL` | Slack Incoming Webhook URL |
| `CRM_PROVIDER` | `hubspot` or `none` |
| `CRM_TOKEN` | HubSpot private app token (contacts write) |
| `CRM_OWNER_IDS` | Comma-separated HubSpot owner IDs for round-robin |

4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL (`…/exec`).

## 3. Site env

In local `.env.local` and Vercel project env:

```bash
CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

`NEXT_PUBLIC_CONTACT_WEBHOOK_URL` is also accepted as a fallback by the Next API route.

The browser posts to `/api/contact`; Next forwards to the Apps Script URL (avoids browser CORS issues with Google).

## 4. Slack

1. Create an Incoming Webhook for the sales / inbound channel.
2. Paste the URL into `SLACK_WEBHOOK_URL`.

## 5. HubSpot

1. Create a Private App with `crm.objects.contacts.write` (and read if you want upserts later).
2. Put the token in `CRM_TOKEN`.
3. Settings → Users & Teams → copy owner IDs into `CRM_OWNER_IDS` (e.g. `123,456`).
4. Set `CRM_PROVIDER=none` to skip CRM until ready.

## Test

```bash
curl -X POST "$CONTACT_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Test Lead",
    "email": "test@acme.com",
    "company": "Acme",
    "role": "CFO",
    "message": "Pipeline test",
    "source": "osfin-contact",
    "submittedAt": "2026-01-01T00:00:00.000Z"
  }'
```

Expect `{ "ok": true, ... }`, a Sheet row, an email to `socials@osfin.ai`, Slack, and a HubSpot contact when configured.

## Redeploy

After editing `Code.gs`, create a **New version** on the same Web App deployment so the `/exec` URL keeps working.
