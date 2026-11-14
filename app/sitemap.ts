import type { MetadataRoute } from "next";
import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { siteUpdated } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = personal.siteUrl.replace(/\/$/, "");
  const updated = new Date(siteUpdated);
  const latestPost = blogPosts.reduce((latest, post) => (post.date > latest ? post.date : latest), siteUpdated);

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: updated,
    changeFrequency: "monthly",
    priority: project.featured ? 0.8 : 0.7,
  }));

  return [
    {
      url: base,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${base}/resume`,
      lastModified: updated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/blog`,
      lastModified: new Date(latestPost),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...projectRoutes,
  ];
}
