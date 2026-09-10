import styles from './LatestNews.module.css';
import { latestNews, allNewsHref, megaMenu } from '@workspace/aba-content';

export function LatestNews() {
  const [lead, ...rest] = latestNews;
  const databank = megaMenu.find((t) => t.key === 'news')?.featured;
  return (
    <div className={styles.wrapper} data-screen-label="Latest news">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Latest banking news</span>
          <hr className={styles.hr} />
          <span className={styles.headerJournal}>ABA BANKING JOURNAL</span>
          <a href={allNewsHref} className={styles.headerLink}>View all news &rarr;</a>
        </div>

        <div className={styles.grid}>
          <a href={lead.href} className={styles.lead} target="_blank" rel="noopener">
            <span className={styles.leadType}>{lead.type}</span>
            <span className={styles.leadTitle}>{lead.title}</span>
            {databank?.desc && <span className={styles.leadDek}>{databank.desc}</span>}
            <span className={styles.leadMeta}>
              <span className={styles.date}>{lead.date}</span>
              <span className={styles.leadCta}>
                {databank?.cta ?? 'Read more'}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
              </span>
            </span>
          </a>

          <div className={styles.list}>
            {rest.map((news) => (
              <a href={news.href} key={news.href} className={styles.row} target="_blank" rel="noopener">
                <span className={styles.type}>{news.type}</span>
                <span className={styles.title}>{news.title}</span>
                <span className={styles.date}>{news.date}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
