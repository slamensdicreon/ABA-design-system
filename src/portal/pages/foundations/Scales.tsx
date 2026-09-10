import { useState } from 'react';
import { ArrowLink, Button } from '@workspace/aba-design-system';
import { sortRamp, tokensInGroup, byVar } from '../../lib/tokens';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock } from '../../ui/Code';
import { DoDont, H3, Note, PageHead, Prose, Section } from '../../ui/Doc';
import { TokenTable } from '../../ui/TokenTable';
import { Example } from '../../ui/Example';

const px = (v: string) => parseFloat(v) * (v.endsWith('rem') ? 16 : 1);

export function SpacingPage() {
  usePageMeta('Spacing · Foundations', 'The 4px spacing scale, gutters, card padding and section rhythm.');
  const space = sortRamp(tokensInGroup('space').filter((t) => !/px|0-5|1-5|2-5/.test(t.path)));
  const fractional = tokensInGroup('space').filter((t) => /px|0-5|1-5|2-5/.test(t.path));
  const layout = tokensInGroup('layoutSpace');
  return (
    <article>
      <PageHead kicker="Foundations" title="Spacing" lede="A 4px base with a rem-based scale. Sections breathe at 64–96px; cards at 20–28px; the homepage’s editorial container pads 32px at the sides and tightens to 20px on mobile." meta={[`${space.length + fractional.length} steps`, `${layout.length} layout values`]} />
      <Section title="Scale">
        {space.map((t) => (
          <div className="scale-row" key={t.cssVar}><span>{t.cssVar}</span><span style={{ color: 'var(--text-muted)' }}>{t.resolved} · {px(t.resolved)}px</span><div className="scale-bar" style={{ width: Math.max(2, px(t.resolved)) }} /></div>
        ))}
        <H3>Fractional</H3>
        {fractional.map((t) => (
          <div className="scale-row" key={t.cssVar}><span>{t.cssVar}</span><span style={{ color: 'var(--text-muted)' }}>{t.resolved}</span><div className="scale-bar" style={{ width: Math.max(1, px(t.resolved)) }} /></div>
        ))}
      </Section>
      <Section title="Layout spacing">
        <TokenTable rows={[...layout, ...tokensInGroup('editorial').filter((t) => t.cssVar === '--gutter-editorial')]} />
        <Note>Homepage sections use <code>--gutter-editorial</code> (32px, 20px on mobile) rather than the general 24px gutter, and vertical padding of 64–96px per band. See the <a href={`${import.meta.env.BASE_URL}templates`}>template</a> for the exact rhythm.</Note>
      </Section>
      <Section title="Usage">
        <DoDont dos={['Use the scale for margins, padding and gaps; never arbitrary pixel values.', 'Increase whitespace with size: display headlines get 24–32px below, body 14–16px.']} donts={['Don’t use spacing below 4px except for hairline offsets (`--space-px`).', 'Don’t pad navy bands less than light ones — they need the same air.']} />
      </Section>
    </article>
  );
}

export function GridPage() {
  usePageMeta('Grid & containers · Foundations', 'Twelve columns and the ABA container widths.');
  const rows = [...tokensInGroup('grid'), ...tokensInGroup('container'), ...tokensInGroup('chrome'), ...tokensInGroup('editorial').filter((t) => t.cssVar === '--container-editorial')];
  return (
    <article>
      <PageHead kicker="Foundations" title="Grid & containers" lede="A 12-column grid inside a family of containers. The homepage uses the editorial container (1360px) with 32px side padding; text measures are capped at 720px." meta={[`${rows.length} tokens`]} />
      <Section title="Containers">
        <div style={{ display: 'grid', gap: 10 }}>
          {rows.filter((t) => /container/.test(t.cssVar)).sort((a, b) => px(b.resolved) - px(a.resolved)).map((t) => (
            <div key={t.cssVar} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}>
              <span>{t.cssVar}<br /><span style={{ color: 'var(--text-muted)' }}>{t.resolved}</span></span>
              <div style={{ height: 28, width: `${(px(t.resolved) / 1440) * 100}%`, background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-300)' }} />
            </div>
          ))}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, fontFamily: 'var(--font-mono)', fontSize: 12 }}><span>viewport 1440</span><div style={{ height: 0, borderTop: '1px dashed var(--border-strong)' }} /></div>
        </div>
      </Section>
      <Section title="12 columns">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'var(--gutter)', height: 72 }}>{Array.from({ length: 12 }).map((_, i) => <div key={i} style={{ background: 'var(--color-blue-50)', border: '1px solid var(--color-blue-200)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>{i + 1}</div>)}</div>
        <Prose><p style={{ marginTop: 16 }}>Homepage grids: House view 4 → 2 → 1, Membership close benefit columns 4 → 2 → 1, Latest news and Learn &amp; convene 2 → 1, Hero and Wealth &amp; trust 2 → 1. Hairlines (not gutters) separate cells in editorial grids.</p></Prose>
      </Section>
      <Section title="Chrome heights">
        <TokenTable rows={rows} />
      </Section>
      <Section title="Usage">
        <DoDont dos={['Wrap every band in the editorial container; let the band background bleed full width.', 'Cap paragraphs at `--container-text` (720px).']} donts={['Don’t nest containers.', 'Don’t exceed `--container-wide` for anything but full-bleed imagery.']} />
      </Section>
    </article>
  );
}

export function RadiiPage() {
  usePageMeta('Radii · Foundations', 'Corner radii: 2 to 6px, pill and circle.');
  const rows = tokensInGroup('radius');
  return (
    <article>
      <PageHead kicker="Foundations" title="Radii" lede="ABA corners are barely rounded. Buttons and inputs use 2px; cards 6px; only pills (tags, the assistant trigger) and avatars go fully round." meta={[`${rows.length} tokens`]} />
      <Section title="Scale">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
          {rows.map((t) => (
            <div key={t.cssVar} style={{ textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <div className="radius-demo" style={{ borderRadius: t.resolved, margin: '0 auto 8px' }} />
              {t.path.split('.').pop()}<br /><span style={{ color: 'var(--text-muted)' }}>{t.resolved}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Tokens"><TokenTable rows={rows} /></Section>
      <Section title="Usage">
        <DoDont dos={['2px for controls, 6px for surfaces, pill for chips.']} donts={['Don’t round photography or editorial cards — the homepage keeps them square.']} />
      </Section>
    </article>
  );
}

export function ShadowsPage() {
  usePageMeta('Shadows & hairlines · Foundations', 'Elevation levels and the 1px hairline that structures the homepage.');
  const rows = [...tokensInGroup('shadow'), ...tokensInGroup('ring')];
  return (
    <article>
      <PageHead kicker="Foundations" title="Shadows & hairlines" lede="The homepage is almost entirely flat: structure comes from 1px hairlines, not shadows. Elevation is reserved for things that float — menus, dialogs, toasts and the assistant dock." meta={[`${rows.length} tokens`]} />
      <Section title="Elevation">
        <div className="doc-grid doc-grid--3" style={{ padding: 8 }}>
          {rows.filter((t) => t.cssVar.startsWith('--shadow')).map((t) => (
            <div key={t.cssVar} style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>
              <div className="shadow-demo" style={{ boxShadow: t.resolved, marginBottom: 10, border: t.resolved === 'none' ? '1px dashed var(--border-default)' : undefined }} />
              {t.cssVar}<br /><span style={{ color: 'var(--text-muted)', wordBreak: 'break-all' }}>{t.resolved}</span>
            </div>
          ))}
        </div>
      </Section>
      <Section title="Hairlines">
        <Prose><p>The 1px line in <code>--border-default</code> ({byVar('--border-default')?.resolved}) separates rows, cards and sections. On navy, use <code>--on-dark-hairline</code> ({byVar('--on-dark-hairline')?.resolved}). <code>--ring-hairline</code> draws a hairline with box-shadow where a border would shift layout.</p></Prose>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ border: '1px solid var(--border-default)', padding: 20 }}><div style={{ borderBottom: '1px solid var(--border-default)', padding: '8px 0' }}>Row</div><div style={{ borderBottom: '1px solid var(--border-default)', padding: '8px 0' }}>Row</div><div style={{ padding: '8px 0' }}>Row</div></div>
          <div style={{ background: 'var(--color-blue-900)', color: '#fff', padding: 20 }}><div style={{ borderBottom: '1px solid var(--on-dark-hairline)', padding: '8px 0' }}>Row</div><div style={{ borderBottom: '1px solid var(--on-dark-hairline)', padding: '8px 0' }}>Row</div><div style={{ padding: '8px 0' }}>Row</div></div>
        </div>
      </Section>
      <Section title="Tokens"><TokenTable rows={rows} /></Section>
    </article>
  );
}

export function MotionPage() {
  usePageMeta('Motion · Foundations', 'Durations, easings and the fade-in transition.');
  const rows = [...tokensInGroup('duration'), ...tokensInGroup('easing'), ...tokensInGroup('editorial').filter((t) => t.cssVar === '--duration-fade')];
  const [k, setK] = useState(0);
  return (
    <article>
      <PageHead kicker="Foundations" title="Motion" lede="Motion is quiet and functional: 120ms for hover colour, 200ms for reveals, 320ms for panels; a standard ease for most things and a slightly overshooting emphasized curve for arrows that slide in." meta={[`${rows.length} tokens`]} />
      <Section title="Durations and easings">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}><Button variant="secondary" size="sm" onClick={() => setK((x) => x + 1)}>Replay</Button><span className="ex__desc">Each square travels 240px with its token.</span></div>
        {rows.filter((t) => t.cssVar.startsWith('--duration')).map((t) => (
          <div key={t.cssVar + k} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <span>{t.cssVar}<br /><span style={{ color: 'var(--text-muted)' }}>{t.resolved}</span></span>
            <div style={{ position: 'relative', height: 48 }}><div className="motion-demo" style={{ animation: `portal-slide ${t.resolved} var(--ease-standard) both` }} /></div>
          </div>
        ))}
        {rows.filter((t) => t.cssVar.startsWith('--ease')).map((t) => (
          <div key={t.cssVar + k} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: 16, padding: '8px 0', borderBottom: '1px solid var(--border-default)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
            <span>{t.cssVar}<br /><span style={{ color: 'var(--text-muted)' }}>{t.resolved}</span></span>
            <div style={{ position: 'relative', height: 48 }}><div className="motion-demo" style={{ animation: `portal-slide 900ms ${t.resolved} both` }} /></div>
          </div>
        ))}
        <style>{`@keyframes portal-slide { from { transform: translateX(0) } to { transform: translateX(240px) } }`}</style>
      </Section>
      <Section title="The fade-in">
        <Prose><p>Panels and the assistant dock enter with <code>advFade</code> — opacity 0 → 1 over <code>--duration-fade</code> ({byVar('--duration-fade')?.resolved}). The arrow in links translates 3px on hover with the emphasized curve.</p></Prose>
        <Example title="Arrow hover" code={`<ArrowLink href="/view" glyph="icon">Read the view</ArrowLink>`} css={`@keyframes advFade { from { opacity: 0; } to { opacity: 1; } }\n.panel { animation: advFade var(--duration-fade) var(--ease-standard); }`}>
          <ArrowLink href="#" glyph="icon" size="md">Read the view</ArrowLink>
        </Example>
        <CodeBlock language="css" code={`@media (prefers-reduced-motion: reduce) {\n  * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }\n}`} />
      </Section>
      <Section title="Tokens"><TokenTable rows={rows} /></Section>
      <Section title="Usage">
        <DoDont dos={['Transition colour and transform only.', 'Respect `prefers-reduced-motion`.']} donts={['Don’t animate layout (width/height) on hover.', 'Don’t exceed 320ms for anything the user is waiting on.']} />
      </Section>
    </article>
  );
}

export function ZIndexPage() {
  usePageMeta('Z-index · Foundations', 'Layer order for sticky, header, dropdown, overlay, modal, toast.');
  const rows = tokensInGroup('zIndex').sort((a, b) => Number(a.resolved) - Number(b.resolved));
  return (
    <article>
      <PageHead kicker="Foundations" title="Z-index" lede="Seven named layers. The masthead sits at header; the mega menu at dropdown; the mobile drawer and dialogs at modal; toasts and the assistant dock at the top." meta={[`${rows.length} layers`]} />
      <Section title="Layers">
        <div style={{ position: 'relative', height: 300, marginBottom: 12 }}>
          {rows.map((t, i) => (
            <div key={t.cssVar} style={{ position: 'absolute', left: i * 60, top: (rows.length - 1 - i) * 30, width: 300, height: 100, background: `rgba(11,36,64,${0.12 + i * 0.12})`, border: '1px solid rgba(255,255,255,0.6)', color: i > 2 ? '#fff' : 'var(--text-primary)', padding: '10px 12px', fontFamily: 'var(--font-mono)', fontSize: 11 }}>{t.cssVar} · {t.resolved}</div>
          ))}
        </div>
        <TokenTable rows={rows} />
      </Section>
      <Section title="Usage">
        <DoDont dos={['Reference a layer token; never a literal number.']} donts={['Don’t create a stacking context inside an organism that traps the mega menu.']} />
      </Section>
    </article>
  );
}

const BPS = [
  { name: 'Desktop', width: 1440, note: 'Design width. Editorial container at 1360 with 32px padding.' },
  { name: 'Laptop / tablet landscape', width: 1024, note: 'Masthead collapses to the hamburger; hero stacks; grids go 4 → 2.' },
  { name: 'Tablet portrait', width: 768, note: 'Most stacking happens at or below this width: single column, footer wraps, 20px gutters.' },
  { name: 'Mobile', width: 390, note: 'Check width. Two narrow-phone rules tighten stats and the assistant dock.' },
];

export function BreakpointsPage() {
  usePageMeta('Breakpoints · Foundations', 'The 1440 / 1024 / 768 / 390 breakpoints used across the homepage and this portal.');
  return (
    <article>
      <PageHead kicker="Foundations" title="Breakpoints" lede="Four widths that every organism is checked at. Queries are max-width and mobile-last: the desktop layout is the source, and each breakpoint removes columns." />
      <Section title="Widths">
        <div style={{ display: 'grid', gap: 12 }}>
          {BPS.map((b) => (
            <div key={b.width} style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, alignItems: 'center' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>{b.name}<br /><span style={{ color: 'var(--text-muted)' }}>{b.width}px</span></span>
              <div>
                <div style={{ height: 24, width: `${(b.width / 1440) * 100}%`, background: 'var(--color-blue-800)', color: '#fff', fontFamily: 'var(--font-mono)', fontSize: 10, display: 'flex', alignItems: 'center', paddingLeft: 8 }}>{b.width}</div>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '6px 0 0' }}>{b.note}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section title="In CSS">
        <CodeBlock language="css" code={`@media (max-width: 1024px) { /* collapse nav, stack hero, 4 → 2 columns (17 rules) */ }\n@media (max-width: 768px)  { /* single column, 20px gutters, display type steps down (23 rules) */ }\n@media (max-width: 390px)  { /* narrow-phone adjustments (2 rules) */ }`} />
        <Note>Every component page in this portal has a viewport toggle that renders the component in a real iframe at 1440, 768 and 390 so media queries apply.</Note>
      </Section>
    </article>
  );
}
