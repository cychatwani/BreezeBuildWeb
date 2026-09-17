"use client";

import { LampContainer } from "@/components/ui/lamp";
import backdrop from "../backdrop.module.css";
import styles from "./FooterSection.module.css";

/*
 * Closing statement rather than a site map: no nav columns, no social grid,
 * no newsletter. Two blocks - what BreezeBuild is right now, and who is
 * building it - lit from above by the lamp, which is what closes the page on
 * the brand accent.
 *
 * The lamp's content wrapper centres its children and lifts them 20rem by
 * default, which suits a lone headline; the footer needs full width, its own
 * alignment, and a much smaller lift, hence contentClassName.
 */

const EMAIL = "contact@chirag45.dev";
const SITE = "https://chirag45.dev";

export function FooterSection() {
  return (
    <footer className={styles.root}>
      <LampContainer
        className="min-h-[38rem] justify-end rounded-none pb-10"
        contentClassName="w-full -translate-y-6 items-stretch px-0"
      >
        <div className={backdrop.shell}>
          <div className={styles.grid}>
            <div className={styles.primary}>
              <span className={styles.wordmark}>
                Breeze<span className={styles.wordmarkBuild}>Build</span>
              </span>

              <span className={styles.status}>
                <span className={styles.statusDot} aria-hidden="true" />
                BreezeBuild is actively under development.
              </span>

              <p className={styles.body}>
                This is an evolving idea. If you have feedback, ideas, or
                suggestions, I would love to hear from you.
              </p>

              <a className={styles.email} href={`mailto:${EMAIL}`}>
                {EMAIL}
              </a>
            </div>

            <div className={styles.by}>
              <span className={styles.byLabel}>Built by</span>
              <span className={styles.byName}>Chirag Chatwani</span>
              <p className={styles.bio}>
                Software Engineer focused on backend engineering and AI-powered
                systems. I build with Java, Spring Boot, distributed systems,
                and modern AI infrastructure.
              </p>
              <a
                className={styles.about}
                href={SITE}
                target="_blank"
                rel="noopener noreferrer"
              >
                About me <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

          <p className={styles.closing}>Built in public, one piece at a time.</p>
        </div>
      </LampContainer>
    </footer>
  );
}
