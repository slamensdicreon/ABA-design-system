import { registry, TIER_LABEL, type Tier } from '../registry';
import { usePageMeta } from '../lib/meta';
import { DocCard, PageHead, Prose, inlineCode } from '../ui/Doc';

const INTRO: Record<Tier, { lede: string; body: string }> = {
  atoms: { lede: 'The primitives: everything on the homepage reduces to these. Each page shows live variants and states, a props table, usage guidance and copy-ready JSX and CSS.', body: 'Atoms are styled by the `.aba-*` classes in the design-system stylesheet, so they can be used from plain HTML as well as React.' },
  molecules: { lede: 'Small compositions of atoms that recur across the homepage — section headers, story cards, list rows — plus the application patterns (alerts, tabs, dialogs, tables) defined in the design-system stylesheet.', body: 'Editorial molecules carry their own CSS module, extracted from the homepage sections; the CSS tab on each page shows exactly those rules.' },
  organisms: { lede: 'The thirteen composed sections of The Advisory homepage, rendered live from the shared package with a viewport toggle and an anatomy overlay naming the parts inside.', body: 'Organisms are documented compositions. Their content comes from the shared content package; their imagery from the package assets.' },
};

export function ComponentIndex({ tier }: { tier: Tier }) {
  const list = registry[tier];
  usePageMeta(TIER_LABEL[tier], INTRO[tier].lede);
  return (
    <div>
      <PageHead kicker="Components" title={TIER_LABEL[tier]} lede={INTRO[tier].lede} meta={[`${list.length} ${tier}`]} />
      <Prose><p>{inlineCode(INTRO[tier].body)}</p></Prose>
      <div className="doc-grid doc-grid--3" style={{ marginTop: 32 }}>
        {list.map((c, i) => (
          <DocCard
            key={c.slug}
            href={`/${tier}/${c.slug}`}
            index={String(i + 1).padStart(2, '0')}
            title={c.name}
            desc={c.summary.length > 120 ? c.summary.slice(0, 117).replace(/\s+\S*$/, '') + '…' : c.summary}
            preview={tier !== 'organisms' && c.examples[0] ? <div style={{ zoom: 0.8 }}>{c.examples[0].render()}</div> : undefined}
          />
        ))}
      </div>
    </div>
  );
}
