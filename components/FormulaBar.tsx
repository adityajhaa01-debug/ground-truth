"use client";

import React from "react";

interface FormulaBarProps {
  currentCell: string;
  currentFormula: string;
}

export function FormulaBar({ currentCell, currentFormula }: FormulaBarProps) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white border-b border-hairline font-mono select-none">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-10 flex items-center text-xs">
        {/* Cell Name Box */}
        <div className="w-16 sm:w-20 pr-3 border-r border-hairline flex items-center justify-center font-bold text-deepPurple tracking-wider">
          {currentCell}
        </div>

        {/* Function symbol (fx) */}
        <div className="px-3 text-muted font-serif italic text-sm font-semibold select-none">
          fx
        </div>

        {/* Formula Input / Section Label */}
        <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-ink text-[13px] font-medium pl-1">
          {currentFormula}
        </div>

        {/* Publication Tag (Desktop) */}
        <div className="hidden md:flex items-center gap-2 pl-4 border-l border-hairline text-[11px] text-muted">
          <span className="w-2 h-2 rounded-full bg-primaryPurple inline-block" />
          <span className="tracking-widest uppercase">Ground Truth // 01</span>
        </div>
      </div>
    </header>
  );
}
