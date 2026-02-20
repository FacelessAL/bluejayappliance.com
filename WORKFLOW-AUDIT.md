# Blue Jay Appliance — Customer Intake Workflow Audit
**Date:** February 14, 2026  
**Status:** Phase 1 complete, polished and verified

---

## COMPLETE FORM SUBMISSION FLOW

When a customer submits the contact form, the following happens in order:

### 1. Spam Check (client-side)
- Honeypot field checked — if filled (bot), form fakes success and does nothing

### 2. Contact Created/Updated (GHL)
- Upserted via email/phone match
- First name, last name, email, phone, address, city, zip saved
- **Custom fields populated** (using GHL field IDs):
  - What service do you need? → `okz7uk4DI6P5p0gNLIm5`
  - Describe your issue → `uurHpeIpvfnWTqdzSxGV`
  - When do you need service? → `epQjKKfBLuGAG6p6dh4g`
- Source set to "Website Contact Form"

### 3. Tags Added (without overwriting)
- Service type tag (e.g. "Emergency Repair")
- Urgency tag (e.g. "Emergency - ASAP")
- `website-lead` tag (always)
- Uses POST `/contacts/{id}/tags` — appends, never overwrites existing tags

### 4. Opportunity Created or Updated
- New contacts → new opportunity in "Service Requests" pipeline at "New Lead"
- Returning contacts → existing opportunity updated with new service name, reset to "New Lead"
- Name format: "FirstName LastName - Service Type"

### 5. Contact Note Logged
- Timestamped note with full request details added to contact
- Ensures complete history even for returning customers
- Includes: service, urgency, address, issue description, SMS consent

### 6. Notifications Sent (parallel, non-blocking)
- **Team email** → service@bluejayappliance.com with full lead details + call button
- **Team SMS** → +1 847-489-9592 (pending A2P registration)
- **Customer confirmation email** → personalized thank-you with request summary

### 7. Success Screen
- Confirms submission with check mark
- Mentions confirmation email sent
- Emergency requests get highlighted callout
- Call button always visible for immediate contact

---

## PIPELINE STRUCTURE (GHL)

Current stages:
| Stage | Purpose |
|-------|---------|
| **New Lead** | Form just submitted, waiting for team response |
| **Contacted** | Team has reached out to the customer |
| **Proposal Sent** | Quote/estimate provided |
| **Closed** | Job completed or declined |

### Recommended additions (do in GHL UI → Pipelines → Service Requests):
| Stage | Purpose |
|-------|---------|
| **Scheduled** | Appointment booked (add between Contacted and Proposal Sent) |
| **Won** | Job completed and paid (replace or add alongside Closed) |
| **Lost** | Customer declined or went elsewhere (for conversion tracking) |

---

## WHAT'S WORKING ✅

- ✅ Contact creation with separate first/last name fields
- ✅ Custom fields populated with correct GHL field IDs
- ✅ Tags appended (not overwritten) with `website-lead` marker
- ✅ Contact notes with timestamped request history
- ✅ Opportunity creation and duplicate handling (update existing)
- ✅ Customer confirmation email (branded, personalized)
- ✅ Team email notification (full details + call button)
- ✅ Google Places autocomplete (server-side, API key secure)
- ✅ A2P compliance (consent checkbox, privacy policy, terms disclosures)
- ✅ Honeypot spam protection
- ✅ Enhanced success screen with emergency callout
- ✅ Webhook fallback if GHL API key missing

---

## PENDING ITEMS

### You handle in GHL UI:
- [ ] **Add pipeline stages** — Scheduled, Won, Lost (GHL → Pipelines → Service Requests)
- [ ] **Complete A2P 10DLC registration** — GHL → Settings → Compliance
  - Opt-in URL: `https://bluejayappliance.com/contact-us`
  - Privacy Policy: `https://bluejayappliance.com/privacy-policy`
  - Terms: `https://bluejayappliance.com/terms-of-service`
  - Use case: "Service request confirmations, appointment updates, customer follow-ups"
  - Sample: "Hi [Name], Blue Jay Appliance received your service request. A team member will contact you shortly. Reply STOP to opt out."

### Future GHL Automations (post-launch):
- [ ] **Speed-to-lead alert** — 2nd alert if lead sits in "New Lead" >15 min
- [ ] **No-response follow-up** — Auto-SMS to customer if >2 hours with no response
- [ ] **Appointment reminders** — SMS 24hr + 1hr before (trigger: moved to "Scheduled")
- [ ] **Google review request** — Email + SMS 24hr after job marked "Won"
- [ ] **Lost lead re-engagement** — Email 30 days after "Lost"

### Future Enhancements:
- [ ] Email open/click tracking (Resend supports this)
- [ ] Revenue tracking via opportunity monetary values
- [ ] Referral program email after "Won"
- [ ] Seasonal campaign emails (water heater flush, sump pump check)

---

## GHL CUSTOM FIELDS REFERENCE

| GHL Field Name | Field ID | Data Type | Our Form Field |
|----------------|----------|-----------|----------------|
| What service do you need? | `okz7uk4DI6P5p0gNLIm5` | SINGLE_OPTIONS | `service` |
| Describe your issue | `uurHpeIpvfnWTqdzSxGV` | LARGE_TEXT | `issue` |
| When do you need service? | `epQjKKfBLuGAG6p6dh4g` | SINGLE_OPTIONS | `urgency` |
| Property Type | `rFbivLFI0PrJp2WWrYlu` | SINGLE_OPTIONS | Not collected |

---

## ENV VARIABLES CHECKLIST

| Variable | Purpose | Status |
|----------|---------|--------|
| `GHL_API_KEY` | Go High Level API | ✅ Set |
| `GHL_LOCATION_ID` | GHL location | ✅ Set |
| `GHL_PIPELINE_ID` | Service Requests pipeline | ✅ Set |
| `GHL_PIPELINE_STAGE_ID` | "New Lead" stage | ✅ Set |
| `NOTIFICATION_EMAIL` | Team alert email | ✅ Set |
| `NOTIFICATION_PHONE` | Team alert SMS | ✅ Set (works once A2P registered) |
| `RESEND_API_KEY` | Transactional email | ✅ Set |
| `GOOGLE_PLACES_API_KEY` | Address autocomplete | ✅ Set |
