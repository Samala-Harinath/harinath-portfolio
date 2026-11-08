export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-realtime-voice-ai-webrtc",
    title: "Building Real-time Voice AI Interfaces with WebRTC",
    excerpt: "A deep dive into how I built browser-native voice AI experiences at Llamaworx — handling audio capture, WebRTC peer connections, and streaming AI responses in real-time without any telephony infrastructure.",
    date: "2026-10-15",
    readTime: "8 min read",
    tags: ["WebRTC", "Voice AI", "React", "Real-time"],
    category: "Engineering",
    featured: true,
  },
  {
    slug: "multi-tenant-frontend-architecture",
    title: "Multi-tenant Frontend Architecture in React",
    excerpt: "How to build a single React codebase that serves multiple tenants with different branding, feature flags, and permission structures — without duplicating components or business logic.",
    date: "2026-09-28",
    readTime: "6 min read",
    tags: ["React", "Architecture", "SaaS", "TypeScript"],
    category: "Architecture",
    featured: true,
  },
  {
    slug: "rtk-query-caching-patterns",
    title: "RTK Query: Advanced Caching Patterns for Production",
    excerpt: "Beyond the basics — how I use RTK Query's tag-based invalidation, optimistic updates, and cache management to handle complex data fetching in enterprise dashboards.",
    date: "2026-09-10",
    readTime: "5 min read",
    tags: ["Redux Toolkit", "RTK Query", "TypeScript", "Performance"],
    category: "Engineering",
    featured: false,
  },
  {
    slug: "websocket-state-management-react",
    title: "WebSocket State Management in React Applications",
    excerpt: "Managing real-time WebSocket state in React without Redux chaos — patterns I've developed for connection lifecycle, message queuing, reconnection logic, and UI feedback.",
    date: "2026-08-22",
    readTime: "7 min read",
    tags: ["WebSockets", "React", "State Management"],
    category: "Engineering",
    featured: false,
  },
  {
    slug: "react-native-web-shared-components",
    title: "Sharing Components Between React Native and Web",
    excerpt: "Practical patterns for sharing business logic, type definitions, and even UI components between a React Native mobile app and a Next.js web application in a monorepo setup.",
    date: "2026-08-05",
    readTime: "6 min read",
    tags: ["React Native", "Next.js", "TypeScript", "Monorepo"],
    category: "Mobile",
    featured: false,
  },
  {
    slug: "api-streaming-ux-patterns",
    title: "UX Patterns for Streaming API Responses",
    excerpt: "AI products that stream responses need thoughtful UX — how I handle progressive rendering, loading states, partial text, error recovery, and the 'thinking' state that feels natural.",
    date: "2026-07-18",
    readTime: "5 min read",
    tags: ["AI", "UX", "React", "Streaming"],
    category: "Product",
    featured: true,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getFeaturedPosts() {
  return blogPosts.filter((p) => p.featured);
}
