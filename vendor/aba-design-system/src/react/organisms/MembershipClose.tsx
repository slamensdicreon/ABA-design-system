import styles from './MembershipClose.module.css';
import { membership, memberBenefits, foundation } from '@workspace/aba-content';

export function MembershipClose() {
  return (
    <div className={styles.wrapper} data-screen-label="Membership close">
      <div className={styles.container}>
        <div className={styles.close}>
          <span className={styles.kick}>{membership.kick}</span>
          <h2 className={styles.title}>{membership.title}</h2>
          <p className={styles.dek}>{membership.dek}</p>

          <div className={styles.actions}>
            <a href={membership.joinHref} className="aba-btn aba-btn--gold aba-btn--lg">{membership.joinCta}</a>
            <a href={membership.startHref} className="aba-btn aba-btn--secondary aba-btn--lg">{membership.startCta}</a>
          </div>
        </div>

        <div className={styles.columns}>
          {memberBenefits.map((benefit, i) => (
            <a href={benefit.href} key={benefit.href} className={styles.column}>
              <span className={styles.columnKick}>Member benefit {String(i + 1).padStart(2, '0')}</span>
              <span className={styles.columnTitle}>{benefit.title}</span>
              <span className={styles.columnDesc}>{benefit.desc}</span>
              <span className={styles.columnLink}>Learn more &rarr;</span>
            </a>
          ))}
          <a href={foundation.href} className={styles.column} target="_blank" rel="noopener">
            <span className={styles.columnKick}>{foundation.kick}</span>
            <span className={styles.columnTitle}>{foundation.title}</span>
            <span className={styles.columnDesc}>{foundation.body}</span>
            <span className={styles.programs}>{foundation.programs.join(' · ')}</span>
            <span className={styles.columnLink}>{foundation.cta} &rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
}
