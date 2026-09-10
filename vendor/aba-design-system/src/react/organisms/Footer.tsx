import { useAbaAssets } from '../assets';
import styles from './Footer.module.css';
import { footerGroups, quickActions } from '@workspace/aba-content';

export function Footer() {
  const { image } = useAbaAssets();
  const contactLink = quickActions.find(q => q.label === 'Contact ABA')?.href || '#';

  return (
    <div className={styles.wrapper} data-screen-label="Footer">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.logoCol}>
            <img 
              src={image('footerLogo')} 
              alt="ABA" 
              className={styles.logo}
            />
            <p className={styles.dek}>
              The united voice of America’s banks — serving members, customers and communities since 1875.
            </p>
          </div>
          {footerGroups.map((group, i) => (
            <div key={i}>
              <span className={styles.colTitle}>{group.title}</span>
              <div className={styles.linkList}>
                {group.links.map((l, j) => (
                  <a href={l.href} key={j} className={styles.link} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener' : undefined}>
                    {l.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className={styles.bottom}>
          <span>© 2026 American Bankers Association · 1-800-BANKERS · Washington, DC</span>
          <div className={styles.legalLinks}>
            <a href="https://www.aba.com/about-us/privacy-policy" className={styles.link} target="_blank" rel="noopener">Privacy</a>
            <a href="https://www.aba.com/about-us/terms-of-use" className={styles.link} target="_blank" rel="noopener">Terms</a>
            <a href={contactLink} className={styles.link} target="_blank" rel="noopener">Contact</a>
          </div>
        </div>
      </div>
    </div>
  );
}
