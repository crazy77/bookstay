import { cn } from '@/lib/cn';

type NaverBookLabelProps = {
  className?: string;
};

/** public/assets/naver-book.svg — 네이버 예약 라벨 */
export function NaverBookLabel({ className }: NaverBookLabelProps) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/naver-book.svg"
      alt=""
      width={37}
      height={16}
      className={cn('h-4 w-auto shrink-0', className)}
      aria-hidden
    />
  );
}
