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

export default nextConfig;
