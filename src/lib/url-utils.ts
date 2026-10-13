const UNSAFE_CHARACTERS = /[\s\\\u0000-\u001f\u007f]|%(?:0[0-9a-f]|1[0-9a-f]|7f|5c)/i;
const PLACEHOLDER_HOST = /^(?:example\.(?:com|org|net)|yourdomain\.com|placeholder\..+)$|\.invalid$/i;

export function safeHref(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  const href = value.trim();
  if (!href || UNSAFE_CHARACTERS.test(href)) return undefined;
  if (href.startsWith('#')) return /^#[A-Za-z][A-Za-z0-9_.:-]*$/.test(href) ? href : undefined;
  if (href.startsWith('/')) {
    try {
      const decoded = decodeURIComponent(href);
      return decoded.startsWith('//') || UNSAFE_CHARACTERS.test(decoded) ? undefined : href;
    } catch {
      return undefined;
    }
  }
  if (/^tel:/i.test(href)) return /^tel:\+?[0-9().-]+$/i.test(href) ? href : undefined;
  if (/^mailto:/i.test(href)) return /^mailto:[^@?<>]+@[^@?<>]+\.[^@?<>]+(?:\?[^<>]*)?$/i.test(href) ? href : undefined;
  try {
    if (!/^https?:\/\//i.test(href)) return undefined;
    const url = new URL(href);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password || PLACEHOLDER_HOST.test(url.hostname)) return undefined;
    return href;
  } catch {
    return undefined;
  }
}

export function safeWebUrl(value: unknown): string | undefined {
  const href = safeHref(value);
  return href && (href.startsWith('/') || /^https?:\/\//i.test(href)) ? href : undefined;
}
