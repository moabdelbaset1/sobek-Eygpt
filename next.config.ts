import type {NextConfig} from 'next';

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https:",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://api.sendgrid.com",
      "media-src 'self' https://videos.pexels.com https://cdn.pixabay.com https://*.pixabay.com",
      "frame-src 'self' https://www.youtube.com https://www.googletagmanager.com https://www.google.com",
      "font-src 'self' data:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ')
  },
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'X-Frame-Options', value: 'DENY'},
  {key: 'X-XSS-Protection', value: '0'},
  {key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload'}
];

const nextConfig: NextConfig = {
  experimental: {
    serverActions: { bodySizeLimit: '10mb' }
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    // Disable optimization for external images to prevent timeouts
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cloud.appwrite.io',
      },
    ],
  },
  async headers() {
    // Disable CSP headers in development to avoid eval() conflicts with dev tools
    if (process.env.NODE_ENV === 'development') {
      return [];
    }
    return [
      {
        source: '/:path*',
        headers: securityHeaders
      }
    ];
    },
  logging: { fetches: { fullUrl: true } }
};

export default nextConfig;
