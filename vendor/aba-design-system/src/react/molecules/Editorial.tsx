import type { AnchorHTMLAttributes, ButtonHTMLAttributes, HTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import { ArrowRightIcon, ArrowUpRightIcon } from '../atoms/icons';
import s from './editorial.module.css';

/* ------------------------------------------------------------------ */
/* Section header                                                      */
/* ------------------------------------------------------------------ */
export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  /** Mono metadata shown before the link (e.g. "Updated weekly"). Hidden on phones. */
  meta?: ReactNode;
  /** "All →" style link. */
  link?: { label: ReactNode; href: string };
  onDark?: boolean;
}

/** Kicker title + hairline + mono meta + "All →" link. */
export function SectionHeader({ title, meta, link, onDark, className, ...rest }: SectionHeaderProps) {
  return (
    <div className={cx(s.sectionHeader, onDark && s.onDark, className)} {...rest}>
      <span className={s.sectionTitle}>{title}</span>
      <hr className={s.sectionRule} />
      {meta && <span className={s.sectionMeta}>{meta}</span>}
      {link && <a href={link.href} className={s.sectionLink}>{link.label}</a>}
    </div>
  );
}

/** Centred header used by Member benefits: gold kicker over a large serif title. */
export function CenteredSectionHeader({ kicker, title, className }: { kicker: ReactNode; title: ReactNode; className?: string }) {
  return (
    <div className={cx(s.sectionHeaderCentered, className)}>
      <span className={s.centeredKick}>{kicker}</span>
      <h2 className={s.centeredTitle}>{title}</h2>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cards                                                               */
/* ------------------------------------------------------------------ */
export interface HouseViewCardProps {
  index: string;
  title: ReactNode;
  href: string;
  dek: ReactNode;
  meta: ReactNode;
  first?: boolean;
  className?: string;
}

/** House-view story card: gold mono index, serif title, dek, mono meta. */
export function HouseViewCard({ index, title, href, dek, meta, first, className }: HouseViewCardProps) {
  return (
    <article className={cx(s.storyCard, first && s.storyCardFirst, className)}>
      <span className={s.storyIdx}>{index}</span>
      <h3 className={s.storyTitle}><a href={href}>{title}</a></h3>
      <p className={s.storyDek}>{dek}</p>
      <span className={s.storyMeta}>{meta}</span>
    </article>
  );
}

export interface TopicCardProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  index: string;
  label: ReactNode;
  description: ReactNode;
}

/** Banking-topic tile: bordered, arrow slides in on hover. */
export function TopicCard({ index, label, description, className, ...rest }: TopicCardProps) {
  return (
    <a className={cx(s.topicCard, className)} {...rest}>
      <span className={s.topicIdx}>{index}</span>
      <span className={s.topicLabel}>{label}</span>
      <span className={s.topicDesc}>{description}</span>
      <span className={s.topicArrow} aria-hidden="true"><ArrowRightIcon size={18} /></span>
    </a>
  );
}

export interface NumberedCardProps {
  index: string;
  title: ReactNode;
  description: ReactNode;
  link?: { label: ReactNode; href: string };
  className?: string;
}

/** Numbered benefit card: mono index, serif title, description, semibold link. */
export function NumberedCard({ index, title, description, link, className }: NumberedCardProps) {
  return (
    <div className={cx(s.numberedCard, className)}>
      <span className={s.numberedIdx}>{index}</span>
      <h3 className={s.numberedTitle}>{title}</h3>
      <p className={s.numberedDesc}>{description}</p>
      {link && <a href={link.href} className={s.numberedLink}>{link.label} →</a>}
    </div>
  );
}
export { NumberedCard as BenefitCard };

export interface ConferenceCardProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  dates: ReactNode;
  title: ReactNode;
  cta?: ReactNode;
  first?: boolean;
}

/** Conference card: gold mono dates, large serif title, CTA pinned to the bottom. */
export function ConferenceCard({ dates, title, cta = 'Details →', first, className, ...rest }: ConferenceCardProps) {
  return (
    <a className={cx(s.confCard, first && s.confCardFirst, className)} {...rest}>
      <span className={s.confDates}>{dates}</span>
      <h3 className={s.confTitle}>{title}</h3>
      <span className={s.confCta}>{cta}</span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Rows & items                                                        */
/* ------------------------------------------------------------------ */
export interface ListRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  title: ReactNode;
  subtitle?: ReactNode;
  meta?: ReactNode;
}

/** Program row / training row: title + subtitle on the left, mono meta on the right. */
export function ProgramRow({ title, subtitle, meta, className, ...rest }: ListRowProps) {
  return (
    <a className={cx(s.listRow, className)} {...rest}>
      <span>
        <span className={s.listRowTitle}>{title}</span>
        {subtitle && <span className={s.listRowSub}>{subtitle}</span>}
      </span>
      {meta && <span className={s.listRowMeta}>{meta}</span>}
    </a>
  );
}
export { ProgramRow as TrainingRow };

export interface NewsRowProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'type' | 'title'> {
  type: ReactNode;
  title: ReactNode;
  date: ReactNode;
  /** Adds a top hairline (first row in a list). */
  first?: boolean;
}

/** Latest-news row: gold mono type, serif title, mono date. */
export function NewsRow({ type, title, date, first, className, ...rest }: NewsRowProps) {
  return (
    <a className={cx(s.newsRow, first && s.newsRowTop, className)} {...rest}>
      <span className={s.newsType}>{type}</span>
      <span className={s.newsTitle}>{title}</span>
      <span className={s.newsDate}>{date}</span>
    </a>
  );
}

export interface TickerItemProps extends HTMLAttributes<HTMLSpanElement> {
  label: ReactNode;
  tag?: ReactNode;
  tone?: 'gold' | 'red';
}

/** Positions-strip item: issue label with a mono status tag. */
export function TickerItem({ label, tag, tone = 'gold', className, ...rest }: TickerItemProps) {
  return (
    <span className={cx(s.tickerItem, className)} {...rest}>
      {label}
      {tag && <span className={cx(s.tickerTag, tone === 'red' ? s.tickerTagRed : s.tickerTagGold)}>{tag}</span>}
    </span>
  );
}

export interface StatBandCellProps { value: ReactNode; label: ReactNode; first?: boolean; className?: string }

/** Scale-band cell: 44px serif numeral over a muted label, hairline on the left. */
export function StatBandCell({ value, label, first, className }: StatBandCellProps) {
  return (
    <div className={cx(s.statCell, first && s.statCellFirst, className)}>
      <div className={s.statValue}>{value}</div>
      <div className={s.statLabel}>{label}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */
export interface QuickActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> { primary?: boolean; children: ReactNode }

/** Utility-bar link: 11px uppercase, tracked. */
export function QuickAction({ primary, className, children, ...rest }: QuickActionProps) {
  return <a className={cx(s.quickAction, primary && s.quickActionPrimary, className)} {...rest}>{children}</a>;
}

/** Row of quick actions. */
export function QuickActionRow({ className, children }: { className?: string; children: ReactNode }) {
  return <nav className={cx(s.quickActionRow, className)} aria-label="Quick actions">{children}</nav>;
}

export interface NavTabProps extends ButtonHTMLAttributes<HTMLButtonElement> { active?: boolean; children: ReactNode }

/** Masthead nav tab with the gold active underline. */
export function NavTab({ active, className, children, ...rest }: NavTabProps) {
  return (
    <button type="button" className={cx(s.navTab, active && s.navTabActive, className)} aria-expanded={active} {...rest}>
      {children}
    </button>
  );
}

export function NavTabs({ className, children }: { className?: string; children: ReactNode }) {
  return <nav className={cx(s.navTabs, className)}>{children}</nav>;
}

export interface MegaMenuLinkGroupProps {
  title: ReactNode;
  links: Array<{ label: ReactNode; href: string; desc?: ReactNode }>;
  className?: string;
}

/** Mega-menu column: tracked title with hairline, then links with optional descriptions. */
export function MegaMenuLinkGroup({ title, links, className }: MegaMenuLinkGroupProps) {
  return (
    <div className={className}>
      <span className={s.linkGroupTitle}>{title}</span>
      <div className={s.linkList}>
        {links.map((l, i) => (
          <div key={i} className={s.linkWrapper}>
            <a href={l.href} className={s.groupLink}>{l.label}</a>
            {l.desc && <span className={s.groupLinkDesc}>{l.desc}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export interface FeaturedPanelProps {
  kicker: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  cta: { label: ReactNode; href: string };
  className?: string;
}

/** Mega-menu featured panel: gold kicker, serif title, CTA with diagonal arrow. */
export function FeaturedPanel({ kicker, title, description, cta, className }: FeaturedPanelProps) {
  return (
    <div className={cx(s.feat, className)}>
      <span className={s.featKick}>{kicker}</span>
      <p className={s.featTitle}>{title}</p>
      {description && <p className={s.featDesc}>{description}</p>}
      <a href={cta.href} className={s.featCta}>{cta.label} <ArrowUpRightIcon size={14} /></a>
    </div>
  );
}
