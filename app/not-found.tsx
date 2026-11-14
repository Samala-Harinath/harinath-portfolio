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
          <p className="font-mono text-8xl font-bold text-[var(--text-muted)] mb-6" aria-hidden>404</p>
          <h1 id="not-found-heading" className="text-3xl font-bold text-[var(--text-primary)] mb-4">Page not found</h1>
          <p className="text-[var(--text-secondary)] mb-10 max-w-sm mx-auto leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-all"
          >
            Back to home
          </Link>
        </Container>
      </main>
      <Footer />
    </>
  );
}
