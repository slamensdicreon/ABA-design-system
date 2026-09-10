import { useState } from 'react';
import { Link } from 'wouter';
import { Badge, Switch } from '@workspace/aba-design-system';
import { findComponent, TIER_LABEL, TIER_SINGULAR, type Tier } from '../registry';
import { organismBySlug } from '../registry/organisms';
import { cssRulesFor } from '../lib/css-source';
import { byVar } from '../lib/tokens';
import { usePageMeta } from '../lib/meta';
import { DoDont, Note, PageHead, Section } from '../ui/Doc';
import { CodeBlock } from '../ui/Code';
import { Example, FramedExample } from '../ui/Example';
import { PropsTable } from '../ui/PropsTable';
import { NotFound } from './NotFound';

export function ComponentPage({ tier, slug }: { tier: Tier; slug: string }) {
  const def = findComponent(tier, slug);
  usePageMeta(def ? `${def.name} · ${TIER_LABEL[tier]}` : 'Not found', def?.summary);
  if (!def) return <NotFound />;

  const css = def.css ?? (def.cssPrefixes ? cssRulesFor(def.cssPrefixes) : '');
  const org = tier === 'organisms' ? organismBySlug[slug] : undefined;

  return (
    <article>
      <PageHead
        kicker={TIER_SINGULAR[tier]}
        title={def.name}
        lede={def.summary}
        meta={[
          ...(def.usedIn?.length ? [`Used in: ${def.usedIn.join(', ')}`] : []),
          `${def.examples.length || 1} example${def.examples.length === 1 ? '' : 's'}`,
        ]}
      />

      <Section title="Import">
        <CodeBlock code={def.importCode} language="tsx" />
      </Section>

      {org && <OrganismExample slug={slug} />}

      {def.examples.length > 0 && (
        <Section title={tier === 'atoms' ? 'Variants & states' : 'Examples'}>
          {def.examples.map((ex) => (
            ex.framed ? (
              <FramedExample key={ex.id} title={ex.title} desc={ex.desc} src={`preview/${tier}/${slug}/${ex.id}`} code={ex.code} minHeight={ex.minHeight} />
            ) : (
              <Example key={ex.id} title={ex.title} desc={ex.desc} dark={ex.dark} stack={ex.stack} code={ex.code}>
                {ex.render()}
              </Example>
            )
          ))}
        </Section>
      )}

      <Section title="Props">
        <PropsTable props={def.props} />
      </Section>

      <Section title="Usage">
        <DoDont dos={def.dos} donts={def.donts} />
      </Section>

      {def.tokens && def.tokens.length > 0 && (
        <Section title="Tokens used">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {def.tokens.map((v) => {
              const t = byVar(v);
              return (
                <Link key={v} href={tokenHref(v)} style={{ textDecoration: 'none' }}>
                  <Badge tone={t ? 'brand' : 'neutral'}>{v}{t ? ` · ${t.resolved}` : ''}</Badge>
                </Link>
              );
            })}
          </div>
        </Section>
      )}

      {css && (
        <Section title="CSS" meta="from the design-system package">
          <CodeBlock code={css} language="css" />
        </Section>
      )}

      {def.related && def.related.length > 0 && (
        <Section title="Related">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {def.related.map((r) => {
              const [t, s] = r.split('/') as [Tier, string];
              const c = findComponent(t, s);
              return c ? <Link key={r} href={`/${r}`} className="aba-btn aba-btn--ghost aba-btn--sm">{c.name} →</Link> : null;
            })}
          </div>
        </Section>
      )}
    </article>
  );
}

function tokenHref(v: string) {
  if (v.startsWith('--color') || v.startsWith('--text-') && !/--text-(2xs|xs|sm|base|md|lg|xl|2xl|3xl|4xl|5xl|6xl)/.test(v) || v.startsWith('--surface') || v.startsWith('--border') || v.startsWith('--interactive') || v.startsWith('--status') || v.startsWith('--on-dark') || v.startsWith('--focus') || v.startsWith('--accent') || v === '--scrim') return '/foundations/colour';
  if (v.startsWith('--font') || v.startsWith('--text-') || v.startsWith('--weight') || v.startsWith('--leading') || v.startsWith('--tracking') || v.startsWith('--kicker') || v.startsWith('--meta')) return '/foundations/typography';
  if (v.startsWith('--space') || v.startsWith('--gutter') || v.startsWith('--section') || v.startsWith('--card-pad')) return '/foundations/spacing';
  if (v.startsWith('--radius')) return '/foundations/radii';
  if (v.startsWith('--shadow') || v.startsWith('--ring')) return '/foundations/shadows';
  if (v.startsWith('--duration') || v.startsWith('--ease')) return '/foundations/motion';
  if (v.startsWith('--z-')) return '/foundations/z-index';
  return '/foundations/grid';
}

function OrganismExample({ slug }: { slug: string }) {
  const org = organismBySlug[slug];
  const [anatomy, setAnatomy] = useState(false);
  const parts = org.anatomy ?? [];
  return (
    <Section title="Live example" meta="rendered from the package">
      <FramedExample
        title={org.name}
        desc="Resize with the viewport toggle — real media queries apply."
        src={`preview/organisms/${slug}/default${anatomy ? '?anatomy=1' : ''}`}
        minHeight={org.height}
        code={org.importCode}
        anatomy={<Switch label="Anatomy" checked={anatomy} onChange={(e) => setAnatomy(e.target.checked)} />}
      >
        {anatomy && parts.length > 0 && (
          <div style={{ padding: '12px 16px 16px', borderTop: '1px solid var(--border-default)' }}>
            <div className="anatomy-legend">
              {parts.map((p, i) => (
                <div className="anatomy-legend__item" key={i}>
                  <span className="anatomy-marker">{i + 1}</span>
                  <span>{p.href ? <Link href={p.href}>{p.label}</Link> : p.label} <span className="anatomy-legend__tier">{p.tier}</span></span>
                </div>
              ))}
            </div>
          </div>
        )}
      </FramedExample>
      {!anatomy && <Note>Turn on <strong>Anatomy</strong> to overlay numbered markers naming the atoms and molecules inside this organism, each linked to its page.</Note>}
    </Section>
  );
}
