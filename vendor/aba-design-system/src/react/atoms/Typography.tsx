import type { HTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';

/** `.aba-kicker` — small-caps editorial label above headings. */
export function Kicker({ tone = 'brand', as: Tag = 'span', className, children, ...rest }: {
  tone?: 'brand' | 'gold' | 'breaking';
  as?: 'span' | 'div' | 'p';
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <Tag className={cx('aba-kicker', tone !== 'brand' && `aba-kicker--${tone}`, className)} {...rest}>
      {children}
    </Tag>
  );
}

/** `.aba-kick` — kicker variant with optional tick mark (article cards). */
export function Kick({ tone = 'brand', tick, className, children, ...rest }: {
  tone?: 'brand' | 'gold' | 'breaking' | 'neutral';
  tick?: boolean;
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx('aba-kick', tone !== 'brand' && `aba-kick--${tone}`, className)} {...rest}>
      {tick && <span className="aba-kick__tick" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** `.aba-rule` — editorial horizontal rule. */
export function Rule({ tone = 'ink', className, ...rest }: { tone?: 'ink' | 'thin' | 'brand' | 'gold' } & HTMLAttributes<HTMLHRElement>) {
  return <hr className={cx('aba-rule', tone !== 'ink' && `aba-rule--${tone}`, className)} {...rest} />;
}

/** `.aba-byline` — author/date line. Wrap the name in <strong>. */
export function Byline({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cx('aba-byline', className)} {...rest}>{children}</div>;
}

/** `.aba-byl` — structured byline: name · separator · time. */
export function StructuredByline({ name, meta, className }: { name: string; meta?: ReactNode; className?: string }) {
  return (
    <div className={cx('aba-byl', className)}>
      <span className="aba-byl__name">{name}</span>
      {meta && (
        <>
          <span className="aba-byl__sep" aria-hidden="true">·</span>
          <span>{meta}</span>
        </>
      )}
    </div>
  );
}

/** Monospace data label — the `IBM Plex Mono` metadata used for dates, indices and captions. */
export function MonoLabel({ tone = 'muted', className, children, style, ...rest }: {
  tone?: 'muted' | 'gold' | 'red' | 'on-dark';
  children: ReactNode;
} & HTMLAttributes<HTMLSpanElement>) {
  const color = tone === 'gold' ? 'var(--color-gold-600)' : tone === 'red' ? 'var(--color-red-600)' : tone === 'on-dark' ? 'var(--on-dark-text)' : 'var(--text-muted)';
  return (
    <span
      className={cx('aba-mono-label', className)}
      style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--meta-size)', letterSpacing: 'var(--meta-tracking)', color, ...style }}
      {...rest}
    >
      {children}
    </span>
  );
}

/** `.aba-stat` — KPI numeral with label and optional delta. */
export function Stat({ label, value, delta, mono, className }: {
  label: ReactNode;
  value: ReactNode;
  delta?: { direction: 'up' | 'down'; label: ReactNode };
  mono?: boolean;
  className?: string;
}) {
  return (
    <div className={cx('aba-stat', className)}>
      <span className="aba-stat__label">{label}</span>
      <span className={cx('aba-stat__value', mono && 'aba-stat__value--mono')}>{value}</span>
      {delta && (
        <span className={cx('aba-stat__delta', `aba-stat__delta--${delta.direction}`)}>
          {delta.direction === 'up' ? '▲' : '▼'} {delta.label}
        </span>
      )}
    </div>
  );
}

/** `.aba-pullquote` — serif pull quote with gold rule. */
export function PullQuote({ cite, className, children }: { cite?: ReactNode; className?: string; children: ReactNode }) {
  return (
    <blockquote className={cx('aba-pullquote', className)}>
      {children}
      {cite && <cite className="aba-pullquote__cite">{cite}</cite>}
    </blockquote>
  );
}
