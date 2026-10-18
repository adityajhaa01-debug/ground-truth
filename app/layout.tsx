import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Newsreader, IBM_Plex_Mono } from "next/font/google";
import { siteConfig } from "../config/site";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
  adjustFontFallback: false,
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.publicationName} // ${siteConfig.issueNumber}: ${siteConfig.title}`,
  description: siteConfig.dek,
  metadataBase: new URL(siteConfig.siteUrl),
  authors: [{ name: siteConfig.author }],
  openGraph: {
    title: `${siteConfig.publicationName}: ${siteConfig.title}`,
    description: siteConfig.dek,
    url: siteConfig.siteUrl,
    siteName: siteConfig.publicationName,
    type: "article",
    publishedTime: "2026-10-19T00:00:00.000Z",
    authors: [siteConfig.author],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.publicationName}: ${siteConfig.title}`,
    description: siteConfig.dek,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${newsreader.variable} ${ibmPlexMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-page text-ink selection:bg-lilacTint selection:text-deepPurple">
        {children}
      </body>
    </html>
  );
}
