/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    // baseUrl: 'http://127.0.0.1:6001',
    baseUrl: 'https://api.iistw.com',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.iistw.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.iistw.com',
        port: '',
        pathname: '/works/**',
      },
      {
        protocol: 'https',
        hostname: 'api.iistw.com',
        port: '',
        pathname: '/festivals/**',
      },
    ],
  },
}

// module.exports = nextConfig

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true
})

module.exports = withPWA(nextConfig)
