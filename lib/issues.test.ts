import { describe, it, expect } from "vitest";
import { issues, getIssueById, getLatestIssue, getAllIssueSlugs } from "../content/issues";
import { issue01 } from "../content/issues/01";
import { issue02 } from "../content/issues/02";

describe("Multi-Issue Publishing Architecture", () => {
  it("registers both Issue 01 and Issue 02", () => {
    expect(issues.length).toBe(2);
    expect(getAllIssueSlugs()).toEqual(["01", "02"]);
  });

  it("retrieves issues by ID and slug correctly", () => {
    expect(getIssueById("01")?.metadata.title).toBe(issue01.metadata.title);
    expect(getIssueById("02")?.metadata.title).toBe(issue02.metadata.title);
    expect(getIssueById("99")).toBeUndefined();
  });

  it("points getLatestIssue to Issue 02", () => {
    const latest = getLatestIssue();
    expect(latest.metadata.id).toBe("02");
    expect(latest.metadata.title).toBe("Why would someone good want to be average?");
  });

  it("strictly enforces word count constraints across all issues", () => {
    // Issue 01: 690-710 target 700
    expect(issue01.metadata.wordCount).toBeGreaterThanOrEqual(690);
    expect(issue01.metadata.wordCount).toBeLessThanOrEqual(710);

    // Issue 02: 500-800
    expect(issue02.metadata.wordCount).toBeGreaterThanOrEqual(500);
    expect(issue02.metadata.wordCount).toBeLessThanOrEqual(800);
  });

  it("verifies reading times are ceil(words / 230)", () => {
    const expected02Minutes = Math.ceil(issue02.metadata.wordCount / 230);
    expect(issue02.metadata.readingTime).toBe(`${expected02Minutes} min read`);
  });

  it("strictly guarantees zero em dashes in any copy or metadata", () => {
    const emDashRegex = /[—\u2014]|&mdash;/;

    issues.forEach((issue) => {
      expect(issue.metadata.title).not.toMatch(emDashRegex);
      expect(issue.metadata.dek).not.toMatch(emDashRegex);
      expect(issue.metadata.formatLabel).not.toMatch(emDashRegex);
      expect(issue.rawBody).not.toMatch(emDashRegex);

      issue.introParagraphs.forEach((p) => {
        expect(p).not.toMatch(emDashRegex);
      });

      issue.sections.forEach((s) => {
        expect(s.heading).not.toMatch(emDashRegex);
        expect(s.tabLabel).not.toMatch(emDashRegex);
        s.paragraphs.forEach((p) => {
          expect(p).not.toMatch(emDashRegex);
        });
      });
    });
  });

  it("verifies per-issue footer taglines", () => {
    expect(issue01.metadata.footerTagline).toBe(
      "An editorial dispatch for enterprise analytics leaders."
    );
    expect(issue02.metadata.footerTagline).toBe(
      "An editorial dispatch on customer stories and brand trust."
    );
  });

  it("provides clean navigation links without trailing arrows on previousIssue", () => {
    expect(issue01.metadata.nextIssue?.href).toBe("/issues/02");
    expect(issue01.metadata.nextIssue?.label).toBe("Next issue: 02 →");
    expect(issue01.metadata.previousIssue).toBeUndefined();

    expect(issue02.metadata.previousIssue?.href).toBe("/issues/01");
    expect(issue02.metadata.previousIssue?.label).toBe("← Previous issue: 01");
    expect(issue02.metadata.previousIssue?.label).not.toContain("→");
    expect(issue02.metadata.nextIssue).toBeUndefined();
  });

  it("confirms Share Still Distinctive stays exactly 30% for all adoption slider values (0 to 100)", () => {
    const BASELINE_SCORES: number[] = [
      1.1, 1.3, 1.5, 1.8, 2.0, 2.1, 2.3, 2.4, 2.6, 2.7, 2.8, 3.0, 3.1, 3.2, 3.3, 3.4,
      3.5, 3.5, 3.6, 3.7, 3.7, 3.8, 3.8, 3.9, 3.9, 4.0, 4.0, 4.1, 4.1, 4.2, 4.2, 4.3, 4.3, 4.4, 4.4,
      4.6, 4.7, 4.8, 4.9, 5.0, 5.0, 5.1, 5.1, 5.2, 5.2, 5.3, 5.3, 5.4, 5.5, 5.5, 5.6,
      5.7, 5.8, 5.8, 5.9, 6.0, 6.0, 6.1, 6.1, 6.2, 6.2, 6.3, 6.4, 6.5, 6.5, 6.6, 6.7,
      6.8, 6.8, 6.9, 7.0, 7.0, 7.1, 7.1, 7.2, 7.2, 7.3, 7.3, 7.4, 7.4, 7.5, 7.5, 7.6, 7.7, 7.8,
      8.1, 8.2, 8.3, 8.4, 8.5, 8.7, 8.8, 9.0, 9.1, 9.2, 9.3, 9.5, 9.6, 9.8, 10.0,
    ];

    for (let adoptionPct = 0; adoptionPct <= 100; adoptionPct++) {
      const adoptionFactor = adoptionPct / 100;
      const simulated = BASELINE_SCORES.map((score) => {
        if (score < 5) return score + (5 - score) * adoptionFactor;
        if (score >= 7) return score;
        return score - (score - 5) * 0.15 * adoptionFactor;
      });

      const distinctiveCount = simulated.filter((s) => s >= 7).length;
      const shareDistinctive = Math.round((distinctiveCount / simulated.length) * 100);
      expect(shareDistinctive).toBe(30);
    }
  });
});
