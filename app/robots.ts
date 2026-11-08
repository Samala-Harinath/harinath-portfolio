import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${personal.siteUrl}/sitemap.xml`,
  };
}
