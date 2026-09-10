import { Link } from 'wouter';
import { Badge } from '@workspace/aba-design-system';
import { DOWNLOADS, IMAGES } from '../../lib/assets';
import { parseFontFaces } from '../../lib/css-source';
import { tokens } from '../../lib/tokens';
import { usePageMeta } from '../../lib/meta';
import { CodeBlock, CodeTabs } from '../../ui/Code';
import { H3, Note, PageHead, Prose, Section } from '../../ui/Doc';

function Row({ title, desc, href, file, kind }: { title: string; desc: string; href: string; file: string; kind: string }) {
  return (
    <div className="dl-row">
      <div><div className="dl-row__title">{title}</div><div className="dl-row__desc">{desc}</div></div>
      <Badge tone="neutral">{kind}</Badge>
      <a className="aba-btn aba-btn--secondary aba-btn--sm" href={href} download={file}>Download</a>
    </div>
  );
}

export function ResourcesPage() {
  usePageMeta('Downloads · Resources', 'Download ABA tokens (JSON, CSS, Figma variables), fonts and the logo pack.');
  const faces = parseFontFaces();
  const byFamily = faces.reduce<Record<string, typeof faces>>((acc, f) => { (acc[f.family] ||= []).push(f); return acc; }, {});
  return (
    <article>
      <PageHead kicker="Resources" title="Downloads" lede="Everything in this portal is generated from one source: tokens.json in the design-system package. Download the tokens in three formats, the self-hosted fonts, and the logo and image pack." meta={[`${tokens.length} tokens`, `${faces.length} font faces`]} />
      <Section title="Tokens">
        <Row title="tokens.json" desc="DTCG-format source of truth: primitive → semantic → component tiers with $type, $value and $description." href={DOWNLOADS.tokensJson} file="aba-tokens.json" kind="DTCG JSON" />
        <Row title="tokens.css" desc="Generated CSS custom properties on :root — drop into any site." href={DOWNLOADS.tokensCss} file="aba-tokens.css" kind="CSS" />
        <Row title="tokens.flat.json" desc="Flat map of CSS variable → resolved value, for build scripts and tests." href={DOWNLOADS.tokensFlat} file="aba-tokens.flat.json" kind="JSON" />
        <Row title="figma-variables.json" desc="Figma-ready variables (collections, modes, aliases) for import with a variables importer plugin." href={DOWNLOADS.figmaVars} file="aba-figma-variables.json" kind="Figma" />
        <Row title="All token formats" desc="The four files above, zipped." href={DOWNLOADS.tokensZip} file="aba-tokens.zip" kind="ZIP" />
      </Section>
      <Section title="Fonts">
        <Prose><p>Self-hosted WOFF2 subsets with <code>@font-face</code> declarations in <code>fonts.css</code>. Licensing: Gloock and IBM Plex Mono are OFL; Google Sans is licensed for ABA properties — check before using outside them.</p></Prose>
        {Object.entries(byFamily).map(([fam, list]) => (
          <div key={fam} style={{ marginBottom: 16 }}>
            <H3>{fam} <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>· {list.length} files</span></H3>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{Array.from(new Set(list.map((f) => `${f.weight} ${f.style}`))).join(' · ')}</div>
          </div>
        ))}
        <Row title="aba-fonts.zip" desc="All font files plus fonts.css." href={DOWNLOADS.fontsZip} file="aba-fonts.zip" kind="ZIP" />
      </Section>
      <Section title="Logo & images">
        <div style={{ display: 'flex', gap: 12, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ border: '1px solid var(--border-default)', padding: 16, background: '#fff' }}><img src={IMAGES.mastheadLogo} alt="Primary logo" style={{ height: 28 }} /></div>
          <div style={{ border: '1px solid var(--border-default)', padding: 16, background: 'var(--color-blue-900)' }}><img src={IMAGES.footerLogo} alt="Mono logo" style={{ height: 28 }} /></div>
        </div>
        <Row title="aba-brand-images.zip" desc="Primary and mono logos plus the two homepage photographs." href={DOWNLOADS.imagesZip} file="aba-brand-images.zip" kind="ZIP" />
        <Note>Usage rules are on the <Link href="/brand/logo">Logo</Link> and <Link href="/brand/photography">Photography</Link> pages.</Note>
      </Section>
    </article>
  );
}

export function GettingStartedPage() {
  usePageMeta('Getting started · Resources', 'Install and use the @workspace/aba-design-system package.');
  return (
    <article>
      <PageHead kicker="Resources" title="Getting started" lede="The package is framework-agnostic at the CSS layer and React at the component layer. Use the CSS alone for plain HTML, or import the React components." />
      <Section title="Install">
        <CodeBlock language="json" code={`// package.json (pnpm workspace)\n{\n  "dependencies": {\n    "@workspace/aba-design-system": "workspace:*"\n  }\n}`} />
      </Section>
      <Section title="Use the CSS">
        <CodeTabs tabs={[
          { label: 'Import', language: 'ts', code: `import '@workspace/aba-design-system/css';        // tokens + fonts + base + components\nimport '@workspace/aba-design-system/css/page.css'; // page-level editorial rules` },
          { label: 'Plain HTML', language: 'html', code: `<button class="aba-btn aba-btn--primary">Join ABA</button>\n<span class="aba-kicker">The house view</span>\n<a class="aba-link-arrow" href="/view">Read the view <span aria-hidden="true">→</span></a>` },
        ]} />
      </Section>
      <Section title="Use the React components">
        <CodeBlock language="tsx" code={`import { Button, Kicker, SectionHeader, Hero, AbaAssetsProvider } from '@workspace/aba-design-system';\nimport hero from '@workspace/aba-design-system/assets/images/986be0ce-7527-485f-93bd-b2c0e610393f.png';\n\nexport function Page() {\n  return (\n    <AbaAssetsProvider images={{ heroCityscape: hero }}>\n      <Hero />\n      <SectionHeader title="The house view" meta="Updated weekly" link={{ href: '/view', label: 'All' }} />\n      <Button variant="gold">Join ABA</Button>\n    </AbaAssetsProvider>\n  );\n}`} />
      </Section>
      <Section title="Tokens in code">
        <CodeBlock language="ts" code={`import { tokens, tokenByVar } from '@workspace/aba-design-system';\n\ntokenByVar['--color-blue-900'].resolved; // "#0B2440"\ntokens.filter((t) => t.tier === 'semantic').length;`} />
      </Section>
      <Section title="Keeping in sync">
        <Prose><p>Run <code>pnpm --filter @workspace/aba-design-system check</code> to regenerate the CSS and packs and to run the drift check, which fails if any custom property used by the homepage is missing from <code>tokens.json</code> or if any <code>.aba-*</code> rule differs between the homepage stylesheet and the package.</p></Prose>
      </Section>
    </article>
  );
}

export const CHANGELOG = [
  { version: '1.1.0', date: '2026-09-10', items: ['Organisms follow the re-edited 13-section homepage: By the numbers and Learn & convene added; Positions strip, Scale band, One number, Conferences, Trainings, Programs, Member benefits and Foundation retired (their molecules remain in the package, labelled as legacy where no longer on the page).', 'tokens.json now uses typed DTCG values (dimension/duration objects, cubicBezier arrays, fontFamily arrays, shadow objects, hex colours) with a validator in the check pipeline; generated CSS unchanged.', 'Generated token and pack files are produced automatically before portal dev and build.'] },
  { version: '1.0.0', date: '2026-09-09', items: ['Initial release: tokens.json (DTCG) with generator for CSS, flat JSON and Figma variables.', 'Self-hosted fonts (Gloock, Google Sans, IBM Plex Mono) and logo/image assets.', '20 atoms, 26 molecules and 19 organisms extracted from The Advisory homepage.', 'Drift check between homepage CSS and package.', 'Brand portal published at /brand/.'] },
];

export function ChangelogPage() {
  usePageMeta('Changelog · Resources', 'Versions of the ABA design system.');
  return (
    <article>
      <PageHead kicker="Resources" title="Changelog" lede="Versions of the design-system package and this portal." />
      {CHANGELOG.map((c) => (
        <Section key={c.version} title={`v${c.version}`} meta={c.date}>
          <ul className="doc-list">{c.items.map((i) => <li key={i}>{i}</li>)}</ul>
        </Section>
      ))}
    </article>
  );
}
