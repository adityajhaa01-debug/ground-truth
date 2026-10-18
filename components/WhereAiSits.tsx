import React from "react";

export function WhereAiSits() {
  const stages = [
    {
      step: "01",
      name: "Research",
      ownership: "model",
      category: "Synthesis & Extraction",
      description: "Reads documents, proposes rates with citations",
      borderStyle: "dashed",
    },
    {
      step: "02",
      name: "Graph",
      ownership: "model plus human",
      category: "Structure & Approval",
      description: "GenAI drafts DAG: human reviews and approves",
      borderStyle: "dashed",
    },
    {
      step: "03",
      name: "Compute",
      ownership: "deterministic",
      category: "Calculation Engine",
      description: "Compiler executes exact primitives: zero jitter",
      borderStyle: "solid",
    },
    {
      step: "04",
      name: "Review",
      ownership: "human",
      category: "Audit & Excel Export",
      description: "Forecaster validates outputs and round-trips to Excel",
      borderStyle: "solid",
    },
  ];

  return (
    <figure
      aria-labelledby="where-ai-sits-heading"
      className="my-10 border border-hairline bg-paper p-5 sm:p-6 rounded-[2px]"
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 border-b border-hairline">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-wider text-muted block">
            Architectural Principle
          </span>
          <h3 id="where-ai-sits-heading" className="font-serif text-2xl text-ink">
            Where the AI sits
          </h3>
        </div>
        <span className="font-mono text-xs text-deepPurple font-semibold">
          The Two-Piles Allocation
        </span>
      </div>

      {/* Pure SVG Horizontal Strip */}
      <div className="overflow-x-auto my-4">
        <svg
          viewBox="0 0 880 130"
          className="w-full min-w-[700px] h-auto select-none"
          role="img"
          aria-label="Horizontal four-stage architecture diagram: Research, Graph, Compute, Review"
        >
          {/* Connecting Hairline */}
          <line x1="40" y1="65" x2="840" y2="65" stroke="#E3DCF5" strokeWidth="1" />

          {stages.map((stage, idx) => {
            const x = 20 + idx * 215;
            const isDashed = stage.borderStyle === "dashed";

            return (
              <g key={stage.step} transform={`translate(${x}, 15)`}>
                {/* Stage Container Box */}
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="100"
                  rx="2"
                  fill="#FFFFFF"
                  stroke={isDashed ? "#5A2FC2" : "#36178A"}
                  strokeWidth={isDashed ? "1.5" : "2"}
                  strokeDasharray={isDashed ? "4 3" : "none"}
                />

                {/* Stage Step and Name */}
                <text x="12" y="24" className="font-mono text-[10px] fill-muted">
                  STAGE {stage.step}
                </text>
                <text x="12" y="44" className="font-mono text-sm font-bold fill-ink">
                  {stage.name}
                </text>

                {/* Ownership Tag */}
                <rect
                  x="12"
                  y="54"
                  width={stage.ownership.length * 7.5 + 14}
                  height="18"
                  rx="2"
                  fill={isDashed ? "#F7F4FD" : "#E9E2FA"}
                />
                <text
                  x="18"
                  y="67"
                  className="font-mono text-[9px] uppercase font-bold tracking-wider fill-deepPurple"
                >
                  {stage.ownership}
                </text>

                {/* Operational category note */}
                <text x="12" y="88" className="font-mono text-[9px] fill-muted">
                  {stage.category}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <figcaption className="pt-2 border-t border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-[11px] text-muted">
        <span>Illustrative model. Not client data.</span>
        <span>Judgment and search to the model. Arithmetic to deterministic audit.</span>
      </figcaption>
    </figure>
  );
}
