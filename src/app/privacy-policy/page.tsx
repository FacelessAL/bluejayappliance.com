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

            <h2 id="what-information-is-collected" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>What Information We Collect</h2>
            <p style={{ marginBottom: '12px' }}>We collect only the information necessary to provide our services. The types of personal information we collect include:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Contact Information:</strong> Your first name, last name, phone number (including mobile number), email address, and service address that you voluntarily provide when submitting a service request form, rental inquiry form, or contacting us by phone.</li>
              <li><strong>Service Information:</strong> Details about your appliance issue, service type requested, urgency level, and scheduling preferences.</li>
              <li><strong>Mobile Phone Number:</strong> When you provide your mobile phone number and opt in to receive SMS/text messages, we collect your mobile number for the purpose of sending service-related text messages.</li>
              <li><strong>Website Usage Data:</strong> Standard web server logs including your IP address, browser type and version, device type, operating system, pages visited, time spent on pages, and referring URL. This data is collected automatically through cookies and similar technologies.</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> collect financial information, Social Security numbers, or other sensitive personal data through our website. Payment is handled on-site at the time of service.
            </p>

            <h2 id="how-data-is-used" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>How We Use Your Information</h2>
            <p style={{ marginBottom: '12px' }}>We use the personal information we collect for the following purposes:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>To contact you by phone, email, or SMS/text message to schedule, confirm, or follow up on service requests</li>
              <li>To provide the appliance repair, installation, or rental services you requested</li>
              <li>To send you appointment reminders, service updates, and delivery confirmations via SMS/text message (if you opted in)</li>
              <li>To respond to your questions or inquiries</li>
              <li>To maintain and improve our website functionality and user experience</li>
              <li>To comply with applicable legal obligations</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> use your information for marketing or promotional purposes. We do <strong>not</strong> send promotional emails, newsletters, or marketing text messages. All SMS/text messages are strictly related to services you have requested.
            </p>

            <h2 id="sms-opt-in-details" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>SMS/Text Messaging Opt-In Details</h2>
            <p style={{ marginBottom: '12px' }}>
              By checking the SMS consent checkbox on our service request form or rental inquiry form, you expressly consent to receive SMS/text messages from {biz.name} at the mobile phone number you provide. Your consent to receive SMS messages is <strong>not</strong> a condition of purchasing any goods or services from {biz.name}. You may submit a service request without opting in to SMS communications.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Types of Messages:</strong> If you opt in, you may receive the following types of SMS/text messages:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Confirmation of your service request or rental inquiry</li>
              <li>Appointment scheduling, reminders, and updates</li>
              <li>Service status updates and technician arrival notifications</li>
              <li>Delivery confirmations (for rental inquiries)</li>
              <li>Follow-up communications related to completed services</li>
              <li>Responses to your inquiries</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message Frequency:</strong> Message frequency varies based on your service request and interactions. Typically, you will receive 1–5 messages per service request. We do not send recurring marketing or promotional messages.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message and Data Rates:</strong> Standard message and data rates may apply depending on your mobile carrier and plan. {biz.name} does not charge any fees for SMS messages, but your wireless carrier may charge you for each message you send or receive.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Opt-Out Instructions:</strong> You may opt out of receiving SMS/text messages at any time by replying <strong>STOP</strong> to any message you receive from us. After opting out, you will receive one final confirmation message confirming your unsubscription. You will not receive any further SMS messages from us unless you opt in again by submitting a new form with the SMS consent checkbox selected.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Help:</strong> For assistance with our SMS messaging program, reply <strong>HELP</strong> to any message, or contact us directly at {biz.phone} or {biz.email}.
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Supported Carriers:</strong> Our SMS messaging service is supported on all major U.S. wireless carriers including AT&amp;T, T-Mobile, Verizon, and others. Carrier participation and message delivery may vary. Carriers are not liable for delayed or undelivered messages.
            </p>

            <h2 id="no-sharing-sms-opt-in" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>No Sharing of SMS Opt-In Consent</h2>
            <p style={{ marginBottom: '16px' }}>
              <strong>We do not sell, rent, loan, trade, lease, share, or otherwise distribute or disclose your mobile phone number, SMS opt-in consent, or any SMS-related personal data to any third parties or affiliates for their marketing or promotional purposes.</strong> Your phone number and opt-in information are used solely and exclusively by {biz.name} to communicate with you about the services you have requested. This commitment applies to all data collected through our SMS consent checkbox on all forms on our website.
            </p>

            <h2 className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Sharing Your Information</h2>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> sell, trade, rent, or otherwise transfer your personal information to third parties. Your information is only shared when required by law or as necessary to provide our services (for example, sharing your service address with a member of our team dispatched to your location).
            </p>

            <h2 id="cookie-and-tracking-info" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Cookie and Tracking Information</h2>
            <p style={{ marginBottom: '12px' }}>
              Our website uses cookies and similar tracking technologies to ensure proper functionality, analyze website traffic, and improve user experience. Specifically:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Essential Cookies:</strong> Required for basic website functionality such as page navigation, form submissions, and session management.</li>
              <li><strong>Analytics Cookies:</strong> We use Vercel Analytics to collect anonymized usage data including pages visited, time on site, and device type. This data helps us improve our website. No personally identifiable information is collected through analytics.</li>
              <li><strong>Third-Party Cookies:</strong> Third-party services embedded on our site (such as Google Maps) may set their own cookies according to their respective privacy policies. We do not control these cookies.</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              We do <strong>not</strong> use tracking cookies for advertising, retargeting, or cross-site behavioral tracking purposes. You may disable cookies in your browser settings, but doing so may affect website functionality.
            </p>

            <h2 id="data-security-practices" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Data Security Practices</h2>
            <p style={{ marginBottom: '12px' }}>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. Our security practices include:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Encryption:</strong> Our website uses TLS/HTTPS encryption to protect all data transmitted between your browser and our server.</li>
              <li><strong>Access Controls:</strong> Access to personal information is restricted to authorized personnel who need it to provide services.</li>
              <li><strong>Secure Storage:</strong> Personal data is stored in secure, access-controlled systems provided by our service management platform.</li>
              <li><strong>Data Minimization:</strong> We only collect and retain the minimum amount of personal information necessary to provide our services.</li>
            </ul>

            <h2 id="user-rights" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Your Rights (Access, Update, Delete, Unsubscribe)</h2>
            <p style={{ marginBottom: '12px' }}>You have the following rights regarding your personal information:</p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li><strong>Right to Access:</strong> You may request a copy of the personal information we hold about you.</li>
              <li><strong>Right to Correction:</strong> You may request that we correct any inaccurate or incomplete personal information.</li>
              <li><strong>Right to Deletion:</strong> You may request that we delete your personal information from our systems.</li>
              <li><strong>Right to Opt Out of SMS:</strong> You may unsubscribe from SMS/text messages at any time by replying <strong>STOP</strong> to any message.</li>
              <li><strong>Right to Withdraw Consent:</strong> You may withdraw your consent for data processing at any time by contacting us.</li>
            </ul>
            <p style={{ marginBottom: '16px' }}>
              To exercise any of these rights, contact us at {biz.phone}, {biz.email}, or by mail at {biz.address.full}. We will respond to your request within 30 days.
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
