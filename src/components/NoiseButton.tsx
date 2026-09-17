"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { NoiseBackground } from "./NoiseBackground";
import styles from "./NoiseButton.module.css";

/*
 * Deliberately mirrors CosmicButton's props exactly, so the two treatments are
 * swappable by changing the component name and nothing else.
 */

type Shared = {
  label: string;
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

export type NoiseButtonProps = AsButton | AsLink;

export function NoiseButton(props: NoiseButtonProps) {
  const {
    label,
    trailing,
    variant = "primary",
    size = "md",
    className,
    ...rest
  } = props;

  const innerClass = [styles.inner, styles[variant], styles[size]]
    .filter(Boolean)
    .join(" ");

  const body = (
    <>
      {label}
      {trailing ? (
        <span className={styles.trailing} aria-hidden="true">
          {trailing}
        </span>
      ) : null}
    </>
  );

  let control: ReactNode;

  if (typeof props.href === "string") {
    const { href, ...anchorRest } = rest as ComponentPropsWithoutRef<"a">;
    const internal = href!.startsWith("/") || href!.startsWith("#");

    control = internal ? (
      <Link href={href!} className={innerClass} {...anchorRest}>
        {body}
      </Link>
    ) : (
      <a
        href={href}
        className={innerClass}
        rel="noopener noreferrer"
        {...anchorRest}
      >
        {body}
      </a>
    );
  } else {
    // Spread carries injected handlers (e.g. Clerk's <SignInButton> onClick).
    const buttonRest = rest as ComponentPropsWithoutRef<"button">;
    control = (
      <button type="button" className={innerClass} {...buttonRest}>
        {body}
      </button>
    );
  }

  return (
    <NoiseBackground containerClassName={className}>{control}</NoiseBackground>
  );
}
