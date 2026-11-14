import { personal } from "@/data/personal";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import { absoluteUrl, siteDescription } from "@/lib/seo";

export function personJsonLd() {
  const current = experiences.find((job) => job.current);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: personal.name,
        jobTitle: personal.title,
        description: siteDescription,
        url: personal.siteUrl,
        image: absoluteUrl(personal.image),
        email: `mailto:${personal.email}`,
        telephone: personal.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Thane",
          addressRegion: "Maharashtra",
          addressCountry: "IN",
        },
        sameAs: [personal.linkedin, personal.github],
        knowsAbout: skillCategories.flatMap((category) => category.skills),
        ...(current
          ? {
              worksFor: {
                "@type": "Organization",
                name: current.company,
              },
            }
          : {}),
        hasCredential: {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: personal.education.degree,
          dateCreated: personal.education.year,
        },
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: personal.siteUrl,
        name: personal.name,
        description: siteDescription,
        inLanguage: "en",
        publisher: { "@id": absoluteUrl("/#person") },
      },
      {
        "@type": "ProfilePage",
        "@id": absoluteUrl("/#profile"),
        url: personal.siteUrl,
        name: `${personal.name} — ${personal.title}`,
        isPartOf: { "@id": absoluteUrl("/#website") },
        about: { "@id": absoluteUrl("/#person") },
        mainEntity: { "@id": absoluteUrl("/#person") },
        inLanguage: "en",
      },
    ],
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
