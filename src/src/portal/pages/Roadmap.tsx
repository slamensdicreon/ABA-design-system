import { Badge } from '@workspace/aba-design-system';
import { usePageMeta } from '../lib/meta';
import { Note, PageHead, Section } from '../ui/Doc';

const GAPS: Array<{ area: string; gap: string; why: string; status: 'gap' | 'candidate' }> = [
  { area: 'Logo', gap: 'SVG master, stacked lockup, favicon set, social avatar', why: 'The homepage ships two PNG marks only.', status: 'gap' },
  { area: 'Brand', gap: 'Full editorial style guide (spelling, numbers, legal names)', why: 'Voice page is derived from homepage copy alone.', status: 'gap' },
  { area: 'Photography', gap: 'Wider image library and grading presets', why: 'Two photographs exist.', status: 'gap' },
  { area: 'Colour', gap: 'Dark mode / additional themes', why: 'Explicitly out of scope; tokens are structured to allow it.', status: 'candidate' },
  { area: 'Iconography', gap: 'A full icon set beyond the eight glyphs', why: 'The homepage uses arrows, chevron, close, check, search, info and menu only.', status: 'gap' },
  { area: 'Components', gap: 'Date picker, file upload, stepper, data visualisation', why: 'Not present on the homepage.', status: 'gap' },
  { area: 'Templates', gap: 'Article, listing, event and member-area templates', why: 'Only the homepage template exists.', status: 'gap' },
  { area: 'Homepage', gap: 'Rewire The Advisory to import from the shared package', why: 'The homepage keeps its own copies; the drift check guards them.', status: 'candidate' },
  { area: 'Figma', gap: 'Two-way sync / plugin', why: 'A Figma-importable variables JSON is provided.', status: 'candidate' },
  { area: 'Accessibility', gap: 'Automated axe checks per component', why: 'Contrast is computed; structural checks are manual.', status: 'candidate' },
];

export function RoadmapPage() {
  usePageMeta('Roadmap', 'Known gaps in the ABA design system and candidate follow-ups.');
  return (
    <article>
      <PageHead kicker="Resources" title="Roadmap" lede="This portal documents what exists on The Advisory homepage and in its design-system stylesheet. It does not invent brand elements. Gaps are listed here rather than filled." />
      <Note>Anything marked <strong>gap</strong> needs a brand decision from ABA before it can be added. <strong>Candidate</strong> items are engineering follow-ups.</Note>
      <Section title="Gaps and candidates">
        <div className="doc-table-wrap">
          <table className="aba-table">
            <thead><tr><th scope="col">Area</th><th scope="col">Missing</th><th scope="col">Why</th><th scope="col">Status</th></tr></thead>
            <tbody>{GAPS.map((g) => <tr key={g.gap}><td>{g.area}</td><td>{g.gap}</td><td style={{ color: 'var(--text-secondary)' }}>{g.why}</td><td><Badge tone={g.status === 'gap' ? 'caution' : 'brand'}>{g.status}</Badge></td></tr>)}</tbody>
          </table>
        </div>
      </Section>
    </article>
  );
}
