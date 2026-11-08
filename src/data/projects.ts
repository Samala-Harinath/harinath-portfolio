import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "bolka-voice-ai-platform",
    title: "Bolka — Voice AI Platform",
    description:
      "Enterprise voice AI platform enabling businesses to deploy conversational agents on websites and browsers using WebRTC — no phone lines needed.",
    summary:
      "Built the frontend for Bolka, an enterprise voice AI platform that lets businesses deploy conversational AI agents on websites and share via links. The platform uses browser-native WebRTC, supports API streaming, and integrates Google Speech-to-Text and Text-to-Speech for real-time voice conversations.",
    category: "AI",
    projectType: "Professional",
    role: "Software Engineer (Frontend)",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "WebRTC",
      "WebSockets",
      "Tailwind CSS",
      "Google Speech APIs",
      "API Streaming",
    ],
    image: "/images/projects/bolka.png",
    featured: true,
    liveUrl: "https://bolka.ai/",
    caseStudy: {
      problem:
        "Businesses needed a way to deploy voice AI agents on their websites without complex telephony infrastructure (SIP trunks, Twilio). Users needed to click, talk, and get answers directly in the browser — 24/7, with no app downloads.",
      constraints: [
        "Real-time, low-latency voice communication entirely in the browser using WebRTC — no phone line infrastructure.",
        "Streaming AI responses progressively rendered as audio and text to feel natural and instant.",
        "Embeddable widget deployable on any website with one line of code, with customisable branding.",
        "Support for shareable voice AI links usable via email, SMS, WhatsApp, or QR code.",
      ],
      solution:
        "Implemented browser-native WebRTC for peer-to-peer audio streaming, integrated Google Speech-to-Text and Text-to-Speech APIs for the voice pipeline, and built the embeddable Bolka Embed widget as a self-contained React component. Bolka Share was built as a shareable link system that opens the voice agent in any browser without downloads.",
      implementation: [
        "Built Bolka Embed — an embeddable voice AI widget deployable via a single script tag, with customisable colour scheme and agent personality.",
        "Built Bolka Share — a shareable link product that opens a branded voice agent session in any modern browser.",
        "Implemented WebRTC-based real-time audio capture and streaming with low-latency connection handling.",
        "Integrated Google Speech-to-Text (STT) and Text-to-Speech (TTS) APIs for the full voice interaction pipeline.",
        "Built the agent configuration dashboard where businesses create, customise, and deploy their voice agents.",
        "Implemented API streaming for progressive rendering of AI responses, improving perceived response speed.",
        "Delivered proof-of-concept builds for enterprise clients including HDFC within Agile/Scrum sprints.",
      ],
      outcomes: [
        "Shipped a production voice AI platform used by multiple enterprise clients.",
        "Enabled voice agent deployment with zero telephony infrastructure — browser-native only.",
        "Embeddable widget deployable in minutes, adopted by clients across healthcare, insurance, and finance sectors.",
        "Real-time WebRTC + streaming response pipeline delivered a natural, low-latency conversation experience.",
      ],
    },
  },
  {
    slug: "mfd-studio-fintech-platform",
    title: "MFD Studio — Fintech Web Platform",
    description:
      "A compliance-first professional website platform for AMFI-registered Mutual Fund Distributors, built with branded investor tools, AI content studio, and a one-inbox enquiry system.",
    summary:
      "Developed the frontend for MFD Studio (oniko.llamaworx.com), a full-stack SaaS platform for Indian Mutual Fund Distributors. The platform includes branded website builder, compliance wording enforcement, SIP/goal calculators, AI-generated content tools, and an enquiry management dashboard.",
    category: "SaaS",
    projectType: "Professional",
    role: "Software Engineer (Frontend)",
    technologies: [
      "Next.js",
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "RTK Query",
      "REST APIs",
    ],
    image: "/images/projects/mfd-studio.png",
    featured: true,
    liveUrl: "https://oniko.llamaworx.com/",
    caseStudy: {
      problem:
        "AMFI-registered Mutual Fund Distributors in India needed a compliant, professional online presence that automatically enforced AMFI's Master Circular rules — blocking prohibited claims, adding required disclosures, and locking regulatory wording before anything went live.",
      constraints: [
        "Real-time compliance wording checks that block or flag content against AMFI's Master Circular (14 January 2026) before publishing.",
        "Multi-page branded website builder with templates tailored for financial distributors.",
        "SIP, goal, and inflation calculators that display estimates from visitor-typed rates — no promises or return guarantees.",
        "An AI content studio that generates posts, images, and videos, each carrying the ARN and market-risk disclosure.",
        "A website assistant that answers only from admin-approved notes — never recommends schemes or returns.",
      ],
      solution:
        "Built a configuration-driven website builder with a compliance layer that intercepts content before saving. The dashboard provides a guided setup flow with wording checks at each step. Calculators are built with client-side logic only, explicitly showing no return forecasts. The enquiry inbox consolidates contact form, calculator, and chat hand-offs in one list.",
      implementation: [
        "Built the multi-page website builder with a live preview and guided setup wizard.",
        "Implemented the compliance check layer — a rules engine that blocks prohibited financial claims before publish.",
        "Developed SIP, goal, and inflation calculator components with client-side-only logic and no assumed rate defaults.",
        "Built the enquiry inbox dashboard consolidating leads from contact forms, calculators, and chat with status tracking.",
        "Integrated the AI content studio interface with ARN and disclosure injection on every generated asset.",
        "Built the website assistant configuration UI with approved-notes-only guardrails.",
        "Used RTK Query for dashboard data fetching with optimistic updates and cache invalidation.",
      ],
      outcomes: [
        "Shipped a production SaaS platform serving AMFI-registered distributors across India.",
        "Compliance enforcement built into the product prevented regulatory violations before they reached publication.",
        "Guided setup flow reduced time-to-live-website to under an hour for new distributors.",
        "Single-inbox enquiry management replaced fragmented lead tracking for small distributor practices.",
      ],
    },
  },
  {
    slug: "docintosh-doctor-network",
    title: "Docintosh — Doctor Professional Network",
    description:
      "A members-only professional network for 250,000+ verified doctors and medical students across India, with CME modules, clinical surveys, and paid opinion activities.",
    summary:
      "Worked as a Software Engineer on Docintosh, a trusted professional network for India's medical community. Built and maintained web and mobile features for survey activities, CME modules, weekly medical rounds, and the member verification and onboarding flow.",
    category: "SaaS",
    projectType: "Professional",
    role: "Software Engineer",
    technologies: [
      "React.js",
      "React Native",
      "Redux Toolkit",
      "Tailwind CSS",
      "TypeScript",
      "REST APIs",
    ],
    image: "/images/projects/docintosh.png",
    featured: true,
    liveUrl: "https://docintosh.com/",
    caseStudy: {
      problem:
        "India's medical community lacked a verified, trusted platform for professional knowledge exchange, clinical opinion surveys, and CME (Continuing Medical Education) — one that could serve 60+ specialties without compromising member privacy or mixing in non-medical users.",
      constraints: [
        "Strict member verification — registration limited to doctors and medical students with confirmed registration numbers.",
        "Mobile-first product serving users across all 28 Indian states in brief sessions between patient visits.",
        "Complex state management for multi-screen survey and CME activity flows with partial completion support.",
        "Anonymised responses by default — member identity only attached when explicitly opted in.",
      ],
      solution:
        "Built new feature modules and maintained the existing React.js web platform and React Native mobile app. Focused on activity flows (surveys, CME modules, weekly rounds), performance optimisation for lower-bandwidth connections, and bug resolution across the full platform.",
      implementation: [
        "Developed survey, case study, and CME module activity flows with multi-step completion state and partial save support.",
        "Built the Thinking Thursday weekly quiz module for medical students with real-time scoring and leaderboard.",
        "Managed complex application state using Redux Toolkit across multi-screen survey and quiz flows.",
        "Diagnosed and resolved bugs in the React Native mobile app, improving stability across iOS and Android.",
        "Optimised render performance and load times across the web platform, applying React best practices.",
        "Implemented responsive layouts with Tailwind CSS ensuring consistent UX across web and mobile viewports.",
      ],
      outcomes: [
        "Contributed features to a platform trusted by 250,000+ verified medical professionals.",
        "Improved application stability with bug fixes that reduced crash rates across the mobile app.",
        "Performance improvements reduced activity load times, keeping engagement high for brief-session users.",
        "Survey and CME modules supported 1.2M+ activities completed by members since platform launch.",
      ],
    },
  },
  {
    slug: "bolka-embeddable-chatbot",
    title: "Bolka Embed — AI Chat Widget",
    description:
      "An embeddable voice and chat AI widget deployable on any website with a single script tag, with real-time streaming responses and configurable branding.",
    summary:
      "Built Bolka Embed as part of the Bolka platform — a self-contained embeddable AI widget that can be added to any website with one line of code. Supports both voice and text interaction, streaming AI responses, and full visual customisation through a configuration API.",
    category: "AI",
    projectType: "Professional",
    role: "Software Engineer (Frontend)",
    technologies: [
      "React.js",
      "TypeScript",
      "WebRTC",
      "WebSockets",
      "API Streaming",
      "Tailwind CSS",
    ],
    image: "/images/projects/bolka-embed.png",
    featured: false,
    liveUrl: "https://bolka.ai/",
    caseStudy: {
      problem:
        "Businesses wanted to offer an integrated AI voice/chat experience on their websites without building custom infrastructure or requiring visitors to install anything.",
      constraints: [
        "Must be deployable with a single script tag and require zero configuration from the host page's engineering team.",
        "Widget styles must be isolated from host-page CSS to prevent visual conflicts.",
        "Must support both voice (WebRTC) and text chat modes with streaming AI response rendering.",
      ],
      solution:
        "Built a self-contained React widget bundled as a minimal embeddable script. Voice mode uses WebRTC for browser-native audio. Text mode uses WebSocket-streamed responses. The widget exposes a configuration API for host pages to set colours, agent personality, and backend endpoint.",
      implementation: [
        "Built and bundled the widget as an isolated React application with scoped CSS.",
        "Implemented WebRTC audio capture and streaming for browser-native voice interaction.",
        "Built streaming response renderer that progressively displays AI output in real-time.",
        "Created the configuration API for host-page customisation of branding, widget behaviour, and agent endpoint.",
        "Handled session persistence and WebSocket reconnection logic for reliable embedding across page navigations.",
      ],
      outcomes: [
        "Enabled non-technical teams to embed a fully functional voice/chat AI in minutes.",
        "Browser-native WebRTC removed all telephony dependencies from the deployment path.",
        "Adopted by enterprise clients across healthcare, insurance, finance, and customer support verticals.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
