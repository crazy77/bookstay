import { cn } from '@/lib/cn';

type ButtonProps = React.ComponentProps<'a'> & {
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
};

export function Button({
  variant = 'primary',
  fullWidth = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'inline-flex items-center justify-center rounded-sm font-serif-ko text-[0.95rem] tracking-wide no-underline transition-colors',
        variant === 'primary' &&
          'border border-ink bg-ink text-surface hover:border-accent hover:bg-accent',
        variant === 'ghost' &&
          'border border-ink bg-transparent text-ink hover:bg-ink hover:text-surface',
        fullWidth ? 'min-h-12 w-full min-w-0 px-5 py-3.5' : 'min-w-44 px-7 py-3.5',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  );
}
