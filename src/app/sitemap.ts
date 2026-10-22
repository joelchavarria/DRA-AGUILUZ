import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/seo";
import { navigation } from "@/config/site";
import { serviceContent } from "@/config/services";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    ...navigation.map((item) => item.href),
    ...serviceContent.map((service) => `/servicios/${service.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
