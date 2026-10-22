"use client";

import React, { useState, useMemo } from "react";

// 100 fixed, hardcoded baseline distinctiveness scores (scale 0-10)
// Heavy low end (35), broad middle (50), small high tail (15)
const BASELINE_SCORES: number[] = [
  // Weak tier (< 4): 35 items
  1.1, 1.3, 1.5, 1.8, 2.0, 2.1, 2.3, 2.4, 2.6, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4,
  3.5, 3.5, 3.6, 3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4, 4.4,
  // Average tier (4.5 - 7.5): 50 items
  4.6, 4.7, 4.8, 4.9, 5.0, 5.0, 5.1, 5.1, 5.2, 5.2, 5.3, 5.3, 5.4, 5.5, 5.5, 5.6,
  5.7, 5.8, 5.8, 5.9, 6.0, 6.0, 6.1, 6.1, 6.2, 6.2, 6.3, 6.4, 6.5, 6.5, 6.6, 6.7,
  6.8, 6.8, 6.9, 7.0, 7.0, 7.1, 7.1, 7.2, 7.2, 7.3, 7.3, 7.4, 7.4, 7.5, 7.5, 7.6, 7.7, 7.8,
  // Distinctive tier (>= 8.0): 15 items
  8.1, 8.2, 8.3, 8.4, 8.5, 8.7, 8.8, 9.0, 9.1, 9.2, 9.3, 9.5, 9.6, 9.8, 10.0,
];

export function CompressionCurve() {
  const [adoptionPct, setAdoptionPct] = useState<number>(0);

  const adoptionFactor = adoptionPct / 100;

  // Apply deterministic model transformation:
  // - score < 5 moves toward 5: score + (5 - score) * adoption
  // - score >= 7 stays unchanged: score (distinctive writers opt out)
  // - score between 5 and 7 moves slightly toward 5: score - (score - 5) * 0.15 * adoption
  const simulatedScores = useMemo(() => {
    return BASELINE_SCORES.map((score) => {
      if (score < 5) {
        return score + (5 - score) * adoptionFactor;
      }
      if (score >= 7) {
        return score; // Distinctive storytellers opt out
      }
      return score - (score - 5) * 0.15 * adoptionFactor;
    });
  }, [adoptionFactor]);

  // Aggregate into 10 histogram bins: [0-1), [1-2), ... [9-10]
  const bins = useMemo(() => {
    const counts = new Array(10).fill(0);
    simulatedScores.forEach((s) => {
      let b = Math.floor(s);
      if (b >= 10) b = 9;
      if (b < 0) b = 0;
      counts[b]++;
    });
    return counts;
  }, [simulatedScores]);

  // Compute live readouts
  const shareInAverageBand = useMemo(() => {
    const inAverage = simulatedScores.filter((s) => s >= 4 && s < 7).length;
    return Math.round((inAverage / simulatedScores.length) * 100);
  }, [simulatedScores]);

  const shareDistinctive = useMemo(() => {
    const inDistinctive = simulatedScores.filter((s) => s >= 7).length;
    return Math.round((inDistinctive / simulatedScores.length) * 100);
  }, [simulatedScores]);

  const spreadStdDev = useMemo(() => {
    const mean = simulatedScores.reduce((a, b) => a + b, 0) / simulatedScores.length;
    const variance =
      simulatedScores.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
      simulatedScores.length;
    return Math.sqrt(variance).toFixed(2);
  }, [simulatedScores]);

  // Dynamic caption by state
  const stateCaption = useMemo(() => {
    if (adoptionPct === 0) {
      return "Before: wide range, many weak, a few great.";
    }
    if (adoptionPct === 100) {
      return "After: the floor rose, the ceiling didn't move, and the middle got crowded.";
    }
    return `Interpolating at ${adoptionPct}% adoption: weak stories cluster into the 5.0 baseline while the distinctive tail stays fixed.`;
  }, [adoptionPct]);

  const maxBinCount = 50; // Max count for SVG scaling
  const chartHeight = 180;
  const chartWidth = 600;
  const barWidth = 48;
  const gap = 12;

  return (
    <figure
      aria-labelledby="protocol-02-heading"
      className="my-10 border border-hairline bg-paper p-5 sm:p-7 rounded-[2px]"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Verification Protocol 02
          </span>
          <h3 id="protocol-02-heading" className="font-serif text-2xl text-ink leading-tight">
            The compression curve
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setAdoptionPct(0)}
            className="px-3 py-1 font-mono text-xs border border-hairline bg-white hover:bg-lilacTint text-ink rounded-[2px] transition-colors min-h-[36px]"
          >
            Reset (0%)
          </button>
          <button
            type="button"
            onClick={() => setAdoptionPct(100)}
            className="px-3 py-1 font-mono text-xs border border-primaryPurple bg-white hover:bg-lilacTint text-deepPurple rounded-[2px] transition-colors min-h-[36px]"
          >
            Full AI (100%)
          </button>
        </div>
      </div>

      {/* Accessible Slider Control */}
      <div className="py-4 px-4 my-4 bg-white border border-hairline rounded-[2px]">
        <div className="flex justify-between items-center font-mono text-xs mb-2">
          <label htmlFor="adoption-slider" className="text-ink font-semibold">
            AI Polish Adoption Rate
          </label>
          <span className="text-deepPurple font-bold tabular-nums text-sm">
            {adoptionPct}% adoption
          </span>
        </div>
        <input
          id="adoption-slider"
          type="range"
          min="0"
          max="100"
          step="5"
          value={adoptionPct}
          onChange={(e) => setAdoptionPct(Number(e.target.value))}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={adoptionPct}
          aria-valuetext={`${adoptionPct} percent adoption`}
          className="w-full accent-primaryPurple cursor-pointer h-2 bg-hairline rounded-[1px]"
        />
        <div className="flex justify-between font-mono text-[10px] text-muted mt-1.5">
          <span>0% (Raw organic distribution)</span>
          <span>50%</span>
          <span>100% (Universal AI polish)</span>
        </div>
      </div>

      {/* SVG Histogram */}
      <div className="bg-white border border-hairline p-4 rounded-[2px] overflow-x-auto">
        <svg
          viewBox="0 0 620 220"
          className="w-full min-w-[540px] h-auto select-none"
          role="img"
          aria-label="Histogram of distinctiveness scores from 0 to 10"
        >
          {/* Background Zone Shading */}
          {/* Weak zone: x 10 to 250 (bins 0-3) */}
          <rect x="10" y="10" width="234" height="170" fill="#F7F4FD" opacity="0.6" />
          <text x="20" y="26" className="font-mono text-[10px] fill-muted uppercase tracking-wider">
            Weak Zone (0–4)
          </text>

          {/* Average zone: x 248 to 430 (bins 4-6) */}
          <rect x="248" y="10" width="180" height="170" fill="#E9E2FA" opacity="0.4" />
          <text x="256" y="26" className="font-mono text-[10px] fill-muted uppercase tracking-wider">
            Average (4–7)
          </text>

          {/* Distinctive zone: x 432 to 610 (bins 7-9) */}
          <rect x="432" y="10" width="180" height="170" fill="#E9E2FA" opacity="0.75" />
          <text x="440" y="26" className="font-mono text-[10px] fill-deepPurple font-bold uppercase tracking-wider">
            Distinctive (7–10) ★
          </text>

          {/* Hairline baseline */}
          <line x1="10" y1="180" x2="612" y2="180" stroke="#E3DCF5" strokeWidth="1.5" />

          {/* Histogram Bars */}
          {bins.map((count, i) => {
            const x = 16 + i * (barWidth + gap);
            const height = Math.min(160, Math.max(4, (count / maxBinCount) * 150));
            const y = 180 - height;
            const isDistinctive = i >= 7;
            const isAverage = i >= 4 && i < 7;

            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={height}
                  rx="1"
                  fill={isDistinctive ? "#5A2FC2" : isAverage ? "#36178A" : "#5E5675"}
                  className="transition-all duration-150"
                />
                {/* Count label above bar */}
                <text
                  x={x + barWidth / 2}
                  y={y - 5}
                  textAnchor="middle"
                  className="font-mono text-[10px] font-semibold tabular-nums fill-ink"
                >
                  {count}
                </text>
                {/* X axis score interval label */}
                <text
                  x={x + barWidth / 2}
                  y="196"
                  textAnchor="middle"
                  className="font-mono text-[10px] fill-muted"
                >
                  {i}-{i + 1}
                </text>
              </g>
            );
          })}

          <text x="310" y="212" textAnchor="middle" className="font-mono text-[10px] fill-muted">
            Distinctiveness Score Axis (0 = completely generic, 10 = singular personal voice)
          </text>
        </svg>
      </div>

      {/* Live Readout Row */}
      <div
        aria-live="polite"
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-hairline font-mono"
      >
        <div className="p-3 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Share in Average Band</span>
          <span className="text-2xl font-bold text-ink tabular-nums">{shareInAverageBand}%</span>
          <span className="text-[10px] text-muted block">
            {adoptionPct > 0 ? "Compressed toward middle" : "Natural spread"}
          </span>
        </div>

        <div className="p-3 bg-white border border-primaryPurple rounded-[2px]">
          <span className="text-[10px] uppercase text-deepPurple font-semibold block">
            Share Still Distinctive
          </span>
          <span className="text-2xl font-bold text-deepPurple tabular-nums">
            {shareDistinctive}%
          </span>
          <span className="text-[10px] text-muted block">Stays constant (writers opt out)</span>
        </div>

        <div className="p-3 bg-white border border-hairline rounded-[2px]">
          <span className="text-[10px] uppercase text-muted block">Distribution Spread (Std Dev)</span>
          <span className="text-2xl font-bold text-ink tabular-nums">{spreadStdDev}</span>
          <span className="text-[10px] text-muted block">
            {Number(spreadStdDev) < 2.0 ? "Severe variance compression" : "Broad variance"}
          </span>
        </div>
      </div>

      {/* Dynamic State Caption */}
      <div className="mt-3 p-3 bg-white border border-hairline rounded-[2px] font-mono text-xs text-ink">
        <span className="text-deepPurple font-semibold">Observation: </span>
        <span>{stateCaption}</span>
      </div>

      {/* Footnote */}
      <figcaption className="mt-4 pt-3 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-muted">
        <span>Illustrative example. Fictional customers, not client data.</span>
        <span>Simulated across 100 benchmark customer testimonials.</span>
      </figcaption>
    </figure>
  );
}
