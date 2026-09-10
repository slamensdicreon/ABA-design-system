import { useMemo } from 'react';
import { Badge } from '@workspace/aba-design-system';
import { contrastRatio, wcag } from '../../lib/contrast';
import { literal, sortRamp, tokensInGroup, type TokenEntry } from '../../lib/tokens';
import { usePageMeta } from '../../lib/meta';
import { CopyButton } from '../../ui/Code';
import { H3, Note, PageHead, Prose, Section } from '../../ui/Doc';
import { TokenTable } from '../../ui/TokenTable';

const RAMPS: Array<{ key: string; name: string; note: string }> = [
  { key: 'color.blue', name: 'Brand navy / blue', note: 'Navy 900 is the brand surface; 800 the interactive blue; 50 the tint.' },
  { key: 'color.gold', name: 'Gold', note: 'The accent. 500 for rules and buttons, 600 for gold text on white.' },
  { key: 'color.ink', name: 'Ink', note: 'Text greys. 900 is body text; 500 is muted metadata.' },
  { key: 'color.line', name: 'Line', note: 'Hairlines and sunken surfaces.' },
  { key: 'color.red', name: 'Red', note: 'Negative, “at risk”, breaking.' },
  { key: 'color.green', name: 'Green', note: 'Positive.' },
  { key: 'color.amber', name: 'Amber', note: 'Caution.' },
];

function Swatch({ t }: { t: TokenEntry }) {
  return (
    <button type="button" className="swatch" title={`Copy var(${t.cssVar})`} onClick={() => navigator.clipboard?.writeText(`var(${t.cssVar})`)}>
      <div className="swatch__chip" style={{ background: t.resolved }} />
      <div className="swatch__meta">
        <span className="swatch__name">{t.path.split('.').slice(1).join('-')}</span>
        <span className="swatch__val">{t.resolved}</span>
      </div>
    </button>
  );
}

const SEMANTIC_GROUPS: Array<{ title: string; group: string; desc: string }> = [
  { title: 'Text', group: 'text', desc: 'Roles for copy on light surfaces.' },
  { title: 'Surfaces', group: 'surface', desc: 'Page, sunken, cards and the brand bands.' },
  { title: 'Borders', group: 'border', desc: 'Hairline weights and the focus colour.' },
  { title: 'Interactive', group: 'interactive', desc: 'Primary blue and the gold accent, with hover/active.' },
  { title: 'Status', group: 'status', desc: 'Positive, negative, caution, breaking.' },
  { title: 'On dark', group: 'onDark', desc: 'Roles for text, gold and hairlines on navy bands.' },
];

interface Pair { fg: string; bg: string; label: string; large?: boolean }

const PAIRS: Pair[] = [
  { fg: '--text-primary', bg: '--surface-page', label: 'Body text on white' },
  { fg: '--text-secondary', bg: '--surface-page', label: 'Secondary text on white' },
  { fg: '--text-muted', bg: '--surface-page', label: 'Muted / meta on white' },
  { fg: '--text-faint', bg: '--surface-page', label: 'Faint (placeholders) on white' },
  { fg: '--text-link', bg: '--surface-page', label: 'Link blue on white' },
  { fg: '--color-gold-600', bg: '--surface-page', label: 'Gold text on white' },
  { fg: '--color-gold-500', bg: '--surface-page', label: 'Gold 500 as text on white' },
  { fg: '--text-primary', bg: '--surface-sunken', label: 'Body text on sunken' },
  { fg: '--text-muted', bg: '--surface-sunken', label: 'Muted on sunken' },
  { fg: '--text-on-brand', bg: '--interactive-primary', label: 'Button label on primary blue' },
  { fg: '--color-blue-900', bg: '--interactive-accent', label: 'Navy label on gold button' },
  { fg: '--on-dark-text', bg: '--surface-navy', label: 'White on navy' },
  { fg: '--on-dark-muted', bg: '--surface-navy', label: 'Muted white on navy' },
  { fg: '--on-dark-gold', bg: '--surface-navy', label: 'Gold on navy' },
  { fg: '--on-dark-gold-soft', bg: '--surface-navy', label: 'Soft gold on navy' },
  { fg: '--text-primary', bg: '--surface-navy', label: 'Heading colour (ink 900) on navy — the trap', large: true },
  { fg: '--text-link', bg: '--surface-navy', label: 'Link blue on navy' },
  { fg: '--status-negative', bg: '--surface-page', label: 'Negative red on white' },
  { fg: '--status-positive', bg: '--surface-page', label: 'Positive green on white' },
  { fg: '--status-caution', bg: '--surface-page', label: 'Caution amber on white' },
  { fg: '--color-red-600', bg: '--surface-navy', label: 'Red tag on navy' },
];

function Ratio({ r }: { r: number | null }) {
  if (r == null) return <span>—</span>;
  const w = wcag(r);
  return (
    <span className="contrast-cell">
      <span>{r.toFixed(2)}:1</span>
      <span className={w.aaNormal ? 'contrast-pass' : 'contrast-fail'}>{w.aaNormal ? 'AA' : w.aaLarge ? 'AA large' : 'Fail'}</span>
    </span>
  );
}

export function ColourPage() {
  usePageMeta('Colour · Foundations', 'ABA colour scales, semantic roles and WCAG contrast table.');
  const semantic = useMemo(() => SEMANTIC_GROUPS.map((g) => ({ ...g, rows: tokensInGroup(g.group) })), []);
  const pairs = useMemo(() => PAIRS.map((p) => ({ ...p, fgLit: literal(p.fg), bgLit: literal(p.bg), ratio: contrastRatio(literal(p.fg), literal(p.bg)) })), []);
  const failing = pairs.filter((p) => p.ratio != null && p.ratio < 4.5);

  return (
    <article>
      <PageHead kicker="Foundations" title="Colour" lede="Navy carries authority, gold marks what matters, ink does the reading. Every colour on the homepage is one of 36 primitives, addressed through semantic roles so surfaces and text stay in contrast." meta={['36 primitives', `${semantic.reduce((n, g) => n + g.rows.length, 0)} semantic roles`, `${pairs.length} contrast pairs`]} />

      <Section title="Primitive scales" meta="click a swatch to copy">
        {RAMPS.map((r) => (
          <div key={r.key} style={{ marginBottom: 28 }}>
            <H3>{r.name}</H3>
            <Prose><p>{r.note}</p></Prose>
            <div className="swatch-row">{sortRamp(tokensInGroup(r.key)).map((t) => <Swatch key={t.cssVar} t={t} />)}</div>
          </div>
        ))}
        <H3>Paper and white</H3>
        <div className="swatch-row">{['--color-paper', '--color-white'].map((v) => { const t = tokensInGroup('color').find((x) => x.cssVar === v); return t ? <Swatch key={v} t={t} /> : null; })}</div>
      </Section>

      <Section title="Semantic roles" meta="use these in components">
        <Prose><p>Components never reference a primitive directly when a role exists. Roles resolve to primitives in <code>tokens.json</code>; the resolved value is shown for reference.</p></Prose>
        {semantic.map((g) => (
          <div key={g.group} style={{ marginBottom: 28 }}>
            <H3>{g.title}</H3>
            <Prose><p>{g.desc}</p></Prose>
            <div>
              {g.rows.map((t) => (
                <div className="sem-row" key={t.cssVar}>
                  <div className="sem-row__chip" style={{ background: g.group === 'onDark' ? 'var(--color-blue-900)' : t.resolved, padding: g.group === 'onDark' ? 6 : 0 }}>
                    {g.group === 'onDark' && <div style={{ width: '100%', height: '100%', background: t.resolved, borderRadius: 2 }} />}
                  </div>
                  <div>
                    <div className="sem-row__name">{t.cssVar}</div>
                    <div className="sem-row__desc">{t.description ?? t.path}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="sem-row__val">{t.css !== t.resolved ? `${t.css} → ` : ""}{t.resolved}</span>
                    <CopyButton light text={`var(${t.cssVar})`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Contrast" meta="WCAG 2.1 AA · computed from tokens">
        <Prose>
          <p>Ratios are computed live from the resolved token values (translucent foregrounds are composited over their background first). AA requires <strong>4.5:1</strong> for body text and <strong>3:1</strong> for large text (≥ 24px, or ≥ 19px bold) and UI outlines.</p>
        </Prose>
        <Note>
          <strong>The “heading on navy” trap.</strong> Headings inherit <code>--text-primary</code> (ink 900). Drop a heading into a navy band without switching to <code>--on-dark-text</code> and it renders navy-on-navy at ~{pairs.find((p) => p.fg === '--text-primary' && p.bg === '--surface-navy')?.ratio?.toFixed(1)}:1 — invisible. Every navy organism sets its heading colour explicitly; do the same in anything new. {failing.length > 0 && <>Pairs currently failing AA for normal text: {failing.map((f) => f.label).join('; ')}.</>}
        </Note>
        <div className="doc-table-wrap">
          <table className="aba-table">
            <thead><tr><th scope="col">Sample</th><th scope="col">Pair</th><th scope="col">Foreground</th><th scope="col">Background</th><th scope="col">Ratio</th><th scope="col">Normal text</th><th scope="col">Large text</th></tr></thead>
            <tbody>
              {pairs.map((p) => {
                const w = p.ratio != null ? wcag(p.ratio) : null;
                return (
                  <tr key={p.label}>
                    <td><span className="contrast-sample" style={{ background: p.bgLit, color: p.fgLit, border: '1px solid var(--border-default)' }}>Aa Banking</span></td>
                    <td>{p.label}</td>
                    <td><code className="doc-code-inline">{p.fg}</code></td>
                    <td><code className="doc-code-inline">{p.bg}</code></td>
                    <td><Ratio r={p.ratio} /></td>
                    <td>{w ? <Badge tone={w.aaNormal ? 'positive' : 'negative'}>{w.aaNormal ? 'Pass' : 'Fail'}</Badge> : '—'}</td>
                    <td>{w ? <Badge tone={w.aaLarge ? 'positive' : 'negative'}>{w.aaLarge ? 'Pass' : 'Fail'}</Badge> : '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="All colour tokens">
        <TokenTable rows={[...tokensInGroup('color'), ...semantic.flatMap((g) => g.rows), ...tokensInGroup('accent'), ...tokensInGroup('focus'), ...tokensInGroup('editorial').filter((t) => t.cssVar === '--scrim')]} preview={(t) => <div style={{ width: 80, height: 28, borderRadius: 3, background: t.resolved, border: '1px solid var(--border-default)' }} />} />
      </Section>
    </article>
  );
}
