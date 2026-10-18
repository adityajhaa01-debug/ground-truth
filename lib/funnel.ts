/**
 * lib/funnel.ts
 *
 * Deterministic revenue forecasting engine for pre-launch drug funnels.
 * All computations use integer arithmetic (basis points and whole dollar units)
 * to guarantee 100% deterministic, drift-free execution across all runs and platforms.
 */

export interface FunnelInputs {
  /** Eligible patient population (whole count, e.g. 250,000) */
  eligiblePopulation: number;
  /** Competitor entrants in market: 0, 1, or 2 */
  competitorEntrants: number;
  /** Launch delay in days: 0 to 180 */
  launchDelayDays: number;
  /** Price per complete course in USD (e.g. 45,000) */
  pricePerCourse: number;
}

export interface FunnelNode {
  id: string;
  name: string;
  category: "assumption" | "compute";
  sourceTag?: string;
  count: number;
  unit: "patients" | "usd";
  description: string;
}

export interface FunnelEdge {
  from: string;
  to: string;
  flowCount: number;
  conversionBps: number;
}

export interface FunnelDAG {
  nodes: FunnelNode[];
  edges: FunnelEdge[];
  summary: {
    eligiblePopulation: number;
    reachedPatients: number;
    firstLineStarts: number;
    regressedPatients: number;
    combinationRestarts: number;
    completedStandardCourses: number;
    totalCompletedCourses: number;
    unadjustedRevenue: number;
    firstYearRevenue: number;
    fingerprint: string;
  };
}

export const DEFAULT_FUNNEL_INPUTS: FunnelInputs = {
  eligiblePopulation: 250000,
  competitorEntrants: 0,
  launchDelayDays: 0,
  pricePerCourse: 45000,
};

// Fixed baseline assumptions (expressed in integer Basis Points: 10,000 bps = 100%)
// These represent GenAI research-gathered, human-approved clinical and market rates.
export const ASSUMPTIONS = {
  /** Base reach rate before competitor erosion: 62.00% */
  baseReachBps: 6200,
  /** Reach reduction per competitor entrant: 14.00% absolute erosion */
  competitorErosionBps: 1400,
  /** Patient treatment initiation rate: 74.00% */
  startTreatmentBps: 7400,
  /** Compliance rate through therapy: 81.00% */
  complianceBps: 8100,
  /** Completion rate of full course: 88.00% */
  completionBps: 8800,
  /** Patients who regress after initial line: 22.00% */
  regressionBps: 2200,
  /** Regressed patients eligible for combination re-start: 55.00% */
  combinationRestartBps: 5500,
  /** Combination therapy completion rate: 78.00% */
  combinationCompletionBps: 7800,
  /** Days in baseline commercial year */
  daysInYear: 365,
};

/**
 * cyrb53 - Deterministic 53-bit hash converted to an 8-character uppercase hex string.
 * Used for cryptographic-style fingerprinting of inputs and outputs.
 */
export function cyrb53(str: string, seed = 0): string {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch: number; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const hash = 4294967296 * (2097151 & h2) + (h1 >>> 0);
  return (hash >>> 0).toString(16).padStart(8, "0").slice(0, 8).toUpperCase();
}

/**
 * Pure integer multiplication by basis points (10,000 = 100%)
 */
function applyBps(value: number, bps: number): number {
  return Math.floor((value * bps) / 10000);
}

/**
 * Pure deterministic compiler that converts funnel inputs into computational primitives
 * and executes the directed acyclic graph.
 */
export function calculateFunnel(inputs: FunnelInputs = DEFAULT_FUNNEL_INPUTS): FunnelDAG {
  const eligible = Math.max(0, Math.floor(inputs.eligiblePopulation));
  const competitors = Math.min(2, Math.max(0, Math.floor(inputs.competitorEntrants)));
  const delay = Math.min(180, Math.max(0, Math.floor(inputs.launchDelayDays)));
  const price = Math.max(0, Math.floor(inputs.pricePerCourse));

  // 1. Effective Reach (competitors erode reach)
  const effectiveReachBps = Math.max(
    1000,
    ASSUMPTIONS.baseReachBps - competitors * ASSUMPTIONS.competitorErosionBps
  );
  const reached = applyBps(eligible, effectiveReachBps);

  // 2. Start Treatment
  const started = applyBps(reached, ASSUMPTIONS.startTreatmentBps);

  // 3. Main therapy pathway: Compliance -> Completion
  const compliant = applyBps(started, ASSUMPTIONS.complianceBps);
  const standardCompleted = applyBps(compliant, ASSUMPTIONS.completionBps);

  // 4. Expressive pathway branch: Regress -> Re-start as Combination
  // This models patients who regress after starting and re-enter combination therapy.
  // The graph remains strictly acyclic (no cycles) via forward progression nodes.
  const regressed = applyBps(started, ASSUMPTIONS.regressionBps);
  const combinationRestarts = applyBps(regressed, ASSUMPTIONS.combinationRestartBps);
  const combinationCompleted = applyBps(combinationRestarts, ASSUMPTIONS.combinationCompletionBps);

  // 5. Total completed patient courses
  const totalCompleted = standardCompleted + combinationCompleted;

  // 6. Annualized revenue
  const unadjustedRevenue = totalCompleted * price;

  // 7. Launch delay adjustment (pro-rata first-year revenue impact)
  const activeDays = Math.max(0, ASSUMPTIONS.daysInYear - delay);
  const firstYearRevenue = Math.floor(
    (unadjustedRevenue * activeDays) / ASSUMPTIONS.daysInYear
  );

  // Input + Output fingerprint string
  const fingerprintPayload = [
    eligible,
    competitors,
    delay,
    price,
    totalCompleted,
    firstYearRevenue,
  ].join(":");
  const fingerprint = cyrb53(fingerprintPayload);

  // Node definitions with explainable provenance
  const nodes: FunnelNode[] = [
    {
      id: "eligible",
      name: "Eligible Population",
      category: "assumption",
      sourceTag: "Epi DB v4.2",
      count: eligible,
      unit: "patients",
      description: "Prevalent patient population in primary disease indication.",
    },
    {
      id: "reached",
      name: "Reach the Drug",
      category: "assumption",
      sourceTag: "KOL Survey '25",
      count: reached,
      unit: "patients",
      description: "Patients reached via commercial formulary and diagnosis access.",
    },
    {
      id: "started",
      name: "Start Treatment",
      category: "assumption",
      sourceTag: "Ph-III Trial #401",
      count: started,
      unit: "patients",
      description: "Eligible diagnosed patients initiating first-line therapy.",
    },
    {
      id: "compliant",
      name: "Stay Compliant",
      category: "assumption",
      sourceTag: "RWE Claims '24",
      count: compliant,
      unit: "patients",
      description: "Patients maintaining continuous adherence through standard regimen.",
    },
    {
      id: "regressed",
      name: "Disease Progression",
      category: "compute",
      count: regressed,
      unit: "patients",
      description: "Refractory subgroup progressing post-initiation.",
    },
    {
      id: "restart",
      name: "Re-start (Combo)",
      category: "assumption",
      sourceTag: "NCCN Guideline",
      count: combinationRestarts,
      unit: "patients",
      description: "Progressed patients initiating second-line combination protocol.",
    },
    {
      id: "completed",
      name: "Complete Course",
      category: "compute",
      count: totalCompleted,
      unit: "patients",
      description: "Total patient courses completed across standard and combination paths.",
    },
    {
      id: "revenue",
      name: "First-Year Revenue",
      category: "compute",
      count: firstYearRevenue,
      unit: "usd",
      description: "Deterministic annualized revenue net of launch calendar timing.",
    },
  ];

  // DAG Edges representing directed acyclic patient flows
  const edges: FunnelEdge[] = [
    { from: "eligible", to: "reached", flowCount: reached, conversionBps: effectiveReachBps },
    { from: "reached", to: "started", flowCount: started, conversionBps: ASSUMPTIONS.startTreatmentBps },
    { from: "started", to: "compliant", flowCount: compliant, conversionBps: ASSUMPTIONS.complianceBps },
    { from: "started", to: "regressed", flowCount: regressed, conversionBps: ASSUMPTIONS.regressionBps },
    { from: "regressed", to: "restart", flowCount: combinationRestarts, conversionBps: ASSUMPTIONS.combinationRestartBps },
    { from: "compliant", to: "completed", flowCount: standardCompleted, conversionBps: ASSUMPTIONS.completionBps },
    { from: "restart", to: "completed", flowCount: combinationCompleted, conversionBps: ASSUMPTIONS.combinationCompletionBps },
    { from: "completed", to: "revenue", flowCount: totalCompleted, conversionBps: 10000 },
  ];

  return {
    nodes,
    edges,
    summary: {
      eligiblePopulation: eligible,
      reachedPatients: reached,
      firstLineStarts: started,
      regressedPatients: regressed,
      combinationRestarts: combinationRestarts,
      completedStandardCourses: standardCompleted,
      totalCompletedCourses: totalCompleted,
      unadjustedRevenue,
      firstYearRevenue,
      fingerprint,
    },
  };
}

/**
 * Topological Sort check to verify DAG acyclicity (Kahn's Algorithm)
 */
export function isDAG(nodes: FunnelNode[], edges: FunnelEdge[]): boolean {
  const inDegree: Record<string, number> = {};
  const adj: Record<string, string[]> = {};

  for (const node of nodes) {
    inDegree[node.id] = 0;
    adj[node.id] = [];
  }

  for (const edge of edges) {
    adj[edge.from].push(edge.to);
    inDegree[edge.to] = (inDegree[edge.to] || 0) + 1;
  }

  const queue: string[] = [];
  for (const node of nodes) {
    if (inDegree[node.id] === 0) {
      queue.push(node.id);
    }
  }

  let visitedCount = 0;
  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedCount++;

    for (const neighbor of adj[current]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) {
        queue.push(neighbor);
      }
    }
  }

  return visitedCount === nodes.length;
}

/**
 * Currency formatter (clean integer representation with no decimals)
 */
export function formatUSD(centsOrDollars: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(centsOrDollars);
}

/**
 * Integer count formatter
 */
export function formatNumber(val: number): string {
  return new Intl.NumberFormat("en-US").format(val);
}
