import { issue01 } from "./01";
import { issue02 } from "./02";
import { IssueData } from "../types";

export const issues: IssueData[] = [issue01, issue02];

export function getIssueById(id: string): IssueData | undefined {
  return issues.find((issue) => issue.metadata.id === id || issue.metadata.slug === id);
}

export function getLatestIssue(): IssueData {
  return issue02; // Latest issue is Issue 02
}

export function getAllIssueSlugs(): string[] {
  return issues.map((issue) => issue.metadata.slug);
}
