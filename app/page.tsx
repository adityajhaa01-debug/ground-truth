"use client";

import React, { useState, useEffect, useMemo } from "react";
import { siteConfig } from "../config/site";
import { issueMetadata, introParagraphs, sections } from "../content/issue";
import { FormulaBar } from "../components/FormulaBar";
import { SheetTabs, TabItem } from "../components/SheetTabs";
import { RunFiveTimes } from "../components/RunFiveTimes";
import { ScenarioDesk } from "../components/ScenarioDesk";
import { WhereAiSits } from "../components/WhereAiSits";
import { PullQuote } from "../components/PullQuote";
import { ArticleActions } from "../components/ArticleActions";

export default function NewsletterPage() {
  const [currentCell, setCurrentCell] = useState("A1");
  const [currentFormula, setCurrentFormula] = useState(issueMetadata.formulaDefault);
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
    []
  );

  // Scroll listener for reading progress and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Section position detection
      const sectionElements = [
        { id: "hero", cell: "A1", formula: issueMetadata.formulaDefault },
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
  }, []);

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

  const funnelSection = sections.find((s) => s.id === "funnel")!;
  const researchSection = sections.find((s) => s.id === "research")!;
  const compilerSection = sections.find((s) => s.id === "compiler")!;
  const scenariosSection = sections.find((s) => s.id === "scenarios")!;
  const evaluationSection = sections.find((s) => s.id === "evaluation")!;
  const limitsSection = sections.find((s) => s.id === "limits")!;
  const actionSection = sections.find((s) => s.id === "action")!;

  return (
    <div className="relative min-h-screen bg-white spreadsheet-grid pb-24">
      {/* 1. Formula Bar (Sticky top) */}
      <FormulaBar currentCell={currentCell} currentFormula={currentFormula} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-14 pb-20">
        {/* 2. Hero Section */}
        <section id="hero" className="mb-14 scroll-mt-20">
          {/* Publication and Issue Tagline */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-hairline pb-3 mb-8 font-mono text-xs text-muted uppercase tracking-wider">
            <div className="flex items-center gap-3">
              <span className="font-bold text-deepPurple">{siteConfig.publicationName}</span>
              <span className="text-hairline">|</span>
              <span>{siteConfig.issueNumber}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{siteConfig.publishDate}</span>
              <span className="text-hairline">|</span>
              <span className="text-deepPurple font-medium">{siteConfig.author}</span>
            </div>
          </div>

          {/* Oversized Title in Instrument Serif */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-ink leading-[1.08] tracking-tight max-w-4xl text-left">
            {siteConfig.title}
          </h1>

          {/* Dek */}
          <p className="font-serif italic text-xl sm:text-2xl text-muted mt-5 max-w-3xl leading-relaxed">
            {siteConfig.dek}
          </p>

          {/* Reading Metrics Bar */}
          <div className="mt-8 pt-4 border-t border-hairline flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted">
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">CELL:</span>
              <span>A1:OVERVIEW</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">READING TIME:</span>
              <span>{siteConfig.readingTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">WORD COUNT:</span>
              <span>705 words (spec 690-710)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-deepPurple font-semibold">FORMAT:</span>
              <span>Broadsheet Funnel</span>
            </div>
          </div>
        </section>

        {/* 3. Centered Reading Column */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          {/* Intro Paragraphs with Selected Cell Accent on Opening Key Phrase */}
          <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
            <p>
              {/* Selected Cell Accent with corner fill handle */}
              <span className="relative inline-block border border-deepPurple bg-white px-1 py-0.5 rounded-[1px] mr-1.5 font-medium">
                Every analytics leader has lived this meeting.
                <span
                  aria-hidden="true"
                  className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-deepPurple"
                />
              </span>
              Two people open the same forecast, change the same assumption, and get different numbers. Nobody is lying. The model is just not reproducible.
            </p>

            <p>{introParagraphs[1]}</p>

            <p>{introParagraphs[2]}</p>
          </div>

          {/* Section 1: The funnel nobody wants to hand-build (B2) */}
          <section id={funnelSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{funnelSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {funnelSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {funnelSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Section 2: Where we let the model in (C3) */}
          <section id={researchSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{researchSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {researchSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {researchSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Section 3: Where we kept it out (D4) */}
          <section id={compilerSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{compilerSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {compilerSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {/* Paragraph 1 */}
              <p>{compilerSection.paragraphs[0]}</p>

              {/* Paragraph 2 (ends with "Same graph, same inputs, same output, every time.") */}
              <p>{compilerSection.paragraphs[1]}</p>
            </div>
          </section>
        </article>

        {/* INTERACTIVE MODULE A: Wide Breakout placed right after paragraph 2 of compiler section */}
        <div className="w-full max-w-4xl mx-auto">
          <RunFiveTimes />
        </div>

        {/* Continuation of Section 3 in centered column */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
            {/* Paragraph 3 */}
            <p>{compilerSection.paragraphs[2]}</p>
          </div>
        </article>

        {/* PULL QUOTE: Set large in Instrument Serif in purple between sections */}
        <div className="w-full max-w-4xl mx-auto">
          <PullQuote />
        </div>

        {/* Section 4: Scenarios become safe to ask (E5) */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          <section id={scenariosSection.id} className="mt-8 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{scenariosSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {scenariosSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {scenariosSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </article>

        {/* INTERACTIVE MODULE B: Scenario Desk placed at end of Scenarios section */}
        <div className="w-full max-w-5xl mx-auto">
          <ScenarioDesk />
        </div>

        {/* Section 5: How we tested it (F6) */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          <section id={evaluationSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{evaluationSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {evaluationSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {evaluationSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Section 6: What it does not prove (G7) */}
          <section id={limitsSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{limitsSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {limitsSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              {limitsSection.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>

          {/* Section 7: What this means for your team (H8) */}
          <section id={actionSection.id} className="mt-14 scroll-mt-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs text-deepPurple font-semibold">
                [{actionSection.cellAddress}]
              </span>
              <div className="h-[1px] flex-1 bg-hairline" />
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-ink leading-tight mb-6">
              {actionSection.heading}
            </h2>
            <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
              <p>{actionSection.paragraphs[0]}</p>
            </div>
          </section>
        </article>

        {/* INTERACTIVE MODULE C: Where the AI sits placed near Section 7 */}
        <div className="w-full max-w-4xl mx-auto">
          <WhereAiSits />
        </div>

        {/* Remaining Paragraphs of Section 7 */}
        <article className="max-w-[68ch] mx-auto reading-column-wash px-2 sm:px-6">
          <div className="space-y-6 text-[19px] sm:text-[20px] leading-[1.65] text-ink font-body">
            <p>{actionSection.paragraphs[1]}</p>
          </div>

          {/* 4. Closing Block: Final Question set large in Instrument Serif */}
          <div className="my-14 pt-8 border-t border-hairline">
            <h3 className="font-serif text-3xl sm:text-4xl text-ink leading-snug">
              &ldquo;A question to take back to your team: which numbers in your stack could you not reproduce tomorrow? If the list is not empty, start there.&rdquo;
            </h3>
          </div>

          {/* Actions: Copy link, Print or save as PDF, Reply to this issue */}
          <ArticleActions />
        </article>

        {/* 5. Slim Footer */}
        <footer className="mt-16 pt-8 border-t border-hairline max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
          <div className="flex items-center gap-2">
            <span className="font-bold text-deepPurple">{siteConfig.publicationName}</span>
            <span>&bull;</span>
            <span>{siteConfig.issueNumber}</span>
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
        tabs={tabs}
        activeId={activeSectionId}
        scrollProgress={scrollProgress}
        onSelectTab={handleSelectTab}
      />
    </div>
  );
}
