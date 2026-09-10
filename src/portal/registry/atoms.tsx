import {
  ArrowLink, ArrowRightIcon, Avatar, Badge, Button, ButtonGroup, ButtonLink, Byline, Card, Checkbox, CloseIcon,
  ErrorText, Field, Hint, IconButton, Input, Kick, Kicker, Label, MenuIcon, MonoLabel, Progress, PullQuote, Radio,
  Rule, SearchIcon, SearchInput, Select, Spinner, Stat, StructuredByline, Switch, Tag, Textarea, ChevronDownIcon,
  ArrowUpRightIcon, CheckIcon, InfoIcon,
} from '@workspace/aba-design-system';
import { arrowLinkCss, moduleRulesFor } from '../lib/css-source';
import type { ComponentDef } from './types';

const imp = (names: string) => `import { ${names} } from '@workspace/aba-design-system';`;

export const atoms: ComponentDef[] = [
  {
    slug: 'button',
    name: 'Button',
    tier: 'atoms',
    summary: 'The ABA call to action. Six visual variants and three sizes over one `.aba-btn` base; the homepage uses `secondary` (Join ABA), `gold` (Take action, Membership close) and the default primary.',
    usedIn: ['Masthead', 'Take action', 'Learn & convene', 'Membership close'],
    importCode: imp('Button, ButtonLink, ButtonGroup'),
    cssPrefixes: ['.aba-btn', '.aba-btngroup'],
    tokens: ['--interactive-primary', '--interactive-accent', '--text-on-brand', '--radius-sm', '--font-ui', '--duration-fast'],
    props: [
      { name: 'variant', type: "'primary' | 'secondary' | 'ghost' | 'gold' | 'navy' | 'danger' | 'link'", default: "'primary'", description: 'Visual weight. Use one primary per view; gold is reserved for the single most important conversion.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '32 / 40 / 48px tall.' },
      { name: 'block', type: 'boolean', default: 'false', description: 'Stretch to the container width.' },
      { name: 'onDark', type: 'boolean', default: 'false', description: 'Outline treatment for `secondary` on navy bands.' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Shows the spinner, sets aria-busy and disables the control.' },
      { name: 'leadingIcon / trailingIcon', type: 'ReactNode', description: 'Optional 14–16px glyphs.' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Native disabled; renders at 50% opacity.' },
    ],
    examples: [
      {
        id: 'variants', title: 'Variants',
        render: () => (<>
          <Button>Primary</Button><Button variant="secondary">Secondary</Button><Button variant="ghost">Ghost</Button>
          <Button variant="gold">Gold</Button><Button variant="navy">Navy</Button><Button variant="danger">Danger</Button><Button variant="link">Link</Button>
        </>),
        code: `<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="gold">Gold</Button>
<Button variant="navy">Navy</Button>
<Button variant="danger">Danger</Button>
<Button variant="link">Link</Button>`,
      },
      {
        id: 'sizes', title: 'Sizes',
        render: () => (<><Button size="sm">Small</Button><Button>Medium</Button><Button size="lg">Large</Button></>),
        code: `<Button size="sm">Small</Button>\n<Button>Medium</Button>\n<Button size="lg">Large</Button>`,
      },
      {
        id: 'states', title: 'States', desc: 'Hover and active are live; focus ring appears on keyboard focus.',
        render: () => (<><Button>Default</Button><Button disabled>Disabled</Button><Button loading>Loading</Button><Button variant="secondary" trailingIcon={<ArrowRightIcon size={14} />}>With icon</Button></>),
        code: `<Button>Default</Button>\n<Button disabled>Disabled</Button>\n<Button loading>Loading</Button>\n<Button variant="secondary" trailingIcon={<ArrowRightIcon size={14} />}>With icon</Button>`,
      },
      {
        id: 'on-dark', title: 'On navy', dark: true, desc: 'As used by Take action and Membership close.',
        render: () => (<><ButtonLink href="#" variant="gold" size="lg">Join ABA</ButtonLink><ButtonLink href="#" variant="secondary" size="lg" onDark>Speak with membership</ButtonLink></>),
        code: `<ButtonLink href="/join" variant="gold" size="lg">Join ABA</ButtonLink>\n<ButtonLink href="/membership" variant="secondary" size="lg" onDark>Speak with membership</ButtonLink>`,
      },
      {
        id: 'group', title: 'Button group',
        render: () => (<ButtonGroup><Button variant="secondary">Day</Button><Button variant="secondary">Week</Button><Button variant="secondary">Month</Button></ButtonGroup>),
        code: `<ButtonGroup>\n  <Button variant="secondary">Day</Button>\n  <Button variant="secondary">Week</Button>\n  <Button variant="secondary">Month</Button>\n</ButtonGroup>`,
      },
    ],
    dos: ['Write labels as verbs: “Join ABA”, “Read the view”, “Register”.', 'Use `ButtonLink` when the action navigates — the homepage CTAs are anchors.', 'Pair one gold or primary button with at most one secondary.'],
    donts: ['Don’t use gold for anything except the primary conversion on a page.', 'Don’t put two primary buttons side by side.', 'Don’t restyle height or radius per instance — the 40px / 2px rhythm is part of the brand.'],
    related: ['atoms/icon-button', 'atoms/arrow-link'],
  },
  {
    slug: 'icon-button',
    name: 'Icon button',
    tier: 'atoms',
    summary: 'Square 36px control for a single glyph — close, menu, search. Always carries an accessible name.',
    usedIn: ['Ask the Advisory dock (close)', 'Masthead (mobile menu)'],
    importCode: imp('IconButton, CloseIcon, MenuIcon, SearchIcon'),
    cssPrefixes: ['.aba-iconbtn'],
    props: [
      { name: 'label', type: 'string', required: true, description: 'Accessible name; also used as the tooltip.' },
      { name: 'variant', type: "'default' | 'solid' | 'outline'", default: "'default'", description: 'Ghost, filled navy, or outlined.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '28 / 36 / 44px.' },
    ],
    examples: [
      {
        id: 'variants', title: 'Variants and sizes',
        render: () => (<>
          <IconButton label="Close"><CloseIcon /></IconButton>
          <IconButton label="Menu" variant="outline"><MenuIcon /></IconButton>
          <IconButton label="Search" variant="solid"><SearchIcon /></IconButton>
          <IconButton label="Close" size="sm"><CloseIcon size={12} /></IconButton>
          <IconButton label="Menu" size="lg" variant="outline"><MenuIcon size={18} /></IconButton>
          <IconButton label="Disabled" disabled><CloseIcon /></IconButton>
        </>),
        code: `<IconButton label="Close"><CloseIcon /></IconButton>\n<IconButton label="Menu" variant="outline"><MenuIcon /></IconButton>\n<IconButton label="Search" variant="solid"><SearchIcon /></IconButton>\n<IconButton label="Close" size="sm"><CloseIcon size={12} /></IconButton>`,
      },
    ],
    dos: ['Give every icon button a `label` that says what it does, not what it looks like.', 'Keep the glyph at 14–18px, stroke 1.5.'],
    donts: ['Don’t use icon buttons for primary actions that deserve a word.', 'Don’t mix filled and outline icon buttons in one toolbar.'],
    related: ['atoms/button', 'atoms/icons'],
  },
  {
    slug: 'kicker',
    name: 'Kicker',
    tier: 'atoms',
    summary: 'The small uppercase label that opens every section and headline: 11px, 700, 0.16em tracking. Two families: `Kicker` (editorial, sections) and `Kick` (card-level, with optional tick).',
    usedIn: ['Hero', 'Every section header', 'Take action', 'Membership close', 'Footer'],
    importCode: imp('Kicker, Kick'),
    cssPrefixes: ['.aba-kicker', '.aba-kick'],
    tokens: ['--font-kicker', '--text-2xs', '--tracking-kicker', '--kicker-size', '--kicker-tracking'],
    props: [
      { name: 'tone', type: "'brand' | 'gold' | 'breaking'  (Kick also: 'neutral')", default: "'brand'", description: 'Blue is the default; gold marks featured or membership content; breaking is reserved for live news.' },
      { name: 'as', type: "'span' | 'div' | 'p'", default: "'span'", description: 'Element to render (Kicker).' },
      { name: 'tick', type: 'boolean', default: 'false', description: 'Leading 8px square (Kick).' },
    ],
    examples: [
      {
        id: 'tones', title: 'Tones',
        render: () => (<><Kicker>The house view</Kicker><Kicker tone="gold">Membership</Kicker><Kicker tone="breaking">Breaking</Kicker></>),
        code: `<Kicker>The house view</Kicker>\n<Kicker tone="gold">Membership</Kicker>\n<Kicker tone="breaking">Breaking</Kicker>`,
      },
      {
        id: 'kick', title: 'Card kick with tick',
        render: () => (<><Kick tick>Policy</Kick><Kick tick tone="gold">Featured</Kick><Kick tone="neutral">Research</Kick><Kick tick tone="breaking">Live</Kick></>),
        code: `<Kick tick>Policy</Kick>\n<Kick tick tone="gold">Featured</Kick>\n<Kick tone="neutral">Research</Kick>`,
      },
      {
        id: 'dark', title: 'On navy', dark: true,
        render: () => (<><Kicker style={{ color: 'var(--on-dark-gold)' }}>Take action</Kicker><Kicker style={{ color: 'var(--on-dark-text)' }}>Wealth &amp; trust</Kicker></>),
        code: `<Kicker style={{ color: 'var(--on-dark-gold)' }}>Take action</Kicker>`,
      },
    ],
    dos: ['Keep kickers to one to three words.', 'Use a kicker above a headline, never instead of one.'],
    donts: ['Don’t use “breaking” for anything that is not time-critical news.', 'Don’t lower the tracking — the airy letter-spacing is what makes it read as a label.'],
    related: ['molecules/section-header', 'atoms/mono-label'],
  },
  {
    slug: 'rule',
    name: 'Rule / hairline',
    tier: 'atoms',
    summary: 'Editorial horizontal rules. The 2px ink rule anchors headings; the 1px hairline (`--border-default`) separates rows and closes sections.',
    usedIn: ['Section headers', 'List rows', 'Utility bar', 'Footer'],
    importCode: imp('Rule'),
    cssPrefixes: ['.aba-rule'],
    tokens: ['--border-default', '--color-ink-900', '--color-blue-500', '--color-gold-500', '--ring-hairline'],
    props: [
      { name: 'tone', type: "'ink' | 'thin' | 'brand' | 'gold'", default: "'ink'", description: '2px ink; 1px default hairline; 2px brand blue; 2px gold.' },
    ],
    examples: [
      {
        id: 'tones', title: 'Tones', stack: true,
        render: () => (<><Rule /><Rule tone="thin" /><Rule tone="brand" /><Rule tone="gold" /></>),
        code: `<Rule />\n<Rule tone="thin" />\n<Rule tone="brand" />\n<Rule tone="gold" />`,
      },
    ],
    dos: ['Use hairlines (`thin`) for structure; ink and colour rules for emphasis.', 'On navy, use `--on-dark-hairline` (rgba white 16%) instead of the default border.'],
    donts: ['Don’t stack two rules within 8px of each other.', 'Don’t use gold rules decoratively — they mark featured content.'],
  },
  {
    slug: 'byline',
    name: 'Byline',
    tier: 'atoms',
    summary: 'Attribution line: 12px, tracked, muted. `Byline` is free-form (wrap the name in `<strong>`); `StructuredByline` renders name · meta.',
    importCode: imp('Byline, StructuredByline'),
    cssPrefixes: ['.aba-byline', '.aba-byl'],
    props: [
      { name: 'name', type: 'string', required: true, description: 'Author or desk (StructuredByline).' },
      { name: 'meta', type: 'ReactNode', description: 'Date, read time (StructuredByline).' },
    ],
    examples: [
      {
        id: 'default', title: 'Byline', stack: true,
        render: () => (<><Byline>By <strong>ABA Banking Journal</strong> · 6 min read</Byline><StructuredByline name="Rob Nichols" meta="President and CEO · 9 September 2026" /></>),
        code: `<Byline>By <strong>ABA Banking Journal</strong> · 6 min read</Byline>\n<StructuredByline name="Rob Nichols" meta="President and CEO · 9 September 2026" />`,
      },
    ],
    dos: ['Put the name first; dates and read times after the separator.'],
    donts: ['Don’t colour the byline blue — it is metadata, not a link.'],
  },
  {
    slug: 'mono-label',
    name: 'Mono data label',
    tier: 'atoms',
    summary: 'IBM Plex Mono at 10.5px with 0.08em tracking — the voice of dates, indices, captions and status tags across the homepage.',
    usedIn: ['Utility bar tagline', 'House view index & meta', 'Latest news dates', 'Hero caption', 'By the numbers source'],
    importCode: imp('MonoLabel'),
    tokens: ['--font-mono', '--meta-size', '--meta-tracking', '--text-muted', '--color-gold-600'],
    props: [
      { name: 'tone', type: "'muted' | 'gold' | 'red' | 'on-dark'", default: "'muted'", description: 'Muted for metadata; gold for indices and dates in editorial cards; red for “At risk” tags; on-dark for captions over photography.' },
    ],
    examples: [
      {
        id: 'tones', title: 'Tones',
        render: () => (<><MonoLabel>Updated weekly</MonoLabel><MonoLabel tone="gold">01</MonoLabel><MonoLabel tone="gold">OCT 19–21 · WASHINGTON, DC</MonoLabel><MonoLabel tone="red">AT RISK</MonoLabel></>),
        code: `<MonoLabel>Updated weekly</MonoLabel>\n<MonoLabel tone="gold">01</MonoLabel>\n<MonoLabel tone="red">AT RISK</MonoLabel>`,
      },
      {
        id: 'dark', title: 'On navy (FIG caption)', dark: true,
        render: () => <MonoLabel tone="on-dark">FIG. 01 — WASHINGTON, DC · NIGHTFALL OVER THE CAPITOL</MonoLabel>,
        code: `<MonoLabel tone="on-dark">FIG. 01 — WASHINGTON, DC</MonoLabel>`,
      },
    ],
    dos: ['Use mono for anything a reader scans rather than reads: numbers, dates, indices.', 'Keep it uppercase when it is a tag; sentence case when it is a note.'],
    donts: ['Don’t set body copy in mono.', 'Don’t go below 10px.'],
    related: ['atoms/kicker'],
  },
  {
    slug: 'badge',
    name: 'Badge / status tag',
    tier: 'atoms',
    summary: 'Compact uppercase pill for status. Eight tones map to semantic colours; `breaking` and `solid` are filled.',
    importCode: imp('Badge'),
    cssPrefixes: ['.aba-badge'],
    tokens: ['--status-positive', '--status-negative', '--status-caution', '--status-breaking'],
    props: [
      { name: 'tone', type: "'brand' | 'neutral' | 'gold' | 'positive' | 'negative' | 'caution' | 'solid' | 'breaking'", default: "'brand'", description: 'Semantic colour.' },
      { name: 'dot', type: 'boolean', default: 'false', description: 'Leading 6px dot.' },
    ],
    examples: [
      {
        id: 'tones', title: 'Tones',
        render: () => (<><Badge>Member</Badge><Badge tone="neutral">Draft</Badge><Badge tone="gold">Featured</Badge><Badge tone="positive" dot>Open</Badge><Badge tone="negative" dot>Closed</Badge><Badge tone="caution">Pending</Badge><Badge tone="solid">New</Badge><Badge tone="breaking">Breaking</Badge></>),
        code: `<Badge>Member</Badge>\n<Badge tone="gold">Featured</Badge>\n<Badge tone="positive" dot>Open</Badge>\n<Badge tone="breaking">Breaking</Badge>`,
      },
    ],
    dos: ['One or two words.', 'Use `dot` to signal a live state.'],
    donts: ['Don’t use badges as buttons.', 'Don’t combine more than two badges on one row.'],
    related: ['atoms/tag'],
  },
  {
    slug: 'tag',
    name: 'Tag',
    tier: 'atoms',
    summary: 'Categorical chip — filters, topics. Pill-shaped, optionally active or removable.',
    importCode: imp('Tag'),
    cssPrefixes: ['.aba-tag'],
    props: [
      { name: 'active', type: 'boolean', default: 'false', description: 'Selected state (filled blue).' },
      { name: 'onRemove', type: '() => void', description: 'Renders the × affordance.' },
    ],
    examples: [
      {
        id: 'default', title: 'Tags',
        render: () => (<><Tag>Payments</Tag><Tag active>Regulation</Tag><Tag onRemove={() => {}}>Community banks</Tag></>),
        code: `<Tag>Payments</Tag>\n<Tag active>Regulation</Tag>\n<Tag onRemove={clear}>Community banks</Tag>`,
      },
    ],
    dos: ['Use tags for filtering and topic membership.'],
    donts: ['Don’t use tags for status — that is the badge.'],
    related: ['atoms/badge'],
  },
  {
    slug: 'stat',
    name: 'Stat numeral',
    tier: 'atoms',
    summary: 'KPI block: mono/uppercase label, serif numeral, optional delta. The homepage’s Scale band and One number use the same serif-numeral idea at larger sizes.',
    usedIn: ['By the numbers'],
    importCode: imp('Stat'),
    cssPrefixes: ['.aba-stat'],
    tokens: ['--font-serif', '--text-3xl', '--tracking-tight'],
    props: [
      { name: 'label', type: 'ReactNode', required: true, description: 'Small uppercase label.' },
      { name: 'value', type: 'ReactNode', required: true, description: 'Numeral.' },
      { name: 'delta', type: "{ direction: 'up' | 'down'; label: ReactNode }", description: 'Change indicator.' },
      { name: 'mono', type: 'boolean', default: 'false', description: 'Mono numeral for data tables.' },
    ],
    examples: [
      {
        id: 'default', title: 'Stat',
        render: () => (<><Stat label="Member banks" value="2,100+" /><Stat label="Assets represented" value="$24.1T" delta={{ direction: 'up', label: '3.2%' }} /><Stat label="Prime rate" value="7.50%" mono delta={{ direction: 'down', label: '25 bp' }} /></>),
        code: `<Stat label="Member banks" value="2,100+" />\n<Stat label="Assets represented" value="$24.1T" delta={{ direction: 'up', label: '3.2%' }} />`,
      },
    ],
    dos: ['Abbreviate large numbers (24.1T) and keep a consistent precision across a row.'],
    donts: ['Don’t colour the numeral; let the delta carry the status colour.'],
    related: ['molecules/stat-band-cell'],
  },
  {
    slug: 'arrow-link',
    name: 'Link with arrow',
    tier: 'atoms',
    summary: 'Semibold blue link with a trailing arrow that eases outward on hover — the “All →”, “Read the view” and mega-menu CTA pattern.',
    usedIn: ['Section headers', 'Hero', 'Mega menu featured', 'Membership close'],
    importCode: imp('ArrowLink'),
    css: moduleRulesFor(['link', 'md', 'iconGlyph', 'onDark'], arrowLinkCss),
    props: [
      { name: 'glyph', type: "'text' | 'icon' | 'diagonal'", default: "'text'", description: 'Text arrow (section headers), SVG arrow, or diagonal arrow (hero / featured panel).' },
      { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: '12.5px (section link) or 14px (hero link).' },
      { name: 'onDark', type: 'boolean', default: 'false', description: 'Gold on navy.' },
    ],
    examples: [
      {
        id: 'default', title: 'Glyphs and sizes',
        render: () => (<><ArrowLink href="#">All</ArrowLink><ArrowLink href="#" glyph="icon">Read the view</ArrowLink><ArrowLink href="#" glyph="diagonal" size="md">Explore the agenda</ArrowLink></>),
        code: `<ArrowLink href="/news">All</ArrowLink>\n<ArrowLink href="/view" glyph="icon">Read the view</ArrowLink>\n<ArrowLink href="/agenda" glyph="diagonal" size="md">Explore the agenda</ArrowLink>`,
      },
      {
        id: 'dark', title: 'On navy', dark: true,
        render: () => <ArrowLink href="#" onDark size="md" glyph="icon">Tell your Senators</ArrowLink>,
        code: `<ArrowLink href="/act" onDark size="md" glyph="icon">Tell your Senators</ArrowLink>`,
      },
    ],
    dos: ['Keep labels short and specific: “All”, “Calendar”, “Read the view”.'],
    donts: ['Don’t underline — the arrow is the affordance.'],
    related: ['atoms/button', 'molecules/section-header'],
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    tier: 'atoms',
    summary: 'Initials or photo in a navy circle; three sizes and a square variant for organisations.',
    importCode: imp('Avatar'),
    cssPrefixes: ['.aba-avatar'],
    props: [
      { name: 'name', type: 'string', required: true, description: 'Used for initials and alt text.' },
      { name: 'src', type: 'string', description: 'Image URL.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '28 / 40 / 56px.' },
      { name: 'square', type: 'boolean', default: 'false', description: 'Rounded square.' },
    ],
    examples: [
      {
        id: 'default', title: 'Sizes',
        render: () => (<><Avatar name="Rob Nichols" size="sm" /><Avatar name="Rob Nichols" /><Avatar name="Rob Nichols" size="lg" /><Avatar name="ABA Foundation" square /></>),
        code: `<Avatar name="Rob Nichols" size="sm" />\n<Avatar name="Rob Nichols" />\n<Avatar name="ABA Foundation" square />`,
      },
    ],
    dos: ['Pass the full name; initials are derived.'],
    donts: ['Don’t use avatars for decorative icons.'],
  },
  {
    slug: 'progress',
    name: 'Progress',
    tier: 'atoms',
    summary: '6px determinate bar; blue by default, gold for campaign or fundraising progress.',
    importCode: imp('Progress'),
    cssPrefixes: ['.aba-progress'],
    props: [
      { name: 'value', type: 'number', required: true, description: 'Current value.' },
      { name: 'max', type: 'number', default: '100', description: 'Maximum.' },
      { name: 'gold', type: 'boolean', default: 'false', description: 'Gold fill.' },
      { name: 'label', type: 'string', description: 'Accessible name.' },
    ],
    examples: [
      {
        id: 'default', title: 'Progress', stack: true,
        render: () => (<><Progress value={35} label="Course progress" /><Progress value={72} gold label="Campaign" /></>),
        code: `<Progress value={35} label="Course progress" />\n<Progress value={72} gold label="Campaign" />`,
      },
    ],
    dos: ['Always give the bar an accessible `label`.'],
    donts: ['Don’t use for indeterminate loading — use the spinner.'],
  },
  {
    slug: 'spinner',
    name: 'Spinner',
    tier: 'atoms',
    summary: 'Indeterminate loading ring in three sizes. Buttons embed their own via `loading`.',
    importCode: imp('Spinner'),
    cssPrefixes: ['.aba-spinner', '.aba-btn__spinner'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: '15 / 22 / 34px.' },
      { name: 'label', type: 'string', default: "'Loading'", description: 'Accessible name.' },
    ],
    examples: [
      { id: 'default', title: 'Sizes', render: () => (<><Spinner size="sm" /><Spinner /><Spinner size="lg" /></>), code: `<Spinner size="sm" />\n<Spinner />\n<Spinner size="lg" />` },
    ],
    dos: ['Show a spinner only after ~300ms to avoid flicker.'],
    donts: ['Don’t show more than one spinner in a region.'],
  },
  {
    slug: 'input',
    name: 'Input / Textarea / Select / Search',
    tier: 'atoms',
    summary: 'Text controls share the `.aba-input` base: 40px tall, hairline border, blue focus ring. Search adds the magnifier; Select adds the chevron.',
    usedIn: ['Ask the Advisory composer (textarea)'],
    importCode: imp('Input, Textarea, Select, SearchInput'),
    cssPrefixes: ['.aba-input', '.aba-textarea', '.aba-select', '.aba-inputwrap', '.aba-selectwrap', '.aba-search'],
    tokens: ['--border-focus', '--focus-ring', '--surface-sunken', '--text-faint'],
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Input height 32 / 40 / 48px.' },
      { name: 'icon', type: 'ReactNode', description: 'Leading adornment (Input).' },
      { name: 'disabled', type: 'boolean', description: 'Sunken background, faint text.' },
    ],
    examples: [
      {
        id: 'default', title: 'Controls', stack: true,
        render: () => (<>
          <Input placeholder="Email address" />
          <Input placeholder="With icon" icon={<SearchIcon size={15} />} />
          <SearchInput placeholder="Search aba.com" />
          <Select defaultValue=""><option value="" disabled>Choose a state</option><option>Alabama</option><option>Alaska</option></Select>
          <Textarea placeholder="Ask the Advisory…" />
          <Input placeholder="Disabled" disabled />
        </>),
        code: `<Input placeholder="Email address" />\n<Input placeholder="With icon" icon={<SearchIcon size={15} />} />\n<SearchInput placeholder="Search aba.com" />\n<Select><option>Alabama</option></Select>\n<Textarea placeholder="Ask the Advisory…" />`,
      },
    ],
    dos: ['Always pair with a `Label` (wrap in `Field`).', 'Use placeholder text as an example, not as the label.'],
    donts: ['Don’t remove the focus ring.', 'Don’t use `sm` inputs in long forms.'],
    related: ['atoms/checkbox', 'atoms/field'],
  },
  {
    slug: 'checkbox',
    name: 'Checkbox / Radio / Switch',
    tier: 'atoms',
    summary: 'Selection controls with custom boxes; the native input stays in the DOM for accessibility.',
    importCode: imp('Checkbox, Radio, Switch'),
    cssPrefixes: ['.aba-check', '.aba-switch'],
    props: [
      { name: 'label', type: 'ReactNode', required: true, description: 'Visible label.' },
      { name: 'description', type: 'ReactNode', description: 'Secondary line under the label (Checkbox/Radio).' },
      { name: 'checked / defaultChecked / disabled', type: 'boolean', description: 'Native input props pass through.' },
    ],
    examples: [
      {
        id: 'default', title: 'Controls', stack: true,
        render: () => (<>
          <Checkbox label="Email me the Daily Newsbytes" defaultChecked />
          <Checkbox label="Weekly policy briefing" description="Sent Fridays from the advocacy desk" />
          <Checkbox label="Disabled" disabled />
          <div style={{ display: 'flex', gap: 24 }}><Radio name="r" label="Member" defaultChecked /><Radio name="r" label="Non-member" /></div>
          <Switch label="Show member pricing" defaultChecked />
        </>),
        code: `<Checkbox label="Email me the Daily Newsbytes" defaultChecked />\n<Checkbox label="Weekly policy briefing" description="Sent Fridays" />\n<Radio name="plan" label="Member" />\n<Switch label="Show member pricing" />`,
      },
    ],
    dos: ['Use a switch for settings that apply immediately; a checkbox for things submitted with a form.'],
    donts: ['Don’t use radios for more than ~6 options — use a select.'],
    related: ['atoms/input'],
  },
  {
    slug: 'field',
    name: 'Label / Hint / Error',
    tier: 'atoms',
    summary: '`Field` stacks a label, control and helper text with the right spacing; `error` switches the control border and shows the error line.',
    importCode: imp('Field, Label, Hint, ErrorText'),
    cssPrefixes: ['.aba-field', '.aba-label', '.aba-hint', '.aba-error'],
    props: [
      { name: 'error (Field)', type: 'boolean', default: 'false', description: 'Error styling for the enclosed control.' },
      { name: 'required / optional (Label)', type: 'boolean', description: 'Adds the * or “(optional)” marker.' },
    ],
    examples: [
      {
        id: 'default', title: 'Field states', stack: true,
        render: () => (<>
          <Field><Label htmlFor="f1" required>Work email</Label><Input id="f1" placeholder="you@bank.com" aria-describedby="f1h" /><Hint id="f1h">We use this to match your institution.</Hint></Field>
          <Field error><Label htmlFor="f2" required>Work email</Label><Input id="f2" defaultValue="steve@" aria-invalid aria-describedby="f2e" /><ErrorText id="f2e">Enter a complete email address.</ErrorText></Field>
          <Field><Label htmlFor="f3" optional>Title</Label><Input id="f3" /></Field>
        </>),
        code: `<Field>\n  <Label htmlFor="email" required>Work email</Label>\n  <Input id="email" aria-describedby="email-hint" />\n  <Hint id="email-hint">We use this to match your institution.</Hint>\n</Field>\n\n<Field error>\n  <Label htmlFor="email" required>Work email</Label>\n  <Input id="email" aria-invalid aria-describedby="email-err" />\n  <ErrorText id="email-err">Enter a complete email address.</ErrorText>\n</Field>`,
      },
    ],
    dos: ['Write errors as instructions (“Enter a complete email address”), not accusations.', 'Link hint and error text with `aria-describedby`.'],
    donts: ['Don’t rely on colour alone to show an error — the text is required.'],
    related: ['atoms/input'],
  },
  {
    slug: 'card',
    name: 'Card surface',
    tier: 'atoms',
    summary: 'Structural surface: white, hairline border, 6px radius, `--card-pad` padding. Most homepage “cards” are actually borderless grid cells; use this for application UI.',
    importCode: imp('Card'),
    cssPrefixes: ['.aba-card'],
    tokens: ['--surface-card', '--border-default', '--radius-md', '--card-pad'],
    props: [
      { name: 'hover', type: 'boolean', default: 'false', description: 'Lift on hover for clickable cards.' },
      { name: 'flush', type: 'boolean', default: 'false', description: 'No padding, clips children (media cards).' },
    ],
    examples: [
      {
        id: 'default', title: 'Card',
        render: () => (<><Card style={{ width: 260 }}><Kicker>Research</Kicker><h3 style={{ margin: '8px 0', fontFamily: 'var(--font-serif)', fontSize: 20 }}>Deposit trends, Q3</h3><p style={{ margin: 0, fontSize: 13.5, color: 'var(--text-secondary)' }}>Quarterly read on funding costs.</p></Card><Card hover style={{ width: 260 }}>Hoverable</Card></>),
        code: `<Card>\n  <Kicker>Research</Kicker>\n  <h3>Deposit trends, Q3</h3>\n</Card>\n<Card hover>Hoverable</Card>`,
      },
    ],
    dos: ['Prefer hairline grids (as the homepage does) when cards sit edge to edge.'],
    donts: ['Don’t nest cards.'],
  },
  {
    slug: 'pull-quote',
    name: 'Pull quote',
    tier: 'atoms',
    summary: 'Serif quotation with a 3px gold rule and em-dash citation.',
    importCode: imp('PullQuote'),
    cssPrefixes: ['.aba-pullquote'],
    props: [{ name: 'cite', type: 'ReactNode', description: 'Attribution (em dash added automatically).' }],
    examples: [
      {
        id: 'default', title: 'Pull quote', stack: true,
        render: () => <PullQuote cite="Rob Nichols, ABA President and CEO">Banks are the institutions that fund American life — and policy should treat them that way.</PullQuote>,
        code: `<PullQuote cite="Rob Nichols, ABA President and CEO">\n  Banks are the institutions that fund American life.\n</PullQuote>`,
      },
    ],
    dos: ['Quote at most two sentences.'],
    donts: ['Don’t use quotation marks — the rule and serif carry it.'],
  },
  {
    slug: 'icons',
    name: 'Iconography',
    tier: 'atoms',
    summary: 'The homepage uses a minimal glyph set drawn at 16px with a 1.5px stroke in `currentColor`: arrows (right, diagonal), chevron, close, check, search, info, menu.',
    importCode: imp('ArrowRightIcon, ArrowUpRightIcon, ChevronDownIcon, CloseIcon, CheckIcon, SearchIcon, InfoIcon, MenuIcon'),
    props: [{ name: 'size', type: 'number', default: '16', description: 'Rendered width/height in px.' }, { name: '…SVGProps', type: 'SVGProps<SVGSVGElement>', description: 'Pass-through (className, style).' }],
    examples: [
      {
        id: 'set', title: 'Glyph set',
        render: () => (<>
          {[['ArrowRightIcon', <ArrowRightIcon size={20} key="a" />], ['ArrowUpRightIcon', <ArrowUpRightIcon size={20} key="b" />], ['ChevronDownIcon', <ChevronDownIcon size={20} key="c" />], ['CloseIcon', <CloseIcon size={20} key="d" />], ['CheckIcon', <CheckIcon size={20} key="e" />], ['SearchIcon', <SearchIcon size={20} key="f" />], ['InfoIcon', <InfoIcon size={20} key="g" />], ['MenuIcon', <MenuIcon size={20} key="h" />]].map(([n, el]) => (
            <div key={n as string} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, width: 110, fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--text-muted)' }}>{el}{n}</div>
          ))}
        </>),
        code: `<ArrowRightIcon size={16} />\n<ArrowUpRightIcon />\n<ChevronDownIcon />\n<CloseIcon />`,
      },
    ],
    dos: ['Inherit colour from the text (`currentColor`).', 'Text arrows (→) are fine inside links; use SVGs where the arrow animates.'],
    donts: ['Don’t introduce filled or two-tone icons.'],
    related: ['atoms/arrow-link', 'atoms/icon-button'],
  },
];
