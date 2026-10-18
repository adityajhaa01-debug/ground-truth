"use client";

import React from "react";

export function MarqueeBanner() {
  const items = [1, 2, 3, 4];

  return (
    <div
      aria-label="Publication feature ticker"
      className="w-full overflow-hidden border-y border-hairline bg-paper py-2.5 my-12 select-none"
    >
      <div className="flex items-center">
        {/* Leading static indicator */}
        <div className="hidden sm:flex items-center gap-2 px-4 py-1 border-r border-hairline bg-white shrink-0 z-10 font-mono text-[10px] text-deepPurple uppercase tracking-wider font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-primaryPurple animate-pulse" />
          <span>FEATURED // STORY 99</span>
        </div>

        {/* Infinite scrolling track */}
        <div className="overflow-hidden flex-1 relative mask-fade">
          <div className="animate-marquee items-center gap-6">
            {/* Primary Set */}
            {items.map((i) => (
              <div key={`set-1-${i}`} className="flex items-center gap-6 shrink-0">
                <img
                  src="/more-than-my-cgpa-banner.png"
                  alt="More Than My CGPA banner"
                  className="h-10 sm:h-12 w-auto object-contain rounded-[2px] border border-hairline bg-white shadow-xs"
                />
                <span className="font-mono text-xs text-muted">///</span>
              </div>
            ))}

            {/* Duplicated Set for infinite continuous loop */}
            {items.map((i) => (
              <div
                key={`set-2-${i}`}
                aria-hidden="true"
                className="flex items-center gap-6 shrink-0"
              >
                <img
                  src="/more-than-my-cgpa-banner.png"
                  alt=""
                  className="h-10 sm:h-12 w-auto object-contain rounded-[2px] border border-hairline bg-white shadow-xs"
                />
                <span className="font-mono text-xs text-muted">///</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
