import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${personal.siteUrl.replace(/\/$/, "")}/sitemap.xml`,
    host: personal.siteUrl.replace(/\/$/, ""),
  };
}
