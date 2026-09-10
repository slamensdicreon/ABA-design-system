import { useState } from 'react';
import {
  Accordion, Alert, ArticleCard, Breadcrumbs, Button, CenteredSectionHeader, ConferenceCard, Dialog, EmptyState,
  FeaturedPanel, HouseViewCard, MegaMenuLinkGroup, Menu, NavTab, NavTabs, NewsRow, NumberedCard,
  Pagination, ProgramRow, QuickAction, QuickActionRow, RankedItem, SearchIcon, SectionHeader, StatBandCell, Table,
  Tabs, Ticker, TickerItem, Toast, Tooltip, TopicCard, TrainingRow, SegmentedControl,
} from '@workspace/aba-design-system';
import { editorialCss, moduleRulesFor } from '../lib/css-source';
import type { ComponentDef } from './types';

const imp = (names: string) => `import { ${names} } from '@workspace/aba-design-system';`;
const mcss = (classes: string[]) => moduleRulesFor(classes, editorialCss);

const wide: React.CSSProperties = { width: '100%' };

function TabsDemo() {
  const [v, setV] = useState('all');
  return <Tabs value={v} onChange={setV} items={[{ id: 'all', label: 'All', count: 128 }, { id: 'policy', label: 'Policy', count: 42 }, { id: 'research', label: 'Research', count: 18 }, { id: 'events', label: 'Events' }]} />;
}
function SegDemo() {
  const [v, setV] = useState('desktop');
  return <SegmentedControl label="Viewport" value={v} onChange={setV} items={[{ id: 'desktop', label: 'Desktop' }, { id: 'tablet', label: 'Tablet' }, { id: 'mobile', label: 'Mobile' }]} />;
}
function PaginationDemo() {
  const [p, setP] = useState(3);
  return <Pagination page={p} pageCount={12} onChange={setP} />;
}
function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={wide}>
      <Button variant="secondary" onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)} title="Leave this page?" footer={<><Button variant="ghost" onClick={() => setOpen(false)}>Stay</Button><Button onClick={() => setOpen(false)}>Leave</Button></>}>
        <p style={{ margin: 0 }}>Your draft comment will not be saved.</p>
      </Dialog>
      <div style={{ marginTop: 20 }}>
        <Dialog open inline onClose={() => {}} title="Leave this page?" footer={<><Button variant="ghost">Stay</Button><Button>Leave</Button></>}>
          <p style={{ margin: 0 }}>Your draft comment will not be saved. (Static, in-flow rendering for documentation.)</p>
        </Dialog>
      </div>
    </div>
  );
}
function ToastDemo() {
  return (<>
    <Toast onClose={() => {}}>Saved to your reading list.</Toast>
    <Toast tone="success" onClose={() => {}}>Registration confirmed.</Toast>
    <Toast tone="danger" onClose={() => {}}>Could not send. Try again.</Toast>
  </>);
}
function NavTabsDemo() {
  const [a, setA] = useState('advocacy');
  const tabs = ['Advocacy', 'News & Research', 'Training & Events', 'Compliance', 'Banking Topics', 'Membership'];
  return <NavTabs>{tabs.map((t) => { const id = t.toLowerCase().split(' ')[0]; return <NavTab key={t} active={a === id} onClick={() => setA(id)}>{t}</NavTab>; })}</NavTabs>;
}

type Row = { id: string; title: string; type: string; date: string; reads: number };
const rows: Row[] = [
  { id: '1', title: 'ABA statement on the Clarity Act', type: 'Press release', date: 'Sep 8', reads: 1240 },
  { id: '2', title: 'Deposit trends: Q3 outlook', type: 'Research', date: 'Sep 5', reads: 980 },
  { id: '3', title: 'Bank Marketing conference recap', type: 'Journal', date: 'Sep 2', reads: 611 },
];

export const molecules: ComponentDef[] = [
  {
    slug: 'section-header',
    name: 'Section header',
    tier: 'molecules',
    summary: 'The rhythm device of the homepage: an uppercase 11px title, a hairline, optional mono meta and an “All →” link on the same baseline. A centred serif variant opens Benefits and Foundation-style sections.',
    usedIn: ['House view', 'Latest news', 'Banking topics', 'Learn & convene'],
    importCode: imp('SectionHeader, CenteredSectionHeader'),
    css: mcss(['sectionHeader', 'sectionTitle', 'sectionRule', 'sectionMeta', 'sectionLink', 'sectionHeaderCentered', 'centeredKick', 'centeredTitle']),
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Uppercase section name.' },
      { name: 'meta', type: 'ReactNode', description: 'Mono meta (“Updated weekly”, “ABA Banking Journal”).' },
      { name: 'link', type: '{ label; href }', description: 'Trailing arrow link, usually “All”.' },
      { name: 'onDark', type: 'boolean', default: 'false', description: 'Inverse colours for navy bands.' },
    ],
    examples: [
      {
        id: 'default', title: 'Section header', stack: true,
        render: () => (<><SectionHeader title="The house view" meta="Updated weekly" link={{ label: 'All', href: '#' }} /><SectionHeader title="Latest news" meta="ABA Banking Journal" link={{ label: 'All news', href: '#' }} /><SectionHeader title="By the numbers" /></>),
        code: `<SectionHeader title="The house view" meta="Updated weekly" link={{ label: 'All', href: '/news' }} />\n<SectionHeader title="By the numbers" />`,
      },
      {
        id: 'centered', title: 'Centred (Member benefits)', stack: true,
        render: () => <CenteredSectionHeader kicker="Member benefits" title="What comes with a seat at the table." />,
        code: `<CenteredSectionHeader kicker="Member benefits" title="What comes with a seat at the table." />`,
      },
      {
        id: 'dark', title: 'On navy', dark: true, stack: true,
        render: () => <SectionHeader onDark title="Wealth & trust" meta="ABA Trust" link={{ label: 'All', href: '#' }} />,
        code: `<SectionHeader onDark title="Wealth & trust" link={{ label: 'All', href: '/trust' }} />`,
      },
    ],
    dos: ['Keep titles to two or three words in the voice of a newspaper section.', 'Put the link on the right, the meta beside the title.'],
    donts: ['Don’t use a serif heading here — the uppercase sans label is what separates sections from stories.'],
    related: ['atoms/kicker', 'atoms/arrow-link', 'atoms/rule'],
  },
  {
    slug: 'house-view-card',
    name: 'House-view story card',
    tier: 'molecules',
    summary: 'A gold mono index, serif title that turns blue on hover, one-sentence dek and uppercase meta. Sits in a four-up grid separated by hairlines.',
    usedIn: ['House view'],
    importCode: imp('HouseViewCard'),
    css: mcss(['storyCard', 'storyCardFirst', 'storyIdx', 'storyTitle', 'storyDek', 'storyMeta']),
    props: [
      { name: 'index', type: 'string', required: true, description: 'Two-digit index, e.g. “01”.' },
      { name: 'title / dek / meta', type: 'ReactNode', required: true, description: 'Headline, one-line summary, uppercase meta.' },
      { name: 'href', type: 'string', required: true, description: 'Destination.' },
      { name: 'first', type: 'boolean', default: 'false', description: 'Removes the left hairline in a grid.' },
    ],
    examples: [
      {
        id: 'grid', title: 'Four-up grid',
        render: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%' }}>
            <HouseViewCard first index="01" title="Rate caps lead to less credit" href="#" dek="What price controls do to lending at the margin — and to the borrowers with the fewest options." meta="ECONOMIC INSIGHT · JUN 2026" />
            <HouseViewCard index="02" title="The stablecoin yield question" href="#" dek="Why yield loopholes would drain the deposits communities borrow against." meta="POLICY · JUL 13" />
            <HouseViewCard index="03" title="Tokenized deposits, settled" href="#" dek="The future of settlement, read from the bank balance sheet." meta="RESEARCH · MAR 2026" />
          </div>
        ),
        code: `<HouseViewCard first index="01" title="Rate caps lead to less credit" href="/view/rate-caps"\n  dek="What price controls do to lending at the margin." meta="ECONOMIC INSIGHT · JUN 2026" />`,
      },
    ],
    dos: ['Headlines are declarative sentences, not topics.', 'Keep deks to one sentence.'],
    donts: ['Don’t add images — the House view is deliberately typographic.'],
    related: ['atoms/mono-label', 'organisms/house-view'],
  },
  {
    slug: 'numbered-card',
    name: 'Numbered card / Benefit card',
    tier: 'molecules',
    summary: 'Gold index, serif title, description, optional arrow link. The Member benefits grid uses it three-up on hairline cells.',
    usedIn: ['Membership close (benefit columns)'],
    importCode: imp('NumberedCard, BenefitCard'),
    css: mcss(['numberedCard', 'numberedIdx', 'numberedTitle', 'numberedDesc', 'numberedLink']),
    props: [
      { name: 'index', type: 'string', required: true, description: '“01”.' },
      { name: 'title / description', type: 'ReactNode', required: true, description: 'Content.' },
      { name: 'link', type: '{ label; href }', description: 'Trailing arrow link.' },
    ],
    examples: [
      {
        id: 'default', title: 'Three-up',
        render: () => (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24, width: '100%' }}>
            <NumberedCard index="01" title="A voice in Washington" description="Full-time advocacy before Congress, the agencies and the courts." link={{ label: 'How we advocate', href: '#' }} />
            <NumberedCard index="02" title="Answers when you call" description="Compliance, legal and operations staff who pick up the phone." link={{ label: 'Member services', href: '#' }} />
            <NumberedCard index="03" title="Talent that stays" description="Training, certification and schools for every level of your bank." />
          </div>
        ),
        code: `<NumberedCard index="01" title="A voice in Washington"\n  description="Full-time advocacy before Congress, the agencies and the courts."\n  link={{ label: 'How we advocate', href: '/advocacy' }} />`,
      },
    ],
    dos: ['Use consecutive two-digit indices.'],
    donts: ['Don’t exceed six cards — the numbering stops helping.'],
    related: ['organisms/membership-close'],
  },
  {
    slug: 'ticker-item',
    name: 'Positions / ticker item',
    tier: 'molecules',
    summary: 'A policy position with a gold or red status tag, arranged in the horizontal Positions strip.',
    usedIn: ['Legacy — the Positions strip was removed from the homepage; kept in the package for advocacy pages'],
    importCode: imp('TickerItem'),
    css: mcss(['tickerItem', 'tickerTag', 'tickerTagGold', 'tickerTagRed']),
    props: [
      { name: 'label', type: 'ReactNode', required: true, description: 'Issue name.' },
      { name: 'tag', type: 'ReactNode', description: 'Status text (“Supported”, “At risk”).' },
      { name: 'tone', type: "'gold' | 'red'", default: "'gold'", description: 'Tag colour.' },
    ],
    examples: [
      {
        id: 'default', title: 'Positions',
        render: () => (<><TickerItem label="Clarity Act" tag="At risk" tone="red" /><TickerItem label="Credit card routing" tag="Opposed" tone="red" /><TickerItem label="ACRE Act" tag="Supported" /><TickerItem label="Tax parity" tag="Supported" /></>),
        code: `<TickerItem label="Clarity Act" tag="At risk" tone="red" />\n<TickerItem label="ACRE Act" tag="Supported" />`,
      },
    ],
    dos: ['Red only for positions under active threat.'],
    donts: ['Don’t animate the strip — it is scannable, not a stock ticker.'],
    related: ['molecules/ticker'],
  },
  {
    slug: 'program-row',
    name: 'Program row / Training row',
    tier: 'molecules',
    summary: 'Hairline-bordered list row: title, optional subtitle, right-aligned mono meta. The homepage’s Programs and Trainings grids are made of these.',
    usedIn: ['Wealth & trust (link list)', 'Learn & convene (Next up rows)'],
    importCode: imp('ProgramRow, TrainingRow'),
    css: mcss(['listRow', 'listRowTitle', 'listRowSub', 'listRowMeta']),
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Program or course name.' },
      { name: 'subtitle', type: 'ReactNode', description: 'One-line description.' },
      { name: 'meta', type: 'ReactNode', description: 'Type or date, in mono.' },
    ],
    examples: [
      {
        id: 'default', title: 'Rows', stack: true,
        render: () => (<div style={{ width: '100%' }}>
          <ProgramRow href="#" title="Stonier Graduate School of Banking" subtitle="Executive education with Wharton" meta="PROGRAM" />
          <ProgramRow href="#" title="Emerging Leaders Forum" subtitle="For the next generation of bank leadership" meta="FORUM" />
          <TrainingRow href="#" title="Certified Regulatory Compliance Manager" meta="CERTIFICATION" />
        </div>),
        code: `<ProgramRow href="/stonier" title="Stonier Graduate School of Banking" subtitle="Executive education with Wharton" meta="PROGRAM" />`,
      },
    ],
    dos: ['Right-align meta; keep it to one word or a short date.'],
    donts: ['Don’t add chevrons — the hover colour shift is the affordance.'],
    related: ['organisms/learn-and-convene', 'organisms/wealth-and-trust'],
  },
  {
    slug: 'topic-card',
    name: 'Topic card',
    tier: 'molecules',
    summary: 'Hairline grid cell with index, bold label, muted description and an arrow that slides in on hover.',
    usedIn: ['Banking topics'],
    importCode: imp('TopicCard'),
    css: mcss(['topicCard', 'topicIdx', 'topicLabel', 'topicDesc', 'topicArrow']),
    props: [
      { name: 'index', type: 'string', required: true, description: '“01”.' },
      { name: 'label / description', type: 'ReactNode', required: true, description: 'Topic name and one-line summary.' },
    ],
    examples: [
      {
        id: 'default', title: 'Grid',
        render: () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%', border: '1px solid var(--border-default)' }}>
          <TopicCard href="#" index="01" label="Payments" description="Real-time rails, cards and the future of settlement." />
          <TopicCard href="#" index="02" label="Cybersecurity" description="Threat intelligence and resilience for every bank." />
          <TopicCard href="#" index="03" label="Agricultural banking" description="Financing the farm economy." />
        </div>),
        code: `<TopicCard href="/topics/payments" index="01" label="Payments" description="Real-time rails, cards and the future of settlement." />`,
      },
    ],
    dos: ['Order topics by importance, not alphabet.'],
    donts: ['Don’t add icons per topic.'],
    related: ['organisms/banking-topics'],
  },
  {
    slug: 'news-row',
    name: 'News list row',
    tier: 'molecules',
    summary: 'Type label and date in mono over a serif headline. Rows stack with hairlines in Latest news.',
    usedIn: ['Latest news'],
    importCode: imp('NewsRow'),
    css: mcss(['newsRow', 'newsRowTop', 'newsType', 'newsTitle', 'newsDate']),
    props: [
      { name: 'type', type: 'ReactNode', required: true, description: '“PRESS RELEASE”, “JOURNAL”.' },
      { name: 'title', type: 'ReactNode', required: true, description: 'Headline.' },
      { name: 'date', type: 'ReactNode', required: true, description: 'Short date.' },
      { name: 'first', type: 'boolean', default: 'false', description: 'Removes the top hairline.' },
    ],
    examples: [
      {
        id: 'default', title: 'Rows', stack: true,
        render: () => (<div style={{ width: '100%' }}>
          <NewsRow first href="#" type="PRESS RELEASE" title="ABA statement on Senate consideration of the Clarity Act" date="SEP 8" />
          <NewsRow href="#" type="JOURNAL" title="How community banks are pricing deposits this fall" date="SEP 5" />
          <NewsRow href="#" type="RESEARCH" title="Consumer survey: mobile is now the front door" date="SEP 2" />
        </div>),
        code: `<NewsRow first href="/news/clarity-act" type="PRESS RELEASE" title="ABA statement on Senate consideration of the Clarity Act" date="SEP 8" />`,
      },
    ],
    dos: ['Use the type label to signal the source, not the topic.'],
    donts: ['Don’t truncate headlines with ellipses.'],
    related: ['organisms/latest-news'],
  },
  {
    slug: 'conference-card',
    name: 'Conference card',
    tier: 'molecules',
    summary: 'Gold mono dates, serif title, “Details →” CTA. Cards sit in a hairline-separated row.',
    usedIn: ['Learn & convene (featured panel)'],
    importCode: imp('ConferenceCard'),
    css: mcss(['confCard', 'confCardFirst', 'confDates', 'confTitle', 'confCta']),
    props: [
      { name: 'dates', type: 'ReactNode', required: true, description: 'Dates and city in uppercase mono.' },
      { name: 'title', type: 'ReactNode', required: true, description: 'Event name.' },
      { name: 'cta', type: 'ReactNode', default: "'Details →'", description: 'CTA text.' },
      { name: 'first', type: 'boolean', description: 'Removes left hairline.' },
    ],
    examples: [
      {
        id: 'default', title: 'Row',
        render: () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', width: '100%' }}>
          <ConferenceCard first href="#" dates="OCT 19–21 · WASHINGTON, DC" title="ABA Annual Convention" />
          <ConferenceCard href="#" dates="NOV 3–5 · NEW ORLEANS" title="Agricultural Bankers Conference" />
          <ConferenceCard href="#" dates="FEB 8–11 · SAN DIEGO" title="Conference for Community Bankers" />
        </div>),
        code: `<ConferenceCard first href="/annual" dates="OCT 19–21 · WASHINGTON, DC" title="ABA Annual Convention" />`,
      },
    ],
    dos: ['Format dates as MON D–D · CITY.'],
    donts: ['Don’t include prices or badges on the card.'],
    related: ['organisms/learn-and-convene'],
  },
  {
    slug: 'stat-band-cell',
    name: 'Stat band cell',
    tier: 'molecules',
    summary: 'Large serif numeral over a mono label, in hairline-separated cells across the Scale band.',
    usedIn: ['By the numbers (supporting stats)'],
    importCode: imp('StatBandCell'),
    css: mcss(['statCell', 'statCellFirst', 'statValue', 'statLabel']),
    props: [
      { name: 'value / label', type: 'ReactNode', required: true, description: 'Numeral and caption.' },
      { name: 'first', type: 'boolean', description: 'Removes left hairline.' },
    ],
    examples: [
      {
        id: 'default', title: 'Band',
        render: () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', width: '100%' }}>
          <StatBandCell first value="$24T" label="Assets represented" /><StatBandCell value="2.1M" label="Bank employees" /><StatBandCell value="1875" label="Founded" /><StatBandCell value="50" label="State associations" />
        </div>),
        code: `<StatBandCell first value="$24T" label="Assets represented" />`,
      },
    ],
    dos: ['Four cells read best; three or five also work.'],
    donts: ['Don’t use decimals beyond one place.'],
    related: ['atoms/stat', 'organisms/by-the-numbers'],
  },
  {
    slug: 'quick-action',
    name: 'Quick-action row',
    tier: 'molecules',
    summary: 'The utility bar’s right-hand links: 11px, tracked, with the primary (“Join ABA”) in bold blue.',
    usedIn: ['Utility bar', 'Mega menu footer', 'Mobile drawer'],
    importCode: imp('QuickAction, QuickActionRow'),
    css: mcss(['quickAction', 'quickActionPrimary', 'quickActionRow']),
    props: [{ name: 'primary', type: 'boolean', default: 'false', description: 'Bold brand colour for the one primary action.' }],
    examples: [
      {
        id: 'default', title: 'Row',
        render: () => <QuickActionRow><QuickAction href="#" primary>Join ABA</QuickAction><QuickAction href="#">Member login</QuickAction><QuickAction href="#">Routing number lookup</QuickAction><QuickAction href="#">Contact ABA</QuickAction></QuickActionRow>,
        code: `<QuickActionRow>\n  <QuickAction href="/join" primary>Join ABA</QuickAction>\n  <QuickAction href="/login">Member login</QuickAction>\n</QuickActionRow>`,
      },
    ],
    dos: ['Four actions maximum.'],
    donts: ['Don’t make more than one primary.'],
    related: ['organisms/utility-bar'],
  },
  {
    slug: 'nav-tab',
    name: 'Nav tab with gold underline',
    tier: 'molecules',
    summary: 'Masthead navigation item: 13px semibold, gold 2px underline slides in on hover and stays for the active tab.',
    usedIn: ['Masthead'],
    importCode: imp('NavTab, NavTabs'),
    css: mcss(['navTab', 'navTabActive', 'navTabs']),
    props: [{ name: 'active', type: 'boolean', default: 'false', description: 'Active/open state.' }],
    examples: [
      { id: 'default', title: 'Tabs (click to activate)', render: () => <NavTabsDemo />, code: `<NavTabs>\n  <NavTab active>Advocacy</NavTab>\n  <NavTab>News & Research</NavTab>\n</NavTabs>` },
    ],
    dos: ['Six tabs is the ceiling before the masthead wraps at 1024.'],
    donts: ['Don’t use the gold underline for in-page tabs — use `Tabs`.'],
    related: ['organisms/masthead', 'molecules/tabs'],
  },
  {
    slug: 'mega-menu-link-group',
    name: 'Mega-menu link group',
    tier: 'molecules',
    summary: 'Column of links under a mono group title; each link can carry a one-line description.',
    usedIn: ['Mega menu', 'Footer'],
    importCode: imp('MegaMenuLinkGroup'),
    css: mcss(['linkGroupTitle', 'linkList', 'linkWrapper', 'groupLink', 'groupLinkDesc']),
    props: [
      { name: 'title', type: 'ReactNode', required: true, description: 'Group heading.' },
      { name: 'links', type: 'Array<{ label; href; desc? }>', required: true, description: 'Links with optional descriptions.' },
    ],
    examples: [
      {
        id: 'default', title: 'Group',
        render: () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 32, width: '100%' }}>
          <MegaMenuLinkGroup title="What we stand for" links={[{ label: 'Inclusive & equitable growth', href: '#', desc: 'Policy that widens access to credit' }, { label: 'Tax parity', href: '#', desc: 'Level the field with credit unions' }, { label: 'Regulatory reform', href: '#' }]} />
          <MegaMenuLinkGroup title="Get involved" links={[{ label: 'Grassroots', href: '#' }, { label: 'BankPAC', href: '#' }, { label: 'Washington Summit', href: '#' }]} />
        </div>),
        code: `<MegaMenuLinkGroup title="What we stand for" links={[{ label: 'Tax parity', href: '/tax', desc: 'Level the field' }]} />`,
      },
    ],
    dos: ['Group titles are nouns; links are nouns or noun phrases.'],
    donts: ['Don’t exceed seven links per group.'],
    related: ['organisms/masthead', 'organisms/footer'],
  },
  {
    slug: 'featured-panel',
    name: 'Featured panel',
    tier: 'molecules',
    summary: 'Navy panel with gold kicker, serif title, description and diagonal-arrow CTA — the mega menu’s promotional slot.',
    usedIn: ['Mega menu', 'Mobile drawer'],
    importCode: imp('FeaturedPanel'),
    css: mcss(['feat', 'featKick', 'featTitle', 'featDesc', 'featCta']),
    props: [
      { name: 'kicker / title / description', type: 'ReactNode', description: 'Content.' },
      { name: 'cta', type: '{ label; href }', required: true, description: 'Call to action.' },
    ],
    examples: [
      {
        id: 'default', title: 'Panel',
        render: () => <div style={{ maxWidth: 360, width: '100%' }}><FeaturedPanel kicker="Take action" title="Clarity Act: close the stablecoin loophole" description="Tell your Senators why bank deposits that fund small business must be protected." cta={{ label: 'Act now', href: '#' }} /></div>,
        code: `<FeaturedPanel kicker="Take action" title="Clarity Act: close the stablecoin loophole"\n  description="Tell your Senators…" cta={{ label: 'Act now', href: '/act' }} />`,
      },
    ],
    dos: ['One featured panel per menu tab.'],
    donts: ['Don’t use photography inside the panel.'],
    related: ['organisms/masthead'],
  },
  {
    slug: 'article-card',
    name: 'Article card',
    tier: 'molecules',
    summary: 'General-purpose editorial card (lead / md / sm, optional row layout) from the design-system stylesheet for pages beyond the homepage.',
    importCode: imp('ArticleCard, RankedItem'),
    cssPrefixes: ['.aba-article', '.aba-ranked'],
    props: [
      { name: 'size', type: "'lead' | 'md' | 'sm'", default: "'md'", description: 'Headline scale.' },
      { name: 'row', type: 'boolean', default: 'false', description: 'Media beside text.' },
      { name: 'media / kicker / dek / byline', type: 'ReactNode', description: 'Optional parts.' },
    ],
    examples: [
      {
        id: 'default', title: 'Sizes',
        render: () => (<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 24, width: '100%' }}>
          <ArticleCard size="lead" kicker="Analysis" title="What the Fed’s pause means for deposit pricing" href="#" dek="Funding costs have peaked; the pass-through has not." byline="By Sayee Srinivasan · 6 min" />
          <ArticleCard kicker="Journal" kickerTone="gold" title="Inside the ABA Annual Convention agenda" href="#" dek="Three days, four stages." />
          <div><RankedItem rank={1} title="Rate caps lead to less credit" href="#" meta="Economic insight" /><RankedItem rank={2} title="The stablecoin yield question" href="#" meta="Policy" /></div>
        </div>),
        code: `<ArticleCard size="lead" kicker="Analysis" title="…" href="/a" dek="…" byline="By … · 6 min" />\n<RankedItem rank={1} title="…" href="/b" meta="Economic insight" />`,
      },
    ],
    dos: ['Use `lead` once per page.'],
    donts: ['Don’t mix row and stacked cards in one grid.'],
  },
  {
    slug: 'ticker',
    name: 'Market ticker',
    tier: 'molecules',
    summary: 'Mono data strip with up/down colouring from the design-system stylesheet.',
    importCode: imp('Ticker'),
    cssPrefixes: ['.aba-ticker'],
    props: [{ name: 'items', type: 'Array<{ sym; val; chg?; direction? }>', required: true, description: 'Data points.' }, { name: 'label', type: 'ReactNode', required: true, description: 'Leading label.' }],
    examples: [
      { id: 'default', title: 'Ticker', render: () => <div style={wide}><Ticker label="Markets" items={[{ sym: 'FED FUNDS', val: '4.25–4.50', chg: '0', direction: 'up' }, { sym: 'PRIME', val: '7.50%', chg: '-25bp', direction: 'down' }, { sym: '10Y', val: '4.12%', chg: '+3bp', direction: 'up' }]} /></div>, code: `<Ticker label="Markets" items={[{ sym: 'PRIME', val: '7.50%', chg: '-25bp', direction: 'down' }]} />` },
    ],
    dos: ['Keep to a handful of series.'],
    donts: ['Don’t auto-scroll.'],
    related: ['molecules/ticker-item'],
  },
  {
    slug: 'alert',
    name: 'Alert',
    tier: 'molecules',
    summary: 'Inline message with a coloured left rule; four tones.',
    importCode: imp('Alert'),
    cssPrefixes: ['.aba-alert'],
    props: [{ name: 'tone', type: "'info' | 'success' | 'warning' | 'danger'", default: "'info'", description: 'Semantic colour.' }, { name: 'title', type: 'ReactNode', description: 'Bold first line.' }, { name: 'icon', type: 'ReactNode', description: 'Override the default glyph.' }],
    examples: [
      { id: 'default', title: 'Tones', stack: true, render: () => (<><Alert title="Member content">Sign in to read the full analysis.</Alert><Alert tone="success" title="Registered">You are booked for the Annual Convention.</Alert><Alert tone="warning" title="Deadline">Early pricing ends Friday.</Alert><Alert tone="danger" title="Payment failed">Check your card details and try again.</Alert></>), code: `<Alert title="Member content">Sign in to read the full analysis.</Alert>\n<Alert tone="warning" title="Deadline">Early pricing ends Friday.</Alert>` },
    ],
    dos: ['Lead with the title; keep the body to one sentence.'],
    donts: ['Don’t stack alerts.'],
    related: ['molecules/toast'],
  },
  {
    slug: 'toast',
    name: 'Toast',
    tier: 'molecules',
    summary: 'Transient dark notification with optional close.',
    importCode: imp('Toast'),
    cssPrefixes: ['.aba-toast'],
    props: [{ name: 'tone', type: "'success' | 'danger'", description: 'Left accent colour.' }, { name: 'onClose', type: '() => void', description: 'Shows the close button.' }],
    examples: [{ id: 'default', title: 'Toasts', stack: true, render: () => <ToastDemo />, code: `<Toast onClose={dismiss}>Saved to your reading list.</Toast>\n<Toast tone="success">Registration confirmed.</Toast>` }],
    dos: ['Auto-dismiss after ~5s unless it carries an action.'],
    donts: ['Don’t use toasts for errors that need a decision.'],
    related: ['molecules/alert'],
  },
  {
    slug: 'tabs',
    name: 'Tabs / Segmented control',
    tier: 'molecules',
    summary: 'In-page tabs with counts and a blue underline; the segmented control is the compact variant used for view switching.',
    importCode: imp('Tabs, SegmentedControl'),
    cssPrefixes: ['.aba-tabs', '.aba-tab', '.aba-seg'],
    props: [{ name: 'items', type: 'TabItem[]', required: true, description: '{ id, label, count? }' }, { name: 'value / onChange', type: 'string / (id) => void', required: true, description: 'Controlled selection.' }],
    examples: [{ id: 'default', title: 'Tabs and segmented', stack: true, render: () => (<><TabsDemo /><SegDemo /></>), code: `<Tabs value={tab} onChange={setTab} items={[{ id: 'all', label: 'All', count: 128 }]} />\n<SegmentedControl value={vp} onChange={setVp} items={[{ id: 'desktop', label: 'Desktop' }]} />` }],
    dos: ['Two to six tabs.'],
    donts: ['Don’t use tabs for navigation between pages.'],
    related: ['molecules/nav-tab'],
  },
  {
    slug: 'breadcrumbs',
    name: 'Breadcrumbs',
    tier: 'molecules',
    summary: 'Small tracked path with slash separators; the last item is the current page.',
    importCode: imp('Breadcrumbs'),
    cssPrefixes: ['.aba-crumbs'],
    props: [{ name: 'items', type: 'Array<{ label; href? }>', required: true, description: 'Omit href on the current page.' }],
    examples: [{ id: 'default', title: 'Breadcrumbs', render: () => <Breadcrumbs items={[{ label: 'Home', href: '#' }, { label: 'News & Research', href: '#' }, { label: 'Clarity Act statement' }]} />, code: `<Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'News', href: '/news' }, { label: 'Clarity Act statement' }]} />` }],
    dos: ['Truncate long titles at the last crumb only.'],
    donts: ['Don’t show breadcrumbs on the homepage.'],
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    tier: 'molecules',
    summary: 'Numbered pager with ellipses and prev/next.',
    importCode: imp('Pagination'),
    cssPrefixes: ['.aba-pager'],
    props: [{ name: 'page / pageCount', type: 'number', required: true, description: '1-based.' }, { name: 'onChange', type: '(p: number) => void', required: true, description: 'Selection handler.' }],
    examples: [{ id: 'default', title: 'Pager', render: () => <PaginationDemo />, code: `<Pagination page={page} pageCount={12} onChange={setPage} />` }],
    dos: ['Keep the page size stable across pages.'],
    donts: ['Don’t paginate fewer than ~20 items.'],
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    tier: 'molecules',
    summary: 'Hairline-separated disclosure rows with a rotating chevron.',
    importCode: imp('Accordion'),
    cssPrefixes: ['.aba-acc'],
    props: [{ name: 'items', type: 'Array<{ id; title; content }>', required: true, description: 'Rows.' }, { name: 'defaultOpen', type: 'string', description: 'Initially expanded id.' }],
    examples: [{ id: 'default', title: 'Accordion', stack: true, render: () => <Accordion defaultOpen="a" items={[{ id: 'a', title: 'Who can join ABA?', content: 'Any FDIC-insured bank, savings association or trust company.' }, { id: 'b', title: 'What does membership cost?', content: 'Dues are scaled to asset size.' }, { id: 'c', title: 'How do I get involved in advocacy?', content: 'Start with the Grassroots programme.' }]} />, code: `<Accordion defaultOpen="a" items={[{ id: 'a', title: 'Who can join ABA?', content: '…' }]} />` }],
    dos: ['Phrase titles as questions for FAQs.'],
    donts: ['Don’t hide critical content behind an accordion.'],
  },
  {
    slug: 'menu',
    name: 'Menu',
    tier: 'molecules',
    summary: 'Dropdown action menu with labels, separators and danger items.',
    importCode: imp('Menu'),
    cssPrefixes: ['.aba-menu'],
    props: [{ name: 'trigger', type: 'ReactNode', required: true, description: 'Button contents.' }, { name: 'items', type: 'MenuEntry[]', required: true, description: 'Items, separators and labels.' }, { name: 'align', type: "'left' | 'right'", default: "'left'", description: 'Popover alignment.' }],
    examples: [{ id: 'default', title: 'Menu', render: () => <Menu trigger="Actions" items={[{ type: 'label', label: 'Share' }, { label: 'Copy link' }, { label: 'Email' }, { type: 'sep' }, { label: 'Remove from list', danger: true }]} />, code: `<Menu trigger="Actions" items={[{ label: 'Copy link' }, { type: 'sep' }, { label: 'Remove', danger: true }]} />` }],
    dos: ['Group related actions with separators.'],
    donts: ['Don’t nest menus.'],
  },
  {
    slug: 'dialog',
    name: 'Dialog',
    tier: 'molecules',
    summary: 'Modal with scrim, title bar, body and footer actions. `inline` renders it in flow for documentation.',
    importCode: imp('Dialog'),
    cssPrefixes: ['.aba-dialog', '.aba-scrim'],
    props: [{ name: 'open / onClose', type: 'boolean / () => void', required: true, description: 'Controlled visibility.' }, { name: 'title', type: 'ReactNode', required: true, description: 'Heading.' }, { name: 'footer', type: 'ReactNode', description: 'Actions.' }, { name: 'inline', type: 'boolean', description: 'Static in-flow rendering.' }],
    examples: [{ id: 'default', title: 'Dialog', render: () => <DialogDemo />, code: `<Dialog open={open} onClose={close} title="Leave this page?" footer={<Button onClick={close}>Leave</Button>}>\n  <p>Your draft will not be saved.</p>\n</Dialog>` }],
    dos: ['Title as a question or a verb phrase.', 'Primary action on the right.'],
    donts: ['Don’t open dialogs on page load.'],
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    tier: 'molecules',
    summary: 'Hover/focus label in navy.',
    importCode: imp('Tooltip'),
    cssPrefixes: ['.aba-tooltip'],
    props: [{ name: 'label', type: 'ReactNode', required: true, description: 'Tooltip text.' }],
    examples: [{ id: 'default', title: 'Tooltip (hover)', render: () => <Tooltip label="Search aba.com"><Button variant="secondary" leadingIcon={<SearchIcon size={14} />}>Search</Button></Tooltip>, code: `<Tooltip label="Search aba.com"><IconButton label="Search"><SearchIcon /></IconButton></Tooltip>` }],
    dos: ['Keep it to a few words.'],
    donts: ['Don’t put essential information only in a tooltip.'],
  },
  {
    slug: 'empty-state',
    name: 'Empty state',
    tier: 'molecules',
    summary: 'Centred serif title, explanation and an optional action.',
    importCode: imp('EmptyState'),
    cssPrefixes: ['.aba-empty'],
    props: [{ name: 'title', type: 'ReactNode', required: true, description: 'Heading.' }, { name: 'action', type: 'ReactNode', description: 'Button.' }, { name: 'icon', type: 'ReactNode', description: 'Optional glyph.' }],
    examples: [{ id: 'default', title: 'Empty state', stack: true, render: () => <EmptyState title="No saved articles yet" action={<Button variant="secondary">Browse the house view</Button>}>Articles you bookmark will appear here.</EmptyState>, code: `<EmptyState title="No saved articles yet" action={<Button variant="secondary">Browse</Button>}>Articles you bookmark will appear here.</EmptyState>` }],
    dos: ['Say what will appear here and how to get it.'],
    donts: ['Don’t apologise.'],
  },
  {
    slug: 'table',
    name: 'Table',
    tier: 'molecules',
    summary: 'Data table with uppercase mono headers, hairline rows, numeric alignment and optional striping.',
    importCode: imp('Table'),
    cssPrefixes: ['.aba-table'],
    props: [{ name: 'columns', type: 'TableColumn<T>[]', required: true, description: '{ key, header, numeric?, render }' }, { name: 'rows / rowKey', type: 'T[] / (row) => string', required: true, description: 'Data and key.' }, { name: 'striped', type: 'boolean', description: 'Zebra rows.' }, { name: 'caption', type: 'ReactNode', description: 'Accessible caption.' }],
    examples: [{ id: 'default', title: 'Table', render: () => <div style={wide}><Table caption="Most-read this week" striped rows={rows} rowKey={(r) => r.id} columns={[{ key: 'title', header: 'Title', render: (r) => r.title }, { key: 'type', header: 'Type', render: (r) => r.type }, { key: 'date', header: 'Date', render: (r) => r.date }, { key: 'reads', header: 'Reads', numeric: true, render: (r) => r.reads.toLocaleString() }]} /></div>, code: `<Table rows={rows} rowKey={(r) => r.id} columns={[{ key: 'title', header: 'Title', render: (r) => r.title }, { key: 'reads', header: 'Reads', numeric: true, render: (r) => r.reads }]} />` }],
    dos: ['Right-align numbers with `numeric`.'],
    donts: ['Don’t centre text columns.'],
  },
];
