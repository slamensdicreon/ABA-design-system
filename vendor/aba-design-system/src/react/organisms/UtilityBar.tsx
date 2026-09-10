import styles from './UtilityBar.module.css';

export function UtilityBar() {
  return (
    <div className={styles.utilityBar} data-screen-label="Utility bar">
      <div className={styles.container}>
        <span className={styles.tagline}>WASHINGTON, DC · EST. 1875</span>
        <div className={styles.links}>
          <a href="#" className={styles.link}>Routing Lookup</a>
          <a href="#" className={styles.link}>Newsroom</a>
          <a href="#" className={`${styles.link} ${styles.primary}`}>Member Login</a>
        </div>
      </div>
    </div>
  );
}
