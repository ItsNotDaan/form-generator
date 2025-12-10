// Configuration for next-translate without the plugin (compatible with static export)
module.exports = {
  // These are all the locales you want to support in
  // your application
  locales: ['nl'],
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: 'nl',
  // Disable loader to make it compatible with static export
  loader: false,
  // Load locale files manually for static export compatibility
  loadLocaleFrom: (lang, ns) =>
    import(`./locales/${lang}/${ns}.json`).then((m) => m.default),
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
  },
};
