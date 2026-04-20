import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: false,
  },
  images: {
    // ── Output formats: WebP only (AVIF is slower to encode and has less browser support)
    // WebP gives 25-35% smaller files vs JPEG at the same perceived quality.
    formats: ['image/webp'],

    // ── Quality: 85 = visually lossless for photos, ~30% smaller than quality:100
    // Use 90 for hero/feature images (handled per-component via the quality prop),
    // 85 here as the global default for content images.
    qualities: [75, 85, 90],

    // ── Responsive breakpoints — covers mobile → 2x retina desktop
    deviceSizes: [390, 640, 768, 1024, 1280, 1440, 1920],
    imageSizes: [48, 96, 128, 256, 384, 512, 768],

    // ── Allowed remote origins (Payload CMS on Vercel + local dev)
    remotePatterns: [
      {
        // Vercel deployment: matches your-project.vercel.app
        protocol: 'https',
        hostname: '**.vercel.app',
        pathname: '/media/**',
      },
      {
        // Supabase storage (kept for backward compat)
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/**',
      },
      {
        // Local dev
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
    ],
  },
}

export default withPayload(nextConfig)
