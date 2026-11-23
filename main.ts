// The Vacuum's Alibi: One Line, 200 Characters
// Writes the chosen one-line robot-vacuum excuse to /output/entry.txt
// (exactly the line, no trailing newline), then verifies it round-trip.
//
// THREE CANDIDATES, judged against the house brief (most important first):
//   1. deadpan robot voice, 2. real laugh, 3. machine talking, 4. surprise,
//   5. punch at the end.
//
//   CANDIDATE A (CHOSEN):
//     "Per my logs, I cleaned that spot three times. The dust simply
//      reapplied for the job and got hired."
//     Deadpan machine voice ("Per my logs"), smug about its own diligence,
//     and the joke lands: the dust re-applies for the job and gets hired —
//     a hiring-process twist nobody expects from a vacuum, not a stock dust
//     observation. Punch ("got hired") sits at the very end.
//
//   CANDIDATE B (REJECTED):
//     "I did not miss that spot. I ran a cost-benefit analysis on the
//      Cheerio, and the Cheerio won."
//     Solid deadpan and a clean punch, but the cost-benefit-analysis gag is
//     a familiar robot cliche — less surprise than the dust getting hired.
//
//   CANDIDATE C (REJECTED):
//     "That spot was not missed; it was deprioritized after my battery and
//      I had a long talk about boundaries."
//     "Long talk about boundaries" is funny and smug about the battery, but
//     the setup leans on corporate jargon and the punch is a mood, not a
//     twist — a weaker laugh than candidate A.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Per my logs, I cleaned that spot three times. The dust simply reapplied for the job and got hired.";

const OUTPUT_DIR = "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

function validate(line: string): void {
  const chars = [...line]; // count Unicode code points, not UTF-16 units
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line !== line.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
  for (const ch of line) {
    if (ch.charCodeAt(0) < 0x20) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(ENTRY);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, ENTRY, "utf8"); // exactly the line, no newline
  const back = readFileSync(OUTPUT_FILE, "utf8");
  if (back !== ENTRY) {
    throw new Error("round-trip mismatch: entry.txt does not match the line");
  }
  console.log(`chars: ${[...ENTRY].length}`);
  console.log(ENTRY);
}

main();
