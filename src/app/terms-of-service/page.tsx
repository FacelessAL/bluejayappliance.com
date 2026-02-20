import type { Metadata } from 'next';
import { getBusiness } from '@/lib/data';
import SchemaMarkup from '@/components/SchemaMarkup';
import Breadcrumbs from '@/components/Breadcrumbs';

const biz = getBusiness();

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `Terms of Service for ${biz.name}. Read our terms and conditions for ${biz.industryLabel.toLowerCase()} services in ${biz.serviceAreaName}.`,
  openGraph: {
    title: `Terms of Service | ${biz.name}`,
    description: `Terms of Service for ${biz.name}. Read our terms and conditions for ${biz.industryLabel.toLowerCase()} services in ${biz.serviceAreaName}.`,
  },
  alternates: {
    canonical: `${biz.url}/terms-of-service`,
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <SchemaMarkup
        type="WebPage"
        pageName="Terms of Service"
        pageDescription={`Terms of Service for ${biz.name}`}
        pageUrl={`${biz.url}/terms-of-service`}
        breadcrumbs={[
          { name: 'Home', url: biz.url },
          { name: 'Terms of Service', url: `${biz.url}/terms-of-service` },
        ]}
      />

      <Breadcrumbs items={[{ label: 'Terms of Service', href: '/terms-of-service' }]} />

      <section style={{ padding: '64px 0', backgroundColor: '#ffffff' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '36px', fontWeight: 800, color: '#0F1B2D', marginBottom: '32px' }}>Terms of Service</h1>

          <div style={{ color: '#4b5563', lineHeight: '1.8', fontFamily: 'var(--font-poppins)', fontSize: '15px' }}>
            <p style={{ marginBottom: '16px' }}>
              <strong>Last Updated:</strong> February 2026
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Agreement to Terms</h2>
            <p style={{ marginBottom: '16px' }}>
              By accessing or using the {biz.name} website at {biz.domain} or by requesting our services, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our website or services.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Services</h2>
            <p style={{ marginBottom: '16px' }}>
              {biz.name} provides {biz.industryLabel.toLowerCase()} services to residential and commercial customers in the {biz.serviceAreaName} area. All services are performed by licensed, insured professionals in accordance with applicable state and local codes and regulations.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Service Requests</h2>
            <p style={{ marginBottom: '16px' }}>
              Submitting a service request through our website or by phone does not constitute a binding contract. A service agreement is established when our team confirms the appointment and provides a written estimate or quote for the work to be performed. All pricing is provided upfront before work begins.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Pricing and Payment</h2>
            <p style={{ marginBottom: '16px' }}>
              We provide upfront, flat-rate pricing before any work begins. The quoted price is the price you pay — no hidden fees or surprise charges. Payment is due upon completion of services. We accept cash, all major credit cards, and personal checks.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Licensing and Insurance</h2>
            <p style={{ marginBottom: '16px' }}>
              {biz.name} is fully licensed{biz.license ? ` (${biz.licenseLabel} #${biz.license})` : ''}, bonded, and insured. All work is performed in compliance with applicable building codes and regulations.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Warranty</h2>
            <p style={{ marginBottom: '16px' }}>
              We stand behind our workmanship with a satisfaction guarantee. If you are not satisfied with the quality of our work, contact us and we will make it right. Specific warranty terms may vary by service type and will be communicated at the time of service.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>SMS/Text Messaging Terms</h2>
            <p style={{ marginBottom: '12px' }}>
              By checking the SMS consent checkbox on our contact form, you expressly consent to receive text messages from {biz.name} at the mobile phone number you provide. Your consent is not a condition of purchasing any services from us.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Types of Messages:</strong> You may receive text messages related to your service request, including appointment confirmations, scheduling updates, service follow-ups, and responses to your inquiries. We do not send marketing or promotional text messages.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message Frequency:</strong> Message frequency varies. You will typically receive 1–5 messages per service request.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message &amp; Data Rates:</strong> Standard message and data rates may apply depending on your mobile carrier and plan. {biz.name} is not responsible for any fees charged by your carrier.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Opt-Out:</strong> You may opt out of SMS messages at any time by replying <strong>STOP</strong> to any message. You will receive a one-time confirmation that you have been unsubscribed. No further messages will be sent unless you re-opt in.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Help:</strong> Reply <strong>HELP</strong> to any message for assistance, or contact us at {biz.phone} or {biz.email}.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Privacy:</strong> Your phone number and opt-in consent will not be shared with or sold to third parties or affiliates for marketing purposes. Please see our <a href="/privacy-policy" style={{ color: '#1565C0', textDecoration: 'underline' }}>Privacy Policy</a> for more details on how we handle your personal information.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Supported Carriers:</strong> Compatible with all major U.S. carriers including AT&amp;T, T-Mobile, Verizon, and others. Carrier participation and message delivery may vary.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Website Use</h2>
            <p style={{ marginBottom: '16px' }}>
              The content on this website is provided for informational purposes only. While we strive to keep information accurate and up to date, we make no warranties or representations about the completeness, accuracy, or reliability of any content on this site. You use the information on this website at your own risk.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Limitation of Liability</h2>
            <p style={{ marginBottom: '16px' }}>
              To the fullest extent permitted by law, {biz.name} shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our website or services. Our total liability for any claim related to our services shall not exceed the amount paid for the specific service giving rise to the claim.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Governing Law</h2>
            <p style={{ marginBottom: '16px' }}>
              These Terms of Service are governed by and construed in accordance with the laws of the State of Illinois, without regard to conflict of law principles.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Changes to These Terms</h2>
            <p style={{ marginBottom: '16px' }}>
              We reserve the right to update these Terms of Service at any time. Changes will be posted on this page with an updated &quot;Last Updated&quot; date. Continued use of our website or services after changes are posted constitutes acceptance of the revised terms.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Contact Us</h2>
            <p style={{ marginBottom: '12px' }}>
              If you have any questions about these Terms of Service, please contact us:
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
