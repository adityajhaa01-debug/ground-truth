"use client";

import React, { useState } from "react";

interface TestimonialCard {
  id: number;
  quote: string;
}

interface AuthorProfile {
  name: string;
  role: string;
  company: string;
}

const BASE_QUOTES: TestimonialCard[] = [
  {
    id: 1,
    quote:
      "This platform completely transformed how our team collaborates. Highly recommend.",
  },
  {
    id: 2,
    quote:
      "The onboarding was seamless and the support team was incredibly responsive.",
  },
  {
    id: 3,
    quote:
      "We saw significant improvements in efficiency within weeks. A game-changer.",
  },
  {
    id: 4,
    quote:
      "Powerful features, intuitive design, and real ROI. Exactly what we needed.",
  },
  {
    id: 5,
    quote:
      "It empowered our team to focus on what matters most. Couldn't be happier.",
  },
];

const BASE_AUTHORS: AuthorProfile[] = [
  { name: "Neha S.", role: "Marketing Lead", company: "Brightloop (fictional)" },
  { name: "Daniel R.", role: "COO", company: "Fernwick Labs (fictional)" },
  { name: "Kavya I.", role: "Founder", company: "Tallgrass Studio (fictional)" },
  { name: "Marcus T.", role: "VP Sales", company: "Ordinal Health (fictional)" },
  { name: "Ishaan P.", role: "Head of Growth", company: "Pebble & Pine (fictional)" },
];

export function NameSwapTest() {
  const [rotationOffset, setRotationOffset] = useState<number>(0);
  const [swapCount, setSwapCount] = useState<number>(0);

  const handleShuffle = () => {
    setRotationOffset((prev) => (prev + 1) % BASE_AUTHORS.length);
    setSwapCount((prev) => prev + 1);
  };

  const handleReset = () => {
    setRotationOffset(0);
    setSwapCount(0);
  };

  return (
    <figure
      aria-labelledby="protocol-03-heading"
      className="my-10 border border-hairline bg-paper p-5 sm:p-7 rounded-[2px]"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Verification Protocol 03
          </span>
          <h3 id="protocol-03-heading" className="font-serif text-2xl text-ink leading-tight">
            The name-swap test
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShuffle}
            className="px-4 py-2 border border-primaryPurple bg-white hover:bg-lilacTint text-deepPurple font-mono text-xs uppercase tracking-wider transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple rounded-[2px] font-semibold min-h-[44px] sm:min-h-[36px]"
          >
            Shuffle names
          </button>
          <button
            type="button"
            onClick={handleReset}
            disabled={swapCount === 0}
            className="px-3 py-2 border border-hairline bg-white hover:bg-lilacTint text-ink font-mono text-xs uppercase tracking-wider transition-colors duration-150 rounded-[2px] disabled:opacity-40 min-h-[44px] sm:min-h-[36px]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Counter Banner */}
      <div
        aria-live="polite"
        className="my-4 p-3 bg-white border border-hairline rounded-[2px] flex flex-wrap items-center justify-between gap-3 font-mono text-xs"
      >
        <div className="flex items-center gap-3">
          <span className="text-muted uppercase">Swaps performed:</span>
          <span className="text-ink font-bold tabular-nums text-sm bg-paper px-2 py-0.5 rounded-[1px] border border-hairline">
            {swapCount}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-muted uppercase">Quotes that stopped making sense:</span>
          <span className="text-deepPurple font-bold tabular-nums text-sm bg-lilacTint px-2 py-0.5 rounded-[1px]">
            0
          </span>
        </div>
      </div>

      {/* 5 Polished Testimonial Cards */}
      <div className="space-y-3 my-4">
        {BASE_QUOTES.map((item, idx) => {
          // Deterministic rotation
          const author = BASE_AUTHORS[(idx + rotationOffset) % BASE_AUTHORS.length];

          return (
            <div
              key={item.id}
              className="p-4 bg-white border border-hairline rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all duration-200"
            >
              <p className="font-body text-base sm:text-[17px] text-ink leading-relaxed italic flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <div className="sm:text-right font-mono text-xs border-t sm:border-t-0 sm:border-l border-hairline pt-2 sm:pt-0 sm:pl-4 min-w-[210px] shrink-0">
                <span className="font-bold text-deepPurple block transition-colors duration-150">
                  {author.name}
                </span>
                <span className="text-muted text-[11px] block">
                  {author.role}, {author.company}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Unlocked Sixth Card (Arjun's Raw Quote) - Revealed after first swap */}
      {swapCount > 0 && (
        <div className="mt-6 p-5 bg-white border-2 border-primaryPurple rounded-[2px] shadow-sm animate-fadeIn">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-hairline font-mono text-xs">
            <div className="flex items-center gap-2 text-deepPurple font-bold">
              <svg
                className="w-4 h-4 text-primaryPurple inline-block"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>Cannot be swapped</span>
            </div>
            <span className="text-muted text-[11px]">Specific stories belong to one person.</span>
          </div>

          <p className="font-body text-base sm:text-[17px] text-ink leading-relaxed">
            &ldquo;Honestly the first two weeks were rough. Priya on my team nearly killed the
            rollout, she hated it. Then the Monday ops report started landing before our 9 a.m.
            standup instead of after lunch, and she just… stopped complaining. That&apos;s the
            whole story really. I got my Monday mornings back.&rdquo;
          </p>

          <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-between font-mono text-xs">
            <span className="font-bold text-ink">
              Arjun M., Head of Operations, Northline Freight (fictional)
            </span>
            <span className="bg-lilacTint text-deepPurple px-2 py-0.5 rounded-[1px] font-semibold text-[10px] uppercase">
              Tethered Evidence
            </span>
          </div>
        </div>
      )}

      {/* Footnote */}
      <figcaption className="mt-5 pt-3 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-muted">
        <span>Illustrative example. Fictional customers, not client data.</span>
        <span>
          {swapCount === 0
            ? "Click 'Shuffle names' to test attribution interchangeability."
            : "Generic quotes remain interchangeable because they contain no un-transferable facts."}
        </span>
      </figcaption>
    </figure>
  );
}
