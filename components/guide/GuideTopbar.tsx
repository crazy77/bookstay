import Link from 'next/link';
import { LangToggle } from '@/components/ui/LangToggle';

const NAV = [
  { href: '#checkin', label: '체크인' },
  { href: '#arrival', label: '오시는 길' },
  { href: '#library', label: '서가' },
  { href: '#room', label: '객실' },
  { href: '#food', label: '도보맛집' },
] as const;

export function GuideTopbar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link className="brand" href="/">
          <span className="brand-ko">해묘서가</span>
          <span className="brand-en">BOOKSTAY</span>
        </Link>
        <nav className="anchor-nav" aria-label="섹션 이동">
          {NAV.map(({ href, label }) => (
            <a key={href} href={href}>
              {label}
            </a>
          ))}
        </nav>
        <LangToggle />
      </div>
    </header>
  );
}
