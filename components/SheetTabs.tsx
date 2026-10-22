"use client";

import React from "react";
import Link from "next/link";

export interface TabItem {
  id: string;
  label: string;
  cellAddress: string;
}

interface SheetTabsProps {
  currentIssueId: string; // "01" or "02"
  tabs: TabItem[];
  activeId: string;
  scrollProgress: number; // 0 to 100
  onSelectTab: (id: string) => void;
}

export function SheetTabs({
  currentIssueId,
  tabs,
  activeId,
  scrollProgress,
  onSelectTab,
}: SheetTabsProps) {
  const issueList = [
    { id: "01", label: "Issue 01", href: "/issues/01" },
    { id: "02", label: "Issue 02", href: "/issues/02" },
  ];

  return (
    <nav
      aria-label="Issue section sheets and workbook navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-hairline shadow-[0_-2px_6px_rgba(23,17,43,0.04)] no-print"
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
        {/* Workbook Sheets Switcher (Issues) */}
        <div className="flex items-center space-x-1 pr-3 border-r border-hairline mr-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1 font-mono text-[9px] text-muted uppercase tracking-wider pr-1.5 select-none">
            <span>Workbook</span>
          </div>

          {issueList.map((issue) => {
            const isCurrent = currentIssueId === issue.id;
            return (
              <Link
                key={issue.id}
                href={issue.href}
                className={`flex items-center gap-1 px-2.5 py-1.5 font-mono text-xs rounded-[2px] border transition-colors ${
                  isCurrent
                    ? "bg-deepPurple text-white border-deepPurple font-semibold shadow-xs"
                    : "bg-paper text-ink border-hairline hover:bg-lilacTint"
                }`}
                aria-current={isCurrent ? "page" : undefined}
              >
                <span className="text-[9px] opacity-70">#</span>
                <span>{issue.label}</span>
              </Link>
            );
          })}

          <Link
            href="/issues"
            className="px-2 py-1.5 font-mono text-xs text-muted hover:text-deepPurple hover:bg-lilacTint rounded-[2px] transition-colors"
            title="All issues archive"
          >
            Archive
          </Link>
        </div>

        {/* Section Tabs inside current issue */}
        <div className="flex items-center space-x-1 py-0.5 shrink-0">
          {tabs.map((tab) => {
            const isActive = activeId === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs whitespace-nowrap transition-colors duration-150 rounded-[2px] border ${
                  isActive
                    ? "bg-primaryPurple text-white border-primaryPurple font-semibold shadow-xs"
                    : "bg-paper text-ink border-hairline hover:bg-lilacTint hover:text-deepPurple"
                }`}
              >
                <span className={`text-[9px] ${isActive ? "text-lilacTint" : "text-muted"}`}>
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
