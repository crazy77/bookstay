import sanitizeHtml from 'sanitize-html';
import type { RichLine, RichSegment } from '@/data/site-content';

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: ['p', 'br', 'strong', 'b', 'em', 'i', 'code', 'a'],
  allowedAttributes: {
    a: ['href', 'target', 'rel'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  transformTags: {
    b: 'strong',
    i: 'em',
    a: (_tagName, attribs) => ({
      tagName: 'a',
      attribs: {
        href: attribs.href ?? '',
        target: attribs.href?.startsWith('/') ? '' : '_blank',
        rel: attribs.href?.startsWith('/') ? '' : 'noopener noreferrer',
      },
    }),
  },
};

export function sanitizeRichHtml(html: string) {
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

export function sanitizeInlineRichHtml(html: string) {
  const clean = sanitizeRichHtml(html).trim();
  const match = clean.match(/^<p>([\s\S]*)<\/p>$/);
  return match ? match[1] : clean;
}

export function richLinesToHtmlList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((line) => {
    if (typeof line === 'string') return sanitizeRichHtml(line);
    if (!Array.isArray(line)) return sanitizeRichHtml(String(line ?? ''));
    return sanitizeRichHtml(richLineToHtml(line));
  });
}

export function richLineToHtml(line: RichLine) {
  return line.map((segment) => richSegmentToHtml(segment)).join('');
}

function richSegmentToHtml(segment: RichSegment) {
  if (typeof segment === 'string') return escapeHtml(segment);

  let content = escapeHtml(segment.text);
  if (segment.code) content = `<code>${content}</code>`;
  if (segment.strong) content = `<strong>${content}</strong>`;
  if (segment.href) {
    const href = escapeAttribute(segment.href);
    const attrs =
      segment.external || segment.href.startsWith('http')
        ? ` href="${href}" target="_blank" rel="noopener noreferrer"`
        : ` href="${href}"`;
    content = `<a${attrs}>${content}</a>`;
  }
  return content;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function escapeAttribute(value: string) {
  return escapeHtml(value).replaceAll('`', '&#96;');
}
