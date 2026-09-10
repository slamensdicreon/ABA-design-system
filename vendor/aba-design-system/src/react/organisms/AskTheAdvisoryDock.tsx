import { useState } from 'react';
import { profileList } from '@workspace/aba-content';
import styles from './AskTheAdvisoryDock.module.css';

/**
 * Presentational version of the "Ask the Advisory" dock.
 *
 * The Advisory's live dock streams answers from the shared API server; this
 * component renders the same chrome (launcher pill, panel header, profile pill,
 * starters, a sample exchange, composer) without any network dependency so it
 * can be documented and previewed. `inline` renders the dock in normal flow
 * instead of floating over the page.
 */
export interface AskTheAdvisoryDockProps {
  /** Start with the panel open. */
  defaultOpen?: boolean;
  /** Render in normal document flow (for documentation). */
  inline?: boolean;
  /** Show the sample conversation instead of the welcome state. */
  sampleConversation?: boolean;
}

const STARTERS = [
  'What is ABA’s position on stablecoin yield?',
  'Which certification suits a compliance officer?',
  'When is the Annual Convention?',
];

export function AskTheAdvisoryDock({ defaultOpen = false, inline = false, sampleConversation = false }: AskTheAdvisoryDockProps) {
  const [open, setOpen] = useState(defaultOpen);
  const [draft, setDraft] = useState('');
  const profile = profileList[0];

  const dock = (
    <div className={styles.dockWrapper} data-screen-label="Ask the Advisory dock">
      {open && (
        <section className={styles.dock} role="dialog" aria-modal={!inline} aria-label="Ask the Advisory">
          <header className={styles.header}>
            <div className={styles.headerRow}>
              <div className={styles.headerText}>
                <span className={styles.kicker}>Ask the Advisory</span>
                <h2 className={styles.title}>A word with the desk.</h2>
              </div>
              <button type="button" className={styles.iconBtn} onClick={() => setOpen(false)} aria-label="Close">
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              </button>
            </div>
            <div className={styles.headerMeta}>
              {sampleConversation ? (
                <div className={styles.pillWrap}>
                  <button type="button" className={styles.pill} aria-haspopup="menu">
                    <span className={styles.pillLabel}>Tailored for</span>
                    <span className={styles.pillValue}>{profile.label}</span>
                    <span className={styles.pillChange}>change</span>
                  </button>
                </div>
              ) : (
                <span className={styles.pillHint}>Answers adapt to you as we talk.</span>
              )}
              {sampleConversation && <button type="button" className={styles.textBtn}>Start over</button>}
            </div>
          </header>

          <div className={styles.scroll}>
            {!sampleConversation ? (
              <div className={styles.welcome}>
                <p className={styles.welcomeLede}>
                  Good to have you. Ask anything about banking, policy or the profession and we will answer in ABA’s voice — and point you to the right corner of aba.com.
                </p>
                <div className={styles.starterLabel}>Or begin with</div>
                <div className={styles.starters}>
                  {STARTERS.map((s) => (
                    <button key={s} type="button" className={styles.starter} onClick={() => setDraft(s)}>{s}</button>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <article className={styles.user}>
                  <div className={styles.body}>What is ABA’s position on stablecoin yield?</div>
                </article>
                <article className={styles.assistant}>
                  <div className={styles.speaker}>The Advisory</div>
                  <div className={styles.body}>
                    <p>ABA’s view is that yield paid on stablecoin balances would function as an uninsured deposit substitute, drawing funding out of the banks that lend it back into their communities. The association has asked the Senate to close the loophole in the Clarity Act.</p>
                  </div>
                  <div className={styles.recs}>
                    <div className={styles.recsLabel}>From ABA</div>
                    <a className={styles.rec} href="https://www.aba.com/advocacy" target="_blank" rel="noopener noreferrer">
                      <span className={styles.recKind}>Advocacy</span>
                      <span className={styles.recTitle}>Clarity Act: close the stablecoin loophole</span>
                      <span className={styles.recDesc}>Tell your Senators why insured deposits must be protected.</span>
                      <span className={styles.recArrow} aria-hidden="true">→</span>
                    </a>
                  </div>
                </article>
              </>
            )}
          </div>

          <form className={styles.composer} onSubmit={(e) => e.preventDefault()}>
            <textarea
              className={styles.input}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask the Advisory…"
              rows={1}
              aria-label="Your question"
            />
            <button type="submit" className={styles.send} disabled={!draft.trim()} aria-label="Send">
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 8h11M8.5 3.5L13 8l-4.5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
            <div className={styles.footnote}>Answers draw on aba.com and may be imperfect. Confirm rules and dates with ABA.</div>
          </form>
        </section>
      )}

      <div className={`${styles.triggerContainer} ${open ? styles.triggerHiddenOnMobile : ''}`}>
        <button onClick={() => setOpen(!open)} className={styles.triggerBtn} aria-expanded={open}>
          <span className={styles.pulse} />
          {open ? 'Close the Advisory' : 'Ask the Advisory'}
        </button>
      </div>
    </div>
  );

  if (inline) return <div className={styles.inlineHost}>{dock}</div>;
  return (
    <>
      {open && <div className={styles.overlay} onClick={() => setOpen(false)} />}
      {dock}
    </>
  );
}
