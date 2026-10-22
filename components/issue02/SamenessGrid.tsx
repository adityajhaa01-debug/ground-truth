"use client";

import React, { useState } from "react";

export function SamenessGrid() {
  const [isRevealed, setIsRevealed] = useState(false);

  const snippets = [
    {
      text: '"The onboarding was seamless and the support team was incredibly responsive."',
      author: "Daniel R., COO",
      isRaw: false,
    },
    {
      text: '"This platform completely transformed how our team collaborates. Highly recommend."',
      author: "Neha S., Marketing Lead",
      isRaw: false,
    },
    {
      text: '"We saw significant improvements in efficiency within weeks. A game-changer."',
      author: "Kavya I., Founder",
      isRaw: false,
    },
    {
      text: '"Powerful features, intuitive design, and real ROI. Exactly what we needed."',
      author: "Marcus T., VP Sales",
      isRaw: false,
    },
    {
      // The single raw, specific voice in full color
      text: '"The Monday ops report started landing before our 9 a.m. standup instead of after lunch, and Priya just stopped complaining."',
      author: "Arjun M., Head of Ops",
      isRaw: true,
    },
    {
      text: '"It empowered our team to focus on what matters most. Couldn\'t be happier."',
      author: "Ishaan P., Head of Growth",
      isRaw: false,
    },
    {
      text: '"Driving measurable operational excellence and alignment across every division."',
      author: "Sarah L., Director",
      isRaw: false,
    },
    {
      text: '"Streamlined our core workflows and delivered undeniable organizational value."',
      author: "David K., VP Product",
      isRaw: false,
    },
    {
      text: '"A robust, transformative solution that maximized team productivity from day one."',
      author: "Elena M., Strategy Lead",
      isRaw: false,
    },
  ];

  const handleReveal = () => {
    if (!isRevealed) {
      setIsRevealed(true);
    }
  };

  return (
    <figure
      aria-labelledby="sameness-caption"
      className="my-10 border border-hairline bg-paper p-4 sm:p-6 rounded-[2px]"
    >
      <div
        role="group"
        aria-label="Nine customer quotes to test distinctiveness"
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
      >
        {snippets.map((s, idx) => {
          let cardStyle = "bg-white border border-hairline text-ink hover:border-primaryPurple/50 cursor-pointer shadow-xs";

          if (isRevealed) {
            if (s.isRaw) {
              cardStyle = "bg-white border-2 border-primaryPurple shadow-sm ring-1 ring-primaryPurple/20";
            } else {
              cardStyle = "bg-white/60 border border-hairline text-muted cursor-default";
            }
          }

          return (
            <div
              key={idx}
              role="button"
              tabIndex={0}
              aria-pressed={isRevealed}
              aria-label={`Testimonial by ${s.author}. ${isRevealed ? (s.isRaw ? "Identified as raw voice." : "Identified as AI polished.") : "Tap to reveal voice origin."}`}
              onClick={handleReveal}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  handleReveal();
                }
              }}
              className={`p-3.5 rounded-[2px] transition-all flex flex-col justify-between text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-primaryPurple min-h-[140px] select-none ${cardStyle}`}
            >
              <p
                className={`font-body text-[13px] ${
                  !isRevealed
                    ? "text-ink"
                    : s.isRaw
                    ? "text-ink font-medium"
                    : "text-muted italic"
                }`}
              >
                {s.text}
              </p>
              <div className="mt-3 pt-2 border-t border-hairline flex items-center justify-between font-mono text-[10px]">
                <span
                  className={
                    !isRevealed
                      ? "text-ink font-medium"
                      : s.isRaw
                      ? "text-deepPurple font-semibold"
                      : "text-muted"
                  }
                >
                  {s.author}
                </span>

                {isRevealed && (
                  <span>
                    {s.isRaw ? (
                      <span className="bg-lilacTint text-deepPurple px-1.5 py-0.5 rounded-[1px] uppercase tracking-wider font-bold">
                        Raw Voice
                      </span>
                    ) : (
                      <span className="text-muted/60 uppercase">AI-Polished</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <figcaption
        id="sameness-caption"
        className="mt-4 pt-3 border-t border-hairline flex flex-col gap-2 font-mono text-[11px] text-muted"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-ink">FIGURE 01 // THE SAMENESS PROBLEM</span>
            <span>Nine customers. One voice. Spot the person.</span>
          </div>
          <span>Illustrative example. Fictional customers, not client data.</span>
        </div>

        {/* Interaction Hint */}
        <div className="text-[11px] text-deepPurple flex items-center gap-1.5 font-medium">
          <span aria-hidden="true">&bull;</span>
          <span>
            {isRevealed
              ? "All voices revealed. Arjun M. is the only testimonial with specific names, un-polished timing, and concrete work evidence."
              : "Tap the one that sounds like a person."}
          </span>
        </div>
      </figcaption>
    </figure>
  );
}
