import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Projects } from "@/components/sections/Projects";
import { EngineeringApproach } from "@/components/sections/EngineeringApproach";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { CursorGlow } from "@/components/ui/CursorGlow";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";

export default function HomePage() {
  return (
    <>
      <ScrollProgress />
      <ParticleCanvas />
      <CursorGlow />
      <Navbar />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EngineeringApproach />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
