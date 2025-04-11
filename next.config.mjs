/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "arklight.storage.c2.liara.space",
      "c465756.parspack.net", // ✅ Your bucket domain
    ],
  },

  // Optional: only needed if you're importing local .svgz files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svgz$/,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[hash][ext]",
      },
    });
    return config;
  },
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     domains: ["arklight.storage.c2.liara.space", "c465756.parspack.net"],
//   },
//   // Add these headers to ensure proper serving of SVGZ files
//   async headers() {
//     return [
//       {
//         source: "/:path*.svgz",
//         headers: [
//           {
//             key: "Content-Type",
//             value: "image/svg+xml", // or "application/octet-stream" if needed
//           },
//         ],
//       },
//     ];
//   },
//   // Optional: If you need to customize webpack for SVGZ files
//   webpack: (config) => {
//     config.module.rules.push({
//       test: /\.svgz$/,
//       type: "asset/resource",
//       generator: {
//         filename: "static/media/[name].[hash][ext]",
//       },
//     });
//     return config;
//   },
// };

// export default nextConfig;
