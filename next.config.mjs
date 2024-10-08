/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dailymanagement.zeabur.app',
        pathname: '**'
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '**'
      }
    ]
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false };

    return config;
  }
};

export default nextConfig;
