export const SITE_URL = 'https://rufus.pro';
export const EMAIL = 'jirufik@gmail.com';
export const GITHUB = 'https://github.com/jirufik';
export const TELEGRAM = 'https://t.me/Jirufik';
export const TELEGRAM_HANDLE = '@Jirufik';
// WhatsApp contact QR link (does not expose the phone number).
export const WHATSAPP = 'https://wa.me/qr/DEYLLWZRLYYBE1';
export const LANGS = ['en', 'ru', 'fi'];
export const DEFAULT_LANG = 'en';
export const LOCALES = { en: 'en_US', ru: 'ru_RU', fi: 'fi_FI' };

/** Site-relative path of a page in a language: /, /ru/, /fi/about/ ... */
export function pagePath(lang, page) {
  const prefix = lang === DEFAULT_LANG ? '' : `/${lang}`;
  return page === 'home' ? `${prefix}/` : `${prefix}/${page}/`;
}

/** File in site/ that holds the page. */
export function pageFile(lang, page) {
  return `${pagePath(lang, page).slice(1)}index.html`;
}
