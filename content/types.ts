export interface SectionContent {
  id: string;
  cellAddress: string;
  formula: string;
  tabLabel: string;
  heading: string;
  paragraphs: string[];
}

export interface IssueMetadata {
  id: string; // "01", "02"
  slug: string; // "01", "02"
  issueNumber: string; // "Issue 01", "Issue 02"
  issueCode: string; // "issue_01", "issue_02"
  publication: string;
  title: string;
  dek: string;
  author: string;
  authorRole: string;
  date: string;
  publishDateIso: string;
  formatLabel: string;
  readingTime: string;
  wordCount: number;
  wordCountSpec: string;
  formulaDefault: string;
  pullQuote: string;
  pullQuoteAttribution: string;
  closingQuestion: string;
  replySubject: string;
  canonicalPath: string;
  footerTagline: string;
  previousIssue?: { id: string; label: string; href: string };
  nextIssue?: { id: string; label: string; href: string };
}

export interface IssueData {
  metadata: IssueMetadata;
  introParagraphs: string[];
  sections: SectionContent[];
  rawBody: string;
}
