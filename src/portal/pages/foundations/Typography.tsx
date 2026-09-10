import { Kicker } from '@workspace/aba-design-system';
import { parseFontFaces } from '../../lib/css-source';
import { sortRamp, tokensInGroup } from '../../lib/tokens';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock } from '../../ui/Code';
import { DoDont, H3, Note, PageHead, Prose, Section } from '../../ui/Doc';
import { TokenTable } from '../../ui/TokenTable';

const SIZE_ORDER = ['2xs', 'xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'];

const ROLES = [
  { role: 'Display', token: '--font-display', family: 'Gloock', sample: 'The considered view on American banking.', size: 56, weight: 400, lh: 1.02, ls: '-0.012em', where: 'Hero headline, One number, Membership close' },
  { role: 'Headline', token: '--font-headline', family: 'Gloock', sample: 'Rate caps lead to less credit', size: 28, weight: 400, lh: 1.15, ls: '-0.005em', where: 'Section headlines, story titles, conference titles' },
  { role: 'Body', token: '--font-body', family: 'Google Sans', sample: 'Advocacy, research and education for the institutions that fund American life.', size: 16, weight: 400, lh: 1.6, ls: '0', where: 'Deks, descriptions, paragraphs' },
  { role: 'UI', token: '--font-ui', family: 'Google Sans', sample: 'Join ABA · Member login · Read the view', size: 13, weight: 600, lh: 1.2, ls: '0.01em', where: 'Buttons, nav tabs, links' },
  { role: 'Kicker', token: '--font-kicker', family: 'Google Sans', sample: 'THE HOUSE VIEW', size: 11, weight: 700, lh: 1, ls: '0.16em', where: 'Section labels, card kicks' },
  { role: 'Data', token: '--font-data', family: 'IBM Plex Mono', sample: 'ECONOMIC INSIGHT · JUN 2026 · 01', size: 10.5, weight: 400, lh: 1.4, ls: '0.08em', where: 'Indices, dates, captions, tags' },
];

export function TypographyPage() {
  usePageMeta('Typography · Foundations', 'Gloock, Google Sans and IBM Plex Mono: the ABA type roles, scale, weights, leading and tracking.');
  const sizes = tokensInGroup('fontSize').sort((a, b) => SIZE_ORDER.indexOf(a.path.split('.').pop()!) - SIZE_ORDER.indexOf(b.path.split('.').pop()!));
  const faces = parseFontFaces();
  const families = Array.from(new Set(faces.map((f) => f.family)));
  return (
    <article>
      <PageHead kicker="Foundations" title="Typography" lede="Three families, each with one job. Gloock (a high-contrast display serif) states the view; Google Sans carries the reading and the interface; IBM Plex Mono labels the data. The scale runs from 10.5px metadata to a 76px display." meta={['3 families', `${faces.length} self-hosted font faces`, `${sizes.length} sizes`]} />

      <Section title="Families">
        <div className="doc-grid doc-grid--3">
          {[{ n: 'Gloock', v: '--font-serif', d: 'Display serif. Regular only. Headlines, numerals, pull quotes.', s: 'Aa' }, { n: 'Google Sans', v: '--font-sans', d: 'Humanist sans. 400–700. Body, UI, kickers.', s: 'Aa' }, { n: 'IBM Plex Mono', v: '--font-mono', d: 'Monospace. 400–600. Metadata, captions, code.', s: 'Aa' }].map((f) => (
            <div key={f.n} style={{ border: '1px solid var(--border-default)', padding: 24 }}>
              <div style={{ fontFamily: `var(${f.v})`, fontSize: 72, lineHeight: 1, marginBottom: 12 }}>{f.s}</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 20 }}>{f.n}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', margin: '4px 0 10px' }}>{f.v}</div>
              <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>{f.d}</p>
            </div>
          ))}
        </div>
        <Note>Fonts are self-hosted from the design-system package (<code>@workspace/aba-design-system/css/fonts.css</code>) — {families.join(', ')} — and never loaded from Google Fonts at runtime. Download them from <a href={`${import.meta.env.BASE_URL}resources`}>Resources</a>.</Note>
      </Section>

      <Section title="Roles">
        {ROLES.map((r) => (
          <div className="spec" key={r.role}>
            <div className="spec__meta">
              <b>{r.role}</b> · <code>{r.token}</code><br />{r.family} {r.weight} · {r.size}px / {r.lh} · {r.ls}<br /><span style={{ color: 'var(--text-faint)' }}>{r.where}</span>
            </div>
            <div className="spec__sample" style={{ fontFamily: `var(${r.token})`, fontSize: r.size, fontWeight: r.weight, lineHeight: r.lh, letterSpacing: r.ls, textTransform: r.role === 'Kicker' || r.role === 'Data' ? 'uppercase' : undefined, whiteSpace: r.size > 40 ? 'normal' : undefined, color: r.role === 'Kicker' ? 'var(--color-blue-800)' : r.role === 'Data' ? 'var(--text-muted)' : undefined }}>{r.sample}</div>
          </div>
        ))}
      </Section>

      <Section title="Type scale">
        {sizes.map((t) => (
          <div className="spec" key={t.cssVar}>
            <div className="spec__meta"><b>{t.path.split('.').pop()}</b> · <code>{t.cssVar}</code><br />{t.resolved}</div>
            <div className="spec__sample" style={{ fontFamily: parseFloat(t.resolved) >= 24 ? 'var(--font-serif)' : 'var(--font-sans)', fontSize: t.resolved, lineHeight: 1.1 }}>The considered view</div>
          </div>
        ))}
      </Section>

      <Section title="Weights, leading and tracking">
        <div className="doc-grid doc-grid--3">
          <div>
            <H3>Weights</H3>
            {tokensInGroup('fontWeight').map((t) => <div key={t.cssVar} style={{ fontWeight: Number(t.resolved), fontSize: 18, padding: '6px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}><span>{t.path.split('.').pop()}</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{t.resolved}</span></div>)}
          </div>
          <div>
            <H3>Leading</H3>
            {tokensInGroup('lineHeight').map((t) => <div key={t.cssVar} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}><span>{t.path.split('.').pop()}</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{t.resolved}</span></div>)}
          </div>
          <div>
            <H3>Tracking</H3>
            {tokensInGroup('letterSpacing').map((t) => <div key={t.cssVar} style={{ padding: '6px 0', borderBottom: '1px solid var(--border-default)', display: 'flex', justifyContent: 'space-between' }}><span style={{ letterSpacing: t.resolved }}>{t.path.split('.').pop()}</span><span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{t.resolved}</span></div>)}
          </div>
        </div>
      </Section>

      <Section title="The kicker style">
        <Prose><p>The one typographic device that appears in every organism. Eleven pixels, bold, tracked 0.16em, uppercase, brand blue (or gold on navy). Set with <code>--kicker-size</code> and <code>--kicker-tracking</code>.</p></Prose>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center', padding: 24, border: '1px solid var(--border-default)' }}><Kicker>The house view</Kicker><Kicker tone="gold">Membership</Kicker></div>
        <CodeBlock language="css" code={`.aba-kicker {\n  font: var(--weight-bold) var(--kicker-size) / 1 var(--font-kicker);\n  letter-spacing: var(--kicker-tracking);\n  text-transform: uppercase;\n  color: var(--text-link);\n}`} />
      </Section>

      <Section title="Usage">
        <DoDont
          dos={['Serif for what ABA says (headlines, numbers, quotes); sans for how it works (body, buttons).', 'Tighten tracking as size grows: -0.012em at display, 0 at body.', 'Headlines are sentences with a full stop when they make a claim.']}
          donts={['Don’t set Gloock below 20px — it loses its contrast.', 'Don’t bold Gloock; the family has one weight.', 'Don’t use mono for anything longer than a line.']}
        />
      </Section>

      <Section title="All typography tokens">
        <TokenTable rows={[...tokensInGroup('fontFamily'), ...tokensInGroup('fontRole'), ...tokensInGroup('fontWeight'), ...sizes, ...tokensInGroup('lineHeight'), ...sortRamp(tokensInGroup('letterSpacing')), ...tokensInGroup('editorial').filter((t) => /kicker|meta/.test(t.cssVar))]} />
      </Section>
    </article>
  );
}
