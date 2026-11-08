export interface Project {
  slug: string;
  title: string;
  description: string;
  summary: string;
  category: "SaaS" | "AI" | "Dashboard" | "Other";
  projectType: "Professional" | "Personal" | "Prototype";
  role: string;
  technologies: string[];
  image: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  confidentialityNote?: string;
  caseStudy: {
    problem: string;
    constraints: string[];
    solution: string;
    implementation: string[];
    outcomes: string[];
  };
}
