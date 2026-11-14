import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { personal } from "@/data/personal";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import { ResumeViewerProvider } from "@/components/resume/ResumeViewer";
import { JsonLd } from "@/components/seo/JsonLd";
import { personJsonLd } from "@/lib/jsonld";
import { siteDescription, siteKeywords, siteTitle } from "@/lib/seo";

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

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(personal.siteUrl),
  title: { default: siteTitle, template: `%s | ${personal.name}` },
  description: siteDescription,
  applicationName: personal.name,
  authors: [{ name: personal.name, url: personal.siteUrl }],
  creator: personal.name,
  publisher: personal.name,
  keywords: siteKeywords,
  category: "technology",
  referrer: "origin-when-cross-origin",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/fevicon.png", type: "image/png" }],
    apple: [{ url: "/fevicon.png", type: "image/png" }],
    shortcut: "/fevicon.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: personal.siteUrl,
    siteName: personal.name,
    locale: "en_US",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  ...(googleVerification || bingVerification
    ? {
        verification: {
          ...(googleVerification ? { google: googleVerification } : {}),
          ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
        },
      }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b1224" },
    { media: "(prefers-color-scheme: light)", color: "#f3f7ff" },
  ],
  colorScheme: "dark light",
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
        <JsonLd data={personJsonLd()} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <div className="page-atmosphere" aria-hidden />
        <ThemeProvider>
          <ResumeViewerProvider>
            {children}
          </ResumeViewerProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
