import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Performance Optimizations */
  
  // Optimize images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.aceternity.com',
      },
    ],
  },

  // Enable React strict mode for better development experience
  reactStrictMode: true,

  // Compress output
  compress: true,

  // Enable SWC minification for faster builds
  swcMinify: true,

  // Optimize production builds
  experimental: {
    optimizePackageImports: ['lucide-react', '@tabler/icons-react', 'motion'],
  },

  // Reduce bundle size by removing unused code
  webpack: (config, { isServer }) => {
    // Optimize client-side bundle
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk for node_modules
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk for shared code
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
