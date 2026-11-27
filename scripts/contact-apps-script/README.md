# Osfin contact → Gmail → Slack

Simple Google Apps Script: receive the form JSON and email it to the `#osfin-nextgrid` Slack channel address (or any inbox you set).

## Deploy (about 2 minutes)

1. Open [script.google.com](https://script.google.com) → **New project**
2. Paste [`Code.gs`](./Code.gs) over the default file
3. Optional: **Project Settings → Script properties** → `CONTACT_TO` = comma-separated inboxes  
   (default: Slack `#osfin-nextgrid` email + `socials@osfin.ai`)
4. **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Authorize Gmail when prompted
6. Copy the Web App URL ending in `/exec`

## Site env

Local `.env.local` and Vercel:

```bash
CONTACT_WEBHOOK_URL=https://script.google.com/macros/s/XXXX/exec
```

Restart `next dev` / redeploy. The browser posts to `/api/contact`; Next forwards to this script.

## Test

```bash
curl -X POST "$CONTACT_WEBHOOK_URL" \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","email":"you@company.com","message":"Hello"}'
```

Expect `{ "ok": true }` and a message in `#osfin-nextgrid`.

## Redeploy

After editing `Code.gs`, create a **New version** on the same deployment so the `/exec` URL stays the same.
