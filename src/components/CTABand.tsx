import Link from 'next/link';
import { getBusiness } from '@/lib/data';

interface CTABandProps {
  serviceName?: string;
}

export default function CTABand({ serviceName }: CTABandProps = {}) {
  const biz = getBusiness();

  const heading = serviceName
    ? `Ready to Get Your ${serviceName} Fixed?`
    : 'Ready to Get Your Appliance Fixed?';

  return (
    <section style={{ backgroundColor: '#1565C0', padding: '40px 0' }}>
      <div className="container text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
          {heading}
        </h2>
        <p className="text-white mb-4" style={{ opacity: 0.9, fontFamily: 'var(--font-poppins)' }}>Same or next day appointments available!</p>
        <Link
          href={`tel:${biz.phoneRaw}`}
          className="inline-block text-3xl md:text-4xl font-bold text-white hover:text-bj-sky transition-colors"
        >
          {biz.phone}
        </Link>
      </div>
    </section>
  );
}
