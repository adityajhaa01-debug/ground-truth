import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function extractBody(filePath, varName) {
  const content = fs.readFileSync(filePath, "utf8");
  const regex = new RegExp(`export const ${varName}\\s*=\\s*\`([\\s\\S]*?)\`;`);
  const match = content.match(regex);
  if (!match) {
    throw new Error(`Could not find ${varName} in ${filePath}`);
  }
  return match[1].trim();
}

function countWords(text) {
  return text
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 0).length;
}

const file01 = path.resolve(__dirname, "../content/issues/01.ts");
const file02 = path.resolve(__dirname, "../content/issues/02.ts");

const body01 = extractBody(file01, "rawBody01");
const body02 = extractBody(file02, "rawBody02");

const count01 = countWords(body01);
const count02 = countWords(body02);

console.log("==========================================");
console.log("  GROUND TRUTH: MULTI-ISSUE WORD COUNT AUDIT");
console.log("==========================================");
console.log(`Issue 01: ${count01} words (Target: 700, range: 690-710)`);
console.log(`Issue 02: ${count02} words (Target: 500-800)`);

let failed = false;

if (count01 < 690 || count01 > 710) {
  console.error(`FAILED: Issue 01 count ${count01} outside [690, 710]`);
  failed = true;
}

if (count02 < 500 || count02 > 800) {
  console.error(`FAILED: Issue 02 count ${count02} outside [500, 800]`);
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log("PASSED: All issues meet word count specifications.");
console.log("==========================================\n");
