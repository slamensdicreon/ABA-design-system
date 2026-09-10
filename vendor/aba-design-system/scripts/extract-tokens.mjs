// One-off authoring aid: reads the canonical design-system CSS from The Advisory
// and writes tokens/tokens.json in DTCG format. After the first run tokens.json is
// the source of truth; this script only exists to re-seed it if the homepage CSS
// gains new custom properties. Run: node scripts/extract-tokens.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseRootVars, PKG_ROOT, HOMEPAGE_CSS, cssToTypedValue } from './lib/css-vars.mjs';

const vars = parseRootVars(fs.readFileSync(HOMEPAGE_CSS, 'utf8'));

/** Group/type/tier rules keyed by CSS var prefix. Order matters (first match wins). */
const RULES = [
  { re: /^--color-(blue|gold|ink|line|red|green|amber)-(\d+)$/, tier: 'primitive', type: 'color', path: (m) => ['color', m[1], m[2]] },
  { re: /^--color-(paper|white)$/, tier: 'primitive', type: 'color', path: (m) => ['color', m[1]] },
  { re: /^--text-(2xs|xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl)$/, tier: 'primitive', type: 'dimension', path: (m) => ['fontSize', m[1]] },
  { re: /^--text-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['text', m[1]] },
  { re: /^--surface-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['surface', m[1]] },
  { re: /^--border-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['border', m[1]] },
  { re: /^--interactive-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['interactive', m[1]] },
  { re: /^--accent-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['accent', m[1]] },
  { re: /^--status-(.+)$/, tier: 'semantic', type: 'color', path: (m) => ['status', m[1]] },
  { re: /^--focus-ring$/, tier: 'semantic', type: 'shadow', path: () => ['focus', 'ring'] },
  { re: /^--font-(serif|sans|mono)$/, tier: 'primitive', type: 'fontFamily', path: (m) => ['fontFamily', m[1]] },
  { re: /^--font-(.+)$/, tier: 'semantic', type: 'fontFamily', path: (m) => ['fontRole', m[1]] },
  { re: /^--weight-(.+)$/, tier: 'primitive', type: 'fontWeight', path: (m) => ['fontWeight', m[1]] },
  { re: /^--leading-(.+)$/, tier: 'primitive', type: 'number', path: (m) => ['lineHeight', m[1]] },
  { re: /^--tracking-(.+)$/, tier: 'primitive', type: 'dimension', path: (m) => ['letterSpacing', m[1]] },
  { re: /^--space-(.+)$/, tier: 'primitive', type: 'dimension', path: (m) => ['space', m[1]] },
  { re: /^--(gutter|gutter-tight|section-y|card-pad|card-pad-lg)$/, tier: 'semantic', type: 'dimension', path: (m) => ['layoutSpace', m[1]] },
  { re: /^--radius-(.+)$/, tier: 'primitive', type: 'dimension', path: (m) => ['radius', m[1]] },
  { re: /^--shadow-(.+)$/, tier: 'primitive', type: 'shadow', path: (m) => ['shadow', m[1]] },
  { re: /^--ring-(.+)$/, tier: 'primitive', type: 'shadow', path: (m) => ['ring', m[1]] },
  { re: /^--grid-(.+)$/, tier: 'primitive', type: 'number', path: (m) => ['grid', m[1]] },
  { re: /^--container-(.+)$/, tier: 'primitive', type: 'dimension', path: (m) => ['container', m[1]] },
  { re: /^--(header|subnav)-height$/, tier: 'component', type: 'dimension', path: (m) => ['chrome', `${m[1]}-height`] },
  { re: /^--z-(.+)$/, tier: 'primitive', type: 'number', path: (m) => ['zIndex', m[1]] },
  { re: /^--duration-(.+)$/, tier: 'primitive', type: 'duration', path: (m) => ['duration', m[1]] },
  { re: /^--ease-(.+)$/, tier: 'primitive', type: 'cubicBezier', path: (m) => ['easing', m[1]] },
];

const GROUP_DESCRIPTIONS = {
  color: 'Primitive colour ramps. Never reference these directly in product UI — use the semantic roles (text, surface, border, interactive, status).',
  fontSize: 'Type scale (rem). Pairs with lineHeight and letterSpacing.',
  text: 'Semantic text colours.',
  surface: 'Semantic surface / background colours.',
  border: 'Semantic border and hairline colours.',
  interactive: 'Interactive (button, link) colours with hover/active states.',
  accent: 'Accent colours used sparingly (gold rule, gold CTA).',
  status: 'Status and feedback colours.',
  focus: 'Focus ring recipe.',
  fontFamily: 'Self-hosted font stacks.',
  fontRole: 'Typographic roles mapped onto the three families.',
  fontWeight: 'Font weights (Google Sans ships 400/500/600; bold maps to 600).',
  lineHeight: 'Unitless line heights.',
  letterSpacing: 'Tracking in em.',
  space: '4px-based spacing scale.',
  layoutSpace: 'Named spacing for gutters, sections and cards.',
  radius: 'Corner radii. The system is deliberately square-ish.',
  shadow: 'Elevation shadows.',
  ring: 'Hairline ring recipe.',
  grid: 'Grid column count.',
  container: 'Container max-widths.',
  chrome: 'Fixed chrome heights (masthead, sub-navigation).',
  zIndex: 'Stacking layers.',
  duration: 'Motion durations.',
  easing: 'Motion easings.',
};

const vartoPath = new Map();
const entries = [];
for (const v of vars) {
  const rule = RULES.find((r) => r.re.test(v.name));
  if (!rule) throw new Error(`No rule for ${v.name}`);
  const m = v.name.match(rule.re);
  const p = rule.path(m);
  vartoPath.set(v.name, p.join('.'));
  entries.push({ ...v, tier: rule.tier, type: rule.type, path: p });
}

function toTokenValue(raw) {
  // Replace var(--x) references with DTCG {path} references.
  return raw.replace(/var\((--[a-z0-9-]+)\)/g, (_, name) => {
    const p = vartoPath.get(name);
    if (!p) throw new Error(`Unknown reference ${name}`);
    return `{${p}}`;
  });
}

const root = {
  $schema: 'https://tr.designtokens.org/format/',
  $description: 'ABA design tokens — single source of truth for The Advisory and the ABA Brand Portal. Tiers: primitive → semantic → component (see $extensions.com.aba.tier).',
};
for (const e of entries) {
  let node = root;
  e.path.forEach((seg, i) => {
    if (i === e.path.length - 1) {
      node[seg] = {
        $type: e.type,
        $value: cssToTypedValue(e.type, toTokenValue(e.value)),
        ...(e.comment ? { $description: e.comment } : {}),
        $extensions: { 'com.aba': { tier: e.tier, cssVar: e.name } },
      };
    } else {
      if (!node[seg]) {
        node[seg] = {};
        if (i === 0 && GROUP_DESCRIPTIONS[seg]) node[seg].$description = GROUP_DESCRIPTIONS[seg];
      }
      node = node[seg];
    }
  });
}

const out = path.join(PKG_ROOT, 'tokens', 'tokens.json');
fs.writeFileSync(out, JSON.stringify(root, null, 2) + '\n');
console.log(`wrote ${entries.length} tokens → ${path.relative(process.cwd(), out)}`);
