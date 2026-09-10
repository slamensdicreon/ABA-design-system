import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const PKG_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
export const WORKSPACE_ROOT = path.resolve(PKG_ROOT, '..', '..');
export const HOMEPAGE_DIR = path.join(WORKSPACE_ROOT, 'artifacts', 'the-advisory');
export const HOMEPAGE_CSS = path.join(HOMEPAGE_DIR, 'src', 'app', 'globals.css');

/** Strip block comments. */
export function stripComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

/**
 * Parse every `:root { ... }` block and return the custom properties declared
 * in it, in order of first appearance. Repeated declarations must agree.
 * Returns [{ name, value, comment }].
 */
export function parseRootVars(css) {
  const out = [];
  const seen = new Map();
  const blockRe = /:root\s*\{([\s\S]*?)\}/g;
  let m;
  while ((m = blockRe.exec(css))) {
    const body = m[1];
    const lineRe = /(--[a-zA-Z0-9-]+)\s*:\s*([^;]+);[ \t]*(?:\/\*\s*([^*]*?)\s*\*\/)?/g;
    let d;
    while ((d = lineRe.exec(body))) {
      const name = d[1];
      const value = d[2].trim().replace(/\s+/g, ' ');
      const comment = (d[3] || '').replace(/@kind \w+/g, '').trim();
      if (seen.has(name)) {
        if (seen.get(name) !== value) {
          throw new Error(`Conflicting declarations for ${name}: "${seen.get(name)}" vs "${value}"`);
        }
        continue;
      }
      seen.set(name, value);
      out.push({ name, value, comment: comment || undefined });
    }
  }
  return out;
}

/** Walk a DTCG tree, yielding { path: string[], token } for every token. */
export function* walkTokens(node, prefix = []) {
  for (const [key, val] of Object.entries(node)) {
    if (key.startsWith('$')) continue;
    if (val && typeof val === 'object' && '$value' in val) {
      yield { path: [...prefix, key], token: val };
    } else if (val && typeof val === 'object') {
      yield* walkTokens(val, [...prefix, key]);
    }
  }
}

export function cssVarName({ path: p, token }) {
  return token.$extensions?.['com.aba']?.cssVar ?? `--${p.join('-')}`;
}

const GENERIC_FAMILIES = new Set(['serif', 'sans-serif', 'monospace', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace', 'cursive', 'fantasy']);
const isRef = (v) => typeof v === 'string' && /^\{[^}]+\}$/.test(v);
const refPath = (v) => v.slice(1, -1);

function lookup(ref, byPath) {
  const t = byPath.get(ref);
  if (!t) throw new Error(`Unresolved token reference {${ref}}`);
  return t;
}

/** Serialise a typed DTCG value to CSS. `ref(path)` decides how references render. */
function serialise(type, value, ref) {
  if (isRef(value)) return ref(refPath(value));
  switch (type) {
    case 'color': return hexToCss(value);
    case 'dimension': return dimensionToCss(value);
    case 'duration': return `${value.value}${value.unit}`;
    case 'number':
    case 'fontWeight': return String(value);
    case 'cubicBezier': return `cubic-bezier(${value.join(', ')})`;
    case 'fontFamily': return (Array.isArray(value) ? value : [value]).map((f) => (GENERIC_FAMILIES.has(f) ? f : `"${f}"`)).join(', ');
    case 'shadow': {
      const layers = Array.isArray(value) ? value : [value];
      if (layers.length === 1 && isNoneShadow(layers[0])) return 'none';
      return layers.map((l) => shadowToCss(l, ref)).join(', ');
    }
    default: throw new Error(`Unsupported token type ${type}`);
  }
}

function dimensionToCss(d) {
  if (d.value === 0) return '0';
  return `${d.value}${d.unit}`;
}

/** #RRGGBB → as-is; #RRGGBBAA → rgba(r, g, b, a) with a rounded to 2 dp (the homepage authoring form). */
export function hexToCss(hex) {
  if (hex.length === 9) {
    const n = parseInt(hex.slice(1), 16);
    const a = Math.round(((n & 255) / 255) * 100) / 100;
    return `rgba(${(n >>> 24) & 255}, ${(n >>> 16) & 255}, ${(n >>> 8) & 255}, ${a})`;
  }
  return hex;
}

function isNoneShadow(l) {
  return l.color === '#00000000' && [l.offsetX, l.offsetY, l.blur, l.spread].every((d) => d.value === 0);
}

function shadowToCss(l, ref) {
  const color = isRef(l.color) ? ref(refPath(l.color)) : hexToCss(l.color);
  const parts = [dimensionToCss(l.offsetX), dimensionToCss(l.offsetY), dimensionToCss(l.blur)];
  if (l.spread && l.spread.value !== 0) parts.push(dimensionToCss(l.spread));
  return `${l.inset ? 'inset ' : ''}${parts.join(' ')} ${color}`;
}

/** CSS value as emitted in tokens.css: {a.b.c} → var(--a-b-c). */
export function toCssValue(token, byPath) {
  return serialise(token.$type, token.$value, (r) => `var(${cssVarName(lookup(r, byPath))})`);
}

/** Fully resolved CSS literal (follows references). */
export function resolveLiteral(token, byPath, depth = 0) {
  if (depth > 20) throw new Error('Reference cycle');
  return serialise(token.$type, token.$value, (r) => resolveLiteral(lookup(r, byPath).token, byPath, depth + 1));
}

/** Raw DTCG value as a compact string for display. */
export function rawValueString(value) {
  return typeof value === 'string' ? value : JSON.stringify(value);
}

export function indexTokens(tree) {
  const byPath = new Map();
  for (const entry of walkTokens(tree)) byPath.set(entry.path.join('.'), entry);
  return byPath;
}

// ---- CSS literal → typed DTCG value (used by the re-seed script) -----------

function parseDimension(s) {
  s = s.trim();
  if (s === '0') return { value: 0, unit: 'px' };
  const m = s.match(/^(-?[\d.]+)(px|rem|em|%|ch)$/);
  if (!m) throw new Error(`Not a dimension: ${s}`);
  return { value: Number(m[1]), unit: m[2] };
}

function parseColor(s) {
  s = s.trim();
  if (s.startsWith('#')) return s.toUpperCase();
  const m = s.match(/^rgba?\(([^)]*)\)$/);
  if (!m) throw new Error(`Not a colour: ${s}`);
  const parts = m[1].split(',').map((p) => p.trim());
  const [r, g, b] = parts.slice(0, 3).map(Number);
  const a = parts.length > 3 ? Number(parts[3]) : 1;
  const hex2 = (n) => n.toString(16).padStart(2, '0').toUpperCase();
  return `#${hex2(r)}${hex2(g)}${hex2(b)}${a < 1 ? hex2(Math.round(a * 255)) : ''}`;
}

function parseShadowLayer(s) {
  s = s.trim();
  const inset = s.startsWith('inset ');
  if (inset) s = s.slice(6);
  const m = s.match(/^(\S+) (\S+) (\S+)(?: (\S+))? (rgba?\([^)]*\)|#\w+|\{[^}]+\})$/);
  if (!m) throw new Error(`Not a shadow: ${s}`);
  const layer = {
    color: m[5].startsWith('{') ? m[5] : parseColor(m[5]),
    offsetX: parseDimension(m[1]), offsetY: parseDimension(m[2]), blur: parseDimension(m[3]), spread: parseDimension(m[4] ?? '0'),
  };
  if (inset) layer.inset = true;
  return layer;
}

/** Convert a CSS literal (possibly containing {references}) into the typed DTCG value for `type`. */
export function cssToTypedValue(type, css) {
  const v = css.trim();
  if (isRef(v)) return v;
  switch (type) {
    case 'color': return parseColor(v);
    case 'dimension': return parseDimension(v);
    case 'number':
    case 'fontWeight': return Number(v);
    case 'duration': { const m = v.match(/^([\d.]+)(ms|s)$/); if (!m) throw new Error(`Not a duration: ${v}`); return { value: Number(m[1]), unit: m[2] }; }
    case 'cubicBezier': { const m = v.match(/^cubic-bezier\(([^)]*)\)$/); if (!m) throw new Error(`Not a cubic-bezier: ${v}`); return m[1].split(',').map(Number); }
    case 'fontFamily': return v.split(',').map((f) => f.trim().replace(/^["']|["']$/g, ''));
    case 'shadow': {
      if (v === 'none') return { color: '#00000000', offsetX: parseDimension('0'), offsetY: parseDimension('0'), blur: parseDimension('0'), spread: parseDimension('0') };
      const layers = v.split(/,(?![^(]*\))/).map(parseShadowLayer);
      return layers.length === 1 ? layers[0] : layers;
    }
    default: throw new Error(`Unsupported token type ${type}`);
  }
}

// ---- Validation --------------------------------------------------------------

const DIMENSION_UNITS = new Set(['px', 'rem', 'em', '%', 'ch']);
const isDim = (d) => d && typeof d === 'object' && typeof d.value === 'number' && DIMENSION_UNITS.has(d.unit);
const isHex = (c) => typeof c === 'string' && /^#[0-9A-F]{6}([0-9A-F]{2})?$/.test(c);
const isColorOrRef = (c) => isHex(c) || isRef(c);
const isShadowLayer = (l) => l && typeof l === 'object' && isColorOrRef(l.color) && isDim(l.offsetX) && isDim(l.offsetY) && isDim(l.blur) && isDim(l.spread) && (l.inset === undefined || typeof l.inset === 'boolean');

/**
 * Validate every token against the DTCG typed value shapes. Returns a list of
 * "path: problem" strings (empty when valid). References must resolve to a token
 * of the same $type.
 */
export function validateTokens(tree) {
  const byPath = indexTokens(tree);
  const problems = [];
  for (const { path: p, token } of walkTokens(tree)) {
    const where = p.join('.');
    const { $type: type, $value: value } = token;
    if (!type) { problems.push(`${where}: missing $type`); continue; }
    if (isRef(value)) {
      const target = byPath.get(refPath(value));
      if (!target) problems.push(`${where}: unresolved reference ${value}`);
      else if (target.token.$type !== type) problems.push(`${where}: reference ${value} is ${target.token.$type}, expected ${type}`);
      continue;
    }
    const ok = (() => {
      switch (type) {
        case 'color': return isHex(value);
        case 'dimension': return isDim(value);
        case 'number': return typeof value === 'number';
        case 'fontWeight': return typeof value === 'number' && value >= 1 && value <= 1000;
        case 'duration': return value && typeof value.value === 'number' && (value.unit === 'ms' || value.unit === 's');
        case 'cubicBezier': return Array.isArray(value) && value.length === 4 && value.every((n) => typeof n === 'number');
        case 'fontFamily': return Array.isArray(value) ? value.every((f) => typeof f === 'string' && f) : typeof value === 'string';
        case 'shadow': return Array.isArray(value) ? value.length > 0 && value.every(isShadowLayer) : isShadowLayer(value);
        default: return false;
      }
    })();
    if (!ok) problems.push(`${where}: invalid ${type} value ${JSON.stringify(value)}`);
  }
  return problems;
}
