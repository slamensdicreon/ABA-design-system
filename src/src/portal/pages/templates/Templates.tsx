import { Link } from 'wouter';
import { Badge } from '@workspace/aba-design-system';
import { organisms } from '../../registry/organisms';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock } from '../../ui/Code';
import { FramedExample } from '../../ui/Example';
import { DoDont, Note, PageHead, Prose, Section } from '../../ui/Doc';

const BAND_COLOR: Record<string, string> = { light: '#fff', navy: 'var(--color-blue-900)', paper: 'var(--surface-sunken)', chrome: 'var(--color-line-100)' };
const BAND_TEXT: Record<string, string> = { light: 'var(--text-primary)', navy: '#fff', paper: 'var(--text-primary)', chrome: 'var(--text-primary)' };

export function TemplatePage() {
  usePageMeta('Editorial homepage template · Templates', 'Section rhythm, alternating light and navy bands, and container widths of the ABA homepage template.');
  const navy = organisms.filter((o) => o.band === 'navy').length;
  return (
    <article>
      <PageHead kicker="Templates" title="Editorial homepage template" lede="A single column of full-width bands inside one editorial container. White bands carry the hero, lists and grids; a paper band lifts Member benefits; three navy bands punctuate the page — Take action, Wealth & trust and the footer — and the chrome (utility bar, masthead, dock) frames it." meta={[`${organisms.length} organisms`, `${navy} navy bands`]} />
      <Section title="Rhythm">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }} className="template-layout">
          <div style={{ border: '1px solid var(--border-default)' }}>
            {organisms.map((o) => (
              <Link key={o.slug} href={`/organisms/${o.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${Math.max(10, Math.min(o.height / 12, 44))}px 20px`, background: BAND_COLOR[o.band], color: BAND_TEXT[o.band], textDecoration: 'none', borderBottom: '1px solid var(--border-default)' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em' }}><span style={{ opacity: 0.6, marginRight: 12 }}>{String(o.order).padStart(2, '0')}</span>{o.name}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, opacity: 0.7 }}>{o.band}</span>
              </Link>
            ))}
          </div>
          <Prose>
            <p><strong>Container.</strong> <code>--container-editorial</code> (1360px) with <code>--gutter-editorial</code> (32px → 20px) on every band. Backgrounds bleed full width.</p>
            <p><strong>Vertical padding.</strong> 64–96px per band on desktop, 48–64px below 768px. Chrome bands (utility bar, masthead) are fixed height.</p>
            <p><strong>Band order.</strong> Below the hero the page alternates recipes so no adjacent pair repeats: editorial index (white) → full-width statement (navy) → number moment (white) → lead-story list (paper) → typographic index (white) → image-led split (navy) → featured event + list (paper) → membership close (white) → footer (navy).</p>
            <p><strong>Headers.</strong> Every list band opens with the <Link href="/molecules/section-header">Section header</Link> molecule: kicker, hairline, meta, “All →”.</p>
          </Prose>
        </div>
      </Section>
      <Section title="Skeleton">
        <CodeBlock language="tsx" code={`import {\n  ${organisms.map((o) => o.componentName).join(', ')},\n  AbaAssetsProvider,\n} from '@workspace/aba-design-system';\nimport '@workspace/aba-design-system/css';\nimport '@workspace/aba-design-system/css/page.css';\n\nexport default function HomePage() {\n  return (\n    <AbaAssetsProvider images={images}>\n${organisms.map((o) => `      <${o.componentName} />`).join('\n')}\n    </AbaAssetsProvider>\n  );\n}`} />
        <Note>The live homepage at <a href="/">/</a> is built from these same thirteen sections in this order. It keeps its own copies of the components for now; wiring it to the shared package is a listed follow-up.</Note>
      </Section>
      <Section title="Rules">
        <DoDont dos={['Keep one navy band per screenful at most.', 'Keep the hero on white — the photograph brings the navy.', 'Use a section header on every list band.', 'Let the By the numbers band stand alone with generous padding.']} donts={['Don’t put two navy bands back to back.', 'Don’t add a sidebar — the template is a single column.', 'Don’t introduce card shadows into editorial bands.']} />
      </Section>
    </article>
  );
}

export function ExplodedHomepage() {
  usePageMeta('How the homepage is assembled · Templates', 'The live Advisory homepage exploded into its organisms, each linked to its documentation.');
  return (
    <article>
      <PageHead kicker="Templates & page" title="How the homepage is assembled" lede="The Advisory homepage, taken apart. Each block below is the real organism rendered from the shared package at the width you choose, in page order, with a link to its documentation and anatomy." meta={[`${organisms.length} sections`, <a key="l" href="/" target="_blank" rel="noreferrer">Open the live homepage ↗</a>]} />
      <Section title="Exploded view">
        <div className="explode">
          {organisms.map((o) => (
            <div className="explode__item" key={o.slug} id={o.slug}>
              <div className="explode__label">
                <span className="explode__num">{String(o.order).padStart(2, '0')}</span>
                <Link href={`/organisms/${o.slug}`} className="explode__name">{o.name} →</Link>
                <Badge tone={o.band === 'navy' ? 'brand' : 'neutral'}>{o.band}</Badge>
                {o.anatomy && <span className="explode__parts">{o.anatomy.length} parts: {o.anatomy.map((p, i) => <span key={i}>{p.href ? <Link href={p.href}>{p.label}</Link> : p.label}{i < o.anatomy!.length - 1 ? ', ' : ''}</span>)}</span>}
              </div>
              <FramedExample src={`preview/organisms/${o.slug}/default`} minHeight={Math.min(o.height, 480)} defaultViewport="desktop" />
            </div>
          ))}
        </div>
      </Section>
    </article>
  );
}
