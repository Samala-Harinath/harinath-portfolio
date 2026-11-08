# Harinath Samala — Portfolio

Personal portfolio website for Harinath Samala, Frontend / Product Engineer.

Built with **Next.js 16 App Router**, **TypeScript**, and **Tailwind CSS v4**.

---

## Local development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (for production) | Full site URL — no trailing slash |
| `RESEND_API_KEY` | Optional | Resend API key for contact form email delivery |
| `CONTACT_EMAIL_TO` | Optional (with Resend) | Inbox that receives contact form submissions |

If `RESEND_API_KEY` / `CONTACT_EMAIL_TO` are not set, the contact form will display an honest "not configured" state rather than pretending to send.

---

## Content editing

All site content is stored in typed data files. No CMS required.

| File | What to edit |
|---|---|
| `src/data/personal.ts` | Name, title, email, LinkedIn, GitHub, bio, education |
| `src/data/experience.ts` | Work history |
| `src/data/projects.ts` | Project entries and case study content |
| `src/data/skills.ts` | Skill categories and technology list |

Fields marked `TODO:` must be confirmed and updated before the site goes live. They are **not rendered publicly**; they are developer reminders only.

---

## Resume PDF

Place the actual PDF at:

```
public/resume.pdf
```

A placeholder file is currently at that path. Replace it with the real document before publishing.

---

## Project screenshots

Place approved screenshots at:

```
public/images/projects/<project-slug>.png
```

Filenames match `project.image` in `src/data/projects.ts`. Each entry currently uses a placeholder. Replace with real approved assets before publishing.

---

## Production build

```bash
pnpm build
pnpm start
```

---

## Checks

```bash
pnpm lint           # ESLint
pnpm exec tsc --noEmit  # TypeScript
pnpm build          # Production build
```

---

## Routes

| Route | Description |
|---|---|
| `/` | Homepage with all sections |
| `/projects/[slug]` | Individual project case studies |
| `/api/contact` | Contact form submission endpoint |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Robots file |

---

## Deployment

Deploy to [Vercel](https://vercel.com) by connecting the GitHub repository. Set environment variables in the Vercel project settings.

---

## Owner checklist before going live

- [ ] Update `NEXT_PUBLIC_SITE_URL` with the real domain
- [ ] Confirm and update `personal.email` in `src/data/personal.ts`
- [ ] Confirm and update `personal.linkedin` in `src/data/personal.ts`
- [ ] Confirm and update `personal.github` in `src/data/personal.ts`
- [ ] Confirm employment dates and company name spelling in `src/data/experience.ts`
- [ ] Confirm education institution and exact degree in `src/data/personal.ts`
- [ ] Review and approve all project descriptions in `src/data/projects.ts`
- [ ] Supply approved project screenshots in `public/images/projects/`
- [ ] Replace placeholder `public/resume.pdf` with the real PDF
- [ ] Configure Resend API key for contact form delivery (or accept direct-link fallback)
- [ ] Confirm `openToOpportunities` flag in `src/data/personal.ts`
