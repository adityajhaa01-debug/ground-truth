import React from "react";

interface PullQuoteProps {
  quote?: string;
  attribution?: string;
}

export function PullQuote({
  quote = "Same graph, same inputs, same output, every time.",
  attribution = "Deterministic Principle // Section D4",
}: PullQuoteProps) {
  return (
    <aside
      aria-label="Pull quote"
      className="my-14 py-8 px-6 sm:px-12 border-y border-hairline bg-paper text-center select-none"
    >
      <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-deepPurple tracking-tight leading-tight max-w-2xl mx-auto">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-muted">
        {attribution}
      </div>
    </aside>
  );
}
