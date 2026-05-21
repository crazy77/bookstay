import { Button } from '@/components/ui/button';
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
    >
      북스테이 예약하기
    </Button>
  );
}
