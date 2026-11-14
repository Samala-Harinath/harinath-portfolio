import { personal } from "@/data/personal";
import { projects } from "@/data/projects";
import { blogPosts } from "@/data/blog";
import { absoluteUrl, siteDescription } from "@/lib/seo";

export const dynamic = "force-static";

export function GET() {
  const projectLines = projects
    .map((project) => `- [${project.title}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.description}`)
    .join("\n");

  const postLines = blogPosts
    .map((post) => `- ${post.title} (${post.date}): ${post.excerpt}`)
    .join("\n");

  const body = `# ${personal.name}

> ${personal.title}. ${siteDescription}

Based in ${personal.location}. Open to opportunities: ${personal.openToOpportunities ? "yes" : "no"}.

## Pages

- [Home](${absoluteUrl("/")}): portfolio, experience, projects, and contact
- [Résumé](${absoluteUrl("/resume")}): interactive résumé and PDF
- [Blog](${absoluteUrl("/blog")}): technical writing

## Projects

${projectLines}

## Writing

${postLines}

## Contact

- Email: ${personal.email}
- Phone: ${personal.phone}
- LinkedIn: ${personal.linkedin}
- GitHub: ${personal.github}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
