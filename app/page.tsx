import { Metadata } from "next";
import { issue02 } from "../content/issues/02";
import { IssueView } from "../components/IssueView";
import { siteConfig } from "../config/site";

export const metadata: Metadata = {
  title: `${issue02.metadata.publication} // ${issue02.metadata.issueNumber}: ${issue02.metadata.title}`,
  description: issue02.metadata.dek,
  alternates: {
    canonical: `${siteConfig.siteUrl}/issues/02`,
  },
  openGraph: {
    title: `${issue02.metadata.publication} // ${issue02.metadata.issueNumber}: ${issue02.metadata.title}`,
    description: issue02.metadata.dek,
    url: `${siteConfig.siteUrl}/issues/02`,
    siteName: issue02.metadata.publication,
    type: "article",
    publishedTime: issue02.metadata.publishDateIso,
    authors: [issue02.metadata.author],
  },
  twitter: {
    card: "summary_large_image",
    title: `${issue02.metadata.publication} // ${issue02.metadata.issueNumber}: ${issue02.metadata.title}`,
    description: issue02.metadata.dek,
  },
};

export default function HomePage() {
  return <IssueView issue={issue02} />;
}
