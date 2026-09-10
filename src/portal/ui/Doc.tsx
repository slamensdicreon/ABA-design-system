import type { ReactNode } from 'react';
import { Link } from 'wouter';
import { Kicker, ArrowRightIcon } from '@workspace/aba-design-system';

/** Renders `code` spans in plain-text copy. */
export function inlineCode(text: string): ReactNode {
  const parts = text.split(/(`[^`]+`)/g);
  if (parts.length === 1) return text;
  return parts.map((p, i) => (p.startsWith('`') && p.endsWith('`') ? <code key={i} className="doc-code-inline">{p.slice(1, -1)}</code> : p));
}

export function PageHead({ kicker, title, lede, meta }: { kicker: string; title: string; lede?: ReactNode; meta?: ReactNode[] }) {
  return (
    <header className="doc-head">
      <Kicker tone="gold" className="doc-head__kick">{kicker}</Kicker>
      <h1 className="doc-head__title">{title}</h1>
      {lede && <p className="doc-head__lede">{typeof lede === 'string' ? inlineCode(lede) : lede}</p>}
      {meta && meta.length > 0 && <div className="doc-head__meta">{meta.map((m, i) => <span key={i}>{m}</span>)}</div>}
    </header>
  );
}

export function Section({ id, title, meta, children }: { id?: string; title: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <section className="doc-section" id={id ?? slugify(title)}>
      <div className="doc-section__head">
        <h2 className="doc-section__title">{title}</h2>
        <hr className="doc-section__rule" />
        {meta && <span className="doc-section__meta">{meta}</span>}
      </div>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="doc-prose">{children}</div>;
}

export function Note({ children }: { children: ReactNode }) {
  return <div className="doc-note">{children}</div>;
}

export function H3({ children }: { children: ReactNode }) {
  return <h3 className="doc-h3">{children}</h3>;
}

export function DocCard({ href, index, title, desc, preview }: { href: string; index?: string; title: string; desc?: string; preview?: ReactNode }) {
  return (
    <Link href={href} className="doc-card">
      {index && <span className="doc-card__idx">{index}</span>}
      <h3 className="doc-card__title">{title}</h3>
      {desc && <p className="doc-card__desc">{inlineCode(desc)}</p>}
      {preview && <div className="doc-card__preview">{preview}</div>}
      <span className="doc-card__arrow" aria-hidden="true"><ArrowRightIcon size={18} /></span>
    </Link>
  );
}

export function DoDont({ dos, donts }: { dos: string[]; donts: string[] }) {
  return (
    <div className="dodont">
      <div className="dodont__col">
        <p className="dodont__label">Do</p>
        <ul>{dos.map((d) => <li key={d}>{inlineCode(d)}</li>)}</ul>
      </div>
      <div className="dodont__col dodont__col--dont">
        <p className="dodont__label">Don’t</p>
        <ul>{donts.map((d) => <li key={d}>{inlineCode(d)}</li>)}</ul>
      </div>
    </div>
  );
}

export function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}
