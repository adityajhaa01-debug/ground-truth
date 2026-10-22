"use client";

import React, { useState } from "react";
import { siteConfig } from "../config/site";

interface ArticleActionsProps {
  issueNumber?: string;
  replySubject?: string;
  canonicalPath?: string;
}

export function ArticleActions({
  issueNumber = "Issue 01",
  replySubject = "Re: Ground Truth Issue 01",
  canonicalPath = "/issues/01",
}: ArticleActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      if (typeof window !== "undefined") {
        const fullUrl = `${window.location.origin}${canonicalPath}`;
        await navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="my-12 py-8 border-t border-b border-hairline bg-paper px-6 rounded-[2px] no-print">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block mb-1">
            Dispatch Actions // {issueNumber}
          </span>
          <p className="font-serif text-xl text-ink">
            Share with colleagues or retain for archival records.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-xs">
          {/* Copy link */}
          <button
            type="button"
            onClick={handleCopyLink}
            className="px-4 py-2 border border-primaryPurple bg-white hover:bg-lilacTint text-deepPurple rounded-[2px] transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple"
          >
            {copied ? "Link copied" : "Copy link"}
          </button>

          {/* Print / Save as PDF */}
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 border border-hairline bg-white hover:bg-lilacTint text-ink rounded-[2px] transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple"
          >
            Print or save as PDF
          </button>

          {/* Reply mailto */}
          <a
            href={`mailto:${siteConfig.replyEmail}?subject=${encodeURIComponent(replySubject)}`}
            className="px-4 py-2 border border-hairline bg-white hover:bg-lilacTint text-ink rounded-[2px] transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple inline-block text-center"
          >
            Reply to this issue
          </a>
        </div>
      </div>
    </div>
  );
}
