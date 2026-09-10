import styles from './LearnAndConvene.module.css';
import { learnAndConvene, calendarHref } from '@workspace/aba-content';

export function LearnAndConvene() {
  const { featured, upcoming } = learnAndConvene;
  return (
    <div className={styles.wrapper} data-screen-label="Learn and convene">
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.headerTitle}>Learn &amp; convene</span>
          <hr className={styles.hr} />
          <a href={calendarHref} className={styles.headerLink}>Full calendar &rarr;</a>
        </div>

        <div className={styles.grid}>
          <a href={featured.href} className={styles.featured}>
            <span className={styles.featuredKick}>{featured.kick}</span>
            <span className={styles.featuredTitle}>{featured.title}</span>
            <span className={styles.featuredWhen}>
              <span>{featured.dates}</span>
              <span className={styles.featuredPlace}>{featured.place}</span>
            </span>
            <span className={styles.featuredDesc}>{featured.desc}</span>
            <span className={`aba-btn aba-btn--navy ${styles.featuredCta}`}>{featured.cta}</span>
          </a>

          <div className={styles.list}>
            <span className={styles.listTitle}>Next up</span>
            {upcoming.map((item) => (
              <a href={item.href} key={item.href} className={styles.row}>
                <span className={styles.rowWhen}>{item.when}</span>
                <span className={styles.rowText}>
                  <span className={styles.rowTitle}>{item.title}</span>
                  <span className={styles.rowType}>{item.type}</span>
                </span>
              </a>
            ))}
            <p className={styles.listFoot}>
              Also from ABA: <a href={learnAndConvene.schoolsHref}>seven schools</a> and{' '}
              <a href={learnAndConvene.certificationsHref}>nationally recognized certifications</a>. Member pricing applies across the catalog.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
