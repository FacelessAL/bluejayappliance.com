import Link from 'next/link';
import { getBusiness } from '@/lib/data';

export function linkifyBody(text: string) {
  const biz = getBusiness();
  const phoneSlogan = biz.phoneSlogan;

  if (!phoneSlogan) return text;

  const parts = text.split(phoneSlogan);

  if (parts.length === 1) return text;

  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && (
        <Link
          href={`tel:${biz.phoneRaw}`}
          style={{ color: '#1565C0', fontWeight: 600, textDecoration: 'none' }}
        >
          {phoneSlogan}
        </Link>
      )}
    </span>
  ));
}
