import type { Metadata } from "next";
import { personal } from "@/data/personal";
import { skillCategories } from "@/data/skills";

export const siteTitle = `${personal.name} | ${personal.title}`;

export const siteDescription = `Frontend engineer with ${personal.experienceLabel} of experience building real-time AI products, voice interfaces, and scalable web applications with React, Next.js, TypeScript, WebRTC and WebSockets.`;

export const siteKeywords = [
  ...new Set([
    personal.name,
    "Frontend Engineer",
    "Product Engineer",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "WebRTC",
    "WebSockets",
    "Voice AI",
    ...skillCategories.flatMap((category) => category.skills),
  ]),
];

/** Stable content date so sitemap lastmod does not change on every request. */
export const siteUpdated = "2026-11-14";

export function absoluteUrl(path = "/"): string {
  const base = personal.siteUrl.replace(/\/$/, "");
  if (!path || path === "/") return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function pageTitle(segment?: string): string {
  return segment ? `${segment} | ${personal.name}` : siteTitle;
}

export function buildMetadata(overrides?: Partial<Metadata> & { segment?: string }): Metadata {
  const segment = overrides?.segment;
  const title = pageTitle(segment);
  const description = (overrides?.description as string | undefined) ?? siteDescription;
  const canonical =
    (typeof overrides?.alternates?.canonical === "string" && overrides.alternates.canonical) || "/";

  const { segment: _segment, openGraph, twitter, alternates, robots, ...rest } = overrides ?? {};

  return {
    title: segment ?? { default: siteTitle, template: `%s | ${personal.name}` },
    description,
    applicationName: personal.name,
    authors: [{ name: personal.name, url: personal.siteUrl }],
    creator: personal.name,
    publisher: personal.name,
    keywords: siteKeywords,
    category: "technology",
    metadataBase: new URL(personal.siteUrl),
    alternates: {
      canonical,
      ...alternates,
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonical),
      siteName: personal.name,
      locale: "en_US",
      type: "website",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
      ...twitter,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
      ...((robots && typeof robots === "object" ? robots : {}) as object),
    },
    ...rest,
  };
}
