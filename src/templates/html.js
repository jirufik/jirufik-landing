const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ESC[c]);

/** Marks a string as already-safe HTML so `html` does not escape it. */
export const raw = (s) => ({ __html: String(s ?? '') });

/** Tagged template: escapes interpolations, joins arrays, skips null/false. */
export function html(strings, ...values) {
  let out = '';
  strings.forEach((str, i) => {
    out += str;
    if (i < values.length) out += render(values[i]);
  });
  return raw(out);
}

function render(v) {
  if (v == null || v === false) return '';
  if (Array.isArray(v)) return v.map(render).join('');
  if (typeof v === 'object' && '__html' in v) return v.__html;
  return esc(v);
}

export const toString = (v) => render(v);

/** JSON for <script type="application/ld+json">; guards against "</script>". */
export const jsonLd = (data) =>
  raw(`<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`);
