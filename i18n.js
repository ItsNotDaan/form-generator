// Configuration for next-translate without the plugin (compatible with static export)

const ALLOWED_LOCALES = ['nl'];
const ALLOWED_NAMESPACES = ['common', 'form'];

module.exports = {
  // These are all the locales you want to support in
  // your application
  locales: ALLOWED_LOCALES,
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: 'nl',
  // Disable loader to make it compatible with static export
  loader: false,
  // Load locale files manually for static export compatibility
  loadLocaleFrom: (lang, ns) => {
    // Validate parameters to prevent path traversal attacks
    if (!ALLOWED_LOCALES.includes(lang)) {
      throw new Error(
        `Invalid locale: "${lang}". Allowed locales are: ${ALLOWED_LOCALES.join(
          ', ',
        )}`,
      );
    }
    if (!ALLOWED_NAMESPACES.includes(ns)) {
      throw new Error(
        `Invalid namespace: "${ns}". Allowed namespaces are: ${ALLOWED_NAMESPACES.join(
          ', ',
        )}`,
      );
    }
    return import(`./locales/${lang}/${ns}.json`).then(m => m.default);
  },
  pages: {
    '*': ['common'],

    // Overview
    '/': ['form'],

    // Forms
    '/new-client': ['form'],
    '/old-client': ['form'],
    '/form-selection': ['form'],
    '/form-results': ['form'],
    '/intake-vlos': ['form'],
    '/intake-osa': ['form'],
    '/intake-pulman': ['form'],
    '/intake-rebacare': ['form'],
    '/intake-osb': ['form'],
    '/intake-ovac': ['form'],
    '/intake-steunzolen': ['form'],
    '/check-foliepas': ['form'],
    '/test': ['form'],
  },
};
