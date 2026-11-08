"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, CheckCircle, AlertCircle, Loader2, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/SocialIcons";
import { personal } from "@/data/personal";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

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
  { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
  { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone.replace(/\s/g, "")}` },
];

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
    <section id="contact" aria-labelledby="contact-heading" className="section">
      <Container>
        {/* Background decoration */}
        <div className="relative">
          <div
            aria-hidden
            className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full blur-[120px] opacity-10"
            style={{ background: "var(--accent)" }}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left */}
            <div className="lg:col-span-2">
              <p className="mb-3 font-mono text-xs tracking-[0.2em] uppercase text-[var(--accent-bright)]">Get in touch</p>
              <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-primary)] mb-4">
                Have a project in mind?
              </h2>
              <p className="text-[var(--text-secondary)] mb-10 leading-relaxed">
                I&apos;m open to full-time roles and project collaborations. Whether it&apos;s a real-time product, an AI integration, or a frontend challenge — let&apos;s talk.
              </p>

              <div className="space-y-3">
                {contacts.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all group"
                  >
                    <span className="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0">
                      <c.icon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs text-[var(--text-muted)] mb-0.5">{c.label}</p>
                      <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{c.value}</p>
                    </div>
                  </a>
                ))}
                <a
                  href={personal.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all group"
                >
                  <span className="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0">
                    <LinkedinIcon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">LinkedIn</p>
                    <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">in/harinath-samala</p>
                  </div>
                </a>
                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all group"
                >
                  <span className="w-10 h-10 rounded-lg bg-[var(--accent-dim)] flex items-center justify-center flex-shrink-0">
                    <GithubIcon className="w-4 h-4 text-[var(--accent-bright)]" aria-hidden />
                  </span>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">GitHub</p>
                    <p className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">github.com/Samala-Harinath</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Right — form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8">
                {status === "success" ? (
                  <div role="status" aria-live="polite" className="flex flex-col items-center text-center gap-4 py-8">
                    <CheckCircle className="w-14 h-14 text-[var(--success)]" aria-hidden />
                    <div>
                      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Message sent!</h3>
                      <p className="text-[var(--text-secondary)]">Thanks for reaching out. I&apos;ll get back to you as soon as possible.</p>
                    </div>
                    <button type="button" onClick={() => setStatus("idle")} className="text-sm text-[var(--accent-bright)] hover:text-violet-400 transition-colors">
                      Send another message
                    </button>
                  </div>
                ) : status === "unconfigured" ? (
                  <div role="status" aria-live="polite" className="flex flex-col gap-4 py-4">
                    <AlertCircle className="w-10 h-10 text-[var(--text-muted)]" aria-hidden />
                    <div>
                      <h3 className="font-semibold text-[var(--text-primary)] mb-1">Email not configured</h3>
                      <p className="text-sm text-[var(--text-secondary)]">Please reach out directly via email or LinkedIn.</p>
                    </div>
                    <button type="button" onClick={() => setStatus("idle")} className="self-start text-sm text-[var(--accent-bright)] hover:text-violet-400">Back</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-5">
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

                    {status === "error" && (
                      <div role="alert" className="flex items-start gap-2 rounded-xl border border-[var(--error)]/30 bg-[var(--error)]/10 px-4 py-3 text-sm text-[var(--error)]">
                        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden />
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className={cn(
                        "inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-[var(--accent)] text-white hover:bg-violet-500 transition-all shadow-lg shadow-violet-900/30 hover:shadow-violet-800/40 hover:-translate-y-0.5",
                        status === "loading" && "opacity-70 cursor-not-allowed hover:translate-y-0"
                      )}
                    >
                      {status === "loading" ? (
                        <><Loader2 className="w-4 h-4 animate-spin" aria-hidden />Sending…</>
                      ) : (
                        <><Send className="w-4 h-4" aria-hidden />Send message</>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
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
