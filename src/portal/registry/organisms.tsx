import type { ComponentType } from 'react';
import {
  AskTheAdvisoryDock, BankingTopics, ByTheNumbers, Footer, Hero, HouseView, LatestNews, LearnAndConvene, Masthead,
  MembershipClose, TakeAction, UtilityBar, WealthAndTrust,
} from '@workspace/aba-design-system';
import utilityBar from '@workspace/aba-design-system/react/organisms/UtilityBar.module.css';
import masthead from '@workspace/aba-design-system/react/organisms/Masthead.module.css';
import hero from '@workspace/aba-design-system/react/organisms/Hero.module.css';
import houseView from '@workspace/aba-design-system/react/organisms/HouseView.module.css';
import byTheNumbers from '@workspace/aba-design-system/react/organisms/ByTheNumbers.module.css';
import learn from '@workspace/aba-design-system/react/organisms/LearnAndConvene.module.css';
import takeAction from '@workspace/aba-design-system/react/organisms/TakeAction.module.css';
import bankingTopics from '@workspace/aba-design-system/react/organisms/BankingTopics.module.css';
import latestNews from '@workspace/aba-design-system/react/organisms/LatestNews.module.css';
import wealth from '@workspace/aba-design-system/react/organisms/WealthAndTrust.module.css';
import close from '@workspace/aba-design-system/react/organisms/MembershipClose.module.css';
import footer from '@workspace/aba-design-system/react/organisms/Footer.module.css';
import dock from '@workspace/aba-design-system/react/organisms/AskTheAdvisoryDock.module.css';
import type { AnatomyPart, ComponentDef } from './types';

const imp = (name: string) => `import { ${name} } from '@workspace/aba-design-system';\n\n<${name} />`;

export interface OrganismDef extends ComponentDef {
  Component: ComponentType<Record<string, never>> | ComponentType<{ defaultOpen?: boolean; inline?: boolean; sampleConversation?: boolean }>;
  /** Band colour for the templates page. */
  band: 'light' | 'navy' | 'paper' | 'chrome';
  /** Preview iframe min height. */
  height: number;
  order: number;
  /** Export name in the package (stable under minification). */
  componentName: string;
  previewProps?: Record<string, unknown>;
}

const A = (label: string, className: string, href?: string, tier: AnatomyPart['tier'] = 'atom', first = true): AnatomyPart => ({ label, className, href, tier, first });

export const organisms: OrganismDef[] = [
  {
    order: 1, slug: 'utility-bar', name: 'Utility bar', tier: 'organisms', band: 'chrome', height: 40, Component: UtilityBar, componentName: 'UtilityBar',
    summary: 'The 32px strip above the masthead: a mono tagline on the left and the quick-action row on the right, hairline below.',
    importCode: imp('UtilityBar'), props: [],
    examples: [], dos: ['Keep the tagline and quick actions as-is — it is the site’s letterhead.'], donts: ['Don’t add promotions here.'],
    anatomy: [A('Mono tagline', utilityBar.tagline, '/atoms/mono-label'), A('Quick-action row', utilityBar.links, '/molecules/quick-action', 'molecule'), A('Primary quick action', utilityBar.primary, '/molecules/quick-action', 'molecule'), A('Container', utilityBar.container, '/foundations/grid', 'token')],
    tokens: ['--container-editorial', '--gutter-editorial', '--border-default', '--font-mono'],
  },
  {
    order: 2, slug: 'masthead', name: 'Masthead + mega menu', tier: 'organisms', band: 'chrome', height: 560, Component: Masthead, componentName: 'Masthead',
    summary: 'Sticky masthead: logo, six nav tabs with the gold underline, “Join ABA” secondary button. Hovering a tab opens the mega menu — intro column, link groups, featured panel and quick-action footer. Below 1024 it collapses to a hamburger and a full-height drawer with tabbed groups.',
    importCode: imp('Masthead'), props: [],
    examples: [], dos: ['Hover a tab in the frame to open the panel; switch to Mobile to see the drawer.'], donts: ['Don’t add a seventh tab without checking the 1024 breakpoint.'],
    anatomy: [A('Logo', masthead.logo, '/brand/logo', 'token'), A('Nav tab (gold underline)', masthead.navBtn, '/molecules/nav-tab', 'molecule'), A('Secondary button', masthead.joinBtnDesktop, '/atoms/button'), A('Mega-menu panel container', masthead.panelContainer, '/molecules/mega-menu-link-group', 'molecule'), A('Hamburger (mobile)', masthead.hamburger, '/atoms/icon-button')],
    tokens: ['--header-height', '--z-header', '--color-gold-500', '--duration-base', '--ease-standard'],
  },
  {
    order: 3, slug: 'hero', name: 'Hero', tier: 'organisms', band: 'light', height: 640, Component: Hero, componentName: 'Hero',
    summary: 'Editorial hero on white: gold kicker, 68px Gloock headline, dek and arrow link beside a navy-graded cityscape with a FIG caption bar. Stacks at 1024; the image drops below the text on mobile.',
    importCode: imp('Hero'), props: [],
    examples: [], dos: ['Headline stays under nine words.', 'Caption reads FIG. 01 — PLACE · DESCRIPTION.'], donts: ['Don’t place a button in the hero — the arrow link is deliberate restraint.'],
    anatomy: [A('Gold kicker', hero.kick, '/atoms/kicker'), A('Display headline', hero.title, '/foundations/typography', 'token'), A('Dek', hero.dek, '/foundations/typography', 'token'), A('Arrow link', hero.link, '/atoms/arrow-link'), A('Photography', hero.imageContainer, '/brand/photography', 'token'), A('FIG caption', hero.caption, '/atoms/mono-label')],
    tokens: ['--font-serif', '--color-gold-600', '--text-secondary', '--color-blue-900', '--border-default'],
  },
  {
    order: 4, slug: 'house-view', name: 'House view', tier: 'organisms', band: 'light', height: 420, Component: HouseView, componentName: 'HouseView',
    summary: 'Section header (“The house view · Updated weekly · All →”) over a four-up grid of story cards separated by hairlines.',
    importCode: imp('HouseView'), props: [],
    examples: [], dos: ['Four stories; the first is the lead.'], donts: ['Don’t add thumbnails.'],
    anatomy: [A('Section header', houseView.header, '/molecules/section-header', 'molecule'), A('Meta (mono)', houseView.headerMeta, '/atoms/mono-label'), A('“All →” link', houseView.headerLink, '/atoms/arrow-link'), A('Story card', houseView.item, '/molecules/house-view-card', 'molecule'), A('Gold index', houseView.idx, '/atoms/mono-label'), A('Serif title', houseView.itemTitle, '/foundations/typography', 'token')],
  },
  {
    order: 5, slug: 'take-action', name: 'Take action', tier: 'organisms', band: 'navy', height: 520, Component: TakeAction, componentName: 'TakeAction',
    summary: 'Full-width navy advocacy statement (the first navy band on the page): kicker, serif headline, body and gold CTA, with the op-ed card carrying its own kick, title and text link.',
    importCode: imp('TakeAction'), props: [],
    examples: [], dos: ['One issue at a time.'], donts: ['Don’t use more than one gold button on the page.'],
    anatomy: [A('Kicker', takeAction.kick, '/atoms/kicker'), A('Headline', takeAction.title, '/foundations/typography', 'token'), A('Gold button', takeAction.cta, '/atoms/button'), A('Op-ed card', takeAction.opEd, '/molecules/featured-panel', 'molecule'), A('Op-ed kick', takeAction.opEdKick, '/atoms/kicker'), A('Op-ed link', takeAction.opEdCta, '/atoms/arrow-link')],
    tokens: ['--surface-navy', '--interactive-accent', '--on-dark-hairline'],
  },
  {
    order: 6, slug: 'by-the-numbers', name: 'By the numbers', tier: 'organisms', band: 'light', height: 420, Component: ByTheNumbers, componentName: 'ByTheNumbers',
    summary: 'The number moment on white: one oversized serif figure with unit and sourced caption beside a lead line, dek, arrow link and a hairline row of supporting stats.',
    importCode: imp('ByTheNumbers'), props: [],
    examples: [], dos: ['One hero figure; every number carries its source.'], donts: ['Don’t let supporting stats compete in size with the hero figure.'],
    anatomy: [A('Stat numeral', byTheNumbers.number, '/atoms/stat'), A('Source (mono)', byTheNumbers.source, '/atoms/mono-label'), A('Lead line', byTheNumbers.lead, '/foundations/typography', 'token'), A('Arrow link', byTheNumbers.link, '/atoms/arrow-link'), A('Supporting stat', byTheNumbers.stat, '/molecules/stat-band-cell', 'molecule')],
    tokens: ['--font-serif', '--text-secondary', '--border-default', '--font-mono'],
  },
  {
    order: 7, slug: 'latest-news', name: 'Latest news', tier: 'organisms', band: 'paper', height: 520, Component: LatestNews, componentName: 'LatestNews',
    summary: 'Paper-toned band: section header with the Banking Journal credit, a lead story (type, serif headline, dek, meta, arrow link) and a stacked list of news rows.',
    importCode: imp('LatestNews'), props: [],
    examples: [], dos: ['Newest first; one lead story, then four to five rows.'], donts: ['Don’t mix in events — those belong in Learn & convene.'],
    anatomy: [A('Section header', latestNews.header, '/molecules/section-header', 'molecule'), A('Journal credit', latestNews.headerJournal, '/atoms/mono-label'), A('Lead story', latestNews.lead, '/molecules/featured-panel', 'molecule'), A('News row', latestNews.row, '/molecules/news-row', 'molecule'), A('Type label', latestNews.type, '/atoms/mono-label'), A('Date', latestNews.date, '/atoms/mono-label')],
    tokens: ['--surface-sunken', '--border-default', '--font-serif'],
  },
  {
    order: 8, slug: 'banking-topics', name: 'Banking topics index', tier: 'organisms', band: 'light', height: 520, Component: BankingTopics, componentName: 'BankingTopics',
    summary: 'Typographic index on white: an intro column (title, dek, “All topics A–Z” link) beside a numbered, hairline-ruled list of the nine practice areas.',
    importCode: imp('BankingTopics'), props: [],
    examples: [], dos: ['Keep the list to the nine practice areas ABA actually publishes.'], donts: ['Don’t add icons per topic.'],
    anatomy: [A('Section title', bankingTopics.headerTitle, '/molecules/section-header', 'molecule'), A('All topics link', bankingTopics.headerLink, '/atoms/arrow-link'), A('Topic row', bankingTopics.item, '/molecules/topic-card', 'molecule'), A('Index', bankingTopics.idx, '/atoms/mono-label'), A('Label', bankingTopics.label, '/foundations/typography', 'token')],
  },
  {
    order: 9, slug: 'wealth-and-trust', name: 'Wealth & trust band', tier: 'organisms', band: 'navy', height: 560, Component: WealthAndTrust, componentName: 'WealthAndTrust',
    summary: 'The second navy band: captioned event photograph beside a kicker, headline, dek and a hairline list of linked items with meta.',
    importCode: imp('WealthAndTrust'), props: [],
    examples: [], dos: ['Photography is warm, people-focused; navy-toned.'], donts: ['Don’t crop out the FIG caption.'],
    anatomy: [A('Photography', wealth.imageContainer, '/brand/photography', 'token'), A('FIG caption', wealth.caption, '/atoms/mono-label'), A('Kicker', wealth.kick, '/atoms/kicker'), A('Headline', wealth.title, '/foundations/typography', 'token'), A('Link list (hairlines)', wealth.links, '/molecules/program-row', 'molecule'), A('Link meta', wealth.linkMeta, '/atoms/mono-label')],
    tokens: ['--surface-navy', '--on-dark-hairline', '--on-dark-muted'],
  },
  {
    order: 10, slug: 'learn-and-convene', name: 'Learn & convene', tier: 'organisms', band: 'paper', height: 560, Component: LearnAndConvene, componentName: 'LearnAndConvene',
    summary: 'Paper-toned events band: section header with “Full calendar” link, a featured conference panel (kick, title, when/where, description, navy button) beside a “Next up” list of dated rows.',
    importCode: imp('LearnAndConvene'), props: [],
    examples: [], dos: ['Feature the next flagship event; list the following four to five by date.'], donts: ['Don’t list past events.'],
    anatomy: [A('Section header', learn.header, '/molecules/section-header', 'molecule'), A('Featured panel', learn.featured, '/molecules/conference-card', 'molecule'), A('Featured kick', learn.featuredKick, '/atoms/kicker'), A('Navy button', learn.featuredCta, '/atoms/button'), A('Training row', learn.row, '/molecules/training-row', 'molecule'), A('Row date (mono)', learn.rowWhen, '/atoms/mono-label')],
    tokens: ['--surface-sunken', '--color-blue-800', '--border-default'],
  },
  {
    order: 11, slug: 'membership-close', name: 'Membership close', tier: 'organisms', band: 'light', height: 640, Component: MembershipClose, componentName: 'MembershipClose',
    summary: 'The closing band on white: gold kicker, serif headline, dek and two buttons (gold + outline), then a hairline row of member-benefit columns with the Foundation as the last column.',
    importCode: imp('MembershipClose'), props: [],
    examples: [], dos: ['Gold button = Join; outline = start the conversation.'], donts: ['Don’t add a form.'],
    anatomy: [A('Kicker', close.kick, '/atoms/kicker'), A('Headline', close.title, '/foundations/typography', 'token'), A('Actions (gold + outline)', close.actions, '/atoms/button'), A('Benefit column', close.column, '/molecules/benefit-card', 'molecule'), A('Column kick', close.columnKick, '/atoms/kicker'), A('Programs (mono)', close.programs, '/atoms/mono-label')],
    tokens: ['--interactive-accent', '--color-gold-600', '--border-default'],
  },
  {
    order: 12, slug: 'footer', name: 'Footer', tier: 'organisms', band: 'navy', height: 620, Component: Footer, componentName: 'Footer',
    summary: 'Navy footer: logo column with dek, link groups mirroring the mega menu, legal links and copyright.',
    importCode: imp('Footer'), props: [],
    examples: [], dos: ['Keep the footer groups in sync with the mega menu.'], donts: ['Don’t add a newsletter form here.'],
    anatomy: [A('Logo (mono)', footer.logo, '/brand/logo', 'token'), A('Dek', footer.dek, '/foundations/typography', 'token'), A('Link group', footer.linkList, '/molecules/mega-menu-link-group', 'molecule'), A('Group title', footer.colTitle, '/atoms/kicker'), A('Legal links', footer.legalLinks, '/molecules/quick-action', 'molecule')],
    tokens: ['--surface-navy', '--on-dark-muted', '--on-dark-hairline'],
  },
  {
    order: 13, slug: 'ask-the-advisory-dock', name: 'Ask the Advisory dock', tier: 'organisms', band: 'chrome', height: 620, Component: AskTheAdvisoryDock, componentName: 'AskTheAdvisoryDock', previewProps: { inline: true, defaultOpen: true, sampleConversation: true },
    summary: 'The floating assistant: a pill trigger bottom-right that opens a navy-headed panel with suggested prompts, a message thread and a composer. The homepage version streams from an API; the package ships the presentational shell.',
    importCode: `import { AskTheAdvisoryDock } from '@workspace/aba-design-system';\n\n<AskTheAdvisoryDock defaultOpen sampleConversation />`,
    props: [
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Start expanded.' },
      { name: 'inline', type: 'boolean', default: 'false', description: 'Render in flow (documentation) instead of fixed.' },
      { name: 'sampleConversation', type: 'boolean', default: 'false', description: 'Seed a sample exchange.' },
    ],
    examples: [], dos: ['Keep the suggested prompts to three.'], donts: ['Don’t let the dock cover the Membership close CTAs on mobile.'],
    anatomy: [A('Trigger', dock.triggerBtn, '/atoms/button'), A('Dock panel', dock.dock, '/molecules/dialog', 'molecule'), A('Header kicker', dock.kicker, '/atoms/kicker'), A('Close', dock.iconBtn, '/atoms/icon-button'), A('Starter prompt', dock.starter, '/atoms/tag'), A('Composer', dock.composer, '/atoms/input'), A('Send', dock.send, '/atoms/button')],
    tokens: ['--z-toast', '--shadow-xl', '--surface-navy'],
  },
];

export const organismBySlug = Object.fromEntries(organisms.map((o) => [o.slug, o]));
