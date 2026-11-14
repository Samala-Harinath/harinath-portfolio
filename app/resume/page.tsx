import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ResumeHero } from "@/components/resume/ResumeHero";
import { ResumeTimeline } from "@/components/resume/ResumeTimeline";
import { ResumeSkills } from "@/components/resume/ResumeSkills";
import { ResumePdfSection } from "@/components/resume/ResumePdfSection";
import { Industries } from "@/components/sections/Industries";
import { personal } from "@/data/personal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  segment: "Résumé",
  description: `Interactive résumé of ${personal.name} — ${personal.title} with ${personal.experienceLabel} of experience in React, Next.js, TypeScript, WebRTC and real-time AI products. View or download the PDF.`,
  alternates: { canonical: "/resume" },
});

export default function ResumePage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <ResumeHero />
        <ResumeTimeline />
        <ResumeSkills />
        <Industries />
        <ResumePdfSection />
      </main>
      <Footer />
    </>
  );
}
