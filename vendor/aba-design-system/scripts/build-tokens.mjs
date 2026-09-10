// Generates from tokens/tokens.json:
//   src/css/tokens.css        — CSS custom properties on :root
//   dist/tokens/tokens.json   — copy of the DTCG source
//   dist/tokens/tokens.css    — same as src/css/tokens.css (download)
//   dist/tokens/tokens.flat.json — { "--var": "resolved literal" }
//   dist/tokens/figma-variables.json — Figma Variables import shape
//   src/generated/tokens.ts   — typed token catalogue for React consumers / the portal
import fs from 'node:fs';
import path from 'node:path';
import { PKG_ROOT, walkTokens, cssVarName, toCssValue, resolveLiteral, rawValueString, indexTokens } from './lib/css-vars.mjs';

const tree = JSON.parse(fs.readFileSync(path.join(PKG_ROOT, 'tokens', 'tokens.json'), 'utf8'));
const byPath = indexTokens(tree);
const entries = [...walkTokens(tree)];

const HEADER = `/* GENERATED FILE — do not edit. Source: lib/aba-design-system/tokens/tokens.json
   Regenerate with: pnpm --filter @workspace/aba-design-system run build:tokens */\n`;

// ---- tokens.css --------------------------------------------------------
let css = HEADER + ':root {\n';
let lastGroup = null;
for (const e of entries) {
  const group = e.path[0];
  if (group !== lastGroup) {
    css += `\n  /* ${group} */\n`;
    lastGroup = group;
  }
  css += `  ${cssVarName(e)}: ${toCssValue(e.token, byPath)};\n`;
}
css += '}\n';

// ---- flat json ---------------------------------------------------------
const flat = {};
for (const e of entries) flat[cssVarName(e)] = resolveLiteral(e.token, byPath);

// ---- figma variables ---------------------------------------------------
function hexToRgba(hex) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
  const n = parseInt(full, 16);
  return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255, a: 1 };
}
function cssColorToFigma(v) {
  if (v.startsWith('#')) return hexToRgba(v);
  const m = v.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const [r, g, b, a = '1'] = m[1].split(',').map((s) => s.trim());
    return { r: +r / 255, g: +g / 255, b: +b / 255, a: +a };
  }
  return null;
}
const collections = {};
for (const e of entries) {
  const tier = e.token.$extensions?.['com.aba']?.tier ?? 'primitive';
  const collName = tier === 'primitive' ? 'Primitives' : tier === 'semantic' ? 'Semantic' : 'Component';
  collections[collName] ??= { name: collName, modes: ['Default'], variables: [] };
  const literal = resolveLiteral(e.token, byPath);
  const t = e.token.$type;
  let resolvedType = 'STRING';
  let value = literal;
  const raw = e.token.$value;
  const refMatch = typeof raw === 'string' ? raw.match(/^\{([^}]+)\}$/) : null;
  if (t === 'color') {
    resolvedType = 'COLOR';
    value = cssColorToFigma(literal) ?? literal;
  } else if (t === 'dimension' && !refMatch && raw.unit === 'px') {
    resolvedType = 'FLOAT';
    value = raw.value;
  } else if ((t === 'number' || t === 'fontWeight') && !refMatch) {
    resolvedType = 'FLOAT';
    value = raw;
  } else if (t === 'duration' && !refMatch) {
    resolvedType = 'FLOAT';
    value = raw.unit === 's' ? raw.value * 1000 : raw.value;
  }
  collections[collName].variables.push({
    name: e.path.join('/'),
    resolvedType,
    description: e.token.$description ?? '',
    valuesByMode: { Default: refMatch ? { type: 'VARIABLE_ALIAS', id: refMatch[1].replace(/\./g, '/') } : value },
    cssVar: cssVarName(e),
  });
}

// ---- typed catalogue ----------------------------------------------------
const catalogue = entries.map((e) => ({
  path: e.path.join('.'),
  cssVar: cssVarName(e),
  type: e.token.$type,
  value: rawValueString(e.token.$value),
  css: toCssValue(e.token, byPath),
  resolved: resolveLiteral(e.token, byPath),
  tier: e.token.$extensions?.['com.aba']?.tier ?? 'primitive',
  description: e.token.$description ?? null,
}));
const ts = `// GENERATED FILE — do not edit. Source: tokens/tokens.json (run build:tokens)
export type TokenTier = 'primitive' | 'semantic' | 'component';
export interface TokenEntry {
  path: string;
  cssVar: string;
  type: string;
  /** Raw DTCG value (typed values JSON-encoded), may contain {references}. */
  value: string;
  /** CSS value as emitted in tokens.css (references become var()). */
  css: string;
  /** Fully resolved literal. */
  resolved: string;
  tier: TokenTier;
  description: string | null;
}
export const tokens: TokenEntry[] = ${JSON.stringify(catalogue, null, 2)};
export const tokenByVar: Record<string, TokenEntry> = Object.fromEntries(tokens.map((t) => [t.cssVar, t]));
`;

const distDir = path.join(PKG_ROOT, 'dist', 'tokens');
fs.mkdirSync(distDir, { recursive: true });
fs.mkdirSync(path.join(PKG_ROOT, 'src', 'generated'), { recursive: true });
fs.writeFileSync(path.join(PKG_ROOT, 'src', 'css', 'tokens.css'), css);
fs.writeFileSync(path.join(distDir, 'tokens.css'), css);
fs.copyFileSync(path.join(PKG_ROOT, 'tokens', 'tokens.json'), path.join(distDir, 'tokens.json'));
fs.writeFileSync(path.join(distDir, 'tokens.flat.json'), JSON.stringify(flat, null, 2) + '\n');
fs.writeFileSync(path.join(distDir, 'figma-variables.json'), JSON.stringify({ version: 1, collections: Object.values(collections) }, null, 2) + '\n');
fs.writeFileSync(path.join(PKG_ROOT, 'src', 'generated', 'tokens.ts'), ts);
console.log(`generated ${entries.length} tokens → src/css/tokens.css, src/generated/tokens.ts, dist/tokens/*`);
