'use strict';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

hexo.extend.tag.register('blogCard', args => {
  const rawUrl = args[0] || '';
  let url;
  try {
    url = new URL(rawUrl);
    if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Unsupported protocol');
  } catch {
    return `<a href="${escapeHtml(rawUrl)}">${escapeHtml(rawUrl)}</a>`;
  }

  const options = Object.fromEntries(args.slice(1).map(arg => {
    const separator = arg.indexOf(':');
    return separator < 0 ? [arg, ''] : [arg.slice(0, separator), arg.slice(separator + 1)];
  }));
  const target = ['_self', '_blank'].includes(options.target) ? options.target : '_blank';
  const rel = (options.rel || (target === '_blank' ? 'noopener noreferrer' : ''))
    .replace(/[^a-zA-Z0-9 _-]/g, ' ').trim();
  const safeUrl = escapeHtml(url.href);
  const siteName = escapeHtml(url.hostname);

  return `<div class="link-preview"><div class="hbc-link-wrap">`
    + `<a class="hbc-link" href="${safeUrl}" target="${target}" rel="${escapeHtml(rel)}">`
    + '<div class="hbc-card">'
    + `<div class="hbc-info"><div class="hbc-site-name">${siteName}</div></div>`
    + '<div class="hbc-contents"><div class="hbc-text">'
    + `<div class="hbc-title">${siteName}</div><div class="hbc-url">${safeUrl}</div>`
    + '</div></div></div></a></div></div>';
});
