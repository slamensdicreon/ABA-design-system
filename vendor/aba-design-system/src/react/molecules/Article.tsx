import type { ReactNode } from 'react';
import { cx } from '../cx';
import { Kick } from '../atoms/Typography';

/** `.aba-article` — editorial article card (lead / md / sm, optional row layout). */
export function ArticleCard({ size = 'md', row, media, kicker, kickerTone, title, href, dek, byline, className }: {
  size?: 'lead' | 'md' | 'sm';
  row?: boolean;
  media?: ReactNode;
  kicker?: ReactNode;
  kickerTone?: 'brand' | 'gold' | 'breaking' | 'neutral';
  title: ReactNode;
  href: string;
  dek?: ReactNode;
  byline?: ReactNode;
  className?: string;
}) {
  return (
    <article className={cx('aba-article', `aba-article--${size}`, row && 'aba-article--row', className)}>
      {media && <div className="aba-article__media">{media}</div>}
      <div>
        {kicker && <div className="aba-article__kick"><Kick tone={kickerTone}>{kicker}</Kick></div>}
        <h3 className="aba-article__title"><a href={href}>{title}</a></h3>
        {dek && <p className="aba-article__dek">{dek}</p>}
        {byline}
      </div>
    </article>
  );
}

/** `.aba-ranked` — numbered most-read item. */
export function RankedItem({ rank, title, href, meta, className }: { rank: number; title: ReactNode; href: string; meta?: ReactNode; className?: string }) {
  return (
    <div className={cx('aba-ranked', className)}>
      <span className="aba-ranked__num">{rank}</span>
      <div>
        <p className="aba-ranked__title"><a href={href} style={{ color: 'inherit' }}>{title}</a></p>
        {meta}
      </div>
    </div>
  );
}

/** `.aba-ticker` — market ticker strip. */
export function Ticker({ label, items, className }: { label: ReactNode; items: Array<{ sym: string; val: string; chg?: string; direction?: 'up' | 'down' }>; className?: string }) {
  return (
    <div className={cx('aba-ticker', className)} role="marquee" aria-label="Market ticker">
      <span className="aba-ticker__label">{label}</span>
      <div className="aba-ticker__track">
        {items.map((it) => (
          <span key={it.sym} className="aba-ticker__item">
            <span className="aba-ticker__sym">{it.sym}</span>
            <span className="aba-ticker__val">{it.val}</span>
            {it.chg && <span className={it.direction === 'down' ? 'aba-ticker__chg--down' : 'aba-ticker__chg--up'}>{it.chg}</span>}
          </span>
        ))}
      </div>
    </div>
  );
}
