"use client";

import React, { useState, useMemo } from "react";

export function SameStoryTwoVoices() {
  const [mode, setMode] = useState<"raw" | "polished">("raw");

  const rawText =
    "Honestly the first two weeks were rough. Priya on my team nearly killed the rollout, she hated it. Then the Monday ops report started landing before our 9 a.m. standup instead of after lunch, and she just… stopped complaining. That's the whole story really. I got my Monday mornings back.";

  const polishedText =
    "Implementing the platform transformed our operations. The seamless onboarding and powerful automation features empowered our team to work more efficiently, driving significant productivity gains and improved stakeholder alignment across the organization.";

  // Distinctive details to track
  const rawKeyDetails = useMemo(
    () => [
      "first two weeks were rough",
      "Priya",
      "before our 9 a.m. standup instead of after lunch",
      "stopped complaining",
      "I got my Monday mornings back",
    ],
    []
  );

  // Generic buzzwords to track
  const genericKeywords = useMemo(
    () => [
      "seamless",
      "powerful",
      "empowered",
      "transformed",
      "significant",
      "efficiently",
      "stakeholder alignment",
      "across the organization",
    ],
    []
  );

  // Compute metrics in code
  const currentText = mode === "raw" ? rawText : polishedText;

  const specificDetailsCount = useMemo(() => {
    return rawKeyDetails.filter((phrase) =>
      currentText.toLowerCase().includes(phrase.toLowerCase())
    ).length;
  }, [currentText, rawKeyDetails]);

  const namedPeopleCount = useMemo(() => {
    return currentText.includes("Priya") ? 1 : 0;
  }, [currentText]);

  const numbersOrTimesCount = useMemo(() => {
    return currentText.includes("9 a.m.") || currentText.includes("two weeks") ? 1 : 0;
  }, [currentText]);

  const genericPhrasesCount = useMemo(() => {
    return genericKeywords.filter((phrase) =>
      currentText.toLowerCase().includes(phrase.toLowerCase())
    ).length;
  }, [currentText, genericKeywords]);

  return (
    <figure
      aria-labelledby="protocol-01-heading"
      className="my-10 border border-hairline bg-paper p-5 sm:p-7 rounded-[2px]"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Verification Protocol 01
          </span>
          <h3 id="protocol-01-heading" className="font-serif text-2xl text-ink leading-tight">
            Same story, two voices
          </h3>
        </div>

        {/* Segmented Toggle Control */}
        <div className="flex items-center gap-1 bg-white p-1 border border-hairline rounded-[2px]">
          <button
            type="button"
            onClick={() => setMode("raw")}
            className={`px-3 py-1.5 font-mono text-xs rounded-[2px] transition-all min-h-[44px] sm:min-h-[32px] ${
              mode === "raw"
                ? "bg-deepPurple text-white font-semibold shadow-xs"
                : "text-muted hover:text-ink hover:bg-paper"
            }`}
          >
            Raw transcript
          </button>
          <button
            type="button"
            onClick={() => setMode("polished")}
            className={`px-3 py-1.5 font-mono text-xs rounded-[2px] transition-all min-h-[44px] sm:min-h-[32px] ${
              mode === "polished"
                ? "bg-deepPurple text-white font-semibold shadow-xs"
                : "text-muted hover:text-ink hover:bg-paper"
            }`}
          >
            AI-polished
          </button>
        </div>
      </div>

      {/* Speaker Byline */}
      <div className="pt-4 pb-2 flex items-center justify-between font-mono text-xs text-muted">
        <span>Speaker: Arjun M., Head of Operations, Northline Freight (fictional)</span>
        <span className="uppercase text-[10px] text-deepPurple font-semibold">
          {mode === "raw" ? "Verbatim Transcribed Voice" : "Synthesized Case Study Tone"}
        </span>
      </div>

      {/* Quote Container */}
      <div className="my-3 p-5 sm:p-6 bg-white border border-hairline rounded-[2px] min-h-[140px] flex items-center">
        {mode === "raw" ? (
          <p className="font-body text-[18px] sm:text-[19px] leading-[1.65] text-ink transition-opacity duration-200">
            &ldquo;Honestly the{" "}
            <mark className="bg-lilacTint text-deepPurple px-1 py-0.5 rounded-[1px] font-medium border-b border-primaryPurple">
              first two weeks were rough
            </mark>
            .{" "}
            <mark className="bg-lilacTint text-deepPurple px-1 py-0.5 rounded-[1px] font-medium border-b border-primaryPurple">
              Priya
            </mark>{" "}
            on my team nearly killed the rollout, she hated it. Then the Monday ops report started
            landing{" "}
            <mark className="bg-lilacTint text-deepPurple px-1 py-0.5 rounded-[1px] font-medium border-b border-primaryPurple">
              before our 9 a.m. standup instead of after lunch
            </mark>
            , and she just…{" "}
            <mark className="bg-lilacTint text-deepPurple px-1 py-0.5 rounded-[1px] font-medium border-b border-primaryPurple">
              stopped complaining
            </mark>
            . That&apos;s the whole story really.{" "}
            <mark className="bg-lilacTint text-deepPurple px-1 py-0.5 rounded-[1px] font-medium border-b border-primaryPurple">
              I got my Monday mornings back
            </mark>
            .&rdquo;
          </p>
        ) : (
          <p className="font-body text-[18px] sm:text-[19px] leading-[1.65] text-ink transition-opacity duration-200">
            &ldquo;Implementing the platform transformed our operations. The seamless onboarding
            and powerful automation features empowered our team to work more efficiently, driving
            significant productivity gains and improved stakeholder alignment across the
            organization.&rdquo;
          </p>
        )}
      </div>

      {/* Computed Metrics Row */}
      <div
        aria-live="polite"
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-hairline font-mono"
      >
        <div className="p-2.5 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Specific Details</span>
          <span className="text-xl font-bold text-ink tabular-nums">{specificDetailsCount}</span>
          <span className="text-[10px] text-muted block">of 5 key anchors</span>
        </div>

        <div className="p-2.5 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Named People</span>
          <span className="text-xl font-bold text-ink tabular-nums">{namedPeopleCount}</span>
          <span className="text-[10px] text-muted block">
            {namedPeopleCount > 0 ? "Priya (Colleague)" : "Zero named"}
          </span>
        </div>

        <div className="p-2.5 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Numbers / Times</span>
          <span className="text-xl font-bold text-ink tabular-nums">{numbersOrTimesCount}</span>
          <span className="text-[10px] text-muted block">
            {numbersOrTimesCount > 0 ? "9 a.m. standup" : "Zero temporal"}
          </span>
        </div>

        <div className="p-2.5 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Generic Phrases</span>
          <span
            className={`text-xl font-bold tabular-nums ${
              genericPhrasesCount > 0 ? "text-deepPurple" : "text-ink"
            }`}
          >
            {genericPhrasesCount}
          </span>
          <span className="text-[10px] text-muted block">of 8 stock terms</span>
        </div>
      </div>

      {/* Footnote */}
      <figcaption className="mt-4 pt-3 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-muted">
        <span>Illustrative example. Fictional customers, not client data.</span>
        <span>
          {mode === "raw"
            ? "Highlighted segments indicate un-substitutable customer-specific evidence."
            : "Generic register replaces personal evidence with high-probability corporate vocabulary."}
        </span>
      </figcaption>
    </figure>
  );
}
