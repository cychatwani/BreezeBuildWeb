import type { ReactNode } from "react";
import styles from "./BentoGrid.module.css";

/*
 * Aceternity's BentoGrid / BentoGridItem API, restyled for BreezeBuild.
 * `animated` is an addition: it opts a card into the travelling conic border
 * used by the CTA button, which requires an extra inner surface to mask the
 * gradient down to the border gap.
 */

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={[styles.grid, className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  icon,
  animated = false,
}: {
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  animated?: boolean;
}) {
  const content = (
    <>
      {header}
      <div className={styles.body}>
        {icon ? <span className={styles.icon}>{icon}</span> : null}
        {title ? <h3 className={styles.title}>{title}</h3> : null}
        {description ? (
          <div className={styles.description}>{description}</div>
        ) : null}
      </div>
    </>
  );

  const rootClass = [styles.item, animated ? styles.animated : null, className]
    .filter(Boolean)
    .join(" ");

  if (animated) {
    return (
      <div className={rootClass}>
        <div className={styles.animatedInner}>{content}</div>
      </div>
    );
  }

  return <div className={rootClass}>{content}</div>;
}

export const bentoStyles = styles;
