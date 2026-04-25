import { NextRequest, NextResponse } from 'next/server';

const GHL_API_KEY = process.env.GHL_API_KEY || '';
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID || '';
const GHL_BASE_URL = 'https://services.leadconnectorhq.com';

// ─── GHL Custom Field IDs (Rental-specific) ─────────────────
// Created via GHL API for the appliance rental form.
const GHL_FIELD_RENTAL_APPLIANCE_TYPE = 'gZfxsk5SNjT87eu2Bvxk'; // "Rental Appliance Type" (TEXT) → contact.rental_appliance_type
const GHL_FIELD_RENTAL_DETAILS = 'ukg7YsvZeebo4WBsRMDX';         // "Rental Details" (LARGE_TEXT) → contact.rental_details

// Webhook URL — triggers GHL workflow "Email Jesse of Form"
const GHL_WEBHOOK_URL =
  'https://services.leadconnectorhq.com/hooks/eqc7U7yE00bzdSYNPP0N/webhook-trigger/27247886-0b17-4052-a7c9-01e06bc8d6a2';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      first_name,
      last_name,
      full_name,
      email,
      phone,
      appliance_type,
      rental_details,
      service_address,
      city,
      postal_code,
    } = body;

    const firstName = first_name || '';
    const lastName = last_name || '';
    const displayName = full_name || `${firstName} ${lastName}`.trim();

    if ((!firstName && !displayName) || !phone) {
      return NextResponse.json(
        { error: 'Name and phone are required.' },
        { status: 400 }
      );
    }

    let contactId: string | undefined;

    // ─── STEP 1: CREATE/UPDATE CONTACT VIA GHL API ───────────
    if (GHL_API_KEY && GHL_LOCATION_ID) {
      const ghlHeaders = {
        Authorization: `Bearer ${GHL_API_KEY}`,
        'Content-Type': 'application/json',
        Version: '2021-07-28',
      };

      try {
        const contactRes = await fetch(`${GHL_BASE_URL}/contacts/upsert`, {
          method: 'POST',
          headers: ghlHeaders,
          body: JSON.stringify({
            locationId: GHL_LOCATION_ID,
            firstName,
            lastName,
            name: displayName,
            email: email || '',
            phone,
            address1: service_address || '',
            city: city || '',
            postalCode: postal_code || '',
            source: 'Website Rental Form',
            customFields: [
              { id: GHL_FIELD_RENTAL_APPLIANCE_TYPE, value: appliance_type || '' },
              { id: GHL_FIELD_RENTAL_DETAILS, value: rental_details || '' },
            ],
          }),
        });

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          contactId = contactData.contact?.id;

          if (contactId) {
            // Add tags
            const tags = ['appliance-rental', appliance_type, 'website-lead'].filter(Boolean);
            await fetch(`${GHL_BASE_URL}/contacts/${contactId}/tags`, {
              method: 'POST',
              headers: ghlHeaders,
              body: JSON.stringify({ tags }),
            }).catch((err) => console.error('Failed to add tags:', err));

            // Add note
            const noteDate = new Date().toLocaleString('en-US', {
              timeZone: 'America/Chicago',
              month: 'short', day: 'numeric', year: 'numeric',
              hour: 'numeric', minute: '2-digit',
            });
            const noteBody = [
              `Appliance Rental Inquiry — ${noteDate}`,
              '',
              `Appliance: ${appliance_type || 'N/A'}`,
              `Delivery Address: ${[service_address, city, postal_code].filter(Boolean).join(', ')}`,
              '',
              `Details:`,
              rental_details || 'No additional details provided',
              '',
              `SMS Consent: Yes`,
            ].join('\n');
            await fetch(`${GHL_BASE_URL}/contacts/${contactId}/notes`, {
              method: 'POST',
              headers: ghlHeaders,
              body: JSON.stringify({ body: noteBody }),
            }).catch((err) => console.error('Failed to add note:', err));
          }
        } else {
          const errBody = await contactRes.text().catch(() => 'unknown');
          console.error(`GHL API contact upsert failed (${contactRes.status}): ${errBody}`);
        }
      } catch (err) {
        console.error('GHL API error:', err);
      }
    }

    // ─── STEP 2: WEBHOOK (notifications) ─────────────────────
    const webhookPayload = {
      first_name: firstName,
      last_name: lastName,
      full_name: displayName,
      email: email || '',
      phone,
      service_needed: `Appliance Rental — ${appliance_type || 'Unknown'}`,
      issue_description: rental_details || `Rental inquiry for ${appliance_type}`,
      urgency: 'Flexible / Not urgent',
      service_address: service_address || '',
      city: city || '',
      postal_code: postal_code || '',
      source: 'Website Rental Form',
    };

    fetch(GHL_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(webhookPayload),
    }).catch((err) => console.error('GHL webhook failed:', err));

    return NextResponse.json({ success: true, contactId });
  } catch (error) {
    console.error('Rental form API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
