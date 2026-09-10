import styles from './BankingTopics.module.css';
import { bankingTopics, megaMenu } from '@workspace/aba-content';

export function BankingTopics() {
  const topicsTab = megaMenu.find(t => t.key === 'topics');
  const allTopicsHref = topicsTab?.groups.find(g => g.title === 'Growth')?.links.find(l => l.label.includes('A–Z'))?.href || topicsTab?.href || '#';

  return (
    <div className={styles.wrapper} data-screen-label="Banking topics">
      <div className={styles.container}>
        <div className={styles.intro}>
          <span className={styles.headerTitle}>Banking topics</span>
          <p className={styles.dek}>Nine practice areas, each with resources, training, expert staff and peer groups behind it.</p>
          <a href={allTopicsHref} className={styles.headerLink}>All topics A–Z &rarr;</a>
        </div>

        <ol className={styles.index}>
          {bankingTopics.map((topic, i) => (
            <li key={topic.href} className={styles.item}>
              <a href={topic.href} className={styles.link}>
                <span className={styles.idx}>{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.text}>
                  <span className={styles.label}>{topic.label}</span>
                  <span className={styles.desc}>{topic.desc}</span>
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
