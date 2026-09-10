/**
 * Raw CSS sources from the design-system package, used to show copy-ready CSS
 * per component. Vite inlines these as strings at build time.
 */
import componentsCss from '@workspace/aba-design-system/css/components.css?raw';
import baseCss from '@workspace/aba-design-system/css/base.css?raw';
import fontsCss from '@workspace/aba-design-system/css/fonts.css?raw';
import editorialCss from '@workspace/aba-design-system/react/molecules/editorial.module.css?raw';
import arrowLinkCss from '@workspace/aba-design-system/react/atoms/ArrowLink.module.css?raw';

export { componentsCss, baseCss, fontsCss, editorialCss, arrowLinkCss };

const ALL_ABA = `${baseCss}\n${componentsCss}`;

/** Extract all top-level rules whose selector list mentions any of the given class prefixes (e.g. ".aba-btn"). */
export function cssRulesFor(prefixes: string[], source: string = ALL_ABA): string {
  const out: string[] = [];
  const re = /([^{}]+)\{([^{}]*)\}/g;
  let m: RegExpExecArray | null;
  const stripped = source.replace(/\/\*[\s\S]*?\*\//g, '');
  // Handle @keyframes blocks separately (nested braces).
  const kf = /@keyframes\s+([\w-]+)\s*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g;
  const keyframes: Record<string, string> = {};
  let k: RegExpExecArray | null;
  while ((k = kf.exec(stripped))) keyframes[k[1]] = k[0];
  const flat = stripped.replace(kf, '');
  while ((m = re.exec(flat))) {
    const selector = m[1].trim();
    if (!selector || selector.startsWith('@')) continue;
    const hit = prefixes.some((p) => new RegExp(`${escapeRe(p)}(?![\\w-])`).test(selector));
    if (hit) out.push(`${selector} {${m[2].replace(/\s+/g, ' ').trim() ? ' ' + m[2].replace(/\s+/g, ' ').trim() + ' ' : ' '}}`);
  }
  const text = out.join('\n');
  const usedKf = Object.keys(keyframes).filter((name) => text.includes(name));
  return [text, ...usedKf.map((n) => keyframes[n])].join('\n\n');
}

function escapeRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/** Rules from a CSS module by local class names (unhashed source). */
export function moduleRulesFor(classNames: string[], source: string): string {
  return cssRulesFor(classNames.map((c) => `.${c}`), source);
}

export interface FontFace { family: string; weight: string; style: string; file: string; unicodeRange: string }

export function parseFontFaces(source: string = fontsCss): FontFace[] {
  const faces: FontFace[] = [];
  const re = /@font-face\s*\{([^}]*)\}/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(source))) {
    const body = m[1];
    const get = (prop: string) => body.match(new RegExp(`${prop}\\s*:\\s*([^;]+);`))?.[1]?.trim() ?? '';
    const file = body.match(/url\(["']?[^"')]*\/([^/"')]+)["']?\)/)?.[1] ?? '';
    faces.push({ family: get('font-family').replace(/["']/g, ''), weight: get('font-weight'), style: get('font-style'), file, unicodeRange: get('unicode-range') });
  }
  return faces;
}
