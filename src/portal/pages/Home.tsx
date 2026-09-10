import { Link } from 'wouter';
import { Kicker, Rule } from '@workspace/aba-design-system';
import { atoms, molecules, organisms } from '../registry';
import { tokens } from '../lib/tokens';
import { usePageMeta } from '../lib/meta';
import { DocCard, Section } from '../ui/Doc';

export function HomePage() {
  usePageMeta('ABA Brand Portal', 'The reference for anyone building ABA properties: brand story, tokens, usage rules, live component examples and downloadable assets.');
  return (
    <div>
      <section className="home-hero">
        <div>
          <Kicker>ABA design system · v1.0</Kicker>
          <h1 className="home-hero__title">The considered view, as a system.</h1>
          <p className="home-hero__dek">Everything on The Advisory homepage — every colour, type role, spacing step and component — reverse-engineered into tokens, atoms, molecules and organisms, documented for anyone building an ABA property.</p>
          <div className="home-hero__actions">
            <Link href="/brand" className="aba-btn aba-btn--primary">Start with the brand</Link>
            <Link href="/organisms" className="aba-btn aba-btn--secondary">Browse components</Link>
            <Link href="/resources" className="aba-link-arrow" style={{ alignSelf: 'center' }}>Downloads <span aria-hidden="true">→</span></Link>
          </div>
        </div>
        <div className="home-hero__panel">
          <div className="home-hero__stat"><b>{tokens.length}</b><span>Design tokens</span></div>
          <div className="home-hero__stat"><b>{atoms.length}</b><span>Atoms</span></div>
          <div className="home-hero__stat"><b>{molecules.length}</b><span>Molecules</span></div>
          <div className="home-hero__stat"><b>{organisms.length}</b><span>Organisms</span></div>
        </div>
      </section>
      <Rule />
      <Section title="Atomic structure">
        <div className="doc-grid doc-grid--3">
          <DocCard href="/foundations/colour" index="01" title="Foundations" desc="Colour, typography, spacing, grid, radii, shadows, motion, iconography, z-index, breakpoints — all as tokens." />
          <DocCard href="/atoms" index="02" title="Atoms" desc={`${atoms.length} primitives with live variants, states, props and copyable code.`} />
          <DocCard href="/molecules" index="03" title="Molecules" desc={`${molecules.length} compositions: section headers, story cards, rows, tabs, dialogs, tables.`} />
          <DocCard href="/organisms" index="04" title="Organisms" desc={`The ${organisms.length} homepage sections rendered live, with anatomy overlays.`} />
          <DocCard href="/templates" index="05" title="Templates & page" desc="The editorial homepage template and the page exploded into its parts." />
          <DocCard href="/resources" index="06" title="Resources" desc="Tokens (JSON, CSS, Figma), fonts, logo pack, changelog, roadmap." />
        </div>
      </Section>
      <Section title="Brand">
        <div className="doc-grid doc-grid--4">
          <DocCard href="/brand" title="Who ABA is" desc="Story and principles." />
          <DocCard href="/brand/voice" title="Voice & tone" desc="The considered-view register." />
          <DocCard href="/brand/logo" title="Logo" desc="Primary, mono, clear space, misuse." />
          <DocCard href="/brand/photography" title="Photography" desc="Navy-toned, captioned as figures." />
        </div>
      </Section>
    </div>
  );
}
