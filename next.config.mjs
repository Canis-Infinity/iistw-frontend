const nextConfig = {
  async rewrites() {
    return [{ source: "/offline", destination: "/offline.html" }];
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
          { key: "Service-Worker-Allowed", value: "/" },
        ],
      },
      {
        source: "/offline.html",
        headers: [{ key: "Cache-Control", value: "no-cache" }],
      },
    ];
  },
  env: {
    baseUrl: "https://api.iistw.com",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.iistw.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.iistw.com",
        port: "",
        pathname: "/works/**",
      },
      {
        protocol: "https",
        hostname: "api.iistw.com",
        port: "",
        pathname: "/festivals/**",
      },
    ],
  },
};

export default nextConfig;
