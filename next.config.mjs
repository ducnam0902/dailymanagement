/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
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
