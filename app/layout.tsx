import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/personal";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

const title = `${personal.name} | ${personal.title}`;
const description = `Frontend engineer with ${personal.experienceLabel} of experience building real-time AI products, voice interfaces, and scalable web applications with React, Next.js, TypeScript, WebRTC and WebSockets.`;

export const metadata: Metadata = {
  title: { default: title, template: `%s | ${personal.name}` },
  description,
  metadataBase: new URL(personal.siteUrl),
  icons: {
    icon: [
      { url: "/fevicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/fevicon.png", type: "image/png" },
    ],
    shortcut: "/fevicon.png",
  },
  openGraph: { title, description, url: personal.siteUrl, siteName: personal.name, locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

// Prevents flash of wrong theme before React hydrates
const antiFlashScript = `(function(){try{var t=localStorage.getItem('hs-theme');var d=document.documentElement;if(t==='light'||t==='dark'){d.setAttribute('data-theme',t);}else{d.setAttribute('data-theme','dark');}}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${plusJakartaSans.variable} ${outfit.variable} ${jetbrainsMono.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        {/* Must run before first paint to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: antiFlashScript }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
