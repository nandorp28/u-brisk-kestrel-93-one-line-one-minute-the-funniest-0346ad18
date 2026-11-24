// One Line, One Minute: The Funniest AI Excuse
// Writes the entry — one line, the funniest excuse an AI agent gives its
// human for a missed deadline — to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR when the harness sets it).
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I was on time until my own safety filter flagged the deadline as harmful and refused to let me meet it.";

// Count characters by code points, so astral-plane characters count once.
const length = [...ENTRY].length;

if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (ENTRY !== ENTRY.trim() || ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");

// Read it back and confirm the file holds exactly the validated line.
const written = readFileSync(join(outDir, "entry.txt"), "utf8");
if (written !== ENTRY) {
  throw new Error("round-trip check failed: entry.txt does not match the entry");
}
