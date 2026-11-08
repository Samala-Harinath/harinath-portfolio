import type { Metadata } from "next";
import { personal } from "@/data/personal";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = overrides?.title ?? `${personal.name} | ${personal.title}`;
  const description =
    overrides?.description ??
    `I build scalable digital products and intuitive web experiences with React, Next.js and TypeScript. ${personal.experienceLabel} of frontend engineering experience.`;

  return {
    title,
    description,
    metadataBase: new URL(personal.siteUrl),
    openGraph: {
      title: title as string,
      description: description as string,
      url: personal.siteUrl,
      siteName: personal.name,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title as string,
      description: description as string,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}
