import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";
import { siteDescription } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${personal.name} — ${personal.title}`,
    short_name: "Harinath",
    description: siteDescription,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b1224",
    theme_color: "#0b1224",
    lang: "en",
    categories: ["portfolio", "technology"],
    icons: [
      {
        src: "/fevicon.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
