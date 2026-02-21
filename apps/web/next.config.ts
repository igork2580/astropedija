import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
  },
};

// Only apply PWA wrapper in production to avoid Turbopack conflicts
let finalConfig: NextConfig = nextConfig;

if (process.env.NODE_ENV === "production") {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withPWAInit = require("@ducanh2912/next-pwa").default;
  const withPWA = withPWAInit({
    dest: "public",
    register: true,
    cacheOnFrontEndNav: false,
    aggressiveFrontEndNavCaching: false,
    disable: true, // Disabled: _async_to_generator bug in service worker
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /^\/(znakovi|planete|kuce|aspekti|podznak|planete-po-znakovima|planete-po-kucama|kuce-po-znakovima)\/.*/i,
          handler: "CacheFirst" as const,
          options: {
            cacheName: "encyclopedia-cache",
            expiration: {
              maxEntries: 200,
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
          },
        },
        {
          urlPattern: /\/api\/.*/i,
          handler: "NetworkFirst" as const,
          options: {
            cacheName: "api-cache",
            expiration: {
              maxEntries: 50,
              maxAgeSeconds: 60 * 60,
            },
            networkTimeoutSeconds: 10,
          },
        },
        {
          urlPattern: /\/_next\/static\/.*/i,
          handler: "StaleWhileRevalidate" as const,
          options: {
            cacheName: "static-cache",
            expiration: {
              maxEntries: 100,
              maxAgeSeconds: 60 * 60 * 24 * 365,
            },
          },
        },
      ],
    },
  });
  finalConfig = withPWA(nextConfig);
}

export default finalConfig;
