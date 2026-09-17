"use client";

import { useState } from "react";
import backdrop from "../backdrop.module.css";
import styles from "./StackSection.module.css";
import {
  DEFAULT_LAYER_ID,
  STACK_LAYERS,
  WORKFLOW_STEPS,
  type StackLayer,
} from "./stackData";

/*
 * The stack is the interactive centrepiece: selecting a layer drives the
 * explanation on the left. Client component because of that selection state;
 * everything renders server-side first with Java 21 already active, so the
 * section is complete and readable before hydration.
 */

function LayerRow({
  layer,
  isActive,
  onSelect,
}: {
  layer: StackLayer;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = layer.icon;

  return (
    <li className={`${styles.layer} ${isActive ? styles.isActive : ""}`}>
      <button
        type="button"
        className={styles.layerButton}
        onClick={() => onSelect(layer.id)}
        aria-pressed={isActive}
        aria-describedby={isActive ? "stack-active-detail" : undefined}
      >
        <span className={styles.layerInner}>
          <span className={styles.iconBox}>
            {/* tone null means the artwork carries its own fills, or it is a
                monochrome glyph inheriting the surrounding text colour. */}
            <Icon
              className={styles.icon}
              style={layer.tone ? { color: layer.tone } : undefined}
            />
          </span>

          <span className={styles.labels}>
            <span className={styles.role}>{layer.role}</span>
            <span className={styles.name}>{layer.name}</span>

            <span className={styles.layerExpand}>
              <span className={styles.layerExpandInner}>
                <span className={styles.layerExpandText}>{layer.body}</span>
              </span>
            </span>
          </span>
        </span>
      </button>
    </li>
  );
}

export function StackSection() {
  const [activeId, setActiveId] = useState(DEFAULT_LAYER_ID);
  const active =
    STACK_LAYERS.find((l) => l.id === activeId) ?? STACK_LAYERS[0];
  const ActiveIcon = active.icon;

  return (
    <section className={styles.root} aria-labelledby="stack-heading">
      <div className={`${backdrop.shell} ${styles.grid}`}>
        {/* ---------------- left ---------------- */}
        <div className={styles.left}>
          <h2 id="stack-heading" className={styles.heading}>
            A modern, reliable stack built for real backend engineering.
          </h2>

          <p className={styles.intro}>
            BreezeBuild is deliberately opinionated. Its agents follow a defined
            engineering philosophy, with tooling, conventions, testing practices,
            and reliability patterns baked into every project.
          </p>

          <div className={styles.detail} id="stack-active-detail">
            {/* key remounts the block so the enter animation replays per layer */}
            <div key={active.id} className={styles.detailAnimate}>
              <div className={styles.detailHead}>
                <ActiveIcon
                  className={styles.detailIcon}
                  style={active.tone ? { color: active.tone } : undefined}
                />
                <h3 className={styles.detailName}>{active.name}</h3>
                <span className={styles.detailRole}>{active.role}</span>
              </div>
              <p className={styles.detailBody}>{active.body}</p>
            </div>
          </div>

          <div className={styles.principles}>
            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>Opinionated by design.</h3>
              <p className={styles.principleBody}>
                BreezeBuild agents do not generate arbitrary code. They work
                within a <em className={styles.emphasis}>rigid</em> engineering
                philosophy with predefined project structure, coding
                conventions, testing practices, reliability patterns, and
                backend principles.
              </p>
            </div>

            <div className={styles.principle}>
              <h3 className={styles.principleTitle}>
                AI accelerates. You stay in control.
              </h3>
              <p className={styles.principleBody}>
                Every AI change happens in small, reviewable steps. BreezeBuild
                explains what changed, why it changed, and how it works, then
                presents an organized diff for human approval before moving
                forward.
              </p>
            </div>
          </div>

          <div className={styles.workflow}>
            <div className={styles.browserBar} aria-hidden="true">
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.browserLabel}>
                Everything below runs in your browser
              </span>
            </div>
            <ol className={styles.steps}>
              {WORKFLOW_STEPS.map((step, i) => (
                <li key={step} className={styles.step}>
                  <span className={styles.stepLabel}>{step}</span>
                  {i < WORKFLOW_STEPS.length - 1 ? (
                    <span className={styles.stepArrow} aria-hidden="true">
                      &rarr;
                    </span>
                  ) : null}
                </li>
              ))}
            </ol>
          </div>

          <p className={styles.closing}>
            Built for greenfield backend projects where speed should never
            require sacrificing engineering discipline.
          </p>
        </div>

        {/* ---------------- right ---------------- */}
        <div className={styles.stackWrap}>
          <ul className={styles.stack}>
            {STACK_LAYERS.map((layer) => (
              <LayerRow
                key={layer.id}
                layer={layer}
                isActive={layer.id === active.id}
                onSelect={setActiveId}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
