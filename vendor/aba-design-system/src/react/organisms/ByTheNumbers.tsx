import styles from './ByTheNumbers.module.css';
import { byTheNumbers } from '@workspace/aba-content';

export function ByTheNumbers() {
  const { hero, supporting } = byTheNumbers;
  return (
    <div className={styles.wrapper} data-screen-label="By the numbers">
      <div className={styles.container}>
        <div className={styles.figure}>
          <div className={styles.number}>{hero.value}<span className={styles.unit}>{hero.unit}</span></div>
          <span className={styles.source}>{hero.source}</span>
        </div>

        <div className={styles.content}>
          <p className={styles.lead}>{hero.lead}</p>
          <p className={styles.dek}>{hero.dek}</p>
          <a href={hero.href} className={styles.link}>
            {hero.cta}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </a>

          <dl className={styles.supporting}>
            {supporting.map((stat) => (
              <div key={stat.value} className={styles.stat}>
                <dt className={styles.statValue}>{stat.value}</dt>
                <dd className={styles.statLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
