// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;

import withPWAInit from '@ducanh2912/next-pwa';

const withPWA = withPWAInit({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const nextConfig = {
  env: {
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
};

export default withPWA(nextConfig);
