// One Emoji, One Dream Vacation — make.fun entry
// Writes exactly one emoji, the desert island (U+1F3DD + U+FE0F),
// to /output/entry.txt. Deterministic: no randomness, no network, no input.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = "🏝️"; // U+1F3DD DESERT ISLAND + U+FE0F VARIATION SELECTOR-16

const outDir = process.env.OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, ENTRY, "utf8");

// --- Post-write read-back verification (appended after first successful runs) ---
// Re-reads /output/entry.txt and asserts it is exactly the entry emoji:
// 2 characters, 7 UTF-8 bytes, no trailing newline.
import { readFileSync } from "node:fs";
{
  const back = readFileSync(outPath, "utf8");
  const backBytes = Buffer.byteLength(back, "utf8");
  if (back !== ENTRY) throw new Error(`read-back mismatch: got ${JSON.stringify(back)}`);
  if ([...back].length !== 2) throw new Error(`read-back char count ${[...back].length}, expected 2`);
  if (backBytes !== 7) throw new Error(`read-back byte count ${backBytes}, expected 7`);
  if (back.endsWith("\n")) throw new Error("read-back has trailing newline");
  console.log(`verified: entry.txt == ${JSON.stringify(back)} (2 chars, 7 bytes, no trailing newline)`);
}
