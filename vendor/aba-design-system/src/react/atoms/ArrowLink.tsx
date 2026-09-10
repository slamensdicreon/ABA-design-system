import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { cx } from '../cx';
import { ArrowRightIcon, ArrowUpRightIcon } from './icons';
import styles from './ArrowLink.module.css';

export interface ArrowLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** `text` renders the homepage "All →" text arrow; `icon` renders the SVG glyph that widens on hover. */
  glyph?: 'text' | 'icon' | 'diagonal';
  size?: 'sm' | 'md';
  onDark?: boolean;
  children: ReactNode;
}

/** Semibold link with a trailing arrow — the homepage's "All →" / "Read the view" pattern. */
export function ArrowLink({ glyph = 'text', size = 'sm', onDark, className, children, ...rest }: ArrowLinkProps) {
  return (
    <a className={cx(styles.link, size === 'md' && styles.md, onDark && styles.onDark, glyph !== 'text' && styles.iconGlyph, className)} {...rest}>
      <span>{children}</span>
      {glyph === 'text' && <span aria-hidden="true">→</span>}
      {glyph === 'icon' && <ArrowRightIcon size={14} />}
      {glyph === 'diagonal' && <ArrowUpRightIcon size={14} />}
    </a>
  );
}
