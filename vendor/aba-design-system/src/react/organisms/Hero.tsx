import { useAbaAssets } from '../assets';
import styles from './Hero.module.css';
import { content } from './content';

export function Hero() {
  const { image } = useAbaAssets();
  return (
    <div className={styles.heroWrapper} data-screen-label="Hero">
      <div className={styles.container}>
        <div className={styles.textContent}>
          <span className={styles.kick}>{content.heroKick}</span>
          <h1 className={styles.title}>{content.heroTitle}</h1>
          <p className={styles.dek}>{content.heroDek}</p>
          <a href="#" className={styles.link}>
            {content.heroLink}
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path>
            </svg>
          </a>
        </div>
        <div className={styles.imageContainer}>
          <img 
            src={image('heroCityscape')} 
            alt="Financial district at dusk" 
            className={styles.image}
          />
          <div className={styles.caption}>
            <span className={styles.captionText}>BANKS OF ALL SIZES · 50 STATES + DC</span>
            <span className={styles.captionText}>SINCE 1875</span>
          </div>
        </div>
      </div>
    </div>
  );
}
