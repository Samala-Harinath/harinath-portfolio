export interface SkillCategory {
  name: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages & Frameworks",
    skills: ["JavaScript", "TypeScript", "React.js", "Next.js", "React Native", "HTML5", "CSS3"],
  },
  {
    name: "Styling & UI",
    skills: ["Tailwind CSS", "Responsive Design", "Component Architecture", "Cross-Browser Compatibility"],
  },
  {
    name: "State & Data",
    skills: ["Redux Toolkit", "RTK Query", "RESTful APIs", "API Streaming", "State Management"],
  },
  {
    name: "Real-time & Voice",
    skills: ["WebSockets (Socket.IO)", "WebRTC", "Google Speech-to-Text", "Google Text-to-Speech"],
  },
  {
    name: "Backend Familiarity",
    skills: ["FastAPI", "Python", "API Integration"],
  },
  {
    name: "Tools & Practices",
    skills: ["Git", "Agile / Scrum", "Performance Optimization", "pnpm / npm", "Vercel"],
  },
];
