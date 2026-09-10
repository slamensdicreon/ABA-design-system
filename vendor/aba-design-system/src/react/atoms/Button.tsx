import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold' | 'navy' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonBaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Full-width. */
  block?: boolean;
  /** Use on navy/dark bands (affects `secondary`). */
  onDark?: boolean;
  /** Shows a spinner and disables the control. */
  loading?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

export type ButtonProps = ButtonBaseProps & ButtonHTMLAttributes<HTMLButtonElement>;
export type ButtonLinkProps = ButtonBaseProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function buttonClassName({ variant = 'primary', size = 'md', block, onDark, className }: ButtonBaseProps & { className?: string }) {
  return cx(
    'aba-btn',
    `aba-btn--${variant}`,
    size !== 'md' && `aba-btn--${size}`,
    block && 'aba-btn--block',
    onDark && 'aba-btn--on-dark',
    className,
  );
}

function Inner({ loading, leadingIcon, trailingIcon, children }: ButtonBaseProps) {
  return (
    <>
      {loading ? <span className="aba-btn__spinner" aria-hidden="true" /> : leadingIcon}
      {children}
      {!loading && trailingIcon}
    </>
  );
}

/** `.aba-btn` — the ABA button. Renders a `<button>`. */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant, size, block, onDark, loading, leadingIcon, trailingIcon, className, disabled, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? 'button'}
      className={buttonClassName({ variant, size, block, onDark, className })}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      <Inner loading={loading} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>{children}</Inner>
    </button>
  );
});

/** `.aba-btn` styled anchor — for calls to action that navigate (as the homepage does). */
export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(function ButtonLink(
  { variant, size, block, onDark, loading, leadingIcon, trailingIcon, className, children, ...rest },
  ref,
) {
  return (
    <a ref={ref} className={buttonClassName({ variant, size, block, onDark, className })} aria-disabled={loading || undefined} {...rest}>
      <Inner loading={loading} leadingIcon={leadingIcon} trailingIcon={trailingIcon}>{children}</Inner>
    </a>
  );
});

/** `.aba-btngroup` — joins adjacent buttons. */
export function ButtonGroup({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx('aba-btngroup', className)} role="group">{children}</div>;
}

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Accessible name — required because the button has no visible text. */
  label: string;
  variant?: 'default' | 'solid' | 'outline';
  size?: ButtonSize;
  children: ReactNode;
}

/** `.aba-iconbtn` — square icon-only button. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, variant = 'default', size = 'md', className, children, ...rest },
  ref,
) {
  return (
    <button
      ref={ref}
      type={rest.type ?? 'button'}
      aria-label={label}
      title={label}
      className={cx('aba-iconbtn', variant !== 'default' && `aba-iconbtn--${variant}`, size !== 'md' && `aba-iconbtn--${size}`, className)}
      {...rest}
    >
      {children}
    </button>
  );
});
