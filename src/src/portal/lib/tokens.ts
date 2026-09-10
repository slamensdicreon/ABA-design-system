import { tokens, tokenByVar, type TokenEntry } from '@workspace/aba-design-system/tokens';

export { tokens, tokenByVar };
export type { TokenEntry };

export function tokensInGroup(group: string): TokenEntry[] {
  return tokens.filter((t) => t.path === group || t.path.startsWith(group + '.'));
}

/** Numeric ramp sort (50, 100, 200 …), falling back to source order. */
export function sortRamp(list: TokenEntry[]): TokenEntry[] {
  return [...list].sort((a, b) => {
    const na = Number(a.path.split('.').pop());
    const nb = Number(b.path.split('.').pop());
    if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
    return 0;
  });
}

export function byVar(v: string): TokenEntry | undefined {
  return tokenByVar[v];
}

/** Resolve a var name to its literal value (for contrast maths). */
export function literal(v: string): string {
  return tokenByVar[v]?.resolved ?? v;
}
