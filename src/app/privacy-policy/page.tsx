import type { Metadata } from 'next';
import { getBusiness } from '@/lib/data';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `Privacy Policy for ${biz.name}. Learn how we collect, use, and protect your personal information.`,
  openGraph: {
    title: `Privacy Policy | ${biz.name}`,
    description: `Privacy Policy for ${biz.name}. Learn how we collect, use, and protect your personal information.`,
  },
  alternates: {
    canonical: `${biz.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <SchemaMarkup
        type="WebPage"
        pageName="Privacy Policy"
        pageDescription={`Privacy Policy for ${biz.name}`}
        pageUrl={`${biz.url}/privacy-policy`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Privacy Policy', url: `${biz.url}/privacy-policy` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />

      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '36px', fontWeight: 800, color: '#0F1B2D', marginBottom: '32px' }}>Privacy Policy</h1>

          <div style={{ color: '#4b5563', lineHeight: '1.8', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
            <p style={{ marginBottom: '16px' }}>
              <strong>Last Updated:</strong> February 2026
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Introduction</h2>
            <p style={{ marginBottom: '16px' }}>
              {biz.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website at {biz.domain} or contact us to request our services.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Information We Collect</h2>
            <p style={{ marginBottom: '12px' }}>We collect only the information necessary to provide our services:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Contact Information:</strong> Your name, phone number, email address, and service address that you voluntarily provide when requesting a service, submitting our contact form, or calling us.</li>
              <li><strong>Service Information:</strong> Details about your issue or service request that help us schedule and complete the work.</li>
              <li><strong>Website Usage Data:</strong> Standard web server logs including your IP address, browser type, pages visited, and referring URL. This data is collected automatically and is used solely to maintain and improve our website.</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> collect financial information through our website. Payment is handled on-site at the time of service.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>How We Use Your Information</h2>
            <p style={{ marginBottom: '12px' }}>We use the information we collect solely to:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Contact you to schedule, confirm, or follow up on service requests</li>
              <li>Provide the services you requested</li>
              <li>Respond to your questions or inquiries</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> use your information for marketing purposes, and we do <strong>not</strong> send promotional emails or newsletters unless you specifically request them.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>SMS/Text Messaging</h2>
            <p style={{ marginBottom: '12px' }}>
              By opting in to our SMS communications via our contact form, you consent to receive text messages from {biz.name} at the phone number you provide. These messages may include:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Confirmation of your service request</li>
              <li>Appointment scheduling, reminders, and updates</li>
              <li>Follow-up communications related to your service</li>
              <li>Responses to your inquiries</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message Frequency:</strong> Message frequency varies based on your service request and interactions. Typically, you will receive 1–5 messages per service request.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Costs:</strong> Message and data rates may apply depending on your mobile carrier and plan. {biz.name} does not charge for SMS messages, but your carrier may.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Opt-Out:</strong> You may opt out of receiving text messages at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message and will no longer receive SMS messages from us unless you opt in again.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Help:</strong> For assistance with our SMS program, reply <strong>HELP</strong> to any message or contact us at {biz.phone} or {biz.email}.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>No Sharing:</strong> We do not sell, share, or distribute your phone number or SMS opt-in consent information to any third parties or affiliates for marketing or promotional purposes. Your phone number is used solely to communicate with you about services you have requested from {biz.name}.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Supported Carriers:</strong> Our SMS service is supported on all major U.S. carriers including AT&amp;T, T-Mobile, Verizon, Sprint, and others. Service availability may vary by carrier.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Sharing Your Information</h2>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> sell, trade, rent, or otherwise transfer your personal information to third parties. Your information is only shared when required by law or as necessary to provide our services (for example, sharing your service address with a member of our team dispatched to your location).
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Cookies</h2>
            <p style={{ marginBottom: '16px' }}>
              Our website may use basic cookies to ensure proper functionality. We do not use tracking cookies for advertising purposes. Third-party services embedded on our site (such as Google Maps) may set their own cookies according to their respective privacy policies.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Data Security</h2>
            <p style={{ marginBottom: '16px' }}>
              We take reasonable measures to protect your personal information from unauthorized access, alteration, or disclosure. Our website uses HTTPS encryption to protect data transmitted between your browser and our server.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Your Rights</h2>
            <p style={{ marginBottom: '16px' }}>
              You have the right to request access to, correction of, or deletion of any personal information we hold about you. To make such a request, contact us using the information below.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Changes to This Policy</h2>
            <p style={{ marginBottom: '16px' }}>
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Contact Us</h2>
            <p style={{ marginBottom: '12px' }}>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <li><strong>Phone:</strong> {biz.phone}</li>
              <li><strong>Email:</strong> {biz.email}</li>
              <li><strong>Address:</strong> {biz.address.full}</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
