import styles from './HouseView.module.css';
import { content } from './content';
import { ABA } from '@workspace/aba-content';

const analysisHref = `${ABA}/news-research/analysis-guides`;

export function HouseView() {
  return (
    <div className={styles.wrapper} data-screen-label="House view">
      <div className={styles.header}>
        <span className={styles.headerTitle}>The house view</span>
        <hr className={styles.hr} />
        <span className={styles.headerMeta}>UPDATED WEEKLY</span>
        <a href={analysisHref} className={styles.headerLink}>All analysis &rarr;</a>
      </div>
      
      <div className={styles.grid}>
        {content.houseView.map((h, i) => (
          <div key={i} className={`${styles.item} ${i === 0 ? styles.firstItem : ''}`}>
            <span className={styles.idx}>0{i + 1}</span>
            <h3 className={styles.itemTitle}>
              <a href="#">{h.title}</a>
            </h3>
            <p className={styles.dek}>{h.dek}</p>
            <span className={styles.meta}>{h.meta}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
