const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // A verification build shares .next with a running dev server and deletes the
  // chunks it is serving, leaving a blank page until dev restarts. Set
  // NEXT_DIST_DIR (see build:verify) to build into a throwaway directory.
  distDir: process.env.NEXT_DIST_DIR || ".next",

  // TypeScript and React strict mode for development quality
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,

  // Serve public images directly. Firebase App Hosting (low memory /
  // cold starts) returns 500/503 under concurrent /_next/image load.
  images: {
    unoptimized: true,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Security headers for enterprise compliance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
        ],
      },
    ];
  },

  // SEO redirects for consolidated services
  async redirects() {
    return [
      {
        source: "/services/ai-strategy",
        destination: "/services#strategic-research",
        permanent: true,
      },
      {
        source: "/services/automation",
        destination: "/services#workflow-optimization",
        permanent: true,
      },
      {
        source: "/services/vc-consulting",
        destination: "/services#strategic-research",
        permanent: true,
      },
    ];
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,

  // SWC minification
  swcMinify: true,

  // Bundle analyzer (only when needed)
  webpack: (config, { dev, isServer }) => {
    // Nested duplicate tree + hosting stub exhaust macOS file watchers (EMFILE),
    // which leaves the app-paths manifest with only /_not-found and a white/404 UI.
    // These must be anchored to the project root: the root is itself named
    // FIELDPORTER.COM, so a bare "**/FIELDPORTER.COM/**" glob matches every
    // source file in the repo and silently disables HMR.
    if (dev) {
      const ignoredDirs = [
        "FIELDPORTER.COM",
        "hosting",
        "Documentation",
        "archive",
        ".cursor",
        ".next-verify",
      ];
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          "**/node_modules/**",
          "**/.git/**",
          "**/.next/**",
          ...ignoredDirs.map((dir) => `${path.join(__dirname, dir)}/**`),
        ],
      };
    }
    if (!dev && !isServer && process.env.ANALYZE === "true") {
      const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          openAnalyzer: false,
          reportFilename: "../bundle-analyzer-report.html",
        }),
      );
    }
    return config;
  },
};

module.exports = nextConfig;
