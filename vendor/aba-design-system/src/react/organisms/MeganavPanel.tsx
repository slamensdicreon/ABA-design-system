import styles from './MeganavPanel.module.css';
import { MegaMenuTab, quickActions } from '@workspace/aba-content';

export function MeganavPanel({ navDef }: { navDef: MegaMenuTab }) {
  return (
    <div className={styles.meganav} data-screen-label="Meganav panel">
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Intro Column */}
          <div className={styles.introCol}>
            <h2 className={styles.introHeading}>{navDef.label}</h2>
            <p className={styles.introText}>{navDef.intro}</p>
            <a href={navDef.href} className={styles.introLink}>
              All {navDef.label} &rarr;
            </a>
          </div>

          {/* Group Columns */}
          {navDef.groups.map((group, i) => (
            <div key={i} className={styles.col}>
              <span className={styles.colTitle}>{group.title}</span>
              <div className={styles.linkList}>
                {group.links.map((l, j) => (
                  <div key={j} className={styles.linkWrapper}>
                    <a href={l.href} className={styles.link}>{l.label}</a>
                    {l.desc && <span className={styles.linkDesc}>{l.desc}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* Featured Column */}
          <div className={styles.feat}>
            <span className={styles.featKick}>{navDef.featured.kick}</span>
            <p className={styles.featTitle}>{navDef.featured.title}</p>
            <p className={styles.featDesc}>{navDef.featured.desc}</p>
            <a href={navDef.featured.href} className={styles.featCta}>
              {navDef.featured.cta} 
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
          </div>
        </div>

        {/* Footer Row */}
        <div className={styles.footerRow}>
          <div className={styles.quickActions}>
            {quickActions.map((action, i) => (
              <a key={i} href={action.href} className={styles.quickActionLink}>
                {action.label}
              </a>
            ))}
          </div>
          <span className={styles.footerNote}>
            1-800-BANKERS &nbsp;&middot;&nbsp; Washington, DC
          </span>
        </div>
      </div>
    </div>
  );
}
