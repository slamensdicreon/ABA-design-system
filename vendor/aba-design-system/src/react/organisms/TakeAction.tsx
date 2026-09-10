import styles from './TakeAction.module.css';
import { takeAction } from '@workspace/aba-content';

export function TakeAction() {
  return (
    <div className={styles.wrapper} data-screen-label="Take action">
      <div className={styles.container}>
        <span className={styles.kick}>{takeAction.kick}</span>
        <h2 className={styles.title}>{takeAction.title}</h2>
        <p className={styles.body}>{takeAction.body}</p>
        <a href={takeAction.href} className={`aba-btn aba-btn--gold aba-btn--lg ${styles.cta}`} target="_blank" rel="noopener">
          {takeAction.cta}
        </a>

        <a href={takeAction.opEd.href} className={styles.opEd} target="_blank" rel="noopener">
          <span className={styles.opEdKick}>{takeAction.opEd.kick}</span>
          <span className={styles.opEdText}>
            <span className={styles.opEdTitle}>{takeAction.opEd.title}</span>
            <span className={styles.opEdBody}>{takeAction.opEd.body}</span>
          </span>
          <span className={styles.opEdCta}>
            {takeAction.opEd.cta}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
          </span>
        </a>
      </div>
    </div>
  );
}
