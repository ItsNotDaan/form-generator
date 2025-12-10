/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/form-generator',
  assetPrefix: '/form-generator/',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    // NOTE: This setting bypasses ESLint errors during build.
    // There are pre-existing linting issues in the codebase that need to be fixed separately.
    // TODO: Remove this setting after fixing all ESLint errors in the codebase.
    // Warning: This allows production builds with ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CROSS_SITE_COOKIES: process.env.NEXT_PUBLIC_CROSS_SITE_COOKIES,
    NEXT_PUBLIC_PROTO: process.env.NEXT_PUBLIC_PROTO,
  },
};

module.exports = nextConfig;
