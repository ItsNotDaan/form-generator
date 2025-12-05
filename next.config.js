/** @type {import('next').NextConfig} */

const baseConfigs = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_CROSS_SITE_COOKIES: process.env.NEXT_PUBLIC_CROSS_SITE_COOKIES,
    NEXT_PUBLIC_PROTO: process.env.NEXT_PUBLIC_PROTO,
  },
  // output: 'export' will be injected by GitHub Actions configure-pages
};

module.exports = baseConfigs;
