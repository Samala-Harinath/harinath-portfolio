# Portfolio Website Build Specification --- Harinath Samala

## Instructions for Claude

Act as a senior product designer, UX engineer, and senior frontend
developer. Build a polished, production-quality personal portfolio
website for **Harinath Samala**, positioning him as a **Frontend /
Product Engineer** with 5+ years of frontend development experience.

This is an implementation brief. Do not merely provide suggestions or a
static mockup. Build the working website in the existing project (or
scaffold it if the repository is empty), run the available checks, and
fix errors.

### Important working rules

1.  First inspect the repository, existing dependencies, scripts, and
    conventions. Do not overwrite working code unnecessarily.
2.  If the repository is empty, scaffold a current stable Next.js App
    Router project using TypeScript and Tailwind CSS.
3.  Use the existing package manager and lockfile. If none exists, use
    `pnpm`.
4.  Before making major assumptions about real work history, metrics,
    project details, URLs, or contact information, use clearly marked
    editable placeholders. Never invent achievements, client names,
    performance metrics, employment dates, testimonials, or project
    outcomes.
5.  Build a complete responsive website, not just a homepage screenshot.
6.  Keep the code maintainable, accessible, typed, and reasonably
    lightweight.
7.  Run lint, type-check, and production build commands where available.
    Resolve errors before finishing.
8.  At the end, report what was built, files changed, commands run, any
    remaining placeholders, and how to run the project.

------------------------------------------------------------------------

# 1. Product goal and positioning

## Primary goal

Help Harinath get shortlisted for experienced frontend engineering /
product engineering roles.

The portfolio must quickly communicate that he can: - Build complex,
production-quality frontend applications. - Turn product requirements
into clear user experiences. - Develop maintainable and reusable React
components. - Work with APIs, real-time communication, streaming
interfaces, and complex application state. - Collaborate across product
and engineering workflows.

## Target audience

-   Recruiters and talent acquisition teams.
-   Engineering managers and frontend leads.
-   CTOs and product companies.
-   Potential collaborators.

## Brand positioning

**Name:** Harinath Samala\
**Professional title:** Frontend / Product Engineer\
**Experience:** 5+ years (confirm exact wording and dates before
publication)\
**Core stack:** React.js, Next.js, TypeScript, Tailwind CSS\
**Location:** India (display only if desired; do not show a street
address)

Suggested positioning statement:

> I build scalable digital products and intuitive web experiences with
> React, Next.js and TypeScript.

Suggested supporting copy:

> I'm a Frontend / Product Engineer focused on building responsive
> applications, reusable interfaces, and real-time product experiences.
> I enjoy turning complex requirements into reliable, user-friendly
> software.

Keep copy confident, specific, and natural. Avoid exaggerated marketing
language and generic claims such as "passionate ninja" or "pixel-perfect
guru."

------------------------------------------------------------------------

# 2. Visual direction

## Overall style

Create a premium, modern, dark portfolio with a restrained editorial
feel. It should look like the portfolio of an experienced product-minded
engineer, not a flashy beginner template.

### Design characteristics

-   Near-black background with layered charcoal surfaces.
-   Off-white primary typography and muted gray supporting text.
-   One restrained accent color, preferably violet or electric blue.
-   Strong typography hierarchy and generous whitespace.
-   Thin, subtle borders and restrained shadows.
-   Clean grid alignment and consistent spacing.
-   Large, well-composed project imagery.
-   Subtle motion that supports comprehension rather than distracting.
-   Consistent hover, focus, active, and disabled states.

### Suggested color tokens

Use CSS variables or Tailwind theme tokens rather than scattering raw
colors.

-   Background: `#09090B`
-   Surface: `#111114`
-   Card: `#18181B`
-   Primary text: `#FAFAFA`
-   Secondary text: `#A1A1AA`
-   Muted text: `#71717A`
-   Border: `#27272A`
-   Accent: `#8B5CF6`
-   Success: `#22C55E`

Check contrast and adjust where needed. Accent color should be used
sparingly.

### Typography

-   Use Geist or Inter for the main interface.
-   Use a monospace font such as Geist Mono or JetBrains Mono only for
    small technical labels or code.
-   Use `next/font` where appropriate.
-   Use responsive typography with `clamp()` or Tailwind responsive
    classes.
-   Avoid excessive all-caps text and tiny low-contrast labels.

### Layout

-   Maximum content width around 1160--1240px.
-   Consistent horizontal gutters.
-   Desktop layouts should feel spacious.
-   Tablet layouts should adapt naturally.
-   Mobile should use a clear single-column flow.
-   Do not force desktop layouts onto mobile.

### Motion

Use Motion for React (formerly Framer Motion) only where it adds value.

Good uses: - Subtle hero entrance. - Small section reveal transitions. -
Project card hover treatment. - Mobile menu transitions. - Small button
interactions.

Requirements: - Respect `prefers-reduced-motion`. - Avoid
scroll-jacking. - Avoid long, theatrical page transitions. - Do not
animate every text element. - Avoid heavy 3D scenes and large video
backgrounds.

------------------------------------------------------------------------

# 3. Site architecture and routes

Build the following routes:

-   `/` --- Main portfolio homepage.
-   `/projects/[slug]` --- Individual project case studies.
-   `/blog` --- Optional technical writing index; if no real articles
    exist, do not populate it with fake articles. It can be omitted or
    shown as "Coming soon" only if useful.
-   `/blog/[slug]` --- Only implement if real MDX content is available.
-   `not-found.tsx` --- Branded 404 page.

The homepage should be a single, cohesive scrolling page with anchor
navigation.

## Homepage section order

1.  Navigation
2.  Hero
3.  About
4.  Skills / Expertise
5.  Experience
6.  Selected Projects
7.  Engineering Approach
8.  Contact
9.  Footer

Do not add sections just to make the page longer. Every section must
contribute to the hiring goal.

------------------------------------------------------------------------

# 4. Detailed section requirements

## 4.1 Navigation

Create a compact sticky navigation bar.

Include: - Text wordmark: `Harinath Samala` or `HS`. - Anchor links:
About, Experience, Projects, Contact. - Resume button. - Mobile menu
with accessible open/close behavior.

Behavior: - Smooth-scroll to sections, while respecting reduced-motion
preferences. - Show a subtle active or hover state. - Keep the
navigation usable on small screens. - Avoid an oversized navbar.

Resume: - Add a clearly named PDF placeholder at `/public/resume.pdf`. -
If the actual resume file is not present, keep the button configured for
that path and clearly report that the file must be added. Do not
fabricate a resume.

## 4.2 Hero

This is the highest-priority section. A recruiter should understand who
Harinath is and what he builds within a few seconds.

Suggested content:

Eyebrow: `FRONTEND / PRODUCT ENGINEER`

Headline: `I build digital products that solve real-world problems.`

Supporting text:
`I create scalable web applications and intuitive product experiences using React, Next.js and TypeScript.`

Actions: - `Explore my work` --- scroll to projects. - `Download resume`
--- link to `/resume.pdf`.

Social links: - GitHub --- editable placeholder URL. - LinkedIn ---
editable placeholder URL. - Email --- editable placeholder address.

Optional availability badge: - Only show "Open to opportunities" if
confirmed by the owner. - Make it easy to turn off through
configuration.

Design: - Strong typography, restrained accent treatment, and a subtle
background gradient or grid. - Avoid a generic stock developer
portrait. - A portrait is optional; do not invent one. - Make the hero
visually memorable without overwhelming the content.

## 4.3 About

Purpose: give a concise professional overview.

Suggested draft:

> I'm Harinath Samala, a Frontend / Product Engineer with 5+ years of
> experience building modern web applications. My work focuses on React,
> Next.js and TypeScript, with an emphasis on reusable architecture,
> responsive interfaces, application performance, API integration and
> real-time experiences.
>
> I enjoy understanding product problems, breaking complex requirements
> into manageable solutions, and building interfaces that are reliable
> and easy to use.

Include: - Short professional summary. - Engineering interests: frontend
architecture, product UI, performance, real-time experiences. -
Education: B.Tech, completed in 2019 (confirm institution and exact
degree details before displaying). - Optional location: India.

Do not include personal or sensitive information.

## 4.4 Skills and expertise

Group skills by category. Do not use arbitrary percentage proficiency
bars; they are not meaningful evidence.

Suggested categories and technologies (only show skills the owner can
confidently discuss):

**Frontend** - React.js - Next.js - React Native - JavaScript -
TypeScript

**Styling and UI** - Tailwind CSS - CSS - Responsive design - Component
systems

**State and data** - Redux Toolkit - RTK Query - REST APIs - API
streaming

**Real-time** - WebSockets - WebRTC (only if the owner has practical
experience)

**Backend familiarity** - Python - FastAPI

**Animation** - Motion / Framer Motion - GSAP

**Tools** - Git - GitHub / GitLab - pnpm - Vercel

Design: - Use clean grouped cards or compact lists. - Use icons only
when they improve scanning. - Avoid a wall of logos. - Optionally allow
clicking a category to highlight relevant projects, but only if the
interaction is useful and fully implemented.

## 4.5 Experience

Display work history in a clear timeline or editorial list.

Known current/most recent company context: - Company: Llamaworx
(spelling should be confirmed by owner; do not silently choose a
different legal company name). - Role: Software Developer (Frontend). -
Location: Bhiwandi, Maharashtra, India (optional). - Employment dates:
PLACEHOLDER --- confirm. - Responsibilities may include frontend feature
development, bug fixing, state management, performance work, responsive
UI, API integration and real-time application functionality. Only retain
bullets that accurately reflect the actual role.

Each experience entry should support: - Company. - Role. - Dates. -
Location (optional). - Concise impact-oriented bullets. - Technologies
used.

Do not invent previous employers, dates, team size, users, revenue, or
numerical impact. If only one verified role is available, show one role
well rather than inventing a career history.

## 4.6 Selected projects

Show 3--4 substantial projects. The cards must look polished and lead to
detailed case studies.

Potential projects based on the owner's discussed work. Treat all
descriptions below as starting points to verify, not as permission to
invent details.

### Project A --- Multi-Tenant SaaS Platform

Potential context: work related to the Bolka platform.

Potential topics to explain, if accurate: - Multiple businesses or
tenants using a shared application. - Tenant-specific branding and
configuration. - Reusable frontend components. - User roles and
permissions. - API integration and application state.

Suggested summary:
`A multi-tenant product experience designed to support multiple businesses through a shared application with configurable experiences.`

### Project B --- AI Voice Assistant

Potential context: a voice-based AI application.

Potential topics to explain, if implemented: - Speech-to-text and
text-to-speech. - Real-time audio interaction. - WebSocket or WebRTC
communication. - Conversation interface and audio controls. - Frontend
integration with backend AI services.

Suggested summary:
`A voice-first assistant experience focused on natural, real-time interaction between users and AI services.`

### Project C --- Embeddable AI Chatbot

Potential context: a chatbot widget designed to be embedded into other
websites.

Potential topics: - Floating chat launcher. - Iframe or script
integration. - Streaming responses. - Responsive widget UI. -
Integration configuration.

Suggested summary:
`An embeddable conversational interface that allows websites to offer an integrated AI chat experience.`

### Project D --- Enterprise Data Dashboard

Potential context: dashboard work involving data grids and analytics.

Potential topics: - Data-heavy interfaces. - Sorting and filtering. -
Pagination. - API integration. - Charts and complex state.

Suggested summary:
`A data-focused dashboard experience for exploring and managing structured information through interactive UI components.`

For every project: - Clearly state whether it was professional work, a
personal project, or a prototype. - Explain Harinath's actual
contribution. - Use only approved screenshots or recreated sample-data
screens. - Do not expose company source code, customer information,
credentials, private URLs, internal architecture, or confidential
data. - Do not claim public live demos or GitHub repositories unless the
links are real and approved. - If a project cannot be publicly
described, use a sanitized overview and state that some details are
confidential.

Project card fields: - Title. - Short description. - Category. -
Technology tags. - Project image. - Role. - Link to case study. -
Optional live demo and source-code links.

## 4.7 Project case-study pages

Create a reusable case-study page template for `/projects/[slug]`.

Each case study should support:

1.  Project title and concise summary.
2.  Project type: professional / personal / prototype.
3.  My role and responsibilities.
4.  Problem or user need.
5.  Constraints and challenges.
6.  Solution and design decisions.
7.  Technical implementation.
8.  Architecture diagram or flow (only when accurate).
9.  Screenshots and captions.
10. Outcomes and learnings.
11. Technologies.
12. Previous / next project navigation.
13. Back to all projects.

Use a structured editorial layout with readable line lengths and a clear
visual hierarchy.

Do not make up metrics. If measured results are unavailable, describe
qualitative outcomes honestly.

## 4.8 Engineering approach

Create a compact section explaining how Harinath approaches product
engineering.

Possible themes: - Reusable component architecture. - Responsive and
accessible interfaces. - Performance-conscious development. - API
integration and data handling. - Real-time interfaces and streaming. -
Maintainable code and debugging.

Use short, specific explanations. Avoid generic statements that could
apply to every developer.

## 4.9 Contact

Headline:
`Have a product or engineering challenge in mind? Let's connect.`

Fields: - Name. - Email. - Subject (optional). - Message.

Requirements: - Client-side validation with React Hook Form and Zod, or
an equally lightweight approach. - Server-side validation in the API
route. - Spam protection / honeypot and sensible rate limiting if
feasible. - Never expose email service secrets in client-side code. -
Use Resend only if credentials are configured; otherwise provide a
clearly documented integration placeholder. - Show loading, success, and
error states. - Ensure keyboard and screen-reader accessibility. -
Include editable email, LinkedIn and GitHub links.

Do not pretend a message was sent if the backend is not configured.

## 4.10 Footer

Include: - Harinath Samala. - Short role label. - Navigation
shortcuts. - GitHub / LinkedIn / email. - Copyright year generated
dynamically. - A small "Built with Next.js and TypeScript" note if
desired.

------------------------------------------------------------------------

# 5. Interaction and feature specifications

Implement these features in priority order.

## Must-have for first release

1.  Responsive navigation and mobile menu.
2.  Hero CTAs and working anchor navigation.
3.  About, skills, experience and project sections.
4.  Project cards linked to case-study routes.
5.  Download-resume link with a real file supplied by owner.
6.  Contact form with honest delivery states.
7.  Responsive design for mobile, tablet and desktop.
8.  SEO metadata and social sharing metadata.
9.  Accessible keyboard focus and semantic HTML.
10. Custom 404 page.

## Nice-to-have, only after core quality is complete

-   Dark/light mode toggle. Dark mode remains the default.
-   Subtle scroll reveal animations.
-   Project category filtering if there are enough projects.
-   Command palette with `Ctrl/Cmd + K` for navigation.
-   GitHub API integration, only if it adds useful verified information.
-   Technical blog using MDX, once real articles are ready.

## Do not build in the first release

-   AI chatbot that answers about the developer.
-   Heavy 3D background.
-   Fake GitHub contribution statistics.
-   Fake visitor counter.
-   Fake testimonials.
-   Fake project metrics.
-   Complex CMS or database for mostly static content.
-   Unnecessary Redux store.
-   Decorative loading screens that delay access to content.

The first release should be fast, useful, credible, and complete.

------------------------------------------------------------------------

# 6. Technical implementation requirements

## Framework

-   Next.js App Router.
-   TypeScript with strict mode.
-   Tailwind CSS.
-   Server Components by default.
-   Client Components only for interactivity, browser APIs, and
    animation.
-   Use semantic HTML and accessible components.

## Suggested dependencies

Use current compatible versions and avoid installing packages without a
clear need.

-   `lucide-react` --- icons.
-   `motion` --- animation (Motion for React).
-   `react-hook-form` --- form handling.
-   `zod` --- validation.
-   `@hookform/resolvers` --- form schema integration.
-   `resend` --- optional email delivery, only if configured.
-   `next-mdx-remote` or a suitable MDX solution --- only if
    blog/case-study content needs it.

Do not install multiple libraries that solve the same problem.

## State management

Do not add Redux Toolkit for this portfolio unless a real complexity
requires it. Use local React state, URL state, and server-rendered
content.

## Images

-   Use Next.js Image where suitable.
-   Use optimized local project screenshots.
-   Add meaningful alt text.
-   Set dimensions or aspect ratios to avoid layout shift.
-   Avoid remote image dependencies unless configured correctly.
-   Do not use random stock photos as fake project screenshots.
-   Use clearly marked placeholder artwork when real screenshots are not
    available.

## SEO

Implement: - Page title:
`Harinath Samala | Frontend / Product Engineer` - A concise, unique meta
description. - Open Graph title, description and image. - Twitter/X card
metadata where appropriate. - Canonical URL using a configurable site
URL. - `sitemap.ts`. - `robots.ts`. - Person and WebSite structured data
using verified information only. - Descriptive route-specific metadata
for case studies.

Do not invent a domain. Use an environment variable or a clearly marked
placeholder until the actual domain is supplied.

## Performance

-   Avoid unnecessary client-side JavaScript.
-   Lazy-load below-the-fold media.
-   Use optimized fonts and images.
-   Avoid layout shifts.
-   Keep animation light.
-   Respect reduced-motion preferences.
-   Aim for good Core Web Vitals.
-   Test with Lighthouse or PageSpeed Insights after deployment.

## Accessibility

-   Semantic landmarks and heading hierarchy.
-   Keyboard-accessible navigation and controls.
-   Visible focus states.
-   Proper form labels and error announcements.
-   Sufficient color contrast.
-   Meaningful alt text.
-   Reduced-motion support.
-   No information conveyed by color alone.

## Security

-   Never put secrets in client bundles.
-   Validate all contact submissions server-side.
-   Sanitize user-provided content where it is rendered.
-   Do not expose private work information.
-   Add sensible spam protection.

------------------------------------------------------------------------

# 7. Suggested project structure

Use a clean, maintainable structure. Adapt it to the existing repository
rather than forcing a rewrite.

``` text
harinath-portfolio/
├── public/
│   ├── images/
│   │   ├── profile/
│   │   └── projects/
│   ├── icons/
│   └── resume.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── not-found.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── projects/
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Projects.tsx
│   │   │   ├── EngineeringApproach.tsx
│   │   │   └── Contact.tsx
│   │   ├── projects/
│   │   │   ├── ProjectCard.tsx
│   │   │   └── CaseStudyLayout.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Badge.tsx
│   │       ├── Container.tsx
│   │       └── SectionHeading.tsx
│   ├── data/
│   │   ├── personal.ts
│   │   ├── skills.ts
│   │   ├── experience.ts
│   │   └── projects.ts
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── seo.ts
│   │   └── email.ts
│   └── types/
│       ├── project.ts
│       └── experience.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

Keep content in typed data files or MDX, separate from presentation
components.

------------------------------------------------------------------------

# 8. Typed content model

Create TypeScript interfaces for projects and experience. Example:

``` ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  category: "SaaS" | "AI" | "Dashboard" | "Other";
  projectType: "Professional" | "Personal" | "Prototype";
  role: string;
  technologies: string[];
  image: string;
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  confidentialityNote?: string;
}

export interface Experience {
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current?: boolean;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}
```

Populate the initial data with verified information only. Use
`TODO: CONFIRM` comments for unknown values. Do not render raw TODO text
to public visitors.

------------------------------------------------------------------------

# 9. Implementation plan

Work in phases. Complete and verify each phase before moving to the
next.

## Phase 1 --- Repository inspection and setup

-   Inspect current repository and package manager.
-   Confirm Next.js, TypeScript and Tailwind configuration.
-   Establish global CSS variables and typography.
-   Set up root layout and metadata.
-   Create shared container, button, badge and section-heading
    components.

## Phase 2 --- Homepage foundation

-   Build responsive navbar.
-   Build hero.
-   Build about section.
-   Build skills section.
-   Build experience section.
-   Build engineering approach section.
-   Build footer.

## Phase 3 --- Projects and case studies

-   Create typed project data.
-   Build project cards and grid.
-   Create dynamic project route.
-   Create reusable case-study layout.
-   Add the initial project entries with honest placeholders where
    details are unknown.
-   Ensure missing images or links do not break the page.

## Phase 4 --- Contact and resume

-   Implement contact form.
-   Add server-side validation.
-   Add email provider integration only when configured.
-   Add loading, success and error states.
-   Add resume link and document placeholder instructions.

## Phase 5 --- Motion and polish

-   Add restrained entrance and hover animations.
-   Add reduced-motion behavior.
-   Check focus, hover, active and disabled states.
-   Add mobile menu transitions.
-   Avoid unnecessary effects.

## Phase 6 --- SEO, accessibility and performance

-   Add metadata, sitemap and robots.
-   Add structured data with verified fields.
-   Check heading order, labels, keyboard navigation and contrast.
-   Optimize images and fonts.
-   Check for hydration issues, console errors and layout shifts.

## Phase 7 --- Verification and handoff

Run the available commands, typically:

``` bash
pnpm lint
pnpm exec tsc --noEmit
pnpm build
```

If scripts differ, inspect `package.json` and use the correct commands.

Test: - Desktop widths. - Tablet widths. - Mobile widths. - Navigation
and anchor links. - Project case-study routes. - Missing/invalid project
slugs. - Resume link. - Contact form validation and delivery behavior. -
Keyboard-only navigation. - Reduced-motion setting.

Fix errors rather than merely reporting them.

------------------------------------------------------------------------

# 10. Acceptance criteria

The website is complete only when:

-   [ ] The homepage is polished and responsive.
-   [ ] The professional title and value proposition are immediately
    clear.
-   [ ] About, skills, experience, projects and contact sections exist.
-   [ ] At least three project entries are represented without
    fabricated claims.
-   [ ] Project cards link to functional case-study pages.
-   [ ] All content is editable from structured data files.
-   [ ] The navigation works on mobile and desktop.
-   [ ] Resume link points to a real file or is clearly identified as
    awaiting the owner's PDF.
-   [ ] Contact form has validation and honest delivery states.
-   [ ] SEO metadata, sitemap and robots are configured.
-   [ ] Accessibility basics are implemented.
-   [ ] No confidential data or credentials are exposed.
-   [ ] No fake metrics, testimonials, awards, or links appear.
-   [ ] Lint, type-check and production build pass, where scripts are
    available.
-   [ ] README explains local setup, environment variables, content
    editing and deployment.

------------------------------------------------------------------------

# 11. Owner details that must remain editable

Create one obvious configuration/data location for these values:

-   Display name: Harinath Samala
-   Professional title: Frontend / Product Engineer
-   Experience label: 5+ years (confirm before publishing)
-   Email: `TODO: ADD PROFESSIONAL EMAIL`
-   LinkedIn: `TODO: ADD LINKEDIN URL`
-   GitHub: `TODO: ADD GITHUB URL`
-   Website domain: `TODO: ADD DOMAIN`
-   Resume PDF: `public/resume.pdf` (owner must supply)
-   Current company legal spelling: `TODO: CONFIRM LLAMAWORX NAME`
-   Employment dates: `TODO: CONFIRM`
-   Education institution and exact degree: `TODO: CONFIRM`
-   Project screenshots and permissions: `TODO: SUPPLY APPROVED ASSETS`
-   Project descriptions and individual contributions: `TODO: VERIFY`

Do not display placeholder strings such as `TODO` publicly. Hide
unavailable optional fields gracefully.

------------------------------------------------------------------------

# 12. Final instruction to Claude

Build the website now.

Prioritize, in this order:

1.  Credible content and clear positioning.
2.  Excellent visual hierarchy and responsive design.
3.  Strong project presentation and case-study navigation.
4.  Accessibility and performance.
5.  Subtle, high-quality interactions.

Make the result feel custom-designed for an experienced Frontend /
Product Engineer. Avoid a generic template look, excessive gradients,
oversized glassmorphism, random stock photos, fake statistics, and
unnecessary animations.

Do not stop after generating a plan. Implement the working website,
inspect it, run checks, fix issues, and provide a concise handoff
with: - What was implemented. - Main routes and components. - Commands
executed and results. - Any information or assets Harinath still needs
to provide. - Exact local run instructions.
