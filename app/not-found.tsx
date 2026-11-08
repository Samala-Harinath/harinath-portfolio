import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex items-center" aria-labelledby="not-found-heading">
        <Container className="py-32 text-center">
          {/* Background glow */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }}
          />
          <p className="font-mono text-8xl font-black gradient-text mb-6 opacity-80" aria-hidden>404</p>
          <h1 id="not-found-heading" className="text-3xl font-bold text-[var(--text-primary)] mb-4">Page not found</h1>
          <p className="text-[var(--text-secondary)] mb-10 max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/30"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
