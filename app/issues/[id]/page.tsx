import { Metadata } from "next";
import { notFound } from "next/navigation";
import { issues, getIssueById } from "../../../content/issues";
import { IssueView } from "../../../components/IssueView";
import { siteConfig } from "../../../config/site";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  return issues.map((issue) => ({
    id: issue.metadata.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const issue = getIssueById(params.id);
  if (!issue) {
    return {
      title: "Issue Not Found // Ground Truth",
    };
  }

  const { metadata } = issue;
  const canonicalUrl = `${siteConfig.siteUrl}/issues/${metadata.slug}`;
  const imageAlt = `${metadata.publication} // ${metadata.issueNumber}: ${metadata.title}`;
  const imageUrl = `${siteConfig.siteUrl}/issues/${metadata.slug}/opengraph-image`;

  return {
    title: `${metadata.publication} // ${metadata.issueNumber}: ${metadata.title}`,
    description: metadata.dek,
    alternates: {
      canonical: canonicalUrl,
    },
    authors: [{ name: metadata.author }],
    openGraph: {
      title: `${metadata.publication} // ${metadata.issueNumber}: ${metadata.title}`,
      description: metadata.dek,
      url: canonicalUrl,
      siteName: metadata.publication,
      type: "article",
      publishedTime: metadata.publishDateIso,
      authors: [metadata.author],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${metadata.publication} // ${metadata.issueNumber}: ${metadata.title}`,
      description: metadata.dek,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
  };
}

export default function IssuePage({ params }: PageProps) {
  const issue = getIssueById(params.id);

  if (!issue) {
    notFound();
  }

  return <IssueView issue={issue} />;
}
