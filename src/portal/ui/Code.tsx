import { useState } from 'react';
import { useCopy } from '../lib/copy';

export function CopyButton({ text, light, label = 'Copy' }: { text: string; light?: boolean; label?: string }) {
  const { copied, copy } = useCopy();
  return (
    <button type="button" className={`copy-btn${light ? ' copy-btn--light' : ''}`} onClick={() => void copy(text)} aria-live="polite">
      {copied ? 'Copied' : label}
    </button>
  );
}

export function CodeBlock({ code, light, language }: { code: string; light?: boolean; language?: string }) {
  return (
    <pre className={`code${light ? ' code--light' : ''}`} data-language={language}>
      <span className="code__copy"><CopyButton text={code} light={light} /></span>
      <code>{code}</code>
    </pre>
  );
}

/** Tabbed code (e.g. JSX / CSS / HTML). */
export function CodeTabs({ tabs }: { tabs: Array<{ label: string; code: string; language?: string }> }) {
  const [i, setI] = useState(0);
  const valid = tabs.filter((t) => t.code && t.code.trim());
  if (valid.length === 0) return null;
  const active = valid[Math.min(i, valid.length - 1)];
  return (
    <div>
      <div className="code-tabs" role="tablist">
        {valid.map((t, idx) => (
          <button key={t.label} type="button" role="tab" aria-selected={idx === i} className={idx === i ? 'is-active' : undefined} onClick={() => setI(idx)}>{t.label}</button>
        ))}
      </div>
      <CodeBlock code={active.code} language={active.language} />
    </div>
  );
}
