'use client';

import { useState, FormEvent } from 'react';
import { getBusiness, getAllServices } from '@/lib/data';

const urgencyOptions = [
  'Emergency - ASAP',
  'Within 24 hours',
  'This week',
  'Flexible / Not urgent',
];


const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '10px 12px',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontSize: '14px',
  fontFamily: 'var(--font-poppins)',
  color: '#0F1B2D',
  backgroundColor: '#f9fafb',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '13px',
  fontWeight: 600,
  color: '#0F1B2D',
  marginBottom: '4px',
  fontFamily: 'var(--font-figtree)',
};


export default function ContactForm() {
  const biz = getBusiness();
  const serviceList = getAllServices().map(s => s.title);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [smsConsent, setSmsConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [formData, setFormData] = useState({
    service: '',
    issue: '',
    urgency: '',
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

  const canSubmit =
    formData.service && formData.issue && formData.urgency &&
    formData.serviceAddress && formData.city && formData.postalCode &&
    formData.firstName && formData.lastName && formData.email && formData.phone &&
    smsConsent;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Honeypot check — bots fill hidden fields, humans don't
    if (honeypot) {
      setStatus('sent');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          full_name: `${formData.firstName} ${formData.lastName}`.trim(),
          email: formData.email,
          phone: formData.phone,
          service_needed: formData.service,
          issue_description: formData.issue,
          urgency: formData.urgency,
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
      <div style={{ textAlign: 'center', padding: '48px 24px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', fontSize: '32px', color: '#fff' }}>
          &#10003;
        </div>
        <h3 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 700, color: '#0F1B2D', marginBottom: '8px' }}>
          Request Submitted!
        </h3>
        <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginBottom: '16px' }}>
          Thank you! We&apos;ve sent a confirmation to your email. A {biz.shortName} team member will be in touch shortly.
        </p>
        {formData.urgency?.includes('Emergency') && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '16px', marginBottom: '16px' }}>
            <p style={{ fontSize: '14px', color: '#991b1b', fontWeight: 600, fontFamily: 'var(--font-figtree)', margin: '0 0 8px' }}>
              Emergency Request Received
            </p>
            <p style={{ fontSize: '13px', color: '#7f1d1d', fontFamily: 'var(--font-poppins)', margin: 0, lineHeight: '1.5' }}>
              For fastest response, call us directly:
            </p>
          </div>
        )}
        <a href={`tel:${biz.phoneRaw}`} style={{ display: 'inline-block', backgroundColor: '#1565C0', color: '#ffffff', padding: '14px 36px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '16px', fontFamily: 'var(--font-figtree)' }}>
          Call {biz.phone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ padding: '8px' }}>
      {/* Honeypot — hidden from humans, bots fill it */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }}>
        <label htmlFor="website">Website</label>
        <input
          type="text"
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Service + Urgency row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>Service Needed *</label>
            <select
              value={formData.service}
              onChange={(e) => update('service', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
              required
            >
              <option value="">Select a service...</option>
              {serviceList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Urgency *</label>
            <select
              value={formData.urgency}
              onChange={(e) => update('urgency', e.target.value)}
              style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
              required
            >
              <option value="">Select urgency...</option>
              {urgencyOptions.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Issue description */}
        <div>
          <label style={labelStyle}>Describe your issue *</label>
          <textarea
            value={formData.issue}
            onChange={(e) => update('issue', e.target.value)}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '70px' }}
            placeholder="Please provide details about your issue..."
            required
          />
        </div>

        {/* Address row */}
        <div>
          <label style={labelStyle}>Service Address *</label>
          <input
            type="text"
            value={formData.serviceAddress}
            onChange={(e) => update('serviceAddress', e.target.value)}
            style={inputStyle}
            placeholder="Address where service is needed"
            required
          />
        </div>

        {/* City + Zip row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>City *</label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => update('city', e.target.value)}
              style={inputStyle}
              placeholder="City"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Postal Code *</label>
            <input
              type="text"
              value={formData.postalCode}
              onChange={(e) => update('postalCode', e.target.value)}
              style={inputStyle}
              placeholder="Postal Code"
              required
            />
          </div>
        </div>

        {/* Name row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>First Name *</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              style={inputStyle}
              placeholder="First name"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Last Name *</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              style={inputStyle}
              placeholder="Last name"
              required
            />
          </div>
        </div>

        {/* Email + Phone row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={labelStyle}>Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
              style={inputStyle}
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Phone *</label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
              style={inputStyle}
              placeholder="(555) 555-5555"
              required
            />
          </div>
        </div>

        {/* A2P 10DLC Compliance: SMS Opt-In Consent */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px 12px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <input
            type="checkbox"
            id="smsConsent"
            checked={smsConsent}
            onChange={(e) => setSmsConsent(e.target.checked)}
            style={{ marginTop: '3px', width: '18px', height: '18px', accentColor: '#1565C0', cursor: 'pointer', flexShrink: 0 }}
          />
          <label htmlFor="smsConsent" style={{ fontSize: '12px', lineHeight: '1.6', color: '#374151', fontFamily: 'var(--font-poppins)', cursor: 'pointer' }}>
            I agree to receive SMS text messages from {biz.name} regarding my service request, appointment updates, and follow-ups. Message frequency varies. Msg &amp; data rates may apply. Reply <strong>STOP</strong> to opt out at any time. Reply <strong>HELP</strong> for assistance. View our{' '}
            <a href="/privacy-policy" target="_blank" style={{ color: '#1565C0', textDecoration: 'underline' }}>Privacy Policy</a>{' '}and{' '}
            <a href="/terms-of-service" target="_blank" style={{ color: '#1565C0', textDecoration: 'underline' }}>Terms of Service</a>.
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!canSubmit || status === 'sending'}
          style={{
            width: '100%',
            padding: '14px',
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
          {status === 'sending' ? 'Submitting...' : 'Submit Request'}
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
