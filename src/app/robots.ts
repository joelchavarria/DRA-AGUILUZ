import type { MetadataRoute } from "next";
import { allowIndexing, siteUrl } from "@/lib/seo";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(allowIndexing ? { allow: "/" } : { disallow: "/" }),
    },
    ...(allowIndexing && siteUrl ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
