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
    // Temporarily ignore ESLint errors during build to test configuration
    // Warning: This allows production builds with ESLint errors
    ignoreDuringBuilds: true,
  },
  env: {
    NEXT_PUBLIC_CROSS_SITE_COOKIES: process.env.NEXT_PUBLIC_CROSS_SITE_COOKIES,
    NEXT_PUBLIC_PROTO: process.env.NEXT_PUBLIC_PROTO,
  },
};

module.exports = nextConfig;
