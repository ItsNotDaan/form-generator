// We use sub-path routing. To change to domain routing, see https://nextjs.org/docs/advanced-features/i18n-routing#domain-routing
module.exports = {
  // These are all the locales you want to support in
  // your application
  locales: ['nl'],
  // This is the default locale you want to be used when visiting
  // a non-locale prefixed path e.g. `/hello`
  defaultLocale: 'nl',
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
    '/intake-pulman': ['form'],
    '/intake-rebacare': ['form'],
    '/intake-osb': ['form'],
    '/intake-ovac': ['form'],
    '/intake-steunzolen': ['form'],
  },
};
