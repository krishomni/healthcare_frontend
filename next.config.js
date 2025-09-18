/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'your-api-domain.com'],
    unoptimized: true
  },
  env: {
    CUSTOM_KEY: 'healthcare-app',
  },
}

module.exports = nextConfig