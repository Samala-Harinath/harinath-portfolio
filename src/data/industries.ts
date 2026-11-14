/**
 * Industries — split honestly into domains with shipped production work
 * ("proven") and domains where the same skill set transfers directly
 * ("ready"). Only `proven` entries reference real projects / employers.
 */

export type IndustryIcon =
  | "voice"
  | "fintech"
  | "health"
  | "enterprise"
  | "commerce"
  | "edtech"
  | "logistics"
  | "media";

export interface Industry {
  name: string;
  icon: IndustryIcon;
  status: "proven" | "ready";
  /** Short line describing the work or the transferable fit. */
  description: string;
  /** Evidence (proven) or transferable capabilities (ready). */
  points: string[];
}

export const industries: Industry[] = [
  {
    name: "AI & Voice Tech",
    icon: "voice",
    status: "proven",
    description: "Browser-native voice agents with streaming AI responses.",
    points: ["Bolka Voice AI platform", "WebRTC audio pipeline", "Google STT / TTS"],
  },
  {
    name: "Fintech & BFSI",
    icon: "fintech",
    status: "proven",
    description: "Compliance-first products for regulated financial businesses.",
    points: ["MFD Studio SaaS", "Enterprise POCs incl. HDFC", "Compliance rules engine"],
  },
  {
    name: "HealthTech",
    icon: "health",
    status: "proven",
    description: "Verified professional network serving 250K+ doctors.",
    points: ["Docintosh web + mobile", "CME & survey flows", "Redux Toolkit state"],
  },
  {
    name: "Enterprise SaaS",
    icon: "enterprise",
    status: "proven",
    description: "Dashboards, embeddable widgets and multi-tenant config UIs.",
    points: ["Embeddable widgets", "Agent config dashboards", "RTK Query data layer"],
  },
  {
    name: "E-commerce & Retail",
    icon: "commerce",
    status: "ready",
    description: "Fast, conversion-focused storefronts and checkout flows.",
    points: ["Next.js SSR / SEO", "Core Web Vitals", "Responsive UI"],
  },
  {
    name: "EdTech",
    icon: "edtech",
    status: "ready",
    description: "Interactive learning, quizzes and live classroom features.",
    points: ["Quiz & scoring modules", "Real-time sessions", "Mobile-first UX"],
  },
  {
    name: "Logistics & Mobility",
    icon: "logistics",
    status: "ready",
    description: "Live tracking dashboards and field-ops mobile apps.",
    points: ["WebSocket live data", "React Native apps", "Data-dense dashboards"],
  },
  {
    name: "Media & Communication",
    icon: "media",
    status: "ready",
    description: "Streaming, calling and collaborative real-time experiences.",
    points: ["WebRTC calling", "API streaming", "Low-latency UI states"],
  },
];
