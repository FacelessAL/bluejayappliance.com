import Link from 'next/link';
import Image from 'next/image';

interface ServiceCardProps {
  title: string;
  shortTitle?: string;
  description?: string;
  image: string;
  href: string;
  compact?: boolean;
}

export default function ServiceCard({ title, shortTitle, description, image, href, compact = false }: ServiceCardProps) {
  return (
    <Link href={href}>
      <div
        className="group overflow-hidden cursor-pointer"
        style={{ backgroundColor: '#ffffff', borderBottom: compact ? '6px solid #1565C0' : '10px solid #1565C0', height: '100%', display: 'flex', flexDirection: 'column' as const }}
      >
        {/* Image */}
        <div className={`relative overflow-hidden ${compact ? 'h-[180px]' : 'h-[300px]'}`}>
          <Image
            src={image}
            alt={title}
            fill
            unoptimized={image.endsWith('.gif')}
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        {/* Title + Description + Button */}
        <div style={{ padding: compact ? '14px 16px' : '20px', flex: 1, display: 'flex', flexDirection: 'column' as const }}>
          <h3 className="font-[family-name:var(--font-figtree)]" style={{ color: '#0F1B2D', fontWeight: 700, fontSize: compact ? '18px' : '30px', textTransform: 'uppercase', marginBottom: compact ? '8px' : '12px' }}>{title}</h3>
          {description && (
            <p style={{ color: '#4b5563', fontSize: compact ? '13px' : '14px', lineHeight: '1.6', fontFamily: 'var(--font-poppins)', marginBottom: '12px', flex: 1 }}>{description}</p>
          )}
          <span className="inline-block font-[family-name:var(--font-figtree)] transition-colors" style={{ backgroundColor: '#1565C0', color: '#ffffff', fontSize: compact ? '13px' : '16px', fontWeight: 700, lineHeight: '1.5em', borderRadius: '2px', padding: compact ? '6px 14px' : '8px 20px', alignSelf: 'flex-start' }}>
            <span className="hidden md:inline">View {shortTitle || title} Details</span>
            <span className="inline md:hidden">View Details</span>
          </span>
        </div>
      </div>
    </Link>
  );
}
