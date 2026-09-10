import { Link } from 'wouter';
import { Button, Kicker } from '@workspace/aba-design-system';
import { DOWNLOADS, IMAGES } from '../../lib/assets';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock } from '../../ui/Code';
import { DoDont, H3, Note, PageHead, Prose, Section } from '../../ui/Doc';

function LogoTile({ src, bg, label }: { src: string; bg: string; label: string; mono?: boolean }) {
  return (
    <div style={{ border: '1px solid var(--border-default)' }}>
      <div style={{ background: bg, padding: '40px 32px', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 160 }}>
        <img src={src} alt={label} style={{ height: 40 }} />
      </div>
      <div style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{label}</div>
    </div>
  );
}

export function LogoPage() {
  usePageMeta('Logo · Brand', 'The ABA logo system: primary, mono, clear space, minimum size, misuse and downloads.');
  return (
    <article>
      <PageHead kicker="Brand" title="Logo" lede="Two files ship with the homepage: the primary full-colour mark used on the white masthead, and the mono (white) mark used on the navy footer. Both are 2000×452 PNG at the same proportions (4.42:1)." meta={['2 files', 'PNG']} />
      <Section title="The marks">
        <div className="doc-grid doc-grid--2">
          <LogoTile src={IMAGES.mastheadLogo} bg="#fff" label="Primary · on white (masthead)" />
          <LogoTile src={IMAGES.footerLogo} bg="var(--color-blue-900)" label="Mono · on navy (footer)" mono />
        </div>
      </Section>
      <Section title="Clear space and minimum size">
        <div className="doc-grid doc-grid--2">
          <div style={{ border: '1px solid var(--border-default)', padding: 32, display: 'flex', justifyContent: 'center' }}>
            <div style={{ position: 'relative', padding: 22, border: '1px dashed var(--color-blue-300)' }}>
              <img src={IMAGES.mastheadLogo} alt="" style={{ height: 44, display: 'block' }} />
              <span style={{ position: 'absolute', top: -9, left: '50%', transform: 'translateX(-50%)', fontFamily: 'var(--font-mono)', fontSize: 10, background: '#fff', padding: '0 4px', color: 'var(--text-muted)' }}>x = ½ logo height</span>
            </div>
          </div>
          <Prose>
            <p><strong>Clear space.</strong> Keep at least half the logo’s height clear on every side. On the masthead the mark sits in the 64px masthead bar with the nav to its right; that spacing is the reference.</p>
            <p><strong>Minimum size.</strong> The masthead renders the mark at 44px tall on desktop and 32px on mobile. Do not render below <strong>28px</strong> in height (≈124px wide) in digital contexts.</p>
            <p><strong>Placement.</strong> Top-left on light chrome; bottom-left in the footer’s first column on navy.</p>
          </Prose>
        </div>
      </Section>
      <Section title="Misuse">
        <DoDont
          dos={['Use the primary mark on white or paper.', 'Use the mono mark on navy 900 or on photography with a navy scrim.', 'Scale proportionally from the supplied files.']}
          donts={['Don’t recolour the mark gold, blue or any other colour.', 'Don’t place the primary mark on navy (it disappears) or the mono mark on white.', 'Don’t stretch, rotate, outline, add drop shadows or place it in a box.', 'Don’t set the mark below 28px tall.']}
        />
        <div className="doc-grid doc-grid--3" style={{ marginTop: 16 }}>
          <div style={{ border: '1px solid var(--border-default)', padding: 24, background: 'var(--color-blue-900)', display: 'flex', justifyContent: 'center' }}><img src={IMAGES.mastheadLogo} alt="Primary mark wrongly placed on navy" style={{ height: 36, opacity: 0.9 }} /></div>
          <div style={{ border: '1px solid var(--border-default)', padding: 24, display: 'flex', justifyContent: 'center' }}><img src={IMAGES.mastheadLogo} alt="Stretched mark" style={{ height: 36, transform: 'scaleX(1.5)' }} /></div>
          <div style={{ border: '1px solid var(--border-default)', padding: 24, display: 'flex', justifyContent: 'center' }}><img src={IMAGES.mastheadLogo} alt="Mark with drop shadow" style={{ height: 36, filter: 'drop-shadow(0 6px 6px rgba(0,0,0,.5))' }} /></div>
        </div>
      </Section>
      <Section title="In code">
        <Prose><p>Organisms resolve the logo through <code>AbaAssetsProvider</code>, so a host app can point at its own copy of the file.</p></Prose>
        <CodeBlock language="tsx" code={`import { AbaAssetsProvider, Masthead } from '@workspace/aba-design-system';\nimport logo from '@workspace/aba-design-system/assets/images/e9b8cdba-14b2-47a7-98fc-71398702bfb2.png';\n\n<AbaAssetsProvider images={{ mastheadLogo: logo }}>\n  <Masthead />\n</AbaAssetsProvider>`} />
      </Section>
      <Section title="Downloads">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <a className="aba-btn aba-btn--primary" href={IMAGES.mastheadLogo} download="aba-logo-primary.png">Primary PNG</a>
          <a className="aba-btn aba-btn--navy" href={IMAGES.footerLogo} download="aba-logo-mono.png">Mono PNG</a>
          <a className="aba-btn aba-btn--secondary" href={DOWNLOADS.imagesZip} download="aba-brand-images.zip">Logo & image pack (.zip)</a>
        </div>
        <Note>Only raster files exist on the homepage. An SVG master, a stacked lockup and a favicon set are not part of this system yet — see the <Link href="/roadmap">Roadmap</Link>.</Note>
      </Section>
    </article>
  );
}

export function PhotographyPage() {
  usePageMeta('Photography · Brand', 'Photography direction: navy-toned cityscapes, event imagery and FIG captions.');
  return (
    <article>
      <PageHead kicker="Brand" title="Photography" lede="Two photographs carry the homepage: a financial-district cityscape at dusk in the hero and an advisors-in-session image in the Wealth & trust band. Both are graded toward navy and captioned like figures in a report." meta={['2 images', 'PNG']} />
      <Section title="The images">
        <div className="doc-grid doc-grid--2">
          {[{ src: IMAGES.heroCityscape, cap: 'FIG. 01 — HERO · FINANCIAL DISTRICT AT DUSK', d: '1376×768. Cool navy grade, warm window light, horizon low. Sits at the right of the hero with a caption bar beneath.' }, { src: IMAGES.wealthTrustPhoto, cap: 'FIG. 02 — WEALTH & TRUST · ADVISORS IN SESSION', d: '1264×848. People at work, medium shot, muted colour, no direct eye contact.' }].map((i) => (
            <figure key={i.cap} style={{ margin: 0, border: '1px solid var(--border-default)' }}>
              <img src={i.src} alt={i.cap} style={{ width: '100%', display: 'block' }} />
              <figcaption style={{ padding: '10px 14px', borderTop: '1px solid var(--border-default)' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{i.cap}</div>
                <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--text-secondary)' }}>{i.d}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>
      <Section title="Direction">
        <div className="doc-grid doc-grid--3">
          {[['Navy-toned', 'Grade toward blue 900 in the shadows; let highlights stay warm. Photographs should sit comfortably next to a navy band without a visible seam.'], ['Institutions and people', 'Cityscapes for scale and place; events and working sessions for people. No stock handshakes, no smiling-at-camera.'], ['Captioned as figures', 'Every editorial photograph carries a mono FIG caption: number, place or subject, and a short descriptor, in uppercase separated by · and —.']].map(([t, d]) => <div key={t} style={{ borderTop: '2px solid var(--color-blue-900)', paddingTop: 12 }}><H3>{t}</H3><p style={{ fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{d}</p></div>)}
        </div>
      </Section>
      <Section title="The FIG caption">
        <div style={{ background: 'var(--color-blue-900)', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.08em', color: 'var(--on-dark-muted)', borderTop: '1px solid var(--on-dark-hairline)', paddingTop: 10 }}><span>MEMBER BANKS FUND ~$12T IN LOANS</span><span>FIG. 01</span></div>
        </div>
        <CodeBlock language="tsx" code={`<figure>\n  <img src={image('heroCityscape')} alt="Financial district at dusk" />\n  <figcaption className="aba-mono-label">\n    <span>MEMBER BANKS FUND ~$12T IN LOANS</span><span>FIG. 01</span>\n  </figcaption>\n</figure>`} />
      </Section>
      <Section title="Do and don’t">
        <DoDont dos={['Crop to 16:9 or 3:2; keep the horizon in the lower third.', 'Add a caption bar; never a text overlay on the image.'] } donts={['Don’t round the corners or add a border radius.', 'Don’t use bright, saturated stock imagery.', 'Don’t place text over the photograph.']} />
      </Section>
      <div style={{ marginTop: 32 }}><Kicker>Download</Kicker><div style={{ marginTop: 10 }}><Button variant="secondary" onClick={() => { window.location.href = DOWNLOADS.imagesZip; }}>Logo & image pack (.zip)</Button></div></div>
    </article>
  );
}
