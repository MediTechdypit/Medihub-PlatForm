/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.tailgrids.com"], // Allow images from Tailgrids CDN
  },
  i18n: {
    locales: ["en", "mr", "hi"], // Add more if needed
    defaultLocale: "en",
  },
};

module.exports = nextConfig;
