import Image from 'next/image';
import { cn } from '@/lib/cn';

export function Seagull({ className }: { className?: string }) {
  return (
    <Image
      className={cn('mx-auto block h-auto w-[90px] opacity-85', className)}
      src="/assets/symbol.png"
      alt=""
      width={90}
      height={90}
      aria-hidden
    />
  );
}
