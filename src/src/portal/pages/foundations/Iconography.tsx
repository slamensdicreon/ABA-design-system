import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon, ChevronDownIcon, CloseIcon, InfoIcon, MenuIcon, SearchIcon } from '@workspace/aba-design-system';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock } from '../../ui/Code';
import { DoDont, Note, PageHead, Prose, Section } from '../../ui/Doc';

const ICONS = [
  { n: 'ArrowRightIcon', C: ArrowRightIcon, use: 'Links that move within the site; slides 3px on hover.' },
  { n: 'ArrowUpRightIcon', C: ArrowUpRightIcon, use: 'External links and “open” actions.' },
  { n: 'ChevronDownIcon', C: ChevronDownIcon, use: 'Nav tabs with a panel, accordions, selects.' },
  { n: 'CloseIcon', C: CloseIcon, use: 'Dismiss dialogs, drawers, toasts, the dock.' },
  { n: 'CheckIcon', C: CheckIcon, use: 'Checkbox mark, success states.' },
  { n: 'SearchIcon', C: SearchIcon, use: 'Search input affordance.' },
  { n: 'InfoIcon', C: InfoIcon, use: 'Alerts and tooltips.' },
  { n: 'MenuIcon', C: MenuIcon, use: 'Mobile navigation trigger.' },
];

export function IconographyPage() {
  usePageMeta('Iconography · Foundations', 'The arrow and link glyphs used on the ABA homepage.');
  return (
    <article>
      <PageHead kicker="Foundations" title="Iconography" lede="ABA barely uses icons. The homepage relies on typographic glyphs — → and ↗ set in the text — and eight small 1.5px-stroke line icons for interface chrome. There is no illustrative icon set." meta={['2 text glyphs', '8 line icons']} />
      <Section title="Text glyphs">
        <div className="doc-grid doc-grid--2">
          <div style={{ border: '1px solid var(--border-default)', padding: 24 }}><div style={{ fontSize: 56, lineHeight: 1, fontFamily: 'var(--font-sans)' }}>→</div><p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '12px 0 0' }}><code>U+2192</code> · in-site arrow links, “All →”, section headers. Set in the link’s own font, never as an icon.</p></div>
          <div style={{ border: '1px solid var(--border-default)', padding: 24 }}><div style={{ fontSize: 56, lineHeight: 1, fontFamily: 'var(--font-sans)' }}>↗</div><p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '12px 0 0' }}><code>U+2197</code> · external links (Banking Journal, partner sites).</p></div>
        </div>
      </Section>
      <Section title="Line icons">
        <div className="doc-grid doc-grid--4">
          {ICONS.map(({ n, C, use }) => (
            <div key={n} style={{ border: '1px solid var(--border-default)', padding: 20 }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12 }}><C size={32} /><C size={20} /><C size={16} /></div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11 }}>{n}</div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: '6px 0 0' }}>{use}</p>
            </div>
          ))}
        </div>
        <CodeBlock language="tsx" code={`import { ArrowRightIcon } from '@workspace/aba-design-system';\n\n<ArrowRightIcon size={16} />   // 1.5px stroke, currentColor, aria-hidden`} />
      </Section>
      <Section title="Rules">
        <Prose><p>Icons inherit <code>currentColor</code>, sit on a 24px grid at 16/20/24px, and are always decorative (<code>aria-hidden</code>) with the label carried by text.</p></Prose>
        <DoDont dos={['Use the text arrow for links; the icon arrow only inside buttons.', 'Keep stroke at 1.5px at every size.']} donts={['Don’t introduce filled or two-tone icons.', 'Don’t use icons without a text label.']} />
        <Note>A fuller icon set is a listed gap on the <a href={`${import.meta.env.BASE_URL}roadmap`}>Roadmap</a>.</Note>
      </Section>
    </article>
  );
}
