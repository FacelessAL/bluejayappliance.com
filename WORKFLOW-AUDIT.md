# Blue Jay Appliance — Customer Intake Workflow Audit
**Date:** March 10, 2026  
**Status:** GHL integration verified — all fields tested end-to-end

---

## COMPLETE FORM SUBMISSION FLOW

When a customer submits the contact form, the following happens in order:

### 1. Spam Check (client-side)
- Honeypot field checked — if filled (bot), form fakes success and does nothing

### 2. Contact Created/Updated (GHL API)
- Upserted via email/phone match
- First name, last name, email, phone, address, city, zip saved
- **Custom fields populated** (using GHL field IDs):
  - Service Needed → `gNISHNBHDMOe7mvW4jKa`
  - Issue Description → `L48HHY2xwCB3dMxFUodf`
  - Urgency → `YAoiWJNqtiQXIcYYnRdE`
- Source set to "Website Contact Form"

### 3. Tags Added (without overwriting)
- Service type tag (e.g. "Emergency Repair")
- Urgency tag (e.g. "Emergency - ASAP")
- `website-lead` tag (always)
- Uses POST `/contacts/{id}/tags` — appends, never overwrites existing tags

### 4. Contact Note Logged
- Timestamped note with full request details added to contact
- Ensures complete history even for returning customers
- Includes: service, urgency, address, issue description, SMS consent

### 5. Notifications Sent (via GHL Workflow)
- **GHL Workflow "Email Jesse of Form"** triggers on webhook receipt
- **Team email** → service@bluejayappliance.com + jesse.mandujano73@gmail.com with full lead details
- **Customer confirmation** → can be added as a step in the GHL workflow
- **SMS** → can be added in GHL workflow (requires A2P registration)

### 6. Success Screen
- Confirms submission with check mark
- Mentions confirmation email sent
- Emergency requests get highlighted callout
- Call button always visible for immediate contact

---

## WHAT'S WORKING 

- Contact upsert via GHL API with all form fields mapped to correct custom field IDs
- Tags appended (not overwritten) with `website-lead` marker
- Contact notes with timestamped request history
- Team email notification via GHL workflow "Email Jesse of Form" (webhook)
- Google Places autocomplete (server-side, API key secure)
- A2P compliance (consent checkbox, privacy policy, terms disclosures)
- Honeypot spam protection
- Enhanced success screen with emergency callout
- All field mappings verified end-to-end via API test (Mar 10, 2026)

---

## PENDING ITEMS

### You handle in GHL UI:
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
- [ ] Customer confirmation email (add as step in GHL workflow)
- [ ] Seasonal campaign emails (water heater flush, sump pump check)

---

## GHL CUSTOM FIELDS REFERENCE

| GHL Field Name | Field ID | Data Type | Our Form Field |
|----------------|----------|-----------|----------------|
| Service Needed | `gNISHNBHDMOe7mvW4jKa` | TEXT | `service` |
| Issue Description | `L48HHY2xwCB3dMxFUodf` | LARGE_TEXT | `issue` |
| Urgency | `YAoiWJNqtiQXIcYYnRdE` | TEXT | `urgency` |
| Detailed Message | `By3Kk9aJJNC3gLh9lyST` | LARGE_TEXT | Used by GHL embedded form |
| Optional Message | `aBni8GjoEqc5QfJ71sef` | LARGE_TEXT | Not used |
| Package Interest | `hk1y6Hf3Mm27zieG0L0a` | SINGLE_OPTIONS | Not used |

---

## ENV VARIABLES CHECKLIST

| Variable | Purpose | Status |
|----------|---------|--------|
| `GHL_API_KEY` | Go High Level API | ✅ Set |
| `GHL_LOCATION_ID` | GHL location | ✅ Set |
| `GOOGLE_PLACES_API_KEY` | Address autocomplete | ✅ Set |
