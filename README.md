# Ground Truth: Issue 01

> "The model researches. The compiler calculates."
> A note for analytics leaders on where AI belongs in a forecast.

An editorial broadsheet newsletter website built for enterprise analytics leaders. It examines the architectural boundary between GenAI research/synthesis and deterministic DAG calculation in pre-launch pharma revenue forecasting.

---

## Key Highlights

- **Single Source of Truth**: The complete 700-word body (690-710 word specification) is housed in `content/issue.ts`.
- **Word-Count Enforcement**: `scripts/wordcount.mjs` executes before every build (`npm run check`, `npm run prebuild`), halting compilation if word count violates the 690-710 word bounds.
- **Deterministic Calculation Engine**: Implemented in `lib/funnel.ts` using pure integer arithmetic (basis points and whole dollar units), eliminating floating-point jitter and non-determinism.
- **Cryptographic Provenance**: Employs `cyrb53` input/output fingerprinting, guaranteeing that identical assumptions yield identical hashes.
- **Topological Acyclicity**: Graph representation validated via Kahn's algorithm in Vitest unit tests.
- **Editorial BroadSheet Design**: Strict flat white-and-purple palette, faint 36px spreadsheet grid background, sticky formula bar with dynamic cell addresses, sheet-tab navigation strip with reading progress indicator, and zero AI hype words or em dashes.

---

## Interactive Modules (Hand-Crafted React + SVG)

1. **Module A: "Run it five times"**
   Demonstrates the divergence between free-form LLM-generated arithmetic (jittering by 0.2% to 2.4%) versus the compiled graph producing identical dollar outputs and fingerprints across all runs.

2. **Module B: "Scenario desk" (Live Funnel DAG)**
   Interactive directed acyclic graph with accessible controls (launch delay, competitor entrants, price per course). Features explainable source tags for research-fed assumptions (dashed purple) versus deterministic compute nodes (solid purple).

3. **Module C: "Where the AI sits"**
   A horizontal four-stage architecture strip (Research, Graph, Compute, Review) visualizing the "two piles" rule: judgment and synthesis to the model; calculation and execution to deterministic audit.

---

## Verification & Testing

```bash
# Verify 700-word newsletter body constraint (690-710 range)
npm run check

# Run Vitest test suite (1,000-run determinism, DAG acyclicity, sensitivity)
npm test

# Production build with prebuild word count gate
npm run build
```

---

## Design System Tokens

- **Page**: `#FFFFFF`
- **Paper Wash**: `#F7F4FD`
- **Hairlines & Grid**: `#E3DCF5`
- **Ink**: `#17112B`
- **Muted Text**: `#5E5675`
- **Primary Purple**: `#5A2FC2`
- **Deep Purple**: `#36178A`
- **Lilac Tint**: `#E9E2FA`
- **Typography**: Instrument Serif (Display), Newsreader (Body), IBM Plex Mono (Controls & Numbers)
