// The languages offered in the header switcher, in display order.
// English is the source text in the code; every other language has a
// dictionary in ./locales/<code>.json mapping English text to its translation.
export const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'ar', label: 'العربية', rtl: true },
  { code: 'kk', label: 'Қазақша' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'id', label: 'Indonesia' },
  { code: 'th', label: 'ไทย' },
];

export const LANG_KEY = 'remevia-lang';
