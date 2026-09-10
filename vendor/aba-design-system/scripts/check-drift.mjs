// Drift check between The Advisory homepage and the shared design-system package.
//
//  1. Every CSS custom property declared on :root in the homepage stylesheet must
//     exist in tokens/tokens.json with an identical CSS value.
//  2. Every var(--x) referenced anywhere in the homepage source (globals.css,
//     CSS modules, TSX) must exist in tokens.json — unless it is declared locally
//     by the homepage (e.g. --adv-vh) in the file that uses it.
//  3. The generated src/css/tokens.css must be in sync with tokens.json.
//  4. Every `.aba-*` rule in the package's components.css / base.css must appear in
//     the homepage stylesheet with identical declarations, and vice-versa.
//
// Exit code 1 on any drift, with a readable report.
import fs from 'node:fs';
import path from 'node:path';
import {
  PKG_ROOT, HOMEPAGE_DIR, HOMEPAGE_CSS,
  parseRootVars, stripComments, walkTokens, cssVarName, toCssValue, indexTokens,
} from './lib/css-vars.mjs';

const problems = [];
const note = (s) => problems.push(s);

const homepageCss = fs.readFileSync(HOMEPAGE_CSS, 'utf8');
const tree = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'tokens', 'tokens.json'), 'utf8'));
const byPath = indexTokens(tree);
const tokenVars = new Map();
for (const e of walkTokens(tree)) tokenVars.set(cssVarName(e), toCssValue(e.token, byPath));

// ---- 1. homepage :root vars ⊆ tokens, same values ------------------------
const homepageVars = parseRootVars(homepageCss);
for (const v of homepageVars) {
  if (!tokenVars.has(v.name)) note(`[missing token] ${v.name} is declared by the homepage but not in tokens.json`);
  else if (norm(tokenVars.get(v.name)) !== norm(v.value)) {
    note(`[value drift] ${v.name}: homepage="${v.value}" tokens="${tokenVars.get(v.name)}"`);
  }
}

// ---- 2. every var() used by the homepage exists ---------------------------
function listFiles(dir, exts, acc = []) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) { if (ent.name !== 'node_modules' && ent.name !== '.next' && ent.name !== 'dist') listFiles(p, exts, acc); }
    else if (exts.some((x) => ent.name.endsWith(x))) acc.push(p);
  }
  return acc;
}
const srcFiles = listFiles(path.join(HOMEPAGE_DIR, 'src'), ['.css', '.tsx', '.ts']);
const usedVars = new Map(); // var → Set(files)
// Vars the homepage sets at runtime (style.setProperty('--x', …)) are component-local, not tokens.
const runtimeDecl = new Set();
for (const f of srcFiles) {
  for (const m of fs.readFileSync(f, 'utf8').matchAll(/setProperty\(\s*['"](--[a-zA-Z0-9-]+)['"]/g)) runtimeDecl.add(m[1]);
}
for (const f of srcFiles) {
  const text = fs.readFileSync(f, 'utf8');
  const localDecl = new Set([...text.matchAll(/(--[a-zA-Z0-9-]+)\s*:/g)].map((m) => m[1]));
  for (const v of runtimeDecl) localDecl.add(v);
  for (const m of text.matchAll(/var\((--[a-zA-Z0-9-]+)/g)) {
    const name = m[1];
    if (localDecl.has(name)) continue; // defined and consumed in the same file (component-local)
    if (!usedVars.has(name)) usedVars.set(name, new Set());
    usedVars.get(name).add(path.relative(HOMEPAGE_DIR, f));
  }
}
for (const [name, files] of usedVars) {
  if (!tokenVars.has(name)) note(`[unknown var] ${name} used in ${[...files].join(', ')} has no token`);
}

// ---- 3. generated tokens.css in sync -----------------------------------
const generatedPath = path.join(PKG_ROOT, 'src', 'css', 'tokens.css');
if (!fs.existsSync(generatedPath)) note('[stale] src/css/tokens.css is missing — run build:tokens');
else {
  const gen = parseRootVars(fs.readFileSync(generatedPath, 'utf8'));
  const genMap = new Map(gen.map((g) => [g.name, g.value]));
  for (const [name, value] of tokenVars) {
    if (!genMap.has(name)) note(`[stale] ${name} missing from generated tokens.css — run build:tokens`);
    else if (norm(genMap.get(name)) !== norm(value)) note(`[stale] ${name} differs in generated tokens.css — run build:tokens`);
  }
  for (const name of genMap.keys()) if (!tokenVars.has(name)) note(`[stale] ${name} in generated tokens.css has no token — run build:tokens`);
}

// ---- 4. component/base CSS rules identical -----------------------------
function parseRules(css) {
  // Flatten simple rules (and rules nested one level inside @media) into selector → declarations.
  const out = new Map();
  const src = stripComments(css);
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m;
  while ((m = re.exec(src))) {
    const selector = m[1].trim().replace(/\s+/g, ' ');
    if (selector.startsWith('@') || selector.startsWith(':root')) continue;
    if (!/\.aba-/.test(selector)) continue;
    const decls = m[2].split(';').map((d) => d.trim()).filter(Boolean).map((d) => d.replace(/\s+/g, ' ')).sort();
    const key = selector;
    if (!out.has(key)) out.set(key, decls.join('; '));
  }
  return out;
}
const homepageRules = parseRules(homepageCss);
const pkgCss = ['base.css', 'components.css'].map((f) => fs.readFileSync(path.join(PKG_ROOT, 'src', 'css', f), 'utf8')).join('\n');
const pkgRules = parseRules(pkgCss);
for (const [sel, decls] of pkgRules) {
  if (!homepageRules.has(sel)) note(`[rule drift] package rule "${sel}" does not exist on the homepage`);
  else if (homepageRules.get(sel) !== decls) note(`[rule drift] "${sel}" declarations differ\n    homepage: ${homepageRules.get(sel)}\n    package:  ${decls}`);
}
for (const sel of homepageRules.keys()) {
  if (!pkgRules.has(sel)) note(`[rule drift] homepage rule "${sel}" is missing from the package CSS`);
}

function norm(v) { return v.replace(/\s+/g, '').toLowerCase(); }

const summary = `${homepageVars.length} homepage tokens · ${usedVars.size} vars referenced · ${homepageRules.size} .aba-* rules compared`;
if (problems.length) {
  console.error(`✖ Design-system drift detected (${problems.length}):\n`);
  for (const p of problems) console.error('  ' + p);
  console.error(`\n${summary}`);
  process.exit(1);
}
console.log(`✔ No drift. ${summary}`);
