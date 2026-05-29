import Link from 'next/link';
import type { RichLine, RichSegment } from '@/data/site-content';
import type { LocaleText } from '@/lib/locale';
import {
  richLinesToHtmlList,
  sanitizeInlineRichHtml,
  sanitizeRichHtml,
} from '@/lib/rich-content';

export function LocalizedText({
  value,
  as: Tag = 'span',
  className,
}: {
  value: LocaleText<string>;
  as?: 'p' | 'span';
  className?: string;
}) {
  return (
    <Tag className={className ? `toggle ${className}` : 'toggle'}>
      <span lang="ko">{value.ko}</span>
      <span lang="en">{value.en}</span>
      <span lang="zh">{value.zh}</span>
    </Tag>
  );
}

export function LocalizedLines({
  value,
  className,
}: {
  value: LocaleText<string[]>;
  className?: string;
}) {
  return (
    <div className={className ? `toggle ${className}` : 'toggle'}>
      {(['ko', 'en', 'zh'] as const).map((lang) => (
        <p key={lang} lang={lang}>
          {value[lang].map((line, index) => (
            <span key={line}>
              {index > 0 ? <br /> : null}
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

function RichSegmentView({ segment }: { segment: RichSegment }) {
  if (typeof segment === 'string') return segment;
  const child = segment.code ? <code>{segment.text}</code> : segment.text;
  const content = segment.strong ? <strong>{child}</strong> : child;

  if (!segment.href) return content;
  const external = segment.external || segment.href.startsWith('http');
  if (external) {
    return (
      <a href={segment.href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  return <Link href={segment.href}>{content}</Link>;
}

export function RichLineView({ line }: { line: RichLine }) {
  return (
    <>
      {line.map((segment, index) => (
        <RichSegmentView key={index} segment={segment} />
      ))}
    </>
  );
}

export function LocalizedRichList({
  value,
  ordered = false,
  className = 'bare-list guide-rules',
}: {
  value: LocaleText<RichLine[] | string[]>;
  ordered?: boolean;
  className?: string;
}) {
  const ListTag = ordered ? 'ol' : 'ul';
  return (
    <>
      {(['ko', 'en', 'zh'] as const).map((lang) => (
        <ListTag key={lang} lang={lang} className={`${className} toggle`}>
          {richLinesToHtmlList(value[lang]).map((html, index) => (
            <li
              key={index}
              dangerouslySetInnerHTML={{ __html: sanitizeInlineRichHtml(html) }}
            />
          ))}
        </ListTag>
      ))}
    </>
  );
}

export function LocalizedRichParagraphs({
  value,
}: {
  value: LocaleText<RichLine[] | string[]>;
}) {
  return (
    <>
      {(['ko', 'en', 'zh'] as const).map((lang) =>
        richLinesToHtmlList(value[lang]).map((html, index) => (
          <div
            key={`${lang}-${index}`}
            lang={lang}
            dangerouslySetInnerHTML={{ __html: sanitizeRichHtml(html) }}
          />
        )),
      )}
    </>
  );
}

export function LocalizedList({
  value,
  className = 'bare-list',
}: {
  value: LocaleText<string[]>;
  className?: string;
}) {
  return (
    <>
      {(['ko', 'en', 'zh'] as const).map((lang) => (
        <ul key={lang} lang={lang} className={`${className} toggle`}>
          {value[lang].map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      ))}
    </>
  );
}
