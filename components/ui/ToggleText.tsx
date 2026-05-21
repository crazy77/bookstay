import type { ElementType, ReactNode } from 'react';
import { cn } from '@/lib/cn';

type ToggleTextProps = {
  ko: ReactNode;
  en: ReactNode;
  zh: ReactNode;
  as?: ElementType;
  className?: string;
};

/** i18n 3종(ko/en/zh) — 부모 또는 자신에 `toggle` 클래스 */
export function ToggleText({
  ko,
  en,
  zh,
  as: Tag = 'span',
  className,
}: ToggleTextProps) {
  return (
    <Tag className={cn('toggle', className)}>
      <span lang="ko">{ko}</span>
      <span lang="en">{en}</span>
      <span lang="zh">{zh}</span>
    </Tag>
  );
}
