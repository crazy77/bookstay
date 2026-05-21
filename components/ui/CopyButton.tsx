'use client';

import { useState } from 'react';

export function CopyButton({
  text,
  labelKo,
  labelEn,
  labelZh,
}: {
  text: string;
  labelKo: string;
  labelEn: string;
  labelZh: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      className={`copy-btn${copied ? ' copied' : ''}`}
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
      <span className="toggle">
        <span lang="ko">{labelKo}</span>
        <span lang="en">{labelEn}</span>
        <span lang="zh">{labelZh}</span>
      </span>
    </button>
  );
}
