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

            <h2 id="sms-program-description" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>SMS/Text Messaging Program and Terms</h2>
            <p style={{ marginBottom: '12px' }}>
              {biz.name} offers an SMS/text messaging program to provide customers with timely updates related to their appliance repair, installation, or rental service requests. By checking the SMS consent checkbox on our service request form or rental inquiry form, you expressly consent to receive SMS/text messages from {biz.name} at the mobile phone number you provide.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>SMS Program Description and Use Cases:</strong> Our SMS messaging program is used exclusively for the following service-related communications:
            </p>
            <ul style={{ listStyle: 'disc', paddingLeft: '24px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <li>Confirmation of your service request or rental inquiry submission</li>
              <li>Appointment scheduling, rescheduling, and reminder notifications</li>
              <li>Technician en-route and estimated arrival time updates</li>
              <li>Service completion and follow-up communications</li>
              <li>Delivery and pickup scheduling for appliance rentals</li>
              <li>Responses to questions or inquiries you have sent us</li>
            </ul>
            <p style={{ marginBottom: '12px' }}>
              We do <strong>not</strong> send marketing messages, promotional offers, advertisements, or solicitations via SMS/text. All messages are strictly transactional and related to services you have requested.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Consent is Optional:</strong> Your consent to receive SMS messages is <strong>not</strong> a condition of purchasing any goods or services from {biz.name}. You may submit a service request or rental inquiry without opting in to SMS communications. We will contact you by phone or email as an alternative.
            </p>
            <p style={{ marginBottom: '12px' }}>
              <strong>Message Frequency:</strong> Message frequency varies based on your service request and interactions. Typically, you will receive 1–5 messages per service request. We do not send recurring or subscription-based messages.
            </p>

            <h2 id="opt-out-instructions" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>How to Opt Out of SMS Messages (Text STOP)</h2>
            <p style={{ marginBottom: '12px' }}>
              You may opt out of receiving SMS/text messages from {biz.name} at any time by replying <strong>STOP</strong> to any message you receive from us. You may also text the word <strong>STOP</strong> to the number from which you received our messages. After opting out, you will receive one final confirmation message confirming your unsubscription. No further SMS messages will be sent unless you opt in again by submitting a new form with the SMS consent checkbox selected.
            </p>
            <p style={{ marginBottom: '16px' }}>
              For assistance with our SMS program, reply <strong>HELP</strong> to any message, or contact us directly at {biz.phone} or {biz.email}.
            </p>

            <h2 id="support-contact-information" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Support Contact Information</h2>
            <p style={{ marginBottom: '12px' }}>
              For any questions, concerns, or requests related to our SMS messaging program, our services, or these Terms of Service, you may contact us through any of the following methods:
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '16px' }}>
              <li><strong>Phone:</strong> {biz.phone}</li>
              <li><strong>Email:</strong> {biz.email}</li>
              <li><strong>Address:</strong> {biz.address.full}</li>
              <li><strong>SMS:</strong> Reply <strong>HELP</strong> to any text message from us</li>
            </ul>

            <h2 id="message-data-rates" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Message and Data Rates Disclosure</h2>
            <p style={{ marginBottom: '16px' }}>
              Standard message and data rates may apply to any SMS/text messages sent to or received from {biz.name}, depending on your mobile wireless carrier and your individual rate plan. {biz.name} does not charge any fees for sending or receiving SMS messages through our program, but your wireless carrier may charge you standard messaging fees for each message sent or received. Please contact your wireless carrier for details about your specific messaging plan and any applicable fees.
            </p>

            <h2 id="carrier-liability-disclaimer" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Carrier Liability Disclaimer</h2>
            <p style={{ marginBottom: '16px' }}>
              Wireless carriers (including but not limited to AT&amp;T, T-Mobile, Verizon, and other carriers) are not liable for delayed or undelivered messages. Message delivery is subject to effective transmission by your wireless carrier and is not guaranteed. {biz.name} is not responsible for messages that are not received due to carrier issues, network outages, device incompatibility, or incorrect phone numbers provided by the user. T-Mobile is not liable for delayed or undelivered messages.
            </p>

            <h2 id="age-restriction" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>Age Restriction (18+)</h2>
            <p style={{ marginBottom: '16px' }}>
              Our SMS messaging program, website, and services are intended for individuals who are 18 years of age or older. By submitting a service request form, rental inquiry form, or opting in to receive SMS/text messages, you represent and confirm that you are at least 18 years of age. If you are under 18, please do not submit any forms or opt in to SMS communications on our website. If we become aware that we have collected information from a person under 18, we will promptly delete that information.
            </p>

            <h2 id="sms-privacy" className="font-[family-name:var(--font-figtree)]" style={{ fontSize: '22px', fontWeight: 800, color: '#0F1B2D', marginTop: '32px', marginBottom: '12px' }}>SMS Privacy and No Sharing</h2>
            <p style={{ marginBottom: '12px' }}>
              Your phone number and SMS opt-in consent information will <strong>not</strong> be sold, rented, shared, or distributed to any third parties or affiliates for their marketing or promotional purposes. Your data is used solely by {biz.name} to communicate with you about the services you have requested.
            </p>
            <p style={{ marginBottom: '16px' }}>
              For complete details on how we collect, use, and protect your personal information, including your mobile phone number and SMS opt-in data, please see our <a href="/privacy-policy" style={{ color: '#1565C0', textDecoration: 'underline' }}>Privacy Policy</a>.
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
