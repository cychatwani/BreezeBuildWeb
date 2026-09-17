import styles from "./BreezeWorkspace.module.css";

/*
 * The BreezeBuild product screen shown inside the laptop.
 *
 * Panels are arranged so the loop reads left-to-right as an interface rather
 * than an infographic: the agent proposes -> a small diff is offered for review
 * -> tests and build -> synthetic data -> live preview -> deployment state.
 * Static by design; only the LIVE dot animates.
 */

const Mark = () => (
  <svg
    viewBox="0 0 100 110"
    fill="currentColor"
    className={styles.brandMark}
    aria-hidden="true"
  >
    <path d="M 17 14 Q 44 21.5 66 40.6 A 7 7 0 0 1 56 50.4 Q 37.6 28.1 17 14 Z" />
    <path d="M 17 86 Q 44 78.5 66 59.4 A 7 7 0 0 0 56 49.6 Q 37.6 71.9 17 86 Z" />
    <rect x="73" y="43.5" width="13" height="13" rx="4.2" />
  </svg>
);

const DIFF = [
  { kind: "ctx", sign: " ", text: "class SettlementService {" },
  { kind: "add", sign: "+", text: "  @Transactional" },
  { kind: "add", sign: "+", text: "  @Version private Long version;" },
  { kind: "add", sign: "+", text: "  @Valid @NotNull SettleRequest req" },
  { kind: "del", sign: "-", text: "  // TODO: settle()" },
  { kind: "add", sign: "+", text: "  void settle(UUID groupId) { ... }" },
  { kind: "ctx", sign: " ", text: "}" },
] as const;

const ENDPOINTS = [
  { verb: "GET", path: "/expenses" },
  { verb: "POST", path: "/expenses" },
  { verb: "GET", path: "/groups/{id}" },
  { verb: "POST", path: "/settlements" },
] as const;

const DATA = [
  { name: "Users", value: "250" },
  { name: "Groups", value: "42" },
  { name: "Expenses", value: "1,842" },
];

const DEPLOY = [
  "Code generated",
  "Tests passed",
  "Container built",
  "Preview deployed",
];

export function BreezeWorkspace() {
  return (
    <div className={styles.screen} aria-hidden="true">
      {/* browser chrome - the whole workflow is in a browser tab */}
      <div className={styles.chrome}>
        <div className={styles.lights}>
          <span className={styles.light} />
          <span className={styles.light} />
          <span className={styles.light} />
        </div>
        <div className={styles.urlBar}>
          <span className={styles.lock}>&#9679;</span>
          app.breezebuild.dev/expense-api
        </div>
        <span className={styles.greenfield}>Greenfield Spring Boot</span>
      </div>

      <div className={styles.appBar}>
        <span className={styles.brand}>
          <Mark />
          Breeze<span className={styles.brandBuild}>Build</span>
        </span>
        <span className={styles.crumb}>expense-api</span>
        <span className={styles.spacer} />
        <span className={styles.deployPill}>Deployment #12 &middot; Ready</span>
      </div>

      <div className={styles.body}>
        {/* ---------- column 1: agent + data ---------- */}
        <div className={styles.col}>
          <div className={`${styles.panel} ${styles.panelGrow}`}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>BreezeBuild Agent</span>
              <span className={`${styles.tag} ${styles.tagAi}`}>
                Proposed change
              </span>
            </div>

            <p className={styles.agentMsg}>
              I recommend PostgreSQL + Flyway for persistence and Resilience4j
              for service resilience.
            </p>

            <div className={styles.why}>
              <span className={styles.whyLabel}>Why this change?</span>
              Keeps the project consistent with BreezeBuild conventions and
              avoids unnecessary infrastructure.
            </div>

            <div className={styles.actions}>
              <span className={`${styles.btn} ${styles.btnPrimary} ${styles.cursor}`}>
                Accept
              </span>
              <span className={styles.btn}>Edit</span>
              <span className={styles.btn}>Reject</span>
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>PostgreSQL</span>
              <span className={`${styles.tag} ${styles.tagMuted}`}>
                Synthetic data
              </span>
            </div>
            {DATA.map((d) => (
              <div key={d.name} className={styles.dataRow}>
                {d.name}
                <span className={styles.dataLeader} />
                <span className={styles.dataVal}>{d.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- column 2: the reviewable diff ---------- */}
        <div className={styles.col}>
          <div className={`${styles.panel} ${styles.panelGrow}`}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Review diff</span>
              <span className={`${styles.tag} ${styles.tagAi}`}>
                AI proposed change
              </span>
            </div>

            <div className={styles.fileRow}>
              <span className={styles.fileName}>SettlementService.java</span>
              <span>src/main/java</span>
            </div>

            <div className={styles.diff}>
              {DIFF.map((l, i) => (
                <div
                  key={i}
                  className={`${styles.diffLine} ${
                    l.kind === "add"
                      ? styles.diffAdd
                      : l.kind === "del"
                        ? styles.diffDel
                        : styles.diffCtx
                  }`}
                >
                  <span className={styles.sign}>{l.sign}</span>
                  {l.text}
                </div>
              ))}
            </div>

            <div className={styles.diffFoot}>
              <span className={styles.statAdd}>+4</span>
              <span className={styles.statDel}>&minus;1</span>
              <span>1 file &middot; small, reviewable</span>
            </div>

            <div className={styles.actions}>
              <span className={`${styles.btn} ${styles.btnPrimary}`}>
                Approve
              </span>
              <span className={styles.btn}>Edit</span>
              <span className={styles.btn}>Reject</span>
            </div>
          </div>
        </div>

        {/* ---------- column 3: tests, preview, deploy ---------- */}
        <div className={styles.col}>
          <div className={styles.panel}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Tests</span>
              <span className={styles.testFirst}>written first</span>
            </div>
            <div className={styles.checkRow}>
              <span className={styles.check}>&#10003;</span>
              <span className={styles.checkStrong}>42 passed</span>
            </div>
            <div className={styles.checkRow}>
              <span className={styles.check}>&#10003;</span> Integration tests
            </div>
            <div className={styles.checkRow}>
              <span className={styles.check}>&#10003;</span> Repository tests
            </div>
            <div className={styles.checkRow}>
              <span className={styles.check}>&#10003;</span> API tests
            </div>
            <div className={styles.checkRow}>
              <span className={styles.check}>&#10003;</span> Gradle build
              successful
            </div>
          </div>

          <div className={`${styles.panel} ${styles.panelGrow}`}>
            <div className={styles.panelHead}>
              <span className={styles.panelTitle}>Preview</span>
              <span className={styles.liveRow}>
                <span className={styles.liveDot} />
                <span className={styles.liveLabel}>LIVE</span>
              </span>
            </div>
            <div className={styles.url}>https://expense-api.breezebuild.dev</div>

            <div className={styles.actions} style={{ marginTop: 0 }}>
              <span className={styles.btn}>Open Swagger</span>
              <span className={styles.btn}>Test API</span>
            </div>

            <div className={styles.endpoints}>
              {ENDPOINTS.map((e) => (
                <div key={e.verb + e.path} className={styles.endpoint}>
                  <span
                    className={`${styles.verb} ${
                      e.verb === "GET" ? styles.verbGet : styles.verbPost
                    }`}
                  >
                    {e.verb}
                  </span>
                  {e.path}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.panel}>
            <div className={styles.deployList}>
              {DEPLOY.map((d) => (
                <div key={d} className={styles.checkRow}>
                  <span className={styles.check}>&#10003;</span> {d}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
