"use client";

import React, { useState, useMemo } from "react";
import { calculateFunnel, DEFAULT_FUNNEL_INPUTS, formatUSD, cyrb53 } from "../lib/funnel";

interface RunResult {
  runIndex: number;
  simulatedRevenue: number;
  driftPct: number;
  compiledRevenue: number;
  compiledFingerprint: string;
}

export function RunFiveTimes() {
  const [seed, setSeed] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  // Shared baseline from deterministic compiler
  const baseResult = useMemo(() => calculateFunnel(DEFAULT_FUNNEL_INPUTS), []);
  const compiledRevenue = baseResult.summary.firstYearRevenue;
  const compiledFingerprint = baseResult.summary.fingerprint;

  // Generate 5 runs with seeded deterministic pseudorandom jitter for the left column
  const runs: RunResult[] = useMemo(() => {
    // Seeded jitter multipliers between +0.2% and +2.4% / -1.8%
    const offsets = [
      [0.0082, 0.0145, -0.0094, 0.0215, -0.0132],
      [-0.0112, 0.0234, 0.0045, -0.0185, 0.0162],
      [0.0175, -0.0078, 0.0211, -0.0142, 0.0095],
      [-0.0195, 0.0124, -0.0062, 0.0188, 0.0241],
    ];
    const offsetSet = offsets[(seed - 1) % offsets.length];

    return offsetSet.map((offset, idx) => {
      const jitterAmount = Math.round(compiledRevenue * offset);
      const simulatedRevenue = compiledRevenue + jitterAmount;
      const driftPct = (offset * 100);

      return {
        runIndex: idx + 1,
        simulatedRevenue,
        driftPct,
        compiledRevenue,
        compiledFingerprint,
      };
    });
  }, [seed, compiledRevenue, compiledFingerprint]);

  const simulatedValues = runs.map((r) => r.simulatedRevenue);
  const minSimulated = Math.min(...simulatedValues);
  const maxSimulated = Math.max(...simulatedValues);
  const spreadDollars = maxSimulated - minSimulated;
  const spreadPct = ((spreadDollars / compiledRevenue) * 100).toFixed(2);

  const handleRunAgain = () => {
    setIsSimulating(true);
    setTimeout(() => {
      setSeed((prev) => prev + 1);
      setIsSimulating(false);
    }, 140);
  };

  return (
    <figure
      aria-labelledby="run-five-times-caption"
      className="my-10 border border-hairline bg-paper p-5 sm:p-7 rounded-[2px]"
    >
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Verification Protocol 01
          </span>
          <h3 className="font-serif text-2xl text-ink leading-tight">
            Run it five times
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleRunAgain}
            disabled={isSimulating}
            className="px-4 py-2 border border-primaryPurple bg-white hover:bg-lilacTint text-deepPurple font-mono text-xs uppercase tracking-wider transition-colors duration-150 focus:outline-none focus:ring-1 focus:ring-deepPurple rounded-[2px]"
          >
            {isSimulating ? "Executing..." : "Run again"}
          </button>
        </div>
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-5">
        {/* Left Column: Free-form simulated arithmetic */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                Free-form generated arithmetic
              </span>
              <span className="font-mono text-[10px] text-muted uppercase">
                Simulated
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {runs.map((run) => (
                <div
                  key={run.runIndex}
                  className="flex items-center justify-between py-2 px-3 bg-white border border-dashed border-deepPurple rounded-[2px]"
                >
                  <span className="font-mono text-xs text-muted">
                    Run #{run.runIndex}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-sm tabular-nums text-ink font-medium">
                      {formatUSD(run.simulatedRevenue)}
                    </span>
                    <span className="font-mono text-[10px] block text-deepPurple">
                      {run.driftPct > 0 ? `+${run.driftPct.toFixed(2)}%` : `${run.driftPct.toFixed(2)}%`}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline font-mono text-xs text-muted flex items-center justify-between">
            <span>Spread (min to max):</span>
            <span className="font-mono text-deepPurple font-semibold tabular-nums">
              {formatUSD(spreadDollars)} ({spreadPct}%)
            </span>
          </div>
        </div>

        {/* Right Column: Compiled DAG execution */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-hairline">
              <span className="font-mono text-xs uppercase tracking-wider text-ink font-semibold">
                Compiled graph
              </span>
              <span className="font-mono text-[10px] text-primaryPurple uppercase font-semibold">
                Deterministic
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {runs.map((run) => (
                <div
                  key={run.runIndex}
                  className="flex items-center justify-between py-2 px-3 bg-white border border-hairline rounded-[2px]"
                >
                  <span className="font-mono text-xs text-muted">
                    Run #{run.runIndex}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-sm tabular-nums text-ink font-medium">
                      {formatUSD(run.compiledRevenue)}
                    </span>
                    <span className="font-mono text-[10px] block text-primaryPurple font-semibold">
                      0.00% drift
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-hairline font-mono text-xs text-muted flex items-center justify-between">
            <span>Graph fingerprint:</span>
            <span className="font-mono bg-lilacTint text-deepPurple px-2 py-0.5 rounded-[2px] font-semibold tracking-wider">
              {compiledFingerprint}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Notes */}
      <figcaption
        id="run-five-times-caption"
        className="mt-6 pt-3 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-[11px] text-muted"
      >
        <span>Illustrative model. Not client data.</span>
        <span>Simulated jitter for illustration. Does not reflect any specific proprietary model.</span>
      </figcaption>
    </figure>
  );
}
