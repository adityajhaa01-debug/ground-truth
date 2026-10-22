import { IssueData } from "../types";

export const rawBody02 = `Read ten customer testimonials published this year and you'll notice something before you notice the product: they all sound fine. Clear sentences, a neat arc, a problem, a turning point, a result. Nobody rambles or stumbles, and nobody sounds like anybody in particular.

That is AI's effect on testimonials, and it's already visible. The question for anyone building a brand on customer stories is what it costs.

## The floor went up

A good testimonial used to depend on luck: whether the customer happened to be good at putting an experience into words. Many weren't. They knew the product had changed something for them, but the sentence came out flat, vague, or buried in detail.

AI fixed that. Give a model a few rough notes and it returns a polished paragraph. Customers who once wrote "it was good, helped a lot" now produce something that reads like a case study. On paper, everyone is articulate.

## What gets lost in the edit

Polish has a price. When a model shapes the story, it decides what matters. It smooths over the odd detail, drops the tangent, and swaps the customer's phrasing for a safer one. The customer reads it, thinks "yes, that's roughly what I meant," and approves it.

"Roughly" is the problem. The specific moment when the product clicked often doesn't survive: the 2 a.m. fix, or the colleague who finally stopped complaining. What gets through is a few headline points in a voice that belongs to no one. The customer's own thought is replaced by a reasonable summary of it.

## The people who aren't using it

This is the part most coverage misses. The people who were already articulate, who could always say clearly what happened and why it mattered, mostly aren't using AI for their testimonials.

It makes sense once you look at it from their side. Why would someone good want to be average? AI writing lands near the middle by design, because it is trained toward the most likely phrasing. For someone who struggles to write, the middle is an upgrade. For someone who already writes with a point of view, it's a downgrade, and they can feel it.

## Average is the new baseline

So the field is compressing. Weak testimonials are rising to average while strong ones stay strong. The middle is getting crowded, and every story in it sounds the same.

That changes what a testimonial does for a brand. A polished quote used to signal a real, happy customer. Now polish is free, so it signals very little. Readers notice the sameness even when they can't name it. What still cuts through is what AI tends to sand off: an exact number, a name, a strange detail, a sentence only that person would say.

## It's a grey area

None of this makes AI the villain. A customer with a genuine story who can't write it shouldn't be shut out for that. Helping someone say what they actually mean is a fair use of the tool. Deciding what they mean for them is not. The line between the two isn't always obvious, and most brands haven't drawn it.

## What this means for your brand

If customer stories carry your brand, the job is no longer getting a clean quote. It's protecting the person inside the quote.

Start from their words. Interview, record and transcribe before anyone drafts, so the raw voice exists first.

Use AI for structure, not opinion.

Keep at least one detail per story that only that customer could have given.

Leave strong storytellers alone. When a customer already tells it well, don't run them through the same polish as everyone else. Let them be good.`;

function calculateWordCount(text: string): number {
  return text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0).length;
}

const wordCount02 = calculateWordCount(rawBody02);
const readingTimeMinutes02 = Math.ceil(wordCount02 / 230);

export const issue02: IssueData = {
  metadata: {
    id: "02",
    slug: "02",
    issueNumber: "Issue 02",
    issueCode: "issue_02",
    publication: "Ground Truth",
    title: "Why would someone good want to be average?",
    dek: "AI made every customer articulate. That isn't the same as making them believable.",
    author: "Ground Truth Editorial",
    authorRole: "Editorial Staff",
    date: "October 23, 2026",
    publishDateIso: "2026-10-23T00:00:00.000Z",
    formatLabel: "Testimonial Teardown",
    readingTime: `${readingTimeMinutes02} min read`,
    wordCount: wordCount02,
    wordCountSpec: "(spec 500-800)",
    formulaDefault: "=GROUND_TRUTH(issue_02)",
    pullQuote: "Why would someone good want to be average?",
    pullQuoteAttribution: "Core Question // Section D4",
    closingQuestion:
      "A question to take back to your team: pull your last five testimonials. Could you swap the names without anyone noticing? If you could, you have average stories. Start there.",
    replySubject: "Re: Ground Truth Issue 02",
    canonicalPath: "/issues/02",
    previousIssue: {
      id: "01",
      label: "Previous issue: 01 →",
      href: "/issues/01",
    },
  },
  introParagraphs: [
    "Read ten customer testimonials published this year and you'll notice something before you notice the product: they all sound fine. Clear sentences, a neat arc, a problem, a turning point, a result. Nobody rambles or stumbles, and nobody sounds like anybody in particular.",
    "That is AI's effect on testimonials, and it's already visible. The question for anyone building a brand on customer stories is what it costs.",
  ],
  sections: [
    {
      id: "floor",
      cellAddress: "B2",
      formula: "=FLOOR(up)",
      tabLabel: "The Floor",
      heading: "The floor went up",
      paragraphs: [
        "A good testimonial used to depend on luck: whether the customer happened to be good at putting an experience into words. Many weren't. They knew the product had changed something for them, but the sentence came out flat, vague, or buried in detail.",
        "AI fixed that. Give a model a few rough notes and it returns a polished paragraph. Customers who once wrote \"it was good, helped a lot\" now produce something that reads like a case study. On paper, everyone is articulate.",
      ],
    },
    {
      id: "lost",
      cellAddress: "C3",
      formula: "=EDIT(lost_detail)",
      tabLabel: "Lost in Edit",
      heading: "What gets lost in the edit",
      paragraphs: [
        "Polish has a price. When a model shapes the story, it decides what matters. It smooths over the odd detail, drops the tangent, and swaps the customer's phrasing for a safer one. The customer reads it, thinks \"yes, that's roughly what I meant,\" and approves it.",
        "\"Roughly\" is the problem. The specific moment when the product clicked often doesn't survive: the 2 a.m. fix, or the colleague who finally stopped complaining. What gets through is a few headline points in a voice that belongs to no one. The customer's own thought is replaced by a reasonable summary of it.",
      ],
    },
    {
      id: "holdouts",
      cellAddress: "D4",
      formula: "=HOLDOUTS(articulate)",
      tabLabel: "The Holdouts",
      heading: "The people who aren't using it",
      paragraphs: [
        "This is the part most coverage misses. The people who were already articulate, who could always say clearly what happened and why it mattered, mostly aren't using AI for their testimonials.",
        "It makes sense once you look at it from their side. Why would someone good want to be average? AI writing lands near the middle by design, because it is trained toward the most likely phrasing. For someone who struggles to write, the middle is an upgrade. For someone who already writes with a point of view, it's a downgrade, and they can feel it.",
      ],
    },
    {
      id: "baseline",
      cellAddress: "E5",
      formula: "=BASELINE(average)",
      tabLabel: "New Baseline",
      heading: "Average is the new baseline",
      paragraphs: [
        "So the field is compressing. Weak testimonials are rising to average while strong ones stay strong. The middle is getting crowded, and every story in it sounds the same.",
        "That changes what a testimonial does for a brand. A polished quote used to signal a real, happy customer. Now polish is free, so it signals very little. Readers notice the sameness even when they can't name it. What still cuts through is what AI tends to sand off: an exact number, a name, a strange detail, a sentence only that person would say.",
      ],
    },
    {
      id: "grey-area",
      cellAddress: "F6",
      formula: "=BALANCE(grey_area)",
      tabLabel: "Grey Area",
      heading: "It's a grey area",
      paragraphs: [
        "None of this makes AI the villain. A customer with a genuine story who can't write it shouldn't be shut out for that. Helping someone say what they actually mean is a fair use of the tool. Deciding what they mean for them is not. The line between the two isn't always obvious, and most brands haven't drawn it.",
      ],
    },
    {
      id: "your-brand",
      cellAddress: "G7",
      formula: "=BRAND(protect_voice)",
      tabLabel: "Your Brand",
      heading: "What this means for your brand",
      paragraphs: [
        "If customer stories carry your brand, the job is no longer getting a clean quote. It's protecting the person inside the quote.",
        "Start from their words. Interview, record and transcribe before anyone drafts, so the raw voice exists first.\nUse AI for structure, not opinion.\nKeep at least one detail per story that only that customer could have given.\nLeave strong storytellers alone. When a customer already tells it well, don't run them through the same polish as everyone else. Let them be good.",
      ],
    },
  ],
  rawBody: rawBody02,
};
