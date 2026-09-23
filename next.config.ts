import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the preview domain for development
  allowedDevOrigins: ["rb1ttjanjn.preview.c24.airoapp.ai"],
  // Use standalone output for better hosting compatibility
  output: 'standalone',
  // Optimize for production
  compress: true,
  // Handle trailing slashes consistently
  trailingSlash: false,
  // Disable x-powered-by header
  poweredByHeader: false,
  // Optimize images
  images: {
    domains: [],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
