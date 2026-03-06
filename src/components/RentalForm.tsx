'use client';

import { useState, useEffect, useRef, useCallback, FormEvent } from 'react';
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

interface PlaceSuggestion {
  placeId: string;
  description: string;
}

export default function RentalForm() {
  const biz = getBusiness();
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
    appliance: '',
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

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

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

  const canSubmit = formData.appliance && formData.serviceAddress && formData.firstName && formData.phone && smsConsent;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

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
          service_needed: `Appliance Rental — ${formData.appliance}`,
          issue_description: formData.details || `Rental inquiry for ${formData.appliance}`,
          urgency: 'Flexible / Not urgent',
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
            onChange={(e) => update('appliance', e.target.value)}
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
            required
          >
            <option value="">Select an option...</option>
            {applianceOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Additional Details */}
        <div>
          <label style={labelStyle}>Additional details (optional)</label>
          <textarea
            value={formData.details}
            onChange={(e) => update('details', e.target.value)}
            style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' }}
            placeholder="Gas or electric dryer? Any size preferences? Timeline?"
          />
        </div>

        {/* Address Search */}
        <div ref={suggestionsRef} style={{ position: 'relative' }}>
          <label style={labelStyle}>Delivery Address *</label>
          <input
            type="text"
            value={addressQuery}
            onChange={(e) => handleAddressSearch(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            style={inputStyle}
            placeholder="Start typing your address..."
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

        {/* Hidden address fields auto-filled */}
        <input type="hidden" value={formData.serviceAddress} />
        <input type="hidden" value={formData.city} />
        <input type="hidden" value={formData.postalCode} />

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
            I agree to receive SMS text messages from {biz.name} regarding my rental inquiry and scheduling. Msg &amp; data rates may apply. Reply <strong>STOP</strong> to opt out. View our{' '}
            <a href="/privacy-policy" target="_blank" style={{ color: '#1565C0', textDecoration: 'underline' }}>Privacy Policy</a>.
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
