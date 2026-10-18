"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  calculateFunnel,
  DEFAULT_FUNNEL_INPUTS,
  FunnelInputs,
  formatUSD,
  formatNumber,
} from "../lib/funnel";

export function ScenarioDesk() {
  const [inputs, setInputs] = useState<FunnelInputs>(DEFAULT_FUNNEL_INPUTS);

  // Animated revenue count-up for smooth transitions
  const dag = useMemo(() => calculateFunnel(inputs), [inputs]);
  const [displayedRevenue, setDisplayedRevenue] = useState(dag.summary.firstYearRevenue);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const target = dag.summary.firstYearRevenue;
    const start = displayedRevenue;
    const diff = target - start;
    if (diff === 0) return;

    const duration = 240; // ms
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // smooth ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      setDisplayedRevenue(Math.round(start + diff * ease));

      if (progress < 1) {
        animRef.current = requestAnimationFrame(step);
      }
    };

    animRef.current = requestAnimationFrame(step);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [dag.summary.firstYearRevenue]);

  const handleReset = () => {
    setInputs(DEFAULT_FUNNEL_INPUTS);
  };

  // Find node counts easily
  const getNode = (id: string) => dag.nodes.find((n) => n.id === id);
  const eligibleNode = getNode("eligible");
  const reachedNode = getNode("reached");
  const startedNode = getNode("started");
  const compliantNode = getNode("compliant");
  const regressedNode = getNode("regressed");
  const restartNode = getNode("restart");
  const completedNode = getNode("completed");
  const revenueNode = getNode("revenue");

  return (
    <figure
      aria-labelledby="scenario-desk-heading"
      className="my-10 border border-hairline bg-paper p-5 sm:p-7 rounded-[2px]"
    >
      {/* Header and Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Verification Protocol 02
          </span>
          <h3 id="scenario-desk-heading" className="font-serif text-2xl text-ink leading-tight">
            Scenario desk: Live directed acyclic graph
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleReset}
            className="px-3 py-1.5 border border-hairline bg-white hover:bg-lilacTint text-ink font-mono text-xs uppercase tracking-wider transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple rounded-[2px]"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Control Sliders & Radios */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 py-5 border-b border-hairline bg-white px-4 my-4 rounded-[2px] border">
        {/* Launch Delay */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <label htmlFor="delay-slider" className="text-ink font-semibold">
              Launch delay
            </label>
            <span className="text-deepPurple font-semibold tabular-nums">
              {inputs.launchDelayDays} days
            </span>
          </div>
          <input
            id="delay-slider"
            type="range"
            min="0"
            max="180"
            step="15"
            value={inputs.launchDelayDays}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, launchDelayDays: Number(e.target.value) }))
            }
            className="w-full accent-primaryPurple cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-muted">
            <span>0 d (on-time)</span>
            <span>90 d</span>
            <span>180 d</span>
          </div>
        </div>

        {/* Competitor Entrants */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-ink font-semibold">Competitor entrants</span>
            <span className="text-deepPurple font-semibold tabular-nums">
              {inputs.competitorEntrants} {inputs.competitorEntrants === 1 ? "entrant" : "entrants"}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1 pt-0.5">
            {[0, 1, 2].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => setInputs((prev) => ({ ...prev, competitorEntrants: count }))}
                className={`py-1.5 font-mono text-xs border rounded-[2px] transition-colors ${
                  inputs.competitorEntrants === count
                    ? "bg-deepPurple text-white border-deepPurple font-semibold"
                    : "bg-paper text-ink border-hairline hover:bg-lilacTint"
                }`}
              >
                {count === 0 ? "None" : `${count} new`}
              </button>
            ))}
          </div>
          <p className="text-[10px] font-mono text-muted text-center pt-0.5">
            Erodes reach share (-14% per entrant)
          </p>
        </div>

        {/* Price Per Course */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs font-mono">
            <label htmlFor="price-slider" className="text-ink font-semibold">
              Price per course
            </label>
            <span className="text-deepPurple font-semibold tabular-nums">
              {formatUSD(inputs.pricePerCourse)}
            </span>
          </div>
          <input
            id="price-slider"
            type="range"
            min="20000"
            max="80000"
            step="2500"
            value={inputs.pricePerCourse}
            onChange={(e) =>
              setInputs((prev) => ({ ...prev, pricePerCourse: Number(e.target.value) }))
            }
            className="w-full accent-primaryPurple cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-muted">
            <span>$20,000</span>
            <span>$50,000</span>
            <span>$80,000</span>
          </div>
        </div>
      </div>

      {/* SVG DAG Diagram */}
      <div className="relative overflow-x-auto my-3 border border-hairline bg-white p-3 rounded-[2px]">
        <svg
          viewBox="0 0 940 320"
          className="w-full min-w-[760px] h-auto select-none"
          role="img"
          aria-label="Directed Acyclic Graph of the pre-launch revenue funnel"
        >
          <defs>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="8"
              refY="5"
              markerWidth="6"
              markerHeight="6"
              orient="auto-start-reverse"
            >
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#5A2FC2" />
            </marker>
          </defs>

          {/* Directed Edges */}
          {/* 1. Eligible -> Reached */}
          <path
            d="M 125 150 L 175 150"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />
          {/* 2. Reached -> Started */}
          <path
            d="M 290 150 L 335 150"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 3. Started -> Compliant (upper branch) */}
          <path
            d="M 450 135 C 475 135, 475 80, 500 80"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 4. Started -> Disease Progression (lower branch) */}
          <path
            d="M 450 165 C 475 165, 475 230, 500 230"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 5. Progression -> Re-start (Combo) */}
          <path
            d="M 615 230 L 640 230"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 6. Compliant -> Complete Course */}
          <path
            d="M 615 80 C 665 80, 680 135, 715 145"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 7. Re-start Combo -> Complete Course */}
          <path
            d="M 755 215 C 770 200, 775 175, 775 170"
            stroke="#5A2FC2"
            strokeWidth="1.5"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* 8. Complete Course -> Revenue */}
          <path
            d="M 830 150 L 850 150"
            stroke="#36178A"
            strokeWidth="2"
            fill="none"
            markerEnd="url(#arrow)"
          />

          {/* Flow badges on edges */}
          <g className="font-mono text-[9px] fill-muted">
            <rect x="135" y="138" width="30" height="13" fill="#FFFFFF" rx="1" />
            <text x="150" y="148" textAnchor="middle">{dag.summary.reachedPatients > 0 ? `${Math.round((dag.summary.reachedPatients / inputs.eligiblePopulation) * 100)}%` : "0%"}</text>

            <rect x="298" y="138" width="28" height="13" fill="#FFFFFF" rx="1" />
            <text x="312" y="148" textAnchor="middle">74%</text>

            <rect x="462" y="94" width="28" height="13" fill="#FFFFFF" rx="1" />
            <text x="476" y="104" textAnchor="middle">81%</text>

            <rect x="462" y="194" width="28" height="13" fill="#FFFFFF" rx="1" />
            <text x="476" y="204" textAnchor="middle">22%</text>

            <rect x="620" y="218" width="20" height="13" fill="#FFFFFF" rx="1" />
            <text x="630" y="228" textAnchor="middle">55%</text>
          </g>

          {/* NODE 1: Eligible Population (Assumption: Dashed) */}
          <g transform="translate(10, 118)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#5A2FC2"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-muted">
              Source: {eligibleNode?.sourceTag}
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Eligible Pop
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-deepPurple">
              {formatNumber(eligibleNode?.count || 0)}
            </text>
          </g>

          {/* NODE 2: Reach the Drug (Assumption: Dashed) */}
          <g transform="translate(175, 118)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#5A2FC2"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-muted">
              Source: {reachedNode?.sourceTag}
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Reach Drug
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-deepPurple">
              {formatNumber(reachedNode?.count || 0)}
            </text>
          </g>

          {/* NODE 3: Start Treatment (Assumption: Dashed) */}
          <g transform="translate(335, 118)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#5A2FC2"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-muted">
              Source: {startedNode?.sourceTag}
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Start Therapy
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-deepPurple">
              {formatNumber(startedNode?.count || 0)}
            </text>
          </g>

          {/* NODE 4: Stay Compliant (Assumption: Dashed - Upper) */}
          <g transform="translate(500, 48)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#5A2FC2"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-muted">
              Source: {compliantNode?.sourceTag}
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Stay Compliant
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-deepPurple">
              {formatNumber(compliantNode?.count || 0)}
            </text>
          </g>

          {/* NODE 5: Progression (Compute: Solid - Lower) */}
          <g transform="translate(500, 198)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#36178A"
              strokeWidth="2"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-deepPurple font-semibold">
              Deterministic
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Progression
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-ink">
              {formatNumber(regressedNode?.count || 0)}
            </text>
          </g>

          {/* NODE 6: Re-start Combo (Assumption: Dashed - Lower) */}
          <g transform="translate(640, 198)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#5A2FC2"
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-muted">
              Source: {restartNode?.sourceTag}
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Combo Re-start
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-deepPurple">
              {formatNumber(restartNode?.count || 0)}
            </text>
          </g>

          {/* NODE 7: Complete Course (Compute: Solid) */}
          <g transform="translate(715, 118)">
            <rect
              width="115"
              height="64"
              rx="2"
              fill="#FFFFFF"
              stroke="#36178A"
              strokeWidth="2"
            />
            <text x="8" y="18" className="font-mono text-[9px] uppercase tracking-wider fill-deepPurple font-semibold">
              Deterministic
            </text>
            <text x="8" y="34" className="font-mono text-xs font-semibold fill-ink">
              Total Complete
            </text>
            <text x="8" y="52" className="font-mono text-xs tabular-nums font-bold fill-ink">
              {formatNumber(completedNode?.count || 0)}
            </text>
          </g>

          {/* NODE 8: Revenue (Compute: Solid Terminal) */}
          <g transform="translate(850, 118)">
            <rect
              width="80"
              height="64"
              rx="2"
              fill="#F7F4FD"
              stroke="#36178A"
              strokeWidth="2"
            />
            <text x="8" y="18" className="font-mono text-[8px] uppercase tracking-wider fill-deepPurple font-bold">
              Output
            </text>
            <text x="8" y="34" className="font-mono text-[11px] font-semibold fill-ink">
              Revenue
            </text>
            <text x="8" y="52" className="font-mono text-[10px] tabular-nums font-bold fill-deepPurple">
              {dag.summary.firstYearRevenue > 1000000000
                ? `$${(dag.summary.firstYearRevenue / 1000000000).toFixed(2)}B`
                : `$${(dag.summary.firstYearRevenue / 1000000).toFixed(1)}M`}
            </text>
          </g>
        </svg>
      </div>

      {/* Legend & Provenance Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-hairline font-mono text-xs text-muted">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-2.5 border border-dashed border-primaryPurple bg-white inline-block rounded-[1px]" />
            <span>GenAI proposed, human-approved assumption</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-2.5 border-2 border-deepPurple bg-white inline-block rounded-[1px]" />
            <span>Deterministic compiled calculation</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span>Run fingerprint:</span>
          <span className="bg-lilacTint text-deepPurple px-2.5 py-0.5 rounded-[2px] font-semibold tracking-wider tabular-nums">
            {dag.summary.fingerprint}
          </span>
        </div>
      </div>

      {/* Final Revenue Callout */}
      <div className="mt-4 p-4 bg-white border border-hairline rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-mono text-xs uppercase text-muted tracking-wider block">
            Annualized First-Year Forecast Output
          </span>
          <span className="font-mono text-2xl sm:text-3xl font-bold text-ink tabular-nums">
            {formatUSD(displayedRevenue)}
          </span>
        </div>
        <div className="text-left sm:text-right font-mono text-xs text-muted">
          <span>Completed patient courses: </span>
          <span className="text-ink font-semibold tabular-nums">
            {formatNumber(dag.summary.totalCompletedCourses)}
          </span>
          <span className="block text-[11px] text-deepPurple">
            Calculated via pure integer basis points
          </span>
        </div>
      </div>

      <figcaption className="mt-4 font-mono text-[11px] text-muted text-right">
        Illustrative model. Not client data.
      </figcaption>
    </figure>
  );
}
