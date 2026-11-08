import type { Experience } from "@/types/experience";

export const experiences: Experience[] = [
  {
    company: "Llamaworx",
    role: "Software Engineer",
    location: "Bhandup, Maharashtra, India",
    startDate: "March 2024",
    endDate: undefined,
    current: true,
    summary:
      "Building scalable web and mobile applications with real-time AI features for enterprise clients, working on products like Bolka (Voice AI platform) and MFD Studio.",
    responsibilities: [
      "Built and maintained scalable web and mobile applications using React.js, Next.js, React Native, and TypeScript, keeping the codebase clean, reusable, and easy to extend across teams.",
      "Implemented responsive, accessible UI/UX with Tailwind CSS, improving load performance and ensuring consistent behavior across browsers and devices.",
      "Engineered real-time application features using WebSockets (Socket.IO), API streaming, and WebRTC to support interactive, high-performance user experiences.",
      "Integrated third-party AI services including Google Text-to-Speech and Speech-to-Text to deliver seamless voice-driven functionality.",
      "Delivered proof-of-concept builds for enterprise clients including HDFC, working within Scrum teams to manage bug fixing, testing, and deployment for high application reliability.",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "WebSockets",
      "WebRTC",
      "Tailwind CSS",
      "Google Speech APIs",
    ],
  },
  {
    company: "Docintosh",
    role: "Software Engineer",
    location: "Thane, Maharashtra, India",
    startDate: "October 2022",
    endDate: "March 2024",
    current: false,
    summary:
      "Developed features and optimized performance for a members-only professional network for 250,000+ doctors and medical students across India.",
    responsibilities: [
      "Developed new features and modules for web and mobile applications using React.js and React Native, expanding product functionality for end users.",
      "Diagnosed and resolved application bugs, improving overall stability and user experience across releases.",
      "Managed complex application state using Redux Toolkit, streamlining data flow across multi-screen applications.",
      "Optimized application performance by reducing load times and improving rendering efficiency, applying modern React best practices.",
      "Designed and implemented responsive UIs with Tailwind CSS, ensuring a consistent experience across devices and browsers.",
    ],
    technologies: [
      "React.js",
      "React Native",
      "Redux Toolkit",
      "Tailwind CSS",
      "TypeScript",
      "REST APIs",
    ],
  },
  {
    company: "Techiebears",
    role: "Front End Developer",
    location: "Bhiwandi, Maharashtra, India",
    startDate: "January 2021",
    endDate: "October 2022",
    current: false,
    summary:
      "Built responsive web applications using React.js, translating design requirements into production-ready interfaces with RESTful API integration.",
    responsibilities: [
      "Built responsive web applications using React.js, translating design requirements into functional, production-ready interfaces.",
      "Partnered closely with designers to implement user-friendly, pixel-accurate interfaces.",
      "Improved website performance through code refinement and optimized asset management.",
      "Integrated RESTful APIs to extend application features and enable reliable data retrieval.",
      "Maintained version control using Git, supporting smooth collaborative development across the team.",
    ],
    technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "REST APIs", "Git"],
  },
];
