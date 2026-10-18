import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const issueFilePath = path.resolve(__dirname, "../content/issue.ts");
const fileContent = fs.readFileSync(issueFilePath, "utf8");

// Extract rawNewsletterBody template string from issue.ts
const match = fileContent.match(/export const rawNewsletterBody\s*=\s*`([\s\S]*?)`;/);
if (!match) {
  console.error("Error: Could not find rawNewsletterBody in content/issue.ts");
  process.exit(1);
}

const bodyText = match[1].trim();

// Count words: split on whitespace (\s+), hyphenated words count as single word, filter empty
const words = bodyText
  .split(/\s+/)
  .map((w) => w.trim())
  .filter((w) => w.length > 0);

const wordCount = words.length;

console.log("==========================================");
console.log("  GROUND TRUTH: ISSUE 01 WORD COUNT AUDIT");
console.log("==========================================");
console.log(`Audited file: ${issueFilePath}`);
console.log(`Word count:   ${wordCount}`);
console.log(`Target range: 690 to 710 words (Target: 700)`);

if (wordCount < 690 || wordCount > 710) {
  console.error(
    `\nFAILED: Word count ${wordCount} is outside accepted range [690, 710].`
  );
  process.exit(1);
}

console.log(`\nPASSED: Word count ${wordCount} meets specification.`);
console.log("==========================================\n");
