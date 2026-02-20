import { NextRequest, NextResponse } from 'next/server';
import { getBusiness } from '@/lib/data';

const biz = getBusiness();
const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_PIPELINE_ID = process.env.GHL_PIPELINE_ID || '';
const GHL_PIPELINE_STAGE_ID = process.env.GHL_PIPELINE_STAGE_ID || '';
const GHL_BASE_URL = 'https://services.leadconnectorhq.com';
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || '';
const NOTIFICATION_PHONE = process.env.NOTIFICATION_PHONE || '';
const RESEND_API_KEY = process.env.RESEND_API_KEY || '';

// ─── Notification helpers ───────────────────────────────────────

async function sendEmailNotification(lead: Record<string, string>) {
  if (!RESEND_API_KEY || !NOTIFICATION_EMAIL) return;

  const urgencyBadge = lead.urgency?.includes('Emergency') ? '🚨 EMERGENCY' : '📋 New Lead';

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${biz.shortName} Leads <leads@${biz.domain}>`,
        to: [NOTIFICATION_EMAIL],
        subject: `${urgencyBadge}: ${lead.full_name} - ${lead.service_needed || 'Service Request'}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F1B2D;padding:20px;border-radius:8px 8px 0 0;">
              <h1 style="color:#64B5F6;margin:0;font-size:20px;">New Service Request</h1>
            </div>
            <div style="padding:24px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:#6b7280;width:140px;"><strong>Name:</strong></td><td style="padding:8px 0;">${lead.full_name}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;"><strong>Phone:</strong></td><td style="padding:8px 0;"><a href="tel:${lead.phone}">${lead.phone}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;"><strong>Email:</strong></td><td style="padding:8px 0;"><a href="mailto:${lead.email}">${lead.email}</a></td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;"><strong>Service:</strong></td><td style="padding:8px 0;">${lead.service_needed || 'N/A'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;"><strong>Urgency:</strong></td><td style="padding:8px 0;font-weight:bold;color:${lead.urgency?.includes('Emergency') ? '#b91c1c' : '#0F1B2D'};">${lead.urgency || 'N/A'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;vertical-align:top;"><strong>Issue:</strong></td><td style="padding:8px 0;">${lead.issue_description || 'N/A'}</td></tr>
                <tr><td style="padding:8px 0;color:#6b7280;"><strong>Address:</strong></td><td style="padding:8px 0;">${lead.service_address || ''} ${lead.city || ''} ${lead.postal_code || ''}</td></tr>
              </table>
              <div style="margin-top:20px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;">
                <a href="tel:${lead.phone}" style="display:inline-block;background:#1565C0;color:#fff;padding:12px 32px;border-radius:6px;text-decoration:none;font-weight:bold;">Call Customer</a>
              </div>
            </div>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error('Email notification failed:', err);
  }
}

async function sendCustomerConfirmation(lead: Record<string, string>) {
  if (!RESEND_API_KEY || !lead.email) return;

  const firstName = lead.first_name || lead.full_name?.split(' ')[0] || 'Valued Customer';
  const isEmergency = lead.urgency?.includes('Emergency');

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${biz.shortName} <service@${biz.domain}>`,
        to: [lead.email],
        subject: `We Received Your Service Request - ${biz.shortName}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
            <div style="background:#0F1B2D;padding:24px;border-radius:8px 8px 0 0;text-align:center;">
              <h1 style="color:#64B5F6;margin:0;font-size:22px;">${biz.name}</h1>
              <p style="color:#9ca3af;margin:6px 0 0;font-size:13px;">Same or Next-Day Service Available</p>
            </div>
            <div style="padding:28px 24px;border:1px solid #e5e7eb;border-top:none;">
              <h2 style="color:#0F1B2D;margin:0 0 16px;font-size:18px;">Thank You, ${firstName}!</h2>
              <p style="color:#374151;line-height:1.7;margin:0 0 16px;font-size:15px;">
                We've received your service request and a member of our team will be reaching out to you shortly${isEmergency ? ' — we understand this is urgent and will prioritize your request' : ''}.
              </p>

              <div style="background:#f9fafb;border-radius:8px;padding:16px;margin:20px 0;">
                <h3 style="color:#0F1B2D;margin:0 0 12px;font-size:15px;">Your Request Summary:</h3>
                <table style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;width:120px;">Service:</td><td style="padding:6px 0;color:#0F1B2D;font-size:14px;">${lead.service_needed || 'General Service'}</td></tr>
                  <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Urgency:</td><td style="padding:6px 0;color:${isEmergency ? '#b91c1c' : '#0F1B2D'};font-size:14px;font-weight:${isEmergency ? 'bold' : 'normal'};">${lead.urgency || 'N/A'}</td></tr>
                  <tr><td style="padding:6px 0;color:#6b7280;font-size:14px;">Address:</td><td style="padding:6px 0;color:#0F1B2D;font-size:14px;">${lead.service_address || ''} ${lead.city || ''} ${lead.postal_code || ''}</td></tr>
                </table>
              </div>

              <p style="color:#374151;line-height:1.7;margin:16px 0;font-size:15px;">
                In the meantime, if you need immediate assistance, don't hesitate to call us directly:
              </p>

              <div style="text-align:center;margin:24px 0;">
                <a href="tel:${biz.phoneRaw}" style="display:inline-block;background:#1565C0;color:#ffffff;padding:14px 36px;border-radius:6px;text-decoration:none;font-weight:bold;font-size:16px;">Call ${biz.phone}</a>
              </div>

              <p style="color:#6b7280;font-size:13px;line-height:1.6;margin:20px 0 0;">
                ${biz.name} is a licensed, insured ${biz.industryLabel.toLowerCase()} contractor proudly serving the ${biz.serviceAreaName} area.${biz.license ? ` ${biz.licenseLabel} #${biz.license}.` : ''}
              </p>
            </div>
            <div style="background:#f3f4f6;padding:16px;border-radius:0 0 8px 8px;text-align:center;">
              <p style="color:#9ca3af;font-size:12px;margin:0;">
                ${biz.address.full} &bull; <a href="${biz.url}" style="color:#1565C0;">${biz.domain}</a>
              </p>
            </div>
          </div>
        `,
      }),
    });
  } catch (err) {
    console.error('Customer confirmation email failed:', err);
  }
}

async function sendSmsNotification(lead: Record<string, string>) {
  if (!GHL_API_KEY || !NOTIFICATION_PHONE || !GHL_LOCATION_ID) return;

  // Don't send SMS notification if the lead IS the notification recipient (same phone)
  const cleanLeadPhone = lead.phone?.replace(/\D/g, '');
  const cleanNotifPhone = NOTIFICATION_PHONE.replace(/\D/g, '');
  if (cleanLeadPhone === cleanNotifPhone || cleanLeadPhone?.endsWith(cleanNotifPhone.slice(-10))) {
    console.log('Skipping SMS notification — lead phone matches notification phone');
    return;
  }

  const headers = {
    Authorization: `Bearer ${GHL_API_KEY}`,
    'Content-Type': 'application/json',
    Version: '2021-07-28',
  };

  try {
    // Search for the notification contact by phone (don't upsert to avoid overwriting other contacts)
    const searchRes = await fetch(
      `${GHL_BASE_URL}/contacts/search/duplicate?locationId=${GHL_LOCATION_ID}&number=${encodeURIComponent(NOTIFICATION_PHONE)}`,
      { method: 'GET', headers }
    );
    const searchData = await searchRes.json();
    let recipientContactId = searchData.contact?.id;

    // Only create if not found
    if (!recipientContactId) {
      const createRes = await fetch(`${GHL_BASE_URL}/contacts/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          locationId: GHL_LOCATION_ID,
          phone: NOTIFICATION_PHONE,
          firstName: biz.shortName,
          lastName: 'Notifications',
          tags: ['internal-notification'],
        }),
      });
      const createData = await createRes.json();
      recipientContactId = createData.contact?.id;
    }

    if (!recipientContactId) return;

    const urgencyTag = lead.urgency?.includes('Emergency') ? '🚨 EMERGENCY' : '📋 New Lead';
    const smsBody = `${urgencyTag}\n${lead.full_name}\n📞 ${lead.phone}\n🔧 ${lead.service_needed || 'Service Request'}\n⏰ ${lead.urgency || 'N/A'}\n📍 ${lead.service_address || ''} ${lead.city || ''}\n💬 ${lead.issue_description || 'No details'}`;

    await fetch(`${GHL_BASE_URL}/conversations/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        type: 'SMS',
        contactId: recipientContactId,
        message: smsBody,
      }),
    });
  } catch (err) {
    console.error('SMS notification failed:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      first_name,
      last_name,
      full_name,
      email,
      phone,
      service_needed,
      issue_description,
      urgency,
      service_address,
      city,
      postal_code,
    } = body;

    const firstName = first_name || '';
    const lastName = last_name || '';
    const displayName = full_name || `${firstName} ${lastName}`.trim();

    if ((!firstName && !displayName) || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required.' },
        { status: 400 }
      );
    }

    // Webhook fallback — always works even if API key has wrong scopes
    const sendViaWebhook = async () => {
      const webhookUrl =
        'https://services.leadconnectorhq.com/hooks/eqc7U7yE00bzdSYNPP0N/webhook-trigger/27247886-0b17-4052-a7c9-01e06bc8d6a2';

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    };

    // If API key is not set, fall back to webhook
    if (!GHL_API_KEY || !GHL_LOCATION_ID) {
      await sendViaWebhook();
      return NextResponse.json({ success: true, method: 'webhook' });
    }

    const headers = {
      Authorization: `Bearer ${GHL_API_KEY}`,
      'Content-Type': 'application/json',
      Version: '2021-07-28',
    };

    // Step 1: Create or update the contact
    const contactPayload = {
      locationId: GHL_LOCATION_ID,
      firstName,
      lastName,
      email,
      phone,
      address1: service_address || '',
      city: city || '',
      postalCode: postal_code || '',
      source: 'Website Contact Form',
      customFields: [
        { id: 'okz7uk4DI6P5p0gNLIm5', value: service_needed || '' },
        { id: 'uurHpeIpvfnWTqdzSxGV', value: issue_description || '' },
        { id: 'epQjKKfBLuGAG6p6dh4g', value: urgency || '' },
      ],
    };

    const contactRes = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
      method: 'POST',
      headers,
      body: JSON.stringify(contactPayload),
    });

    const contactData = await contactRes.json();

    if (!contactRes.ok) {
      console.error('GHL contact creation failed:', contactData, '— falling back to webhook');
      await sendViaWebhook();

      // Still try to send notifications even on API failure
      const leadInfo = {
        first_name: firstName, last_name: lastName, full_name: displayName,
        email, phone, service_needed: service_needed || '', issue_description: issue_description || '',
        urgency: urgency || '', service_address: service_address || '', city: city || '', postal_code: postal_code || '',
      };
      Promise.allSettled([
        sendEmailNotification(leadInfo),
        sendCustomerConfirmation(leadInfo),
      ]).catch((err) => console.error('Notification error:', err));

      return NextResponse.json({ success: true, method: 'webhook-fallback' });
    }

    const contactId = contactData.contact?.id;

    // Add tags without overwriting existing ones
    const newTags = [service_needed, urgency, 'website-lead'].filter(Boolean);
    if (contactId && newTags.length > 0) {
      try {
        await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ tags: newTags }),
        });
      } catch (err) {
        console.error('Failed to add tags:', err);
      }
    }

    // Step 2: Create or update an opportunity (if pipeline is configured)
    let opportunityId: string | undefined;
    if (GHL_PIPELINE_ID && GHL_PIPELINE_STAGE_ID && contactId) {
      const oppName = `${displayName} - ${service_needed || 'Service Request'}`;

      // Try creating the opportunity first
      const oppRes = await fetch(`${GHL_BASE_URL}/opportunities/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          pipelineId: GHL_PIPELINE_ID,
          pipelineStageId: GHL_PIPELINE_STAGE_ID,
          locationId: GHL_LOCATION_ID,
          contactId,
          name: oppName,
          source: 'Website',
          status: 'open',
        }),
      });

      const oppData = await oppRes.json();

      if (oppRes.ok) {
        opportunityId = oppData.opportunity?.id;
      } else if (oppData.message?.includes('duplicate')) {
        // GHL only allows 1 opportunity per contact per pipeline
        // Find the existing one and update it with the new service request
        try {
          const searchRes = await fetch(
            `${GHL_BASE_URL}/opportunities/search?location_id=${GHL_LOCATION_ID}&contact_id=${contactId}&pipeline_id=${GHL_PIPELINE_ID}`,
            { method: 'GET', headers }
          );
          const searchData = await searchRes.json();
          const existingOpp = searchData.opportunities?.[0];

          if (existingOpp?.id) {
            // Update the existing opportunity with new info
            const updateRes = await fetch(`${GHL_BASE_URL}/opportunities/${existingOpp.id}`, {
              method: 'PUT',
              headers,
              body: JSON.stringify({
                pipelineStageId: GHL_PIPELINE_STAGE_ID,
                name: oppName,
                status: 'open',
              }),
            });
            const updateData = await updateRes.json();

            if (updateRes.ok) {
              opportunityId = existingOpp.id;
              console.log('Updated existing opportunity:', existingOpp.id);
            } else {
              console.error('GHL opportunity update failed:', updateData);
            }
          }
        } catch (err) {
          console.error('GHL opportunity search/update failed:', err);
        }
      } else {
        console.error('GHL opportunity creation failed:', oppData);
      }
    }

    // Step 2b: Add a note to the contact with full request details
    if (contactId) {
      const noteDate = new Date().toLocaleString('en-US', { timeZone: 'America/Chicago', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' });
      const noteBody = `📋 Website Service Request — ${noteDate}\n\nService: ${service_needed || 'N/A'}\nUrgency: ${urgency || 'N/A'}\nAddress: ${service_address || ''} ${city || ''} ${postal_code || ''}\n\nIssue Description:\n${issue_description || 'No details provided'}\n\nSMS Consent: Yes`;

      try {
        await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ body: noteBody }),
        });
      } catch (err) {
        console.error('Failed to add contact note:', err);
      }
    }

    // Step 3: Send notifications (fire-and-forget, don't block response)
    const leadInfo = {
      first_name: firstName,
      last_name: lastName,
      full_name: displayName,
      email,
      phone,
      service_needed: service_needed || '',
      issue_description: issue_description || '',
      urgency: urgency || '',
      service_address: service_address || '',
      city: city || '',
      postal_code: postal_code || '',
    };

    // Send all notifications in parallel, don't await (non-blocking)
    Promise.allSettled([
      sendEmailNotification(leadInfo),
      sendSmsNotification(leadInfo),
      sendCustomerConfirmation(leadInfo),
    ]).catch((err) => console.error('Notification error:', err));

    return NextResponse.json({ success: true, contactId, opportunityId });
  } catch (error) {
    console.error('Contact form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
