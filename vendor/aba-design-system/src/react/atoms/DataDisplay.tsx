import type { HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import { CloseIcon } from './icons';

export type BadgeTone = 'brand' | 'neutral' | 'gold' | 'positive' | 'negative' | 'caution' | 'solid' | 'breaking';

/** `.aba-badge` — small uppercase status pill. */
export function Badge({ tone = 'brand', dot, className, children, ...rest }: { tone?: BadgeTone; dot?: boolean; children: ReactNode } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx('aba-badge', tone !== 'brand' && `aba-badge--${tone}`, className)} {...rest}>
      {dot && <span className="aba-badge__dot" aria-hidden="true" />}
      {children}
    </span>
  );
}

/** `.aba-tag` — categorical chip, optionally removable. */
export function Tag({ active, onRemove, className, children, ...rest }: { active?: boolean; onRemove?: () => void; children: ReactNode } & HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx('aba-tag', active && 'aba-tag--active', className)} {...rest}>
      {children}
      {onRemove && (
        <button type="button" className="aba-tag__x" onClick={onRemove} aria-label="Remove" style={{ appearance: 'none', border: 0, background: 'none', padding: 0, color: 'inherit' }}>
          <CloseIcon size={10} />
        </button>
      )}
    </span>
  );
}

/** `.aba-avatar` — initials or image. */
export function Avatar({ name, src, size = 'md', square, className, ...rest }: {
  name: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg';
  square?: boolean;
} & Omit<ImgHTMLAttributes<HTMLSpanElement>, 'src'>) {
  const initials = name.split(/\s+/).map((p) => p[0]).slice(0, 2).join('');
  return (
    <span className={cx('aba-avatar', size !== 'md' && `aba-avatar--${size}`, square && 'aba-avatar--square', className)} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

/** `.aba-progress` — determinate progress bar. */
export function Progress({ value, max = 100, gold, label, className }: { value: number; max?: number; gold?: boolean; label?: string; className?: string }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={cx('aba-progress', gold && 'aba-progress--gold', className)} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={max} aria-label={label}>
      <div className="aba-progress__bar" style={{ width: `${pct}%` }} />
    </div>
  );
}

/** `.aba-spinner` — indeterminate loading indicator. */
export function Spinner({ size = 'md', label = 'Loading', className }: { size?: 'sm' | 'md' | 'lg'; label?: string; className?: string }) {
  return <span className={cx('aba-spinner', size !== 'md' && `aba-spinner--${size}`, className)} role="status" aria-label={label} />;
}

/** `.aba-card` — structural surface. */
export function Card({ hover, flush, className, children, ...rest }: { hover?: boolean; flush?: boolean; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('aba-card', hover && 'aba-card--hover', flush && 'aba-card--flush', className)} {...rest}>
      {children}
    </div>
  );
}
