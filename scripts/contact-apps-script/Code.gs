/**
 * Osfin contact → Gmail → Slack channel email (simple).
 *
 * Deploy: Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the /exec URL into CONTACT_WEBHOOK_URL on the site.
 *
 * Optional Script Property:
 *   CONTACT_TO – comma-separated destinations (default: Slack channel + socials@osfin.ai)
 */

var DEFAULT_TO =
  'osfin-nextgrid-aaaasufvdzdok67wmwzrydi6ii@nextgrid-digital.slack.com,socials@osfin.ai';

function doGet() {
  return jsonResponse_({ ok: true, service: 'osfin-contact', message: 'POST JSON here.' });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var body = JSON.parse(raw);
    var lead = {
      name: String(body.name || '').trim(),
      email: String(body.email || '').trim().toLowerCase(),
      company: String(body.company || '').trim(),
      role: String(body.role || '').trim(),
      message: String(body.message || '').trim(),
      pageUrl: String(body.pageUrl || '').trim(),
      referrer: String(body.referrer || '').trim(),
    };

    if (!lead.name) return jsonResponse_({ ok: false, error: 'Name is required.' });
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      return jsonResponse_({ ok: false, error: 'Enter a valid work email.' });
    }
    if (!lead.message) return jsonResponse_({ ok: false, error: 'Message is required.' });

    var props = PropertiesService.getScriptProperties();
    var to = (props.getProperty('CONTACT_TO') || DEFAULT_TO)
      .split(',')
      .map(function (addr) {
        return addr.trim();
      })
      .filter(Boolean)
      .join(',');
    var subject = '[Osfin Contact] ' + lead.name + (lead.company ? ' · ' + lead.company : '');
    var text = [
      'Name: ' + lead.name,
      'Email: ' + lead.email,
      'Company: ' + (lead.company || '—'),
      'Role: ' + (lead.role || '—'),
      '',
      'Message:',
      lead.message,
      '',
      'Page: ' + (lead.pageUrl || '—'),
      'Referrer: ' + (lead.referrer || '—'),
    ].join('\n');

    GmailApp.sendEmail(to, subject, text, {
      name: 'Osfin Contact',
      replyTo: lead.email,
    });

    return jsonResponse_({ ok: true });
  } catch (err) {
    Logger.log('contact doPost failed: ' + err);
    return jsonResponse_({ ok: false, error: 'Could not send email.' });
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
