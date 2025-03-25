/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["arklight.storage.c2.liara.space", "c465756.parspack.net"],
  },
  // Add these headers to ensure proper serving of SVGA files
  async headers() {
    return [
      {
        source: "/:path*.svga",
        headers: [
          {
            key: "Content-Type",
            value: "image/svg+xml", // or "application/octet-stream" if needed
          },
        ],
      },
    ];
  },
  // Optional: If you need to customize webpack for SVGA files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svga$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;
