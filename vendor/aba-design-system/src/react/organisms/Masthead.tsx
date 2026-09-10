import { useAbaAssets } from '../assets';
import { useState, useRef, useEffect } from 'react';
import styles from './Masthead.module.css';
import { MeganavPanel } from './MeganavPanel';
import { megaMenu, quickActions } from '@workspace/aba-content';

export function Masthead() {
  const { image } = useAbaAssets();
  const [navOpen, setNavOpen] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileTab, setOpenMobileTab] = useState<string | null>(null);

  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leaveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (key: string) => {
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    
    hoverTimeout.current = setTimeout(() => {
      setNavOpen(key);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    
    leaveTimeout.current = setTimeout(() => {
      setNavOpen(null);
    }, 150);
  };

  const handleClick = (key: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    if (navOpen === key) {
      setNavOpen(null);
    } else {
      setNavOpen(key);
    }
  };

  const handleMobileTabToggle = (key: string) => {
    setOpenMobileTab(prev => prev === key ? null : key);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setNavOpen(null);
        setMobileMenuOpen(false);
      }
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(`.${styles.mastheadWrapper}`)) {
        setNavOpen(null);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
    };
  }, []);

  const navDef = megaMenu.find(n => n.key === navOpen);
  const joinAbaLink = quickActions.find(q => q.label === 'Join ABA')?.href || '#';

  return (
    <div 
      className={styles.mastheadWrapper} 
      data-screen-label="Masthead"
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.masthead}>
        <img 
          src={image('mastheadLogo')} 
          alt="American Bankers Association" 
          className={styles.logo}
        />
        
        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          {megaMenu.map(n => (
            <button 
              key={n.key}
              onClick={() => handleClick(n.key)}
              onMouseEnter={() => handleMouseEnter(n.key)}
              className={styles.navBtn}
              style={{
                color: navOpen === n.key ? 'var(--color-blue-800)' : 'var(--text-primary)',
                borderBottomColor: navOpen === n.key ? 'var(--color-gold-500)' : 'transparent'
              }}
              aria-expanded={navOpen === n.key}
              aria-controls={`meganav-${n.key}`}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <a href={joinAbaLink} className={`aba-btn aba-btn--secondary aba-btn--sm ${styles.joinBtnDesktop}`}>Join ABA</a>
        
        <button 
          className={styles.hamburger} 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </div>

      {/* Desktop Meganav Panel */}
      {navOpen && navDef && (
        <div 
          className={styles.panelContainer}
          onMouseEnter={() => {
            if (leaveTimeout.current) clearTimeout(leaveTimeout.current);
          }}
        >
          <MeganavPanel navDef={navDef} />
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={styles.mobileDrawer}>
          <div className={styles.mobileDrawerInner}>
            <div className={styles.mobileTabs}>
              {megaMenu.map(tab => (
                <div key={tab.key} className={styles.mobileTabGroup}>
                  <button 
                    className={styles.mobileTabBtn} 
                    onClick={() => handleMobileTabToggle(tab.key)}
                    style={{
                      color: openMobileTab === tab.key ? 'var(--color-blue-800)' : 'var(--text-primary)',
                      borderBottomColor: openMobileTab === tab.key ? 'var(--color-gold-500)' : 'var(--border-default)'
                    }}
                  >
                    {tab.label}
                  </button>
                  {openMobileTab === tab.key && (
                    <div className={styles.mobileTabContent}>
                      <p className={styles.mobileTabIntro}>{tab.intro}</p>
                      
                      <div className={styles.mobileTabLinks}>
                        {tab.groups.map((group, i) => (
                          <div key={i} className={styles.mobileGroup}>
                            <span className={styles.mobileGroupTitle}>{group.title}</span>
                            {group.links.map((link, j) => (
                              <div key={j} className={styles.mobileLinkWrapper}>
                                <a href={link.href} className={styles.mobileLink}>{link.label}</a>
                                {link.desc && <span className={styles.mobileLinkDesc}>{link.desc}</span>}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>

                      <div className={styles.mobileFeatured}>
                        <span className={styles.mobileFeatKick}>{tab.featured.kick}</span>
                        <p className={styles.mobileFeatTitle}>{tab.featured.title}</p>
                        <a href={tab.featured.href} className={styles.mobileFeatCta}>
                          {tab.featured.cta}
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className={styles.mobileQuickActions}>
              {quickActions.map((action, idx) => (
                <a key={idx} href={action.href} className={styles.mobileQuickAction}>
                  {action.label}
                </a>
              ))}
              <a href={joinAbaLink} className={`aba-btn aba-btn--secondary ${styles.mobileJoinBtn}`}>
                Join ABA
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
