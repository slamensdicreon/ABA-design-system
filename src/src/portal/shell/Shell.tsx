import { useEffect, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { IconButton, MenuIcon, CloseIcon } from '@workspace/aba-design-system';
import { NAV, SEARCH_INDEX, type NavItem } from './nav';
import { Search } from './Search';
import { IMAGES } from '../lib/assets';

function crumbsFor(path: string) {
  const parts = path.split('/').filter(Boolean);
  const items: Array<{ label: ReactNode; href?: string }> = [{ label: 'Portal', href: '/' }];
  let acc = '';
  parts.forEach((p, idx) => {
    acc += `/${p}`;
    const found = SEARCH_INDEX.find((i) => i.href === acc);
    const label = found?.label ?? p.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
    items.push(idx === parts.length - 1 ? { label } : { label, href: acc });
  });
  return items;
}

/** Breadcrumbs using the design-system classes but router-aware links. */
function Crumbs({ items }: { items: Array<{ label: ReactNode; href?: string }> }) {
  return (
    <nav className="aba-breadcrumbs" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} style={{ display: 'contents' }}>
            {last || !it.href ? <span className={last ? 'aba-breadcrumbs__current' : undefined} aria-current={last ? 'page' : undefined}>{it.label}</span> : <Link href={it.href}>{it.label}</Link>}
            {!last && <span className="aba-breadcrumbs__sep" aria-hidden="true">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

function NavLink({ item, depth = 0, current }: { item: NavItem; depth?: number; current: string }) {
  const isCurrent = current === item.href;
  const inSection = item.children && (current === item.href || current.startsWith(item.href + '/'));
  return (
    <li>
      <Link href={item.href} className="portal-nav__link" aria-current={isCurrent ? 'page' : undefined}>
        <span>{item.label}</span>
        {item.children && <span className="portal-nav__count">{item.children.length}</span>}
      </Link>
      {item.children && inSection && (
        <ul className="portal-nav__sub" style={{ listStyle: 'none', padding: 0 }}>
          {item.children.map((c) => <NavLink key={c.href} item={c} depth={depth + 1} current={current} />)}
        </ul>
      )}
    </li>
  );
}

export function Shell({ children, wide }: { children: ReactNode; wide?: boolean }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); window.scrollTo({ top: 0 }); }, [location]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div className="portal">
      <a className="portal-skip" href="#portal-main">Skip to content</a>
      {open && <div className="portal-scrim" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside className={`portal-sidebar${open ? ' is-open' : ''}`} aria-label="Portal navigation">
        <Link href="/" className="portal-brand" aria-label="ABA Brand Portal home">
          <img className="portal-brand__logo" src={IMAGES.mastheadLogo} alt="American Bankers Association" />
          <span className="portal-brand__sub">Design system · v1.0</span>
        </Link>
        <nav className="portal-nav">
          {NAV.map((g) => (
            <div className="portal-nav__group" key={g.title}>
              <span className="portal-nav__group-title">{g.title}</span>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {g.items.map((i) => <NavLink key={i.href} item={i} current={location} />)}
              </ul>
            </div>
          ))}
        </nav>
        <div className="portal-sidebar__foot">Public · no sign-in · statically built</div>
      </aside>
      <div className="portal-main">
        <header className="portal-topbar">
          <span className="portal-menu-btn">
            <IconButton label={open ? 'Close navigation' : 'Open navigation'} variant="outline" onClick={() => setOpen((o) => !o)}>{open ? <CloseIcon /> : <MenuIcon />}</IconButton>
          </span>
          <div className="portal-crumbs"><Crumbs items={crumbsFor(location)} /></div>
          <Search />
        </header>
        <main id="portal-main" className={`portal-content${wide ? ' portal-content--wide' : ''}`}>{children}</main>
      </div>
    </div>
  );
}
