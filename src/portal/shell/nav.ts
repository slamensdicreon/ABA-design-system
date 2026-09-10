import { atoms, molecules, organisms } from '../registry';

export interface NavItem { label: string; href: string; desc?: string; kind: string; children?: NavItem[] }
export interface NavGroup { title: string; items: NavItem[] }

export const FOUNDATIONS: NavItem[] = [
  { label: 'Colour', href: '/foundations/colour', kind: 'Foundation', desc: 'Scales, semantic roles, WCAG contrast' },
  { label: 'Typography', href: '/foundations/typography', kind: 'Foundation', desc: 'Gloock, Google Sans, IBM Plex Mono; type scale' },
  { label: 'Spacing', href: '/foundations/spacing', kind: 'Foundation', desc: '4px scale, gutters, section rhythm' },
  { label: 'Grid & containers', href: '/foundations/grid', kind: 'Foundation', desc: '12 columns, 1200 / 1320 / 1440 containers' },
  { label: 'Radii', href: '/foundations/radii', kind: 'Foundation', desc: '2 to 6px, pills, circles' },
  { label: 'Shadows & hairlines', href: '/foundations/shadows', kind: 'Foundation', desc: 'Elevation and the 1px line' },
  { label: 'Motion', href: '/foundations/motion', kind: 'Foundation', desc: 'Durations, easings, the fade-in' },
  { label: 'Iconography', href: '/foundations/iconography', kind: 'Foundation', desc: 'Arrow and link glyphs' },
  { label: 'Z-index', href: '/foundations/z-index', kind: 'Foundation', desc: 'Layer order' },
  { label: 'Breakpoints', href: '/foundations/breakpoints', kind: 'Foundation', desc: '1440 / 1024 / 768 / 390' },
];

export const BRAND: NavItem[] = [
  { label: 'Who ABA is', href: '/brand', kind: 'Brand', desc: 'Brand story and principles' },
  { label: 'Voice & tone', href: '/brand/voice', kind: 'Brand', desc: 'The considered view register' },
  { label: 'Logo', href: '/brand/logo', kind: 'Brand', desc: 'Primary, mono, clear space, misuse, downloads' },
  { label: 'Photography', href: '/brand/photography', kind: 'Brand', desc: 'Navy-toned cityscapes, events, FIG captions' },
];

export const TEMPLATES: NavItem[] = [
  { label: 'Editorial homepage template', href: '/templates', kind: 'Template', desc: 'Section rhythm, bands, containers' },
  { label: 'How the homepage is assembled', href: '/templates/homepage', kind: 'Template', desc: 'Exploded view of the live page' },
];

export const RESOURCES: NavItem[] = [
  { label: 'Downloads', href: '/resources', kind: 'Resource', desc: 'Tokens, fonts, logo pack' },
  { label: 'Getting started', href: '/resources/getting-started', kind: 'Resource', desc: 'Install and use the package' },
  { label: 'Changelog', href: '/resources/changelog', kind: 'Resource', desc: 'Versions' },
  { label: 'Roadmap', href: '/roadmap', kind: 'Resource', desc: 'Gaps and candidates' },
];

export const NAV: NavGroup[] = [
  { title: 'Brand', items: BRAND },
  { title: 'Foundations', items: FOUNDATIONS },
  {
    title: 'Components',
    items: [
      { label: 'Atoms', href: '/atoms', kind: 'Index', children: atoms.map((c) => ({ label: c.name, href: `/atoms/${c.slug}`, kind: 'Atom', desc: c.summary })) },
      { label: 'Molecules', href: '/molecules', kind: 'Index', children: molecules.map((c) => ({ label: c.name, href: `/molecules/${c.slug}`, kind: 'Molecule', desc: c.summary })) },
      { label: 'Organisms', href: '/organisms', kind: 'Index', children: organisms.map((c) => ({ label: c.name, href: `/organisms/${c.slug}`, kind: 'Organism', desc: c.summary })) },
    ],
  },
  { title: 'Templates & page', items: TEMPLATES },
  { title: 'Resources', items: RESOURCES },
];

/** Flat search index: every page and component. */
export const SEARCH_INDEX: NavItem[] = (() => {
  const out: NavItem[] = [{ label: 'Overview', href: '/', kind: 'Home', desc: 'ABA Brand Portal' }];
  const walk = (items: NavItem[]) => items.forEach((i) => { out.push(i); if (i.children) walk(i.children); });
  NAV.forEach((g) => walk(g.items));
  return out;
})();

export function titleFor(href: string): string | undefined {
  return SEARCH_INDEX.find((i) => i.href === href)?.label;
}
