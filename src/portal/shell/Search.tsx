import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'wouter';
import { SearchInput } from '@workspace/aba-design-system';
import { SEARCH_INDEX, type NavItem } from './nav';

function score(item: NavItem, q: string): number {
  const l = item.label.toLowerCase();
  const d = (item.desc ?? '').toLowerCase();
  const k = item.kind.toLowerCase();
  if (l === q) return 100;
  if (l.startsWith(q)) return 80;
  if (l.includes(q)) return 60;
  if (k.includes(q)) return 30;
  if (d.includes(q)) return 20;
  // token-ish queries: --color-blue-800
  if (q.startsWith('--') && (d.includes(q.replace(/^--/, '')) || l.includes(q.replace(/^--/, '')))) return 15;
  return 0;
}

export function Search() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [, navigate] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [] as NavItem[];
    return SEARCH_INDEX.map((i) => ({ i, s: score(i, query) })).filter((r) => r.s > 0).sort((a, b) => b.s - a.s).slice(0, 12).map((r) => r.i);
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!wrapRef.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const go = (item: NavItem) => { navigate(item.href); setQ(''); setOpen(false); inputRef.current?.blur(); };

  return (
    <div className="portal-search" ref={wrapRef} role="search">
      <SearchInput
        ref={inputRef}
        value={q}
        placeholder="Search pages, components, tokens"
        aria-label="Search the brand portal"
        aria-expanded={open && results.length > 0}
        aria-controls="portal-search-results"
        autoComplete="off"
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(0); }}
        onFocus={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
          else if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          else if (e.key === 'Enter' && results[active]) { e.preventDefault(); go(results[active]); }
          else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur(); }
        }}
      />
      {!q && <span className="portal-search__kbd" aria-hidden="true">/</span>}
      {open && q.trim() && (
        <div className="portal-search__results" id="portal-search-results" role="listbox">
          {results.length === 0 && <div className="portal-search__empty">No matches for “{q}”.</div>}
          {results.map((r, idx) => (
            <a key={r.href} href={`${import.meta.env.BASE_URL.replace(/\/$/, '')}${r.href}`} role="option" aria-selected={idx === active} className="portal-search__item" onMouseEnter={() => setActive(idx)} onClick={(e) => { e.preventDefault(); go(r); }}>
              <span className="portal-search__kind">{r.kind}</span>
              <span>{r.label}</span>
              {r.desc && <span className="portal-search__desc">{r.desc}</span>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
