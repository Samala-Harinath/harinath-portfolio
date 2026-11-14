export const personal = {
  name: "Harinath Samala",
  title: "Frontend / Product Engineer",
  experienceLabel: "5.6 years",
  location: "Thane, Maharashtra, India",
  bio: [
    "Frontend-focused software engineer with 5.6 years of experience building and shipping production web and mobile applications using React.js, Next.js, React Native, and TypeScript.",
    "Proven track record delivering real-time features with WebSockets and WebRTC, integrating AI and voice APIs — including Google Speech-to-Text and Text-to-Speech — into production products. Experienced working in Agile/Scrum teams with a consistent focus on performance, cross-browser reliability, and maintainable component architecture.",
  ],
  education: {
    degree: "B.Tech in Computer Science",
    year: "2019",
  },
  email: "samalaharish25@gmail.com",
  linkedin: "https://linkedin.com/in/harinath-samala",
  github: "https://github.com/Samala-Harinath",
  phone: "+91 9011615832",
  siteUrl: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://harinathsamala.com/").replace(/\/+$/, ""),
  openToOpportunities: true,
  image: "/myImage.jpeg",
} as const;
