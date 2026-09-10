import { useEffect, useId, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../cx';
import { CheckIcon, ChevronDownIcon, CloseIcon, InfoIcon } from '../atoms/icons';
import { IconButton } from '../atoms/Button';

/* ---- Alert ------------------------------------------------------- */
export type AlertTone = 'info' | 'success' | 'warning' | 'danger';
export function Alert({ tone = 'info', title, icon, className, children, ...rest }: { tone?: AlertTone; title?: ReactNode; icon?: ReactNode; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('aba-alert', `aba-alert--${tone}`, className)} role={tone === 'danger' || tone === 'warning' ? 'alert' : 'status'} {...rest}>
      <span className="aba-alert__icon">{icon ?? (tone === 'success' ? <CheckIcon /> : <InfoIcon />)}</span>
      <div>
        {title && <p className="aba-alert__title">{title}</p>}
        <p className="aba-alert__body">{children}</p>
      </div>
    </div>
  );
}

/* ---- Toast ------------------------------------------------------- */
export function Toast({ tone, onClose, className, children }: { tone?: 'success' | 'danger'; onClose?: () => void; className?: string; children: ReactNode }) {
  return (
    <div className={cx('aba-toast', className)} role="status">
      {tone && <span className={cx('aba-toast__icon', `aba-toast__icon--${tone}`)}>{tone === 'success' ? <CheckIcon /> : <InfoIcon />}</span>}
      <span>{children}</span>
      {onClose && (
        <button type="button" className="aba-toast__close" onClick={onClose} aria-label="Dismiss" style={{ appearance: 'none', border: 0, background: 'none', padding: 0 }}>
          <CloseIcon size={12} />
        </button>
      )}
    </div>
  );
}

/* ---- Tabs -------------------------------------------------------- */
export interface TabItem { id: string; label: ReactNode; count?: number }
export function Tabs({ items, value, onChange, className }: { items: TabItem[]; value: string; onChange: (id: string) => void; className?: string }) {
  return (
    <div className={cx('aba-tabs', className)} role="tablist">
      {items.map((t) => (
        <button key={t.id} type="button" role="tab" aria-selected={t.id === value} className={cx('aba-tab', t.id === value && 'aba-tab--active')} onClick={() => onChange(t.id)}>
          {t.label}
          {t.count != null && <span className="aba-tab__count">{t.count}</span>}
        </button>
      ))}
    </div>
  );
}

/** `.aba-segmented` — compact segmented control. */
export function SegmentedControl({ items, value, onChange, className, label }: { items: Array<{ id: string; label: ReactNode }>; value: string; onChange: (id: string) => void; className?: string; label?: string }) {
  return (
    <div className={cx('aba-segmented', className)} role="group" aria-label={label}>
      {items.map((t) => (
        <button key={t.id} type="button" className={t.id === value ? 'is-active' : undefined} aria-pressed={t.id === value} onClick={() => onChange(t.id)}>{t.label}</button>
      ))}
    </div>
  );
}

/* ---- Breadcrumbs ------------------------------------------------- */
export function Breadcrumbs({ items, className }: { items: Array<{ label: ReactNode; href?: string }>; className?: string }) {
  return (
    <nav className={cx('aba-breadcrumbs', className)} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'contents' }}>
            {last || !it.href ? <span className={last ? 'aba-breadcrumbs__current' : undefined} aria-current={last ? 'page' : undefined}>{it.label}</span> : <a href={it.href}>{it.label}</a>}
            {!last && <span className="aba-breadcrumbs__sep" aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

/* ---- Pagination -------------------------------------------------- */
export function Pagination({ page, pageCount, onChange, className }: { page: number; pageCount: number; onChange: (p: number) => void; className?: string }) {
  const pages: Array<number | 'gap'> = [];
  for (let p = 1; p <= pageCount; p++) {
    if (p === 1 || p === pageCount || Math.abs(p - page) <= 1) pages.push(p);
    else if (pages[pages.length - 1] !== 'gap') pages.push('gap');
  }
  return (
    <nav className={cx('aba-pagination', className)} aria-label="Pagination">
      <button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">‹</button>
      {pages.map((p, i) => p === 'gap' ? <span key={`g${i}`} className="aba-pagination__gap">…</span> : (
        <button key={p} type="button" className={p === page ? 'is-active' : undefined} aria-current={p === page ? 'page' : undefined} onClick={() => onChange(p)}>{p}</button>
      ))}
      <button type="button" disabled={page >= pageCount} onClick={() => onChange(page + 1)} aria-label="Next page">›</button>
    </nav>
  );
}

/* ---- Accordion --------------------------------------------------- */
export function Accordion({ items, defaultOpen, className }: { items: Array<{ id: string; title: ReactNode; content: ReactNode }>; defaultOpen?: string; className?: string }) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null);
  return (
    <div className={cx('aba-accordion', className)}>
      {items.map((it) => {
        const isOpen = open === it.id;
        return (
          <div key={it.id} className={cx('aba-accordion__item', isOpen && 'is-open')}>
            <button type="button" className="aba-accordion__trigger" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : it.id)}>
              {it.title}
              <span className="aba-accordion__chev"><ChevronDownIcon /></span>
            </button>
            {isOpen && <div className="aba-accordion__panel"><div className="aba-accordion__panel-inner">{it.content}</div></div>}
          </div>
        );
      })}
    </div>
  );
}

/* ---- Menu -------------------------------------------------------- */
export type MenuEntry = { type?: 'item'; label: ReactNode; onSelect?: () => void; danger?: boolean; icon?: ReactNode } | { type: 'sep' } | { type: 'label'; label: ReactNode };
export function Menu({ trigger, items, align = 'left', className }: { trigger: ReactNode; items: MenuEntry[]; align?: 'left' | 'right'; className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);
  return (
    <div ref={ref} className={cx('aba-menu-wrap', className)}>
      <span onClick={() => setOpen((v) => !v)} style={{ display: 'inline-flex' }}>{trigger}</span>
      {open && (
        <div className={cx('aba-menu', align === 'right' && 'aba-menu--right')} role="menu">
          {items.map((it, i) => {
            if (it.type === 'sep') return <div key={i} className="aba-menu__sep" role="separator" />;
            if (it.type === 'label') return <div key={i} className="aba-menu__label">{it.label}</div>;
            return (
              <button key={i} type="button" role="menuitem" className={cx('aba-menu__item', it.danger && 'aba-menu__item--danger')} onClick={() => { setOpen(false); it.onSelect?.(); }}>
                {it.icon}{it.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ---- Dialog ------------------------------------------------------ */
export function Dialog({ open, onClose, title, footer, children, inline }: { open: boolean; onClose: () => void; title: ReactNode; footer?: ReactNode; children: ReactNode; /** Render in flow (docs). */ inline?: boolean }) {
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);
  if (!open) return null;
  const panel = (
    <div className="aba-dialog" role="dialog" aria-modal={!inline} aria-labelledby={id} onClick={(e) => e.stopPropagation()}>
      <div className="aba-dialog__header">
        <h2 id={id} className="aba-dialog__title">{title}</h2>
        <IconButton label="Close" size="sm" onClick={onClose}><CloseIcon size={14} /></IconButton>
      </div>
      <div className="aba-dialog__body">{children}</div>
      {footer && <div className="aba-dialog__footer">{footer}</div>}
    </div>
  );
  if (inline) return <div style={{ display: 'flex', justifyContent: 'center', padding: 24, background: 'var(--scrim)' }}>{panel}</div>;
  return <div className="aba-dialog-overlay" onClick={onClose}>{panel}</div>;
}

/* ---- Tooltip ----------------------------------------------------- */
export function Tooltip({ label, children, className }: { label: ReactNode; children: ReactNode; className?: string }) {
  return (
    <span className={cx('aba-tooltip-wrap', className)}>
      {children}
      <span className="aba-tooltip" role="tooltip">{label}</span>
    </span>
  );
}

/* ---- Empty state ------------------------------------------------- */
export function EmptyState({ icon, title, action, className, children }: { icon?: ReactNode; title: ReactNode; action?: ReactNode; className?: string; children?: ReactNode }) {
  return (
    <div className={cx('aba-empty', className)}>
      {icon && <div className="aba-empty__icon">{icon}</div>}
      <h3 className="aba-empty__title">{title}</h3>
      {children && <p className="aba-empty__body">{children}</p>}
      {action}
    </div>
  );
}

/* ---- Table ------------------------------------------------------- */
export interface TableColumn<T> { key: string; header: ReactNode; numeric?: boolean; render: (row: T) => ReactNode }
export function Table<T>({ columns, rows, rowKey, striped, className, caption }: { columns: TableColumn<T>[]; rows: T[]; rowKey: (row: T) => string; striped?: boolean; className?: string; caption?: ReactNode }) {
  return (
    <table className={cx('aba-table', striped && 'aba-table--striped', className)}>
      {caption && <caption style={{ textAlign: 'left', padding: '0 0 8px' }}>{caption}</caption>}
      <thead>
        <tr>{columns.map((c) => <th key={c.key} className={c.numeric ? 'num' : undefined} scope="col">{c.header}</th>)}</tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={rowKey(r)}>{columns.map((c) => <td key={c.key} className={c.numeric ? 'num' : undefined}>{c.render(r)}</td>)}</tr>
        ))}
      </tbody>
    </table>
  );
}
