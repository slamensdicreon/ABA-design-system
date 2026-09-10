import { atoms } from './atoms';
import { molecules } from './molecules';
import { organisms } from './organisms';
import type { ComponentDef, Tier } from './types';

export { atoms, molecules, organisms };
export type { ComponentDef, Tier };

export const registry: Record<Tier, ComponentDef[]> = { atoms, molecules, organisms };

export function findComponent(tier: Tier, slug: string): ComponentDef | undefined {
  return registry[tier]?.find((c) => c.slug === slug);
}

export const TIER_LABEL: Record<Tier, string> = { atoms: 'Atoms', molecules: 'Molecules', organisms: 'Organisms' };
export const TIER_SINGULAR: Record<Tier, string> = { atoms: 'Atom', molecules: 'Molecule', organisms: 'Organism' };
