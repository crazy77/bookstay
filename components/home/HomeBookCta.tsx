import { Button } from '@/components/ui/button';
import { NaverBookLabel } from '@/components/ui/NaverBookLabel';
import { NAVER_BOOK_URL } from '@/lib/site';

type HomeBookCtaProps = {
  className?: string;
  fullWidth?: boolean;
};

export function HomeBookCta({ className, fullWidth = true }: HomeBookCtaProps) {
  return (
    <Button
      href={NAVER_BOOK_URL}
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
