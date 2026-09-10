// Validates tokens/tokens.json against the DTCG typed value shapes
// (color hex, dimension {value,unit}, number, fontWeight, duration {value,unit},
// cubicBezier [x1,y1,x2,y2], fontFamily string[], shadow object|object[]) and
// checks that every {reference} resolves to a token of the same $type.
// Exits non-zero on the first problem set. Run: pnpm --filter @workspace/aba-design-system run validate:tokens
import fs from 'node:fs';
import path from 'node:path';
import { PKG_ROOT, validateTokens, walkTokens } from './lib/css-vars.mjs';

const tree = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'tokens', 'tokens.json'), 'utf8'));
const problems = validateTokens(tree);
if (problems.length) {
  console.error(`✖ tokens.json has ${problems.length} DTCG problem(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log(`✔ tokens.json valid: ${[...walkTokens(tree)].length} typed DTCG tokens`);
