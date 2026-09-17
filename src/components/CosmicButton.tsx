"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import styles from "./CosmicButton.module.css";

type Shared = {
  /** Visible text. Supplied by the caller. */
  label: string;
  /** Optional node after the label, e.g. an arrow. */
  trailing?: ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
};

type AsButton = Shared &
  Omit<ComponentPropsWithoutRef<"button">, keyof Shared | "children"> & {
    href?: undefined;
  };

type AsLink = Shared &
  Omit<ComponentPropsWithoutRef<"a">, keyof Shared | "children"> & {
    href: string;
  };

export type CosmicButtonProps = AsButton | AsLink;

/*
 * Renders a <button> by default and an <a>/<Link> when `href` is given.
 *
 * Unknown props are spread onto the rendered element, which is what lets
 * wrappers that clone their child - Clerk's <SignInButton>, for one - inject
 * their own onClick and have it actually fire.
 */
export function CosmicButton(props: CosmicButtonProps) {
  const {
    label,
    trailing,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const rootClass = [styles.root, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <span className={styles.inner}>
      {label}
      {trailing ? (
        <span className={styles.trailing} aria-hidden="true">
          {trailing}
        </span>
      ) : null}
    </span>
  );

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a">;
    const internal = href!.startsWith("/") || href!.startsWith("#");

    if (internal) {
      return (
        <Link href={href!} className={rootClass} {...anchorRest}>
          {content}
        </Link>
      );
    }

    return (
      <a
        href={href}
        className={rootClass}
        rel="noopener noreferrer"
        {...anchorRest}
      >
        {content}
      </a>
    );
  }

  const buttonRest = rest as ComponentPropsWithoutRef<"button">;
  return (
    <button type="button" className={rootClass} {...buttonRest}>
      {content}
    </button>
  );
}
