import { describe, it, expect } from "vitest";
import {
  calculateFunnel,
  isDAG,
  DEFAULT_FUNNEL_INPUTS,
  cyrb53,
  FunnelInputs,
} from "./funnel";

describe("Deterministic Forecasting Engine (lib/funnel.ts)", () => {
  it("executes with 100% determinism across 1,000 repeated runs", () => {
    const baseline = calculateFunnel(DEFAULT_FUNNEL_INPUTS);
    const baselineRevenue = baseline.summary.firstYearRevenue;
    const baselineFingerprint = baseline.summary.fingerprint;
    const baselineCompleted = baseline.summary.totalCompletedCourses;

    for (let i = 0; i < 1000; i++) {
      const run = calculateFunnel(DEFAULT_FUNNEL_INPUTS);
      expect(run.summary.firstYearRevenue).toBe(baselineRevenue);
      expect(run.summary.fingerprint).toBe(baselineFingerprint);
      expect(run.summary.totalCompletedCourses).toBe(baselineCompleted);
      expect(run.nodes.length).toBe(baseline.nodes.length);
      expect(run.edges.length).toBe(baseline.edges.length);
    }
  });

  it("proves the funnel graph is strictly acyclic (isDAG === true)", () => {
    const dag = calculateFunnel(DEFAULT_FUNNEL_INPUTS);
    const valid = isDAG(dag.nodes, dag.edges);
    expect(valid).toBe(true);
  });

  it("correctly models the combination restart pathway without cycles", () => {
    const dag = calculateFunnel(DEFAULT_FUNNEL_INPUTS);
    const regressedNode = dag.nodes.find((n) => n.id === "regressed");
    const restartNode = dag.nodes.find((n) => n.id === "restart");
    const completedNode = dag.nodes.find((n) => n.id === "completed");

    expect(regressedNode).toBeDefined();
    expect(restartNode).toBeDefined();
    expect(completedNode).toBeDefined();

    expect(regressedNode!.count).toBeGreaterThan(0);
    expect(restartNode!.count).toBeGreaterThan(0);
    expect(completedNode!.count).toBe(
      dag.summary.completedStandardCourses + dag.summary.combinationRestarts * 0.78 | 0
    );
  });

  it("decreases reached patients monotonically as competitors enter", () => {
    const r0 = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, competitorEntrants: 0 });
    const r1 = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, competitorEntrants: 1 });
    const r2 = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, competitorEntrants: 2 });

    expect(r0.summary.reachedPatients).toBeGreaterThan(r1.summary.reachedPatients);
    expect(r1.summary.reachedPatients).toBeGreaterThan(r2.summary.reachedPatients);
    expect(r0.summary.firstYearRevenue).toBeGreaterThan(r1.summary.firstYearRevenue);
    expect(r1.summary.firstYearRevenue).toBeGreaterThan(r2.summary.firstYearRevenue);
  });

  it("proportionally impacts first-year revenue with launch delay", () => {
    const onTime = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, launchDelayDays: 0 });
    const delayed90 = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, launchDelayDays: 90 });
    const delayed180 = calculateFunnel({ ...DEFAULT_FUNNEL_INPUTS, launchDelayDays: 180 });

    expect(onTime.summary.firstYearRevenue).toBeGreaterThan(delayed90.summary.firstYearRevenue);
    expect(delayed90.summary.firstYearRevenue).toBeGreaterThan(delayed180.summary.firstYearRevenue);
  });

  it("produces identical fingerprints for identical inputs, and distinct for mutated inputs", () => {
    const f1 = cyrb53("250000:0:0:45000:80000");
    const f2 = cyrb53("250000:0:0:45000:80000");
    const f3 = cyrb53("250000:1:0:45000:80000");

    expect(f1).toBe(f2);
    expect(f1).not.toBe(f3);
    expect(f1).toHaveLength(8);
  });
});
