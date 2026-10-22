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

  it("provides bidirectional navigation links between issues", () => {
    expect(issue01.metadata.nextIssue?.href).toBe("/issues/02");
    expect(issue01.metadata.previousIssue).toBeUndefined();

    expect(issue02.metadata.previousIssue?.href).toBe("/issues/01");
    expect(issue02.metadata.nextIssue).toBeUndefined();
  });
});
