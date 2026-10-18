"use client";

import React from "react";

export interface TabItem {
  id: string;
  label: string;
  cellAddress: string;
}

interface SheetTabsProps {
  tabs: TabItem[];
  activeId: string;
  scrollProgress: number; // 0 to 100
  onSelectTab: (id: string) => void;
}

export function SheetTabs({
  tabs,
  activeId,
  scrollProgress,
  onSelectTab,
}: SheetTabsProps) {
  return (
    <nav
      aria-label="Issue section sheets"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-hairline shadow-[0_-2px_6px_rgba(23,17,43,0.04)]"
    >
      {/* 2px purple reading progress indicator line */}
      <div
        className="h-[2px] bg-primaryPurple transition-all duration-100 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, scrollProgress))}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      {/* Horizontally scrollable spreadsheet tabs strip */}
      <div className="max-w-5xl mx-auto px-2 sm:px-4 flex items-center overflow-x-auto no-scrollbar py-1">
        {/* Leading Sheet Icon / Label */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 font-mono text-[10px] text-muted uppercase tracking-wider border-r border-hairline mr-1 select-none">
          <span>Sheets</span>
        </div>

        <div className="flex items-center space-x-1 py-0.5">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-150 rounded-[2px] border ${
                  isActive
                    ? "bg-deepPurple text-white border-deepPurple font-semibold shadow-sm"
                    : "bg-paper text-ink border-hairline hover:bg-lilacTint hover:text-deepPurple"
                }`}
              >
                <span
                  className={`text-[9px] ${
                    isActive ? "text-lilacTint" : "text-muted"
                  }`}
                >
                  {tab.cellAddress}
                </span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
