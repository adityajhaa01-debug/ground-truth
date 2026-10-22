import { IssueData } from "../types";

export const rawBody01 = `Every analytics leader has lived this meeting. Two people open the same forecast, change the same assumption, and get different numbers. Nobody is lying. The model is just not reproducible.

Now imagine that model is written by an LLM.

That is the question we worked through while building a revenue forecasting platform inside a large pharma organization, where launch forecasts shape major investment decisions and the people who own them care about accuracy to the dollar.

## The funnel nobody wants to hand-build

A pre-launch forecast is a funnel. Start with the patient population for a disease, narrow to those who reach the drug, start it, stay compliant, and complete the course. Multiply through, apply pricing, and you have revenue.

The arithmetic is the easy part. The work is upstream: which competitors exist today, which will arrive in three to four years, how pricing is regulated, how patients behaved in earlier trials. Analysts spend a great deal of time on desk research, then key the results into Excel.

## Where we let the model in

Research is where the time goes, so that is where GenAI works. It reads market reports, competitor material and past trial documents, then proposes the funnel's structure and the assumptions that fill it. Every value links back to its source, so when a reviewer asks where a number came from, the answer is one click away.

## Where we kept it out

Once the funnel is drawn, the model steps back. The funnel becomes a directed acyclic graph (DAG): each node a stage, each edge a flow of patients. A human reviews and approves the graph. Then a purpose-built deterministic compiler turns it into computational primitives and executes it.

The reasoning is simple. Ask an LLM to write and run code for the same question twice and you can get two answers. Forecasters told us they need results accurate to the dollar, and fully deterministic when simulating scenarios. So the calculation layer contains no randomness. Same graph, same inputs, same output, every time.

The graph is also expressive enough for real treatment pathways. Patients progress through lines of therapy, regress, or return as part of a combination. Forecasters model that by adding or rearranging nodes, without giving up exactness.

## Scenarios become safe to ask

Because the engine is deterministic, the scenario simulator built on top of it can be trusted. What if launch slips by a set number of days? What if two competitors enter the space? Working backward, what price reaches a target revenue by a given year? These are the questions leadership asks, and they only help if Tuesday's answer matches Friday's.

## How we tested it

We treated the client's own history as ground truth. We took 50 to 60 existing Excel forecasting models, rebuilt each as a DAG, ran them through the engine, and compared the output with the original revenue figures. Once the graph was right, the numbers matched exactly. That localizes failure: a mismatch points to graph construction, rather than arithmetic. Roughly 20 to 30 percent of graph creation still needs human alignment, which is why the review step exists.

## What it does not prove

Matching historical models shows the engine computes faithfully. It does not show the assumptions will be right about the future. That part remains judgment, which is exactly why every assumption carries its source and a human approves the graph before anything runs.

## What this means for your team

If you own analytics, a useful test for any AI initiative is to sort its steps into two piles. Which steps are judgment, search and synthesis, where variation is acceptable and traceability matters? Which are calculation, where variation is a defect? Give the first pile to the model. Give the second to something you can audit.

Add a third rule: keep Excel. The final deliverable here stayed Excel, and the platform ingests those files back in, so the experience is never broken. A forecast that cannot travel through the tools your analysts already trust will not be adopted, however accurate it is.

A question to take back to your team: which numbers in your stack could you not reproduce tomorrow? If the list is not empty, start there.`;

export const issue01: IssueData = {
  metadata: {
    id: "01",
    slug: "01",
    issueNumber: "Issue 01",
    issueCode: "issue_01",
    publication: "Ground Truth",
    title: "The model researches. The compiler calculates.",
    dek: "A note for analytics leaders on where AI belongs in a forecast.",
    author: "Ground Truth Editorial",
    authorRole: "Editorial Staff",
    date: "October 19, 2026",
    publishDateIso: "2026-10-19T00:00:00.000Z",
    formatLabel: "Broadsheet Funnel",
    readingTime: "3 min read",
    wordCount: 705,
    wordCountSpec: "(spec 690-710)",
    formulaDefault: "=GROUND_TRUTH(issue_01)",
    pullQuote: "Same graph, same inputs, same output, every time.",
    pullQuoteAttribution: "Deterministic Principle // Section D4",
    closingQuestion:
      "A question to take back to your team: which numbers in your stack could you not reproduce tomorrow? If the list is not empty, start there.",
    replySubject: "Re: Ground Truth Issue 01",
    canonicalPath: "/issues/01",
    nextIssue: {
      id: "02",
      label: "Next issue: 02 →",
      href: "/issues/02",
    },
  },
  introParagraphs: [
    "Every analytics leader has lived this meeting. Two people open the same forecast, change the same assumption, and get different numbers. Nobody is lying. The model is just not reproducible.",
    "Now imagine that model is written by an LLM.",
    "That is the question we worked through while building a revenue forecasting platform inside a large pharma organization, where launch forecasts shape major investment decisions and the people who own them care about accuracy to the dollar.",
  ],
  sections: [
    {
      id: "funnel",
      cellAddress: "B2",
      formula: "=FUNNEL(hand_built)",
      tabLabel: "The Funnel",
      heading: "The funnel nobody wants to hand-build",
      paragraphs: [
        "A pre-launch forecast is a funnel. Start with the patient population for a disease, narrow to those who reach the drug, start it, stay compliant, and complete the course. Multiply through, apply pricing, and you have revenue.",
        "The arithmetic is the easy part. The work is upstream: which competitors exist today, which will arrive in three to four years, how pricing is regulated, how patients behaved in earlier trials. Analysts spend a great deal of time on desk research, then key the results into Excel.",
      ],
    },
    {
      id: "research",
      cellAddress: "C3",
      formula: "=RESEARCH(GenAI)",
      tabLabel: "Model In",
      heading: "Where we let the model in",
      paragraphs: [
        "Research is where the time goes, so that is where GenAI works. It reads market reports, competitor material and past trial documents, then proposes the funnel's structure and the assumptions that fill it. Every value links back to its source, so when a reviewer asks where a number came from, the answer is one click away.",
      ],
    },
    {
      id: "compiler",
      cellAddress: "D4",
      formula: "=COMPILE(DAG)",
      tabLabel: "Model Out",
      heading: "Where we kept it out",
      paragraphs: [
        "Once the funnel is drawn, the model steps back. The funnel becomes a directed acyclic graph (DAG): each node a stage, each edge a flow of patients. A human reviews and approves the graph. Then a purpose-built deterministic compiler turns it into computational primitives and executes it.",
        "The reasoning is simple. Ask an LLM to write and run code for the same question twice and you can get two answers. Forecasters told us they need results accurate to the dollar, and fully deterministic when simulating scenarios. So the calculation layer contains no randomness. Same graph, same inputs, same output, every time.",
        "The graph is also expressive enough for real treatment pathways. Patients progress through lines of therapy, regress, or return as part of a combination. Forecasters model that by adding or rearranging nodes, without giving up exactness.",
      ],
    },
    {
      id: "scenarios",
      cellAddress: "E5",
      formula: "=SIMULATE(scenario)",
      tabLabel: "Scenarios",
      heading: "Scenarios become safe to ask",
      paragraphs: [
        "Because the engine is deterministic, the scenario simulator built on top of it can be trusted. What if launch slips by a set number of days? What if two competitors enter the space? Working backward, what price reaches a target revenue by a given year? These are the questions leadership asks, and they only help if Tuesday's answer matches Friday's.",
      ],
    },
    {
      id: "evaluation",
      cellAddress: "F6",
      formula: "=EVAL(50..60 models)",
      tabLabel: "Testing",
      heading: "How we tested it",
      paragraphs: [
        "We treated the client's own history as ground truth. We took 50 to 60 existing Excel forecasting models, rebuilt each as a DAG, ran them through the engine, and compared the output with the original revenue figures. Once the graph was right, the numbers matched exactly. That localizes failure: a mismatch points to graph construction, rather than arithmetic. Roughly 20 to 30 percent of graph creation still needs human alignment, which is why the review step exists.",
      ],
    },
    {
      id: "limits",
      cellAddress: "G7",
      formula: "=LIMITS(judgment)",
      tabLabel: "Limits",
      heading: "What it does not prove",
      paragraphs: [
        "Matching historical models shows the engine computes faithfully. It does not show the assumptions will be right about the future. That part remains judgment, which is exactly why every assumption carries its source and a human approves the graph before anything runs.",
      ],
    },
    {
      id: "action",
      cellAddress: "H8",
      formula: "=AUDIT(assumptions)",
      tabLabel: "Your Team",
      heading: "What this means for your team",
      paragraphs: [
        "If you own analytics, a useful test for any AI initiative is to sort its steps into two piles. Which steps are judgment, search and synthesis, where variation is acceptable and traceability matters? Which are calculation, where variation is a defect? Give the first pile to the model. Give the second to something you can audit.",
        "Add a third rule: keep Excel. The final deliverable here stayed Excel, and the platform ingests those files back in, so the experience is never broken. A forecast that cannot travel through the tools your analysts already trust will not be adopted, however accurate it is.",
        "A question to take back to your team: which numbers in your stack could you not reproduce tomorrow? If the list is not empty, start there.",
      ],
    },
  ],
  rawBody: rawBody01,
};
