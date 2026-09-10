import { forwardRef, useId, type InputHTMLAttributes, type LabelHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import { cx } from '../cx';
import { CheckIcon, ChevronDownIcon, SearchIcon } from './icons';

type ControlSize = 'sm' | 'md' | 'lg';

/** `.aba-field` — vertical stack of label, control and hint/error. */
export function Field({ error, className, children }: { error?: boolean; className?: string; children: ReactNode }) {
  return <div className={cx('aba-field', error && 'aba-field--error', className)}>{children}</div>;
}

/** `.aba-label` — with optional required/optional marker. */
export function Label({ required, optional, className, children, ...rest }: { required?: boolean; optional?: boolean; children: ReactNode } & LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label className={cx('aba-label', className)} {...rest}>
      {children}
      {required && <span className="aba-label__req" aria-hidden="true">*</span>}
      {optional && <span className="aba-label__opt">(optional)</span>}
    </label>
  );
}

export function Hint({ className, children, ...rest }: { children: ReactNode; className?: string; id?: string }) {
  return <p className={cx('aba-hint', className)} {...rest}>{children}</p>;
}

export function ErrorText({ className, children, ...rest }: { children: ReactNode; className?: string; id?: string }) {
  return <p className={cx('aba-error', className)} role="alert" {...rest}>{children}</p>;
}

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  size?: ControlSize;
  /** Leading adornment (icon). */
  icon?: ReactNode;
}

/** `.aba-input` — text input, optionally with leading icon (`.aba-inputwrap`). */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input({ size = 'md', icon, className, ...rest }, ref) {
  const input = <input ref={ref} className={cx('aba-input', size !== 'md' && `aba-input--${size}`, className)} {...rest} />;
  if (!icon) return input;
  return (
    <div className="aba-inputwrap">
      <span className="aba-inputwrap__icon" aria-hidden="true">{icon}</span>
      {input}
    </div>
  );
});

/** `.aba-search` — search field with magnifier. */
export const SearchInput = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function SearchInput({ className, ...rest }, ref) {
  return (
    <div className={cx('aba-search', className)} role="search">
      <span className="aba-search__icon" aria-hidden="true"><SearchIcon size={15} /></span>
      <input ref={ref} type="search" className="aba-input" placeholder="Search" {...rest} />
    </div>
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(function Textarea({ className, ...rest }, ref) {
  return <textarea ref={ref} className={cx('aba-input', 'aba-textarea', className)} {...rest} />;
});

/** `.aba-select` inside `.aba-selectwrap` with chevron. */
export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select({ className, children, ...rest }, ref) {
  return (
    <div className={cx('aba-selectwrap', className)}>
      <select ref={ref} className="aba-input aba-select" {...rest}>{children}</select>
      <span className="aba-selectwrap__chev" aria-hidden="true"><ChevronDownIcon size={14} /></span>
    </div>
  );
});

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: ReactNode;
  description?: ReactNode;
}

/** `.aba-check` — checkbox with custom box. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox({ label, description, className, ...rest }, ref) {
  return (
    <label className={cx('aba-check', className)}>
      <input ref={ref} type="checkbox" {...rest} />
      <span className="aba-check__box"><CheckIcon size={12} /></span>
      <span className="aba-check__label">{label}{description && <small>{description}</small>}</span>
    </label>
  );
});

/** `.aba-check--radio`. */
export const Radio = forwardRef<HTMLInputElement, CheckboxProps>(function Radio({ label, description, className, ...rest }, ref) {
  return (
    <label className={cx('aba-check', 'aba-check--radio', className)}>
      <input ref={ref} type="radio" {...rest} />
      <span className="aba-check__box" />
      <span className="aba-check__label">{label}{description && <small>{description}</small>}</span>
    </label>
  );
});

/** `.aba-switch` — on/off toggle. */
export const Switch = forwardRef<HTMLInputElement, Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label: ReactNode }>(function Switch({ label, className, ...rest }, ref) {
  return (
    <label className={cx('aba-switch', className)}>
      <input ref={ref} type="checkbox" role="switch" {...rest} />
      <span className="aba-switch__track" />
      <span>{label}</span>
    </label>
  );
});

/** Convenience: wires label/hint/error ids to a control. */
export function useFieldIds(prefix?: string) {
  const id = useId();
  const base = prefix ?? id;
  return { id: base, hintId: `${base}-hint`, errorId: `${base}-error` };
}
