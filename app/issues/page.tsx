import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { issues } from "../../content/issues";
import { FormulaBar } from "../../components/FormulaBar";
import { MarqueeBanner } from "../../components/MarqueeBanner";
import { siteConfig } from "../../config/site";

const ARCHIVE_DESCRIPTION =
  "Editorial dispatches on AI, data and storytelling for business leaders.";

export const metadata: Metadata = {
  title: "Ground Truth // Issue Archive",
  description: ARCHIVE_DESCRIPTION,
  alternates: {
    canonical: `${siteConfig.siteUrl}/issues`,
  },
  openGraph: {
    title: "Ground Truth // Issue Archive",
    description: ARCHIVE_DESCRIPTION,
    url: `${siteConfig.siteUrl}/issues`,
    siteName: "Ground Truth",
    type: "website",
    images: [
      {
        url: `${siteConfig.siteUrl}/issues/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ground Truth // Archive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ground Truth // Issue Archive",
    description: ARCHIVE_DESCRIPTION,
    images: [
      {
        url: `${siteConfig.siteUrl}/issues/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Ground Truth // Archive",
      },
    ],
  },
};

export default function ArchivePage() {
  return (
    <div className="relative min-h-screen bg-white spreadsheet-grid pb-24">
      {/* Sticky Top Formula Bar */}
      <FormulaBar
        currentCell="A1"
        currentFormula="=INDEX(issues, 1..2)"
        issueTag="Ground Truth // Archive"
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20">
        {/* Masthead */}
        <section className="mb-12 border-b border-hairline pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3 mb-8 font-mono text-xs text-muted uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <img
                src="/story99-logo.png"
                alt="Story 99 Logo"
                className="h-6 w-auto object-contain rounded-[1px]"
              />
              <span className="text-hairline">|</span>
              <span className="font-bold text-deepPurple">Ground Truth</span>
              <span className="text-hairline">|</span>
              <span>Workbook Archive</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Updated October 2026</span>
              <span className="text-hairline">|</span>
              <span className="text-deepPurple font-medium">Ground Truth Editorial</span>
            </div>
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl text-ink leading-[1.08] tracking-tight max-w-3xl">
            Issue Archive
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl text-muted mt-4 max-w-2xl leading-relaxed">
            Every Ground Truth dispatch, one sheet per issue.
          </p>

          <div className="mt-8 pt-4 border-t border-hairline flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">CELL:</span>
              <span>A1:ARCHIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">TOTAL ISSUES:</span>
              <span>{issues.length} Dispatches</span>
            </div>
          </div>
        </section>

        {/* Spreadsheet Table of Issues */}
        <section className="my-8">
          <div className="border border-hairline bg-paper rounded-[2px] overflow-hidden shadow-xs">
            {/* Table Header Row (Spreadsheet column headers) */}
            <div className="grid grid-cols-12 bg-lilacTint/60 border-b border-hairline font-mono text-[11px] text-deepPurple font-semibold uppercase tracking-wider py-2.5 px-4">
              <div className="col-span-2 sm:col-span-1">Cell</div>
              <div className="col-span-2 sm:col-span-2">Issue</div>
              <div className="col-span-8 sm:col-span-5">Title &amp; Dek</div>
              <div className="hidden sm:block sm:col-span-2">Date</div>
              <div className="hidden sm:block sm:col-span-2 text-right">Read Time</div>
            </div>

            {/* Rows */}
            <div className="divide-y divide-hairline bg-white">
              {issues.map((issue, idx) => {
                const cellAddr = `A${idx + 2}`;
                return (
                  <Link
                    key={issue.metadata.id}
                    href={`/issues/${issue.metadata.slug}`}
                    className="grid grid-cols-12 py-5 px-4 items-center group hover:bg-lilacTint/30 transition-colors"
                  >
                    {/* Cell coordinate */}
                    <div className="col-span-2 sm:col-span-1 font-mono text-xs text-muted group-hover:text-deepPurple font-medium">
                      [{cellAddr}]
                    </div>

                    {/* Issue number */}
                    <div className="col-span-2 sm:col-span-2 font-mono text-xs font-semibold text-deepPurple">
                      {issue.metadata.issueNumber}
                    </div>

                    {/* Title and Dek */}
                    <div className="col-span-8 sm:col-span-5 pr-4">
                      <div className="font-serif text-lg sm:text-xl text-ink font-medium leading-snug group-hover:text-primaryPurple transition-colors">
                        {issue.metadata.title}
                      </div>
                      <div className="font-serif italic text-sm text-muted mt-1 line-clamp-2">
                        {issue.metadata.dek}
                      </div>
                    </div>

                    {/* Date */}
                    <div className="hidden sm:block sm:col-span-2 font-mono text-xs text-muted">
                      {issue.metadata.date}
                    </div>

                    {/* Read Time & Action */}
                    <div className="hidden sm:flex sm:col-span-2 flex-col items-end justify-center font-mono text-xs">
                      <span className="text-muted">{issue.metadata.readingTime}</span>
                      <span className="text-deepPurple font-medium group-hover:translate-x-0.5 transition-transform flex items-center gap-1 mt-0.5">
                        Open sheet &rarr;
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* Marquee Banner */}
        <div className="mt-14">
          <MarqueeBanner />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-hairline max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <div className="flex items-center gap-3">
            <img
              src="/story99-logo.png"
              alt="Story 99 Logo"
              className="h-5 w-auto object-contain rounded-[1px]"
            />
            <span className="text-hairline">|</span>
            <span className="font-bold text-deepPurple">Ground Truth</span>
            <span>&bull;</span>
            <span>Archive</span>
            <span>&bull;</span>
            <span>2026</span>
          </div>
          <div className="text-center sm:text-right">
            <span>Editorial dispatches on AI, data and storytelling for business leaders.</span>
          </div>
        </footer>
      </main>

      {/* Bottom bar back to sheets */}
      <nav
        aria-label="Workbook sheet tabs"
        className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-hairline shadow-[0_-2px_6px_rgba(23,17,43,0.04)] no-print"
      >
        <div className="max-w-5xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar py-2 gap-2">
          <span className="font-mono text-xs text-muted uppercase tracking-wider pr-2 border-r border-hairline">
            Workbook:
          </span>
          <Link
            href="/issues/01"
            className="px-3 py-1 font-mono text-xs rounded-[2px] border border-hairline bg-paper text-ink hover:bg-lilacTint"
          >
            # Issue 01
          </Link>
          <Link
            href="/issues/02"
            className="px-3 py-1 font-mono text-xs rounded-[2px] border border-hairline bg-paper text-ink hover:bg-lilacTint"
          >
            # Issue 02
          </Link>
          <span className="px-3 py-1 font-mono text-xs rounded-[2px] border border-deepPurple bg-deepPurple text-white font-semibold">
            Archive (All)
          </span>
        </div>
      </nav>
    </div>
  );
}
