"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { IssueData } from "../content/types";
import { FormulaBar } from "./FormulaBar";
import { SheetTabs, TabItem } from "./SheetTabs";
import { PullQuote } from "./PullQuote";
import { ArticleActions } from "./ArticleActions";
import { MarqueeBanner } from "./MarqueeBanner";

// Issue 01 interactive modules
import { RunFiveTimes } from "./RunFiveTimes";
import { ScenarioDesk } from "./ScenarioDesk";
import { WhereAiSits } from "./WhereAiSits";

// Issue 02 interactive modules
import { SamenessGrid } from "./issue02/SamenessGrid";
import { SameStoryTwoVoices } from "./issue02/SameStoryTwoVoices";
import { CompressionCurve } from "./issue02/CompressionCurve";
import { NameSwapTest } from "./issue02/NameSwapTest";

interface IssueViewProps {
  issue: IssueData;
}

export function IssueView({ issue }: IssueViewProps) {
  const { metadata, introParagraphs, sections } = issue;
  const [currentCell, setCurrentCell] = useState("A1");
  const [currentFormula, setCurrentFormula] = useState(metadata.formulaDefault);
  const [activeSectionId, setActiveSectionId] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);

  // Tabs for bottom sheet-tab navigation
  const tabs: TabItem[] = useMemo(
    () => [
      { id: "hero", label: "A1: Overview", cellAddress: "A1" },
      ...sections.map((s) => ({
        id: s.id,
        label: `${s.cellAddress}: ${s.tabLabel}`,
        cellAddress: s.cellAddress,
      })),
    ],
    [sections]
  );

  // Scroll listener for reading progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Section position detection
      const sectionElements = [
        { id: "hero", cell: "A1", formula: metadata.formulaDefault },
        ...sections.map((s) => ({
          id: s.id,
          cell: s.cellAddress,
          formula: s.formula,
        })),
      ];

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSectionId(item.id);
            setCurrentCell(item.cell);
            setCurrentFormula(item.formula);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [metadata.formulaDefault, sections]);

  const handleSelectTab = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 64; // clearance for formula bar
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  const isIssue01 = metadata.id === "01";
  const isIssue02 = metadata.id === "02";

  return (
    <div className="relative min-h-screen bg-white spreadsheet-grid pb-24">
      {/* 1. Formula Bar (Sticky top) */}
      <FormulaBar
        currentCell={currentCell}
        currentFormula={currentFormula}
        issueTag={`Ground Truth // ${metadata.id}`}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20">
        {/* 2. Hero Section */}
        <section id="hero" className="mb-14 scroll-mt-20">
          {/* Masthead */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-3 mb-8 font-mono text-xs text-muted uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <img
                src="/story99-logo.png"
                alt="Story 99 Logo"
                className="h-6 w-auto object-contain rounded-[1px]"
              />
              <span className="text-hairline">|</span>
              <span className="font-bold text-deepPurple">{metadata.publication}</span>
              <span className="text-hairline">|</span>
              <span>{metadata.issueNumber}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{metadata.date}</span>
              <span className="text-hairline">|</span>
              <span className="text-deepPurple font-medium">{metadata.author}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ink leading-[1.08] tracking-tight max-w-4xl text-left">
            {metadata.title}
          </h1>

          {/* Dek */}
          <p className="font-serif italic text-xl sm:text-2xl text-muted mt-5 max-w-3xl leading-relaxed">
            {metadata.dek}
          </p>

          {/* Overview Metrics Bar */}
          <div className="mt-8 pt-4 border-t border-hairline flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">CELL:</span>
              <span>A1:OVERVIEW</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">READING TIME:</span>
              <span>{metadata.readingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">WORD COUNT:</span>
              <span>
                {metadata.wordCount} words {metadata.wordCountSpec}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">FORMAT:</span>
              <span>{metadata.formatLabel}</span>
            </div>
          </div>
        </section>

        {/* 3. Centered Reading Column */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {/* Intro Paragraphs with Lead Selected Cell Accent */}
          <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
            {isIssue01 && (
              <>
                <p>
                  <span className="relative inline-block border border-deepPurple bg-white px-1 py-0.5 rounded-[1px] mr-1.5 font-medium">
                    Every analytics leader has lived this meeting.
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-deepPurple"
                    />
                  </span>
                  Two people open the same forecast, change the same assumption, and get different
                  numbers. Nobody is lying. The model is just not reproducible.
                </p>
                <p>{introParagraphs[1]}</p>
                <p>{introParagraphs[2]}</p>
              </>
            )}

            {isIssue02 && (
              <>
                <p>
                  <span className="relative inline-block border border-deepPurple bg-white px-1 py-0.5 rounded-[1px] mr-1.5 font-medium">
                    Read ten customer testimonials published this year
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-deepPurple"
                    />
                  </span>{" "}
                  and you&apos;ll notice something before you notice the product: they all sound
                  fine. Clear sentences, a neat arc, a problem, a turning point, a result. Nobody
                  rambles or stumbles, and nobody sounds like anybody in particular.
                </p>
                <p>{introParagraphs[1]}</p>
              </>
            )}
          </div>

          {/* FIGURE 01 */}
          {isIssue01 && (
            <figure className="my-10 border border-hairline bg-paper p-3 sm:p-4 rounded-[2px]">
              <div className="overflow-hidden border border-hairline rounded-[1px] bg-white">
                <img
                  src="/editorial-illustration.jpg"
                  alt="Forecasting engineer drafting directed acyclic graph models and scenario metrics"
                  className="w-full h-auto object-cover max-h-[500px]"
                />
              </div>
              <figcaption className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-muted">
                <span>FIGURE 01 // THE FORECASTING LAB</span>
                <span>Rebuilding 50 to 60 historical models as deterministic graphs.</span>
              </figcaption>
            </figure>
          )}

          {isIssue02 && <SamenessGrid />}

          {/* ISSUE 01 SECTIONS & INTERACTIVE BLOCKS */}
          {isIssue01 && (
            <>
              {/* Section 1: The funnel nobody wants to hand-build (B2) */}
              <section id={sections[0].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[0].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[0].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[0].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 2: Where we let the model in (C3) */}
              <section id={sections[1].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[1].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[1].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[1].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 3: Where we kept it out (D4) */}
              <section id={sections[2].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[2].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[2].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  <p>{sections[2].paragraphs[0]}</p>
                  <p>{sections[2].paragraphs[1]}</p>
                </div>
              </section>
            </>
          )}

          {/* ISSUE 02 SECTIONS & INTERACTIVE BLOCKS */}
          {isIssue02 && (
            <>
              {/* Section 1: The floor went up (B2) */}
              <section id={sections[0].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[0].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[0].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[0].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 2: What gets lost in the edit (C3) */}
              <section id={sections[1].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[1].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[1].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[1].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>
            </>
          )}
        </article>

        {/* INTERACTIVE BREAKOUT 01 */}
        {isIssue01 && (
          <div className="w-full max-w-4xl mx-auto">
            <RunFiveTimes />
          </div>
        )}

        {isIssue02 && (
          <div className="w-full max-w-4xl mx-auto">
            <SameStoryTwoVoices />
          </div>
        )}

        {/* CONTINUATION AFTER PROTOCOL 01 */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {isIssue01 && (
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              <p>{sections[2].paragraphs[2]}</p>
            </div>
          )}

          {isIssue02 && (
            /* Section 3: The people who aren't using it (D4) */
            <section id={sections[2].id} className="mt-14 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-deepPurple font-semibold">
                  [{sections[2].cellAddress}]
                </span>
                <div className="h-[1px] flex-1 bg-hairline" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                {sections[2].heading}
              </h2>
              <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                {sections[2].paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* PULL QUOTE */}
        <div className="w-full max-w-4xl mx-auto">
          <PullQuote
            quote={metadata.pullQuote}
            attribution={metadata.pullQuoteAttribution}
          />
        </div>

        {/* CONTINUATION AFTER PULL QUOTE */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {isIssue01 && (
            /* Section 4: Scenarios become safe to ask (E5) */
            <section id={sections[3].id} className="mt-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-deepPurple font-semibold">
                  [{sections[3].cellAddress}]
                </span>
                <div className="h-[1px] flex-1 bg-hairline" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                {sections[3].heading}
              </h2>
              <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                {sections[3].paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}

          {isIssue02 && (
            /* Section 4: Average is the new baseline (E5) */
            <section id={sections[3].id} className="mt-8 scroll-mt-20">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs text-deepPurple font-semibold">
                  [{sections[3].cellAddress}]
                </span>
                <div className="h-[1px] flex-1 bg-hairline" />
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                {sections[3].heading}
              </h2>
              <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                {sections[3].paragraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* INTERACTIVE BREAKOUT 02 */}
        {isIssue01 && (
          <div className="w-full max-w-5xl mx-auto">
            <ScenarioDesk />
          </div>
        )}

        {isIssue02 && (
          <div className="w-full max-w-4xl mx-auto">
            <CompressionCurve />
          </div>
        )}

        {/* CONTINUATION AFTER PROTOCOL 02 */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {isIssue01 && (
            <>
              {/* Section 5: How we tested it (F6) */}
              <section id={sections[4].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[4].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[4].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[4].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 6: What it does not prove (G7) */}
              <section id={sections[5].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[5].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[5].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[5].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 7: What this means for your team (H8) */}
              <section id={sections[6].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[6].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[6].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  <p>{sections[6].paragraphs[0]}</p>
                </div>
              </section>
            </>
          )}

          {isIssue02 && (
            <>
              {/* Section 5: It's a grey area (F6) */}
              <section id={sections[4].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[4].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[4].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  {sections[4].paragraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </section>

              {/* Section 6: What this means for your brand (G7) */}
              <section id={sections[5].id} className="mt-14 scroll-mt-20">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-deepPurple font-semibold">
                    [{sections[5].cellAddress}]
                  </span>
                  <div className="h-[1px] flex-1 bg-hairline" />
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
                  {sections[5].heading}
                </h2>
                <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
                  <p>{sections[5].paragraphs[0]}</p>
                  <div className="pl-4 border-l-2 border-hairline space-y-3 font-body text-[18px]">
                    <p>
                      <strong>Start from their words.</strong> Interview, record and transcribe
                      before anyone drafts, so the raw voice exists first.
                    </p>
                    <p>
                      <strong>Use AI for structure, not opinion.</strong>
                    </p>
                    <p>
                      <strong>Keep at least one detail per story</strong> that only that customer
                      could have given.
                    </p>
                    <p>
                      <strong>Leave strong storytellers alone.</strong> When a customer already tells
                      it well, don&apos;t run them through the same polish as everyone else. Let
                      them be good.
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}
        </article>

        {/* INTERACTIVE BREAKOUT 03 */}
        {isIssue01 && (
          <div className="w-full max-w-4xl mx-auto">
            <WhereAiSits />
          </div>
        )}

        {isIssue02 && (
          <div className="w-full max-w-4xl mx-auto">
            <NameSwapTest />
          </div>
        )}

        {/* CLOSING PARAGRAPHS & QUESTION */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {isIssue01 && (
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              <p>{sections[6].paragraphs[1]}</p>
            </div>
          )}

          {/* Closing Question Block */}
          <div className="my-14 pt-8 border-t border-hairline">
            <h3 className="font-serif text-3xl sm:text-4xl text-ink leading-snug">
              &ldquo;{metadata.closingQuestion}&rdquo;
            </h3>
          </div>

          {/* Issue Navigation Link (Previous / Next Issue) */}
          <div className="my-8 p-4 bg-paper border border-hairline rounded-[2px] flex items-center justify-between font-mono text-xs">
            {metadata.previousIssue ? (
              <Link
                href={metadata.previousIssue.href}
                className="text-deepPurple hover:text-primaryPurple font-semibold flex items-center gap-1.5"
              >
                <span>&larr;</span>
                <span>{metadata.previousIssue.label}</span>
              </Link>
            ) : (
              <span className="text-muted/60">First issue in series</span>
            )}

            <Link
              href="/issues"
              className="text-muted hover:text-deepPurple uppercase text-[11px] tracking-wider"
            >
              Browse All Issues
            </Link>

            {metadata.nextIssue ? (
              <Link
                href={metadata.nextIssue.href}
                className="text-deepPurple hover:text-primaryPurple font-semibold flex items-center gap-1.5"
              >
                <span>{metadata.nextIssue.label}</span>
              </Link>
            ) : (
              <span className="text-muted/60">Latest dispatch</span>
            )}
          </div>

          {/* Actions: Copy link, Print or save as PDF, Reply to this issue */}
          <ArticleActions
            issueNumber={metadata.issueNumber}
            replySubject={metadata.replySubject}
            canonicalPath={metadata.canonicalPath}
          />
        </article>

        {/* Marquee Ticker Ribbon */}
        <MarqueeBanner />

        {/* 5. Slim Footer */}
        <footer className="mt-16 pt-8 border-t border-hairline max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <div className="flex items-center gap-3">
            <img
              src="/story99-logo.png"
              alt="Story 99 Logo"
              className="h-5 w-auto object-contain rounded-[1px]"
            />
            <span className="text-hairline">|</span>
            <span className="font-bold text-deepPurple">{metadata.publication}</span>
            <span>&bull;</span>
            <span>{metadata.issueNumber}</span>
            <span>&bull;</span>
            <span>2026</span>
          </div>
          <div className="text-center sm:text-right">
            <span>An editorial dispatch for enterprise analytics leaders.</span>
          </div>
        </footer>
      </main>

      {/* 6. Sheet Tabs Navigation (Fixed bottom) */}
      <SheetTabs
        currentIssueId={metadata.id}
        tabs={tabs}
        activeId={activeSectionId}
        scrollProgress={scrollProgress}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
