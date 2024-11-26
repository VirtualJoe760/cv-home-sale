import { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'res.cloudinary.com'
    ],
  },
  // Additional Next.js configuration options here
};

export default nextConfig;
