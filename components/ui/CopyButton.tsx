'use client';

import { useState } from 'react';
import { useLang } from '@/providers/LangProvider';
import type { LocaleText } from '@/lib/locale';
import { cn } from '@/lib/cn';

function CopyIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CopyButton({
  text,
  labels,
}: {
  text: string;
  labels: LocaleText;
}) {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={cn('copy-btn copy-btn--icon', copied && 'copied')}
      aria-label={labels[lang]}
      title={labels[lang]}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          setTimeout(() => setCopied(false), 1600);
        } catch {
          /* clipboard unavailable */
        }
      }}
    >
      <CopyIcon />
    </button>
  );
}
