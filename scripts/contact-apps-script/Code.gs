/**
 * Osfin contact lead pipeline (Google Apps Script web app).
 *
 * Deploy as Web App → Execute as: Me → Who has access: Anyone
 * Copy the /exec URL into CONTACT_WEBHOOK_URL on the Next.js site.
 *
 * Script Properties (Project Settings → Script properties):
 *   SHEET_ID          – Google Sheet ID for the lead log
 *   SHEET_NAME        – optional tab name (default: Leads)
 *   CONTACT_TO        – optional override (default: socials@osfin.ai)
 *   SLACK_WEBHOOK_URL – Slack Incoming Webhook URL
 *   CRM_PROVIDER      – hubspot | none (default: hubspot)
 *   CRM_TOKEN         – HubSpot private app token
 *   CRM_OWNER_IDS     – comma-separated HubSpot owner IDs for round-robin assign
 */

var DEFAULT_TO = 'socials@osfin.ai';
var DEFAULT_SHEET_NAME = 'Leads';

function doOptions() {
  return jsonResponse_({ ok: true });
}

function doGet() {
  return jsonResponse_({
    ok: true,
    service: 'osfin-contact',
    message: 'POST JSON leads here.',
  });
}

function doPost(e) {
  try {
    var raw = e && e.postData && e.postData.contents ? e.postData.contents : '{}';
    var body = JSON.parse(raw);
    var lead = normalizeLead_(body);
    var errors = validateLead_(lead);
    if (errors.length) {
      return jsonResponse_({ ok: false, error: errors.join(' ') }, 400);
    }

    enrichLead_(lead);

    var sheetResult = appendLeadRow_(lead);
    sendLeadEmail_(lead);
    notifySlack_(lead, sheetResult);
    var crm = createCrmContact_(lead);

    return jsonResponse_({
      ok: true,
      sheetRow: sheetResult.row,
      crmId: crm && crm.id ? crm.id : null,
      ownerId: crm && crm.ownerId ? crm.ownerId : null,
    });
  } catch (err) {
    Logger.log('contact doPost failed: ' + err);
    return jsonResponse_({ ok: false, error: 'Pipeline error.' }, 500);
  }
}

function normalizeLead_(body) {
  body = body || {};
  return {
    name: String(body.name || '').trim(),
    email: String(body.email || '').trim().toLowerCase(),
    company: String(body.company || '').trim(),
    role: String(body.role || '').trim(),
    message: String(body.message || '').trim(),
    pageUrl: String(body.pageUrl || '').trim(),
    referrer: String(body.referrer || '').trim(),
    utm_source: String(body.utm_source || '').trim(),
    utm_medium: String(body.utm_medium || '').trim(),
    utm_campaign: String(body.utm_campaign || '').trim(),
    utm_content: String(body.utm_content || '').trim(),
    utm_term: String(body.utm_term || '').trim(),
    submittedAt: String(body.submittedAt || new Date().toISOString()).trim(),
    source: String(body.source || 'osfin-contact').trim(),
    companyDomain: '',
  };
}

function validateLead_(lead) {
  var errors = [];
  if (!lead.name) errors.push('Name is required.');
  if (!lead.email) errors.push('Work email is required.');
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push('Enter a valid work email.');
  if (!lead.message) errors.push('Message is required.');
  return errors;
}

function enrichLead_(lead) {
  var domain = lead.email.split('@')[1] || '';
  var freeHosts = {
    'gmail.com': true,
    'googlemail.com': true,
    'yahoo.com': true,
    'hotmail.com': true,
    'outlook.com': true,
    'icloud.com': true,
    'me.com': true,
    'aol.com': true,
    'proton.me': true,
    'protonmail.com': true,
  };
  lead.companyDomain = domain;
  if (!lead.company && domain && !freeHosts[domain]) {
    lead.company = domain.split('.')[0];
    lead.company = lead.company.charAt(0).toUpperCase() + lead.company.slice(1);
  }
}

function appendLeadRow_(lead) {
  var props = PropertiesService.getScriptProperties();
  var sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) {
    Logger.log('SHEET_ID missing — skipping sheet append.');
    return { row: null, url: '' };
  }

  var sheetName = props.getProperty('SHEET_NAME') || DEFAULT_SHEET_NAME;
  var ss = SpreadsheetApp.openById(sheetId);
  var sheet = ss.getSheetByName(sheetName) || ss.insertSheet(sheetName);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'submittedAt',
      'name',
      'email',
      'company',
      'role',
      'message',
      'companyDomain',
      'source',
      'pageUrl',
      'referrer',
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_content',
      'utm_term',
      'crmId',
      'ownerId',
    ]);
  }

  sheet.appendRow([
    lead.submittedAt,
    lead.name,
    lead.email,
    lead.company,
    lead.role,
    lead.message,
    lead.companyDomain,
    lead.source,
    lead.pageUrl,
    lead.referrer,
    lead.utm_source,
    lead.utm_medium,
    lead.utm_campaign,
    lead.utm_content,
    lead.utm_term,
    '',
    '',
  ]);

  var row = sheet.getLastRow();
  return {
    row: row,
    url: 'https://docs.google.com/spreadsheets/d/' + sheetId + '#gid=' + sheet.getSheetId(),
  };
}

function sendLeadEmail_(lead) {
  var props = PropertiesService.getScriptProperties();
  var to = props.getProperty('CONTACT_TO') || DEFAULT_TO;
  var subject = '[Osfin Contact] ' + lead.name + (lead.company ? ' · ' + lead.company : '');
  var lines = [
    'New contact form submission',
    '',
    'Name: ' + lead.name,
    'Email: ' + lead.email,
    'Company: ' + (lead.company || '—'),
    'Role: ' + (lead.role || '—'),
    'Domain: ' + (lead.companyDomain || '—'),
    '',
    'Message:',
    lead.message,
    '',
    'Source: ' + lead.source,
    'Page: ' + (lead.pageUrl || '—'),
    'Referrer: ' + (lead.referrer || '—'),
    'UTM: ' +
      ([lead.utm_source, lead.utm_medium, lead.utm_campaign, lead.utm_content, lead.utm_term]
        .filter(Boolean)
        .join(' / ') || '—'),
    'Submitted: ' + lead.submittedAt,
  ];
  GmailApp.sendEmail(to, subject, lines.join('\n'), {
    name: 'Osfin Contact',
    replyTo: lead.email,
  });
}

function notifySlack_(lead, sheetResult) {
  var props = PropertiesService.getScriptProperties();
  var webhook = props.getProperty('SLACK_WEBHOOK_URL');
  if (!webhook) {
    Logger.log('SLACK_WEBHOOK_URL missing — skipping Slack.');
    return;
  }

  var text = [
    '*New Osfin contact*',
    '*' + lead.name + '*' + (lead.company ? ' · ' + lead.company : ''),
    lead.email + (lead.role ? ' · ' + lead.role : ''),
    '',
    lead.message,
    '',
    sheetResult.url ? '<' + sheetResult.url + '|Open lead sheet>' : '',
  ]
    .filter(Boolean)
    .join('\n');

  UrlFetchApp.fetch(webhook, {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({ text: text }),
    muteHttpExceptions: true,
  });
}

function createCrmContact_(lead) {
  var props = PropertiesService.getScriptProperties();
  var provider = (props.getProperty('CRM_PROVIDER') || 'hubspot').toLowerCase();
  if (provider === 'none') return null;
  if (provider === 'hubspot') return createHubSpotContact_(lead);
  Logger.log('Unknown CRM_PROVIDER: ' + provider);
  return null;
}

function nextOwnerId_() {
  var props = PropertiesService.getScriptProperties();
  var raw = props.getProperty('CRM_OWNER_IDS') || '';
  var ids = raw
    .split(',')
    .map(function (id) {
      return id.trim();
    })
    .filter(Boolean);
  if (!ids.length) return '';

  var idxKey = 'CRM_OWNER_RR_INDEX';
  var idx = Number(props.getProperty(idxKey) || '0');
  if (!isFinite(idx) || idx < 0) idx = 0;
  var ownerId = ids[idx % ids.length];
  props.setProperty(idxKey, String((idx + 1) % ids.length));
  return ownerId;
}

function createHubSpotContact_(lead) {
  var props = PropertiesService.getScriptProperties();
  var token = props.getProperty('CRM_TOKEN');
  if (!token) {
    Logger.log('CRM_TOKEN missing — skipping HubSpot.');
    return null;
  }

  var ownerId = nextOwnerId_();
  var properties = {
    email: lead.email,
    firstname: lead.name.split(' ')[0] || lead.name,
    lastname: lead.name.split(' ').slice(1).join(' ') || '',
    company: lead.company || '',
    jobtitle: lead.role || '',
    message: lead.message,
    hs_lead_status: 'NEW',
  };
  if (ownerId) properties.hubspot_owner_id = ownerId;

  var res = UrlFetchApp.fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
    method: 'post',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + token },
    payload: JSON.stringify({ properties: properties }),
    muteHttpExceptions: true,
  });

  var code = res.getResponseCode();
  var body = {};
  try {
    body = JSON.parse(res.getContentText() || '{}');
  } catch (err) {
    body = {};
  }

  // Conflict: contact exists — patch owner / note via update if we have an id
  if (code === 409 && body && body.message) {
    Logger.log('HubSpot contact may already exist: ' + res.getContentText());
  }

  if (code < 200 || code >= 300) {
    Logger.log('HubSpot create failed ' + code + ': ' + res.getContentText());
    return null;
  }

  var result = { id: body.id || null, ownerId: ownerId || null };
  writeCrmBackToSheet_(lead.email, result);
  return result;
}

function writeCrmBackToSheet_(email, crm) {
  if (!crm || !crm.id) return;
  var props = PropertiesService.getScriptProperties();
  var sheetId = props.getProperty('SHEET_ID');
  if (!sheetId) return;
  var sheetName = props.getProperty('SHEET_NAME') || DEFAULT_SHEET_NAME;
  var sheet = SpreadsheetApp.openById(sheetId).getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return;

  var lastRow = sheet.getLastRow();
  var values = sheet.getRange(2, 1, lastRow, 17).getValues();
  for (var i = values.length - 1; i >= 0; i--) {
    if (String(values[i][2]).toLowerCase() === String(email).toLowerCase()) {
      sheet.getRange(i + 2, 16).setValue(crm.id);
      sheet.getRange(i + 2, 17).setValue(crm.ownerId || '');
      break;
    }
  }
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
