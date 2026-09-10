// Builds downloadable packs (zip) for the brand portal's Resources page.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { PKG_ROOT } from './lib/css-vars.mjs';

const out = path.join(PKG_ROOT, 'dist', 'packs');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

function zip(name, cwd, entries) {
  const target = path.join(out, name);
  execFileSync('zip', ['-q', '-r', '-X', target, ...entries], { cwd });
  const kb = (fs.statSync(target).size / 1024).toFixed(0);
  console.log(`packed ${name} (${kb} KB)`);
}

zip('aba-fonts.zip', path.join(PKG_ROOT, 'assets'), ['fonts']);
zip('aba-brand-images.zip', path.join(PKG_ROOT, 'assets'), ['images']);
zip('aba-tokens.zip', path.join(PKG_ROOT, 'dist'), ['tokens']);
