import type { ReactNode } from 'react';

export type Tier = 'atoms' | 'molecules' | 'organisms';

export interface PropDef {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ExampleDef {
  id: string;
  title: string;
  desc?: string;
  /** Render inline (default) — children are placed on a dotted stage. */
  render: () => ReactNode;
  code: string;
  dark?: boolean;
  stack?: boolean;
  /** Use the iframe frame with viewport toggle instead of inline stage. */
  framed?: boolean;
  minHeight?: number;
}

export interface AnatomyPart {
  /** Number shown on the marker. */
  label: string;
  /** Hashed CSS-module class (or plain class) to locate in the preview DOM. */
  className: string;
  /** Link to the atom/molecule page documenting this part. */
  href?: string;
  tier?: 'atom' | 'molecule' | 'token' | 'organism';
  /** Only mark the first match (default true). */
  first?: boolean;
}

export interface ComponentDef {
  slug: string;
  name: string;
  tier: Tier;
  summary: string;
  /** Where it appears on the homepage. */
  usedIn?: string[];
  /** Import line shown at the top of the page. */
  importCode: string;
  props: PropDef[];
  examples: ExampleDef[];
  /** CSS class prefixes used for the copyable CSS tab (aba-* classes) */
  cssPrefixes?: string[];
  /** Full CSS text override (module CSS excerpt). */
  css?: string;
  dos: string[];
  donts: string[];
  /** Organisms: parts to mark in the anatomy overlay. */
  anatomy?: AnatomyPart[];
  /** Tokens worth calling out. */
  tokens?: string[];
  /** Related component slugs (tier/slug). */
  related?: string[];
}
