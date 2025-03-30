"use server";

import { getAllPages } from "./page/page";

export async function generateSitemap() {
  const pages = await getAllPages();

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages
        .map(
          (page) => `
        <url>
          <loc>https://lynkaink.ir/pages/${page.uri}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>
      `,
        )
        .join("")}
    </urlset>
  `;

  // Save the sitemap to a file or upload it to your server
  // Example: Save to public/sitemap.xml
  const fs = require("fs");
  fs.writeFileSync("public/sitemap.xml", sitemap);

  return { success: true, message: "Sitemap generated successfully" };
}
