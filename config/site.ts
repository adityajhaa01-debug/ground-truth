export interface SiteConfig {
  publicationName: string;
  issueNumber: string;
  issueCode: string;
  title: string;
  dek: string;
  author: string;
  authorRole: string;
  publishDate: string;
  replyEmail: string;
  siteUrl: string;
  readingTime: string;
}

export const siteConfig: SiteConfig = {
  publicationName: "Ground Truth",
  issueNumber: "Issue 01",
  issueCode: "issue_01",
  title: "The model researches. The compiler calculates.",
  dek: "A note for analytics leaders on where AI belongs in a forecast.",
  author: "Ground Truth Editorial",
  authorRole: "Editorial Staff",
  publishDate: "October 19, 2026",
  replyEmail: "editorial@groundtruth.pub",
  siteUrl: "https://ground-truth-issue-01.vercel.app",
  readingTime: "3 min read",
};
