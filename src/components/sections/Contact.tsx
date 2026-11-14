"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import {
  AnimatedSection,
  StaggerContainer,
  staggerItem,
  SPRING,
  EASE,
} from "@/components/ui/AnimatedSection";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(80),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().max(120).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
  _honeypot: z.string().max(0, "Bot detected"),
});
type FormValues = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error" | "unconfigured";

const contacts = [
  { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}`, external: false },
  { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}`, external: false },
  { icon: LinkedinIcon, label: "LinkedIn", value: "in/harinath-samala", href: personal.linkedin, external: true },
  { icon: GithubIcon, label: "GitHub", value: "github.com/Samala-Harinath", href: personal.github, external: true },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const reduce = useReducedMotion();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormValues) {
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, subject: data.subject, message: data.message }),
      });
      const json = await res.json() as { success: boolean; error?: string; unconfigured?: boolean };
      if (json.unconfigured) setStatus("unconfigured");
      else if (json.success) { setStatus("success"); reset(); }
      else { setStatus("error"); setErrorMsg(json.error ?? "Something went wrong."); }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  const inputCls = (err: boolean) => cn(
    "w-full rounded-xl border bg-[var(--surface)] px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] transition-all",
    "focus:outline-none focus:ring-2 focus:ring-[var(--accent-bright)] focus:border-transparent",
    err ? "border-[var(--error)]" : "border-[var(--border)] hover:border-[var(--border-light)]"
  );

  return (
    <section id="contact" aria-labelledby="contact-heading" className="section scroll-mt-20">
      <Container>
        {/* Background decoration */}
        <div className="relative">

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left */}
            <div className="lg:col-span-2">
              <AnimatedSection direction="left">
                <p className="eyebrow mb-3">Get in touch</p>
                <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                  Have a project in mind?
                </h2>
                <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
                  I&apos;m open to full-time roles and project collaborations. Whether it&apos;s a real-time product, an AI integration, or a frontend challenge — let&apos;s talk.
                </p>
              </AnimatedSection>

              <StaggerContainer className="space-y-3" delay={0.1}>
                {contacts.map((c) => (
                  <motion.a
                    key={c.label}
                    variants={staggerItem}
                    whileHover={reduce ? undefined : { x: 6 }}
                    whileTap={reduce ? undefined : { scale: 0.99 }}
                    transition={SPRING}
                    href={c.href}
                    target={c.external ? "_blank" : undefined}
                    rel={c.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-colors group"
                  >
                    <motion.span
                      className="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0"
                      whileHover={reduce ? undefined : { rotate: -8, scale: 1.08 }}
                      transition={SPRING}
                    >
                      <c.icon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                    </motion.span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">{c.label}</p>
                      <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{c.value}</p>
                    </div>
                  </motion.a>
                ))}
              </StaggerContainer>
            </div>

            {/* Right — form */}
            <AnimatedSection direction="right" delay={0.08} scale className="lg:col-span-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
                <AnimatePresence mode="wait" initial={false}>
                {status === "success" ? (
                  <motion.div
                    key="success"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex flex-col items-center text-center gap-4 py-8"
                  >
                    <motion.span
                      initial={{ scale: reduce ? 1 : 0.4, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 16, delay: 0.08 }}
                    >
                      <CheckCircle className="w-14 h-14 text-[var(--success)]" aria-hidden />
                    </motion.span>
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Message sent!</h3>
                      <p className="text-[var(--text-secondary)]">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                    </div>
                    <button type="button" onClick={() => setStatus("idle")} className="text-sm text-[var(--accent-bright)] hover:text-[var(--accent-bright)] transition-colors">
                      Send another message
                    </button>
                  </motion.div>
                ) : status === "unconfigured" ? (
                  <motion.div
                    key="unconfigured"
                    role="status"
                    aria-live="polite"
                    initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduce ? 0 : -12 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="flex flex-col gap-4 py-4"
                  >
                    <AlertCircle className="w-10 h-10 text-[var(--text-muted)]" aria-hidden />
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email not configured</h3>
                      <p className="text-sm text-[var(--text-secondary)]">Please reach out directly via email or LinkedIn.</p>
                    </div>
                    <button type="button" onClick={() => setStatus("idle")} className="self-start text-sm text-[var(--accent-bright)] hover:text-[var(--accent-bright)]">Back</button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex flex-col gap-5"
                  >
                    <div aria-hidden className="hidden">
                      <input tabIndex={-1} autoComplete="off" {...register("_honeypot")} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <Field label="Name" id="c-name" error={errors.name?.message} required>
                        <input id="c-name" type="text" autoComplete="name" placeholder="Your name" aria-required="true" {...register("name")} className={inputCls(!!errors.name)} />
                      </Field>
                      <Field label="Email" id="c-email" error={errors.email?.message} required>
                        <input id="c-email" type="email" autoComplete="email" placeholder="you@example.com" aria-required="true" {...register("email")} className={inputCls(!!errors.email)} />
                      </Field>
                    </div>

                    <Field label="Subject" id="c-subject" error={errors.subject?.message}>
                      <input id="c-subject" type="text" placeholder="What's this about? (optional)" {...register("subject")} className={inputCls(!!errors.subject)} />
                    </Field>

                    <Field label="Message" id="c-message" error={errors.message?.message} required>
                      <textarea id="c-message" rows={5} placeholder="Tell me about your project or challenge…" aria-required="true" {...register("message")} className={cn(inputCls(!!errors.message), "resize-none")} />
                    </Field>

                    <AnimatePresence>
                      {status === "error" && (
                        <motion.div
                          role="alert"
                          initial={{ opacity: 0, height: 0, y: -6 }}
                          animate={{ opacity: 1, height: "auto", y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -6 }}
                          transition={{ duration: 0.35, ease: EASE }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-start gap-2 rounded-xl border border-[var(--error)]/30 bg-[var(--error)]/10 px-4 py-3 text-sm text-[var(--error)]">
                            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden />
                            {errorMsg}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.button
                      type="submit"
                      disabled={status === "loading"}
                      whileHover={reduce || status === "loading" ? undefined : { y: -2 }}
                      whileTap={reduce || status === "loading" ? undefined : { scale: 0.98 }}
                      transition={SPRING}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:opacity-90 transition-colors",
                        status === "loading" && "opacity-70 cursor-not-allowed"
                      )}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {status === "loading" ? (
                          <motion.span
                            key="loading"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center gap-2"
                          >
                            <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                            Sending…
                          </motion.span>
                        ) : (
                          <motion.span
                            key="idle"
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center gap-2"
                          >
                            <Send className="w-4 h-4" aria-hidden />
                            Send message
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.form>
                )}
                </AnimatePresence>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, id, error, required, children }: { label: string; id: string; error?: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-[var(--text-secondary)]">
        {label}{required && <span className="ml-1 text-[var(--accent-bright)]" aria-hidden>*</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} role="alert" className="text-xs text-[var(--error)]">{error}</p>}
    </div>
  );
}
