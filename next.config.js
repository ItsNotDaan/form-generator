/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin');

const baseConfigs = {
  // Note: 'output: export' is commented out because it's incompatible with i18n
  // output: 'export',
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CROSS_SITE_COOKIES: process.env.NEXT_PUBLIC_CROSS_SITE_COOKIES,
    NEXT_PUBLIC_PROTO: process.env.NEXT_PUBLIC_PROTO,
  },
};

module.exports = nextTranslate(baseConfigs);
