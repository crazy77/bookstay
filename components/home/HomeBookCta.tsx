import { Button } from '@/components/ui/button';
import { NaverBookLabel } from '@/components/ui/NaverBookLabel';

type HomeBookCtaProps = {
  href: string;
  className?: string;
  fullWidth?: boolean;
};

export function HomeBookCta({ href, className, fullWidth = true }: HomeBookCtaProps) {
  return (
    <Button
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      fullWidth={fullWidth}
      className={className}
      aria-label="네이버 예약 — 북스테이 예약하기"
    >
      <span>북스테이 예약하기</span>
      <NaverBookLabel />
    </Button>
  );
}
