import { Link } from 'wouter';
import { Kicker, PullQuote, Rule } from '@workspace/aba-design-system';
import { IMAGES } from '../../lib/assets';
import { usePageMeta } from '../../lib/meta';
import { DocCard, DoDont, H3, Note, PageHead, Prose, Section } from '../../ui/Doc';

const PRINCIPLES = [
  { t: 'Considered, not loud', d: 'ABA speaks after it has thought. The homepage opens with a view, not a promotion; the type is a serif, the surfaces are flat, the accent is one gold line.' },
  { t: 'Authority with warmth', d: 'Navy and Gloock carry institutional weight; Google Sans and the people-forward photography keep it human. Neither dominates.' },
  { t: 'Data as texture', d: 'Mono indices, dates and captions run through every section — a newsroom’s discipline applied to a trade association.' },
  { t: 'Structure from hairlines', d: 'No cards floating on shadows. Rows, grids and bands are drawn with 1px lines, the way a broadsheet is.' },
  { t: 'One gold thing per view', d: 'Gold marks the single most important action or word on screen. When everything is gold, nothing is.' },
  { t: 'Restraint in motion', d: 'Colour fades, arrows slide three pixels, panels appear. Nothing bounces.' },
];

export function BrandPage() {
  usePageMeta('Brand · Who ABA is', 'The ABA brand story and principles behind the design system.');
  return (
    <article>
      <PageHead kicker="Brand" title="Who ABA is" lede="The American Bankers Association is the voice of the nation’s banks — advocacy, research and education for the institutions that fund American life. The Advisory is how that voice sounds online: an editorial property, not a marketing site." />
      <Section title="The idea">
        <Prose>
          <p>The Advisory borrows its posture from a serious publication. Its homepage leads with <em>the house view</em> — what ABA thinks this week — before it tells you what ABA sells. Every section that follows (positions, action, numbers, topics, news, events, training, membership) is presented as considered information with a considered typographic voice.</p>
          <p>This system is the reverse-engineering of that page: every colour, type role, spacing step and component on it, documented so other ABA properties can share the same voice.</p>
        </Prose>
        <PullQuote cite="The Advisory, hero">The considered view on American banking.</PullQuote>
      </Section>
      <Section title="Principles">
        <div className="doc-grid doc-grid--3">
          {PRINCIPLES.map((p, i) => <DocCard key={p.t} href="#" index={String(i + 1).padStart(2, '0')} title={p.t} desc={p.d} />)}
        </div>
      </Section>
      <Section title="Identity at a glance">
        <div className="doc-grid doc-grid--2">
          <div style={{ border: '1px solid var(--border-default)', padding: 28 }}>
            <Kicker>Primary mark</Kicker>
            <div style={{ margin: '16px 0', padding: 24, display: 'flex', justifyContent: 'center', background: 'var(--surface-sunken)' }}><img src={IMAGES.mastheadLogo} alt="ABA logo, primary" style={{ height: 44 }} /></div>
            <Rule />
            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', marginTop: 12 }}>Used on the masthead. See <Link href="/brand/logo">Logo</Link>.</p>
          </div>
          <div style={{ border: '1px solid var(--border-default)', padding: 28, background: 'var(--color-blue-900)', color: '#fff' }}>
            <Kicker tone="gold">Palette</Kicker>
            <div style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
              {['--color-blue-900', '--color-blue-800', '--color-gold-500', '--color-ink-900', '--color-line-200', '--color-paper'].map((v) => <div key={v} title={v} style={{ flex: 1, height: 56, background: `var(${v})`, border: '1px solid rgba(255,255,255,0.25)' }} />)}
            </div>
            <p style={{ fontSize: 13.5, color: 'var(--on-dark-muted)' }}>Navy, blue, gold, ink, line, paper. See <Link href="/foundations/colour" style={{ color: '#fff' }}>Colour</Link>.</p>
          </div>
        </div>
      </Section>
      <Section title="Where to start">
        <div className="doc-grid doc-grid--3">
          <DocCard href="/brand/voice" title="Voice & tone" desc="How ABA writes — the considered-view register." />
          <DocCard href="/foundations/colour" title="Foundations" desc="Tokens: colour, type, space, and the rest." />
          <DocCard href="/organisms" title="Organisms" desc="The thirteen homepage sections, live." />
        </div>
      </Section>
    </article>
  );
}

export function VoicePage() {
  usePageMeta('Voice & tone · Brand', 'The editorial “considered view” register: how ABA writes.');
  return (
    <article>
      <PageHead kicker="Brand" title="Voice & tone" lede="ABA writes like a well-edited publication that happens to be an association: declarative, specific, unhurried. The reader is a banker, a policymaker or a journalist — assume intelligence, earn attention." />
      <Section title="The register">
        <div className="doc-grid doc-grid--3">
          {[
            ['Declarative', 'State the view. “Rate caps lead to less credit, not cheaper credit.” Not “We believe rate caps may…”.'],
            ['Specific', 'Numbers with sources, dates with months, positions with names. The mono metadata exists to hold specifics.'],
            ['Unhurried', 'Short headlines, full sentences, no exclamation marks. Urgency is shown with a red BREAKING tag, not with tone.'],
          ].map(([t, d]) => <div key={t} style={{ borderTop: '2px solid var(--color-blue-900)', paddingTop: 12 }}><H3>{t}</H3><p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{d}</p></div>)}
        </div>
      </Section>
      <Section title="Patterns from the homepage">
        <H3>Kickers</H3>
        <Prose><p>Short noun phrases, uppercase, never a verb: <em>The house view</em>, <em>Take action</em>, <em>By the numbers</em>, <em>Member benefits</em>.</p></Prose>
        <H3>Headlines</H3>
        <Prose><p>Serif, sentence case, ideally under nine words. Claims take a full stop; labels don’t. <em>Membership is quiet power.</em> vs <em>Upcoming conferences</em>.</p></Prose>
        <H3>Deks</H3>
        <Prose><p>One or two sentences that add the “so what” rather than restating the headline.</p></Prose>
        <H3>Metadata</H3>
        <Prose><p>Mono, uppercase, separated by middle dots: <code>ECONOMIC INSIGHT · JUN 2026</code>, <code>FIG. 01 — NEW YORK · FINANCIAL DISTRICT</code>. Index numbers are two digits: <code>01</code>, <code>02</code>.</p></Prose>
        <H3>Calls to action</H3>
        <Prose><p>Verb + object, two to four words: <em>Read the view</em>, <em>Join ABA</em>, <em>See all positions</em>. Arrow links use → for in-site movement and ↗ for leaving the site.</p></Prose>
      </Section>
      <Section title="Do and don’t">
        <DoDont
          dos={['Lead with the conclusion.', 'Use “banks” and “bankers”, not “financial institutions” unless legally required.', 'Cite the source in the meta line.', 'Write dates as JUN 2026 or JUN 14–16 in metadata; spell months in prose.']}
          donts={['No exclamation marks, no “exciting”, no “leverage”.', 'Don’t hedge a house view with “we think”.', 'Don’t stack more than one CTA in a paragraph.', 'Don’t use title case in headlines.']}
        />
      </Section>
      <Note>Voice guidance is derived from the copy on the live homepage. ABA’s full editorial style guide is not part of this system — it is listed on the <Link href="/roadmap">Roadmap</Link>.</Note>
    </article>
  );
}
