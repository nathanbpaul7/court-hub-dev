/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '5cbe6vbaicwhoi1d.public.blob.vercel-storage.com',
        port: '',
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    config.externals = [...config.externals, 'bcrypt'];

    return config;
  },
};
