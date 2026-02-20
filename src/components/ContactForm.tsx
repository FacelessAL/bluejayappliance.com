'use client';

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
import { getBusiness, getAllServices } from '@/lib/data';

const urgencyOptions = [
  'Emergency - ASAP',
  'Within 24 hours',
  'This week',
  'Flexible / Not urgent',
];

const stepLabels = ['Service Info', 'Location', 'Your Details'];


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

interface PlaceSuggestion {
  placeId: string;
  description: string;
}

export default function ContactForm() {
  const biz = getBusiness();
  const serviceList = getAllServices().map(s => s.title);
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [addressQuery, setAddressQuery] = useState('');
  const [suggestions, setSuggestions] = useState<PlaceSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingPlace, setLoadingPlace] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
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

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Fetch address suggestions with debounce
  const handleAddressSearch = useCallback((value: string) => {
    setAddressQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch('/api/places', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ input: value }),
        });
        const data = await res.json();
        setSuggestions(data.suggestions || []);
        setShowSuggestions((data.suggestions || []).length > 0);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }, []);

  // Select a suggestion and fetch place details
  const selectSuggestion = useCallback(async (suggestion: PlaceSuggestion) => {
    setAddressQuery(suggestion.description);
    setShowSuggestions(false);
    setSuggestions([]);
    setLoadingPlace(true);

    try {
      const res = await fetch(`/api/places?placeId=${suggestion.placeId}`);
      const data = await res.json();
      setFormData((prev) => ({
        ...prev,
        serviceAddress: data.serviceAddress || prev.serviceAddress,
        city: data.city || prev.city,
        postalCode: data.postalCode || prev.postalCode,
      }));
    } catch {
      // User can still type manually
    } finally {
      setLoadingPlace(false);
    }
  }, []);

  const canProceedStep1 = formData.service && formData.issue && formData.urgency;
  const canProceedStep2 = formData.serviceAddress && formData.city && formData.postalCode;
  const canSubmit = formData.firstName && formData.lastName && formData.email && formData.phone && smsConsent;

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
      {/* Step indicator with labels */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '32px' }}>
        {[1, 2, 3].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 700,
                  fontFamily: 'var(--font-figtree)',
                  backgroundColor: step > s ? '#16a34a' : step === s ? '#1565C0' : '#e5e7eb',
                  color: step >= s ? '#ffffff' : '#9ca3af',
                  transition: 'all 0.3s',
                  boxShadow: step === s ? '0 0 0 3px rgba(21,101,192,0.2)' : 'none',
                }}
              >
                {step > s ? '\u2713' : s}
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: step === s ? 700 : 500,
                color: step === s ? '#1565C0' : step > s ? '#16a34a' : '#9ca3af',
                fontFamily: 'var(--font-figtree)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>
                Step {s}
              </span>
              <span style={{
                fontSize: '11px',
                color: step === s ? '#0F1B2D' : '#9ca3af',
                fontFamily: 'var(--font-poppins)',
              }}>
                {stepLabels[i]}
              </span>
            </div>
            {i < 2 && (
              <div style={{
                width: '40px',
                height: '2px',
                backgroundColor: step > s ? '#16a34a' : '#e5e7eb',
                margin: '0 8px',
                marginBottom: '40px',
                transition: 'background-color 0.3s',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Service Info */}
      {step === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={labelStyle}>What service do you need? *</label>
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
            <label style={labelStyle}>Describe your issue *</label>
            <textarea
              value={formData.issue}
              onChange={(e) => update('issue', e.target.value)}
              style={{ ...inputStyle, resize: 'vertical', minHeight: '110px' }}
              placeholder="Please provide details about your issue..."
              required
            />
          </div>
          <div>
            <label style={labelStyle}>When do you need service? *</label>
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
          <button
            type="button"
            onClick={() => canProceedStep1 && setStep(2)}
            disabled={!canProceedStep1}
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: canProceedStep1 ? '#1565C0' : '#d1d5db',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: 700,
              fontFamily: 'var(--font-figtree)',
              cursor: canProceedStep1 ? 'pointer' : 'not-allowed',
              transition: 'background-color 0.2s',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Address Info */}
      {step === 2 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div ref={suggestionsRef} style={{ position: 'relative' }}>
            <label style={labelStyle}>Search Address</label>
            <input
              type="text"
              value={addressQuery}
              onChange={(e) => handleAddressSearch(e.target.value)}
              onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
              style={{ ...inputStyle, borderColor: '#1565C0' }}
              placeholder="Start typing an address..."
            />
            {loadingPlace && (
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px', fontFamily: 'var(--font-poppins)' }}>Filling in address details...</div>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <ul style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0 0 8px 8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', listStyle: 'none', padding: 0, margin: 0, zIndex: 50, maxHeight: '200px', overflowY: 'auto' }}>
                {suggestions.map((s) => (
                  <li
                    key={s.placeId}
                    onClick={() => selectSuggestion(s)}
                    style={{ padding: '10px 14px', fontSize: '14px', fontFamily: 'var(--font-poppins)', color: '#0F1B2D', cursor: 'pointer', borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.1s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f9ff')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#ffffff')}
                  >
                    {s.description}
                  </li>
                ))}
              </ul>
            )}
          </div>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setStep(1)}
              style={{ flex: 1, padding: '16px', backgroundColor: 'transparent', color: '#0F1B2D', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-figtree)', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => canProceedStep2 && setStep(3)}
              disabled={!canProceedStep2}
              style={{ flex: 2, padding: '16px', backgroundColor: canProceedStep2 ? '#1565C0' : '#d1d5db', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-figtree)', cursor: canProceedStep2 ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Customer Info */}
      {step === 3 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
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
          {/* A2P 10DLC Compliance: SMS Opt-In Consent */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '14px 16px', backgroundColor: '#f9fafb', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
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

          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={() => setStep(2)}
              style={{ flex: 1, padding: '16px', backgroundColor: 'transparent', color: '#0F1B2D', border: '2px solid #d1d5db', borderRadius: '8px', fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-figtree)', cursor: 'pointer' }}
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!canSubmit || status === 'sending'}
              style={{ flex: 2, padding: '16px', backgroundColor: canSubmit ? '#1565C0' : '#d1d5db', color: '#ffffff', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-figtree)', cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'background-color 0.2s', textTransform: 'uppercase', letterSpacing: '0.5px' }}
            >
              {status === 'sending' ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
          {status === 'error' && (
            <p style={{ color: '#b91c1c', textAlign: 'center', fontSize: '14px', fontFamily: 'var(--font-poppins)' }}>
              Something went wrong. Please call us at {biz.phone}.
            </p>
          )}
        </div>
      )}
    </form>
  );
}
