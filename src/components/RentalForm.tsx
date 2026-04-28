'use client';

import { useState, FormEvent } from 'react';
import { getBusiness } from '@/lib/data';

const applianceOptions = [
  'Washer Only',
  'Dryer Only',
  'Washer & Dryer Set',
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '15px',
  fontFamily: 'var(--font-poppins)',
  color: '#0F1B2D',
  backgroundColor: '#f9fafb',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '14px',
  fontWeight: 600,
  color: '#0F1B2D',
  marginBottom: '8px',
  fontFamily: 'var(--font-figtree)',
};

export default function RentalForm() {
  const biz = getBusiness();
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    appliance: '',
    dryerType: '',
    details: '',
    serviceAddress: '',
    city: '',
    postalCode: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const update = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const needsDryerType = formData.appliance === 'Dryer Only' || formData.appliance === 'Washer & Dryer Set';
  const canSubmit = formData.appliance && formData.serviceAddress && formData.city && formData.firstName && formData.phone && (!needsDryerType || formData.dryerType);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    if (honeypot) {
      setStatus('sent');
      return;
    }

    const applianceDesc = needsDryerType
      ? `${formData.appliance} (${formData.dryerType} dryer)`
      : formData.appliance;

    try {
      const res = await fetch('/api/rental', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email || '',
          phone: formData.phone,
          appliance_type: applianceDesc,
          rental_details: formData.details || `Rental inquiry for ${applianceDesc}`,
          service_address: formData.serviceAddress,
          city: formData.city,
          postal_code: formData.postalCode,
        }),
      });
      if (!res.ok) throw new Error('Submit failed');
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  if (status === 'sent') {
    return (
      <div style={{ textAlign: 'center', padding: '40px 24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px', color: '#fff' }}>
          &#10003;
        </div>
        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
          Rental Request Submitted!
        </h3>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginBottom: '16px' }}>
          Thank you! A {biz.shortName} team member will call you back to discuss your rental options and schedule delivery.
        </p>
        <a href={`tel:${biz.phoneRaw}`} style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-figtree)' }}>
          Call {biz.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Honeypot */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor="rental_website">Website</label>
        <input type="text" id="rental_website" name="rental_website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        {/* Appliance Selection */}
        <div>
          <label style={labelStyle}>What do you need to rent? *</label>
          <select
            value={formData.appliance}
            onChange={(e) => { update('appliance', e.target.value); if (!e.target.value.includes('Dryer')) update('dryerType', ''); }}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
            required
          >
            <option value="">Select an option...</option>
            {applianceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Gas or Electric — shown when dryer is involved */}
        {needsDryerType && (
          <div>
            <label style={labelStyle}>Gas or electric dryer? *</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Gas', 'Electric'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => update('dryerType', type)}
                  style={{
                    flex: 1,
                    padding: '14px 16px',
                    border: formData.dryerType === type ? '2px solid #1565C0' : '2px solid #e5e7eb',
                    borderRadius: '8px',
                    backgroundColor: formData.dryerType === type ? '#E3F2FD' : '#f9fafb',
                    color: formData.dryerType === type ? '#1565C0' : '#6b7280',
                    fontWeight: formData.dryerType === type ? 700 : 500,
                    fontSize: '15px',
                    fontFamily: 'var(--font-figtree)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Installation Requirement Note */}
        <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderRadius: '8px', padding: '12px 16px' }}>
          <p style={{ fontSize: '13px', color: '#92400e', fontFamily: 'var(--font-poppins)', lineHeight: '1.5', margin: 0 }}>
            <strong>Important:</strong> Rental appliances require existing hookups at the delivery address (water supply, drain, gas line or electrical outlet, and dryer vent as applicable). We do not install new hookups.
          </p>
        </div>

        {/* Additional Details */}
        <div>
          <label style={labelStyle}>Additional details (optional)</label>
          <textarea
            value={formData.details}
            onChange={(e) => update('details', e.target.value)}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
            placeholder="Any size preferences? Timeline? Questions?"
          />
        </div>

        {/* Address — simple manual fields */}
        <div>
          <label style={labelStyle}>Delivery Address *</label>
          <input
            type="text"
            value={formData.serviceAddress}
            onChange={(e) => update('serviceAddress', e.target.value)}
            style={inputStyle}
            placeholder="Street address"
            required
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>City *</label>
            <input type="text" value={formData.city} onChange={(e) => update('city', e.target.value)} style={inputStyle} placeholder="City" required />
          </div>
          <div>
            <label style={labelStyle}>Zip Code</label>
            <input type="text" value={formData.postalCode} onChange={(e) => update('postalCode', e.target.value)} style={inputStyle} placeholder="Zip" />
          </div>
        </div>

        {/* Name */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div>
            <label style={labelStyle}>First Name *</label>
            <input type="text" value={formData.firstName} onChange={(e) => update('firstName', e.target.value)} style={inputStyle} placeholder="First name" required />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input type="text" value={formData.lastName} onChange={(e) => update('lastName', e.target.value)} style={inputStyle} placeholder="Last name" />
          </div>
        </div>

        {/* Contact */}
        <div>
          <label style={labelStyle}>Phone Number *</label>
          <input type="tel" value={formData.phone} onChange={(e) => update('phone', e.target.value)} style={inputStyle} placeholder="(555) 555-5555" required />
        </div>
        <div>
          <label style={labelStyle}>Email (optional)</label>
          <input type="email" value={formData.email} onChange={(e) => update('email', e.target.value)} style={inputStyle} placeholder="your@email.com" />
        </div>

        {/* SMS Consent */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <input
            type="checkbox"
            id="rentalSmsConsent"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: '#1565C0', cursor: 'pointer', flexShrink: 0 }}
          />
          <label htmlFor="rentalSmsConsent" style={{ fontSize: '12px', lineHeight: '1.6', color: '#374151', fontFamily: 'var(--font-poppins)', cursor: 'pointer' }}>
            I agree to receive SMS/text messages from <strong>{biz.name}</strong> at the phone number provided regarding my rental inquiry, including scheduling updates, delivery confirmations, and follow-up communications. Message frequency varies (typically 1–5 messages per request). Msg &amp; data rates may apply. Reply <strong>STOP</strong> to opt out at any time. Reply <strong>HELP</strong> for assistance. Consent is not a condition of purchase or service. View our{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: '#1565C0', textDecoration: 'underline' }}>Privacy Policy</a>{' '}and{' '}
            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" style={{ color: '#1565C0', textDecoration: 'underline' }}>Terms of Service</a>.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || status === 'sending'}
          style={{
            width: '100%',
            padding: '16px',
            backgroundColor: canSubmit ? '#1565C0' : '#d1d5db',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 700,
            fontFamily: 'var(--font-figtree)',
            cursor: canSubmit ? 'pointer' : 'not-allowed',
            transition: 'background-color 0.2s',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}
        >
          {status === 'sending' ? 'Submitting...' : 'Request Rental Info'}
        </button>
        {status === 'error' && (
          <p style={{ color: '#b91c1c', textAlign: 'center', fontSize: '14px', fontFamily: 'var(--font-poppins)' }}>
            Something went wrong. Please call us at {biz.phone}.
          </p>
        )}
      </div>
    </form>
  );
}
