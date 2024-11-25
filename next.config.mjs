/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SERVER_API.slice(8),
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
    console.log(process.env.NEXT_PUBLIC_SERVER_API);
    config.resolve.fallback = { fs: false };

    return config;
  }
};

export default nextConfig;
