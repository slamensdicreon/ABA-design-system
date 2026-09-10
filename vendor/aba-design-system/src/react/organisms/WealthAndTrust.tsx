import { useAbaAssets } from '../assets';
import styles from './WealthAndTrust.module.css';
import { wealthAndTrust } from '@workspace/aba-content';

export function WealthAndTrust() {
  const { image } = useAbaAssets();
  return (
    <div className={styles.wrapper} data-screen-label="Wealth and trust">
      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.kick}>{wealthAndTrust.kick}</span>
          <h2 className={styles.title}>{wealthAndTrust.title}</h2>
          <p className={styles.dek}>{wealthAndTrust.dek}</p>
          <div className={styles.links}>
            {wealthAndTrust.links.map((link, i) => (
              <a
                href={link.href}
                key={link.href}
                className={i === wealthAndTrust.links.length - 1 ? `${styles.link} ${styles.linkLast}` : styles.link}
              >
                <span className={styles.linkTitle}>{link.title}</span>
                <span className={styles.linkMeta}>{link.meta}</span>
              </a>
            ))}
          </div>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={image('wealthTrustPhoto')}
            alt="Advisors in session at an ABA Wealth & Trust School"
            className={styles.image}
          />
          <div className={styles.caption}>
            <span className={styles.captionText}>{wealthAndTrust.imageCaption}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
