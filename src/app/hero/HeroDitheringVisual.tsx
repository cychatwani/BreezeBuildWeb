"use client";

import { memo, useCallback, useSyncExternalStore } from "react";
import { Dithering } from "@paper-design/shaders-react";
import styles from "./hero.module.css";

/*
 * WebGL, so this is the only part of the hero that is client-rendered.
 * Desktop and mobile are separate elements (not one responsive element) so each
 * can be tuned independently - the mobile canvas is smaller, so it needs a
 * coarser grid and slower motion to read as the same texture.
 *
 * shape="sphere" + type="8x8": a body resolving out of noise, on the finest
 * Bayer matrix available, which is what keeps it reading as computation rather
 * than decoration.
 */

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/** SSR-safe: assumes motion is allowed on the server, then corrects on mount. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    useCallback(() => window.matchMedia(REDUCED_MOTION).matches, []),
    useCallback(() => false, []),
  );
}

type Variant = {
  size: number;
  speed: number;
  scale: number;
};

const DESKTOP: Variant = { size: 2.5, speed: 0.3, scale: 1 };
const MOBILE: Variant = { size: 3.2, speed: 0.22, scale: 0.9 };

function Shader({ size, speed, scale }: Variant) {
  const reduced = usePrefersReducedMotion();
  return (
    <Dithering
      className={styles.shader}
      shape="sphere"
      type="8x8"
      size={size}
      // speed 0 renders a single static frame rather than stopping mid-animation
      speed={reduced ? 0 : speed}
      scale={scale}
      colorBack="#00000000"
      colorFront="#F97316"
      // The user is on a 4K display; uncapped this would render a ~8M px canvas.
      maxPixelCount={1920 * 1080}
    />
  );
}

const MemoShader = memo(Shader);

export const HeroDitheringVisual = () => (
  <div className={styles.visual} aria-hidden="true">
    <MemoShader {...DESKTOP} />
  </div>
);

export const HeroDitheringMobileVisual = () => (
  <div className={styles.mobileVisual} aria-hidden="true">
    <MemoShader {...MOBILE} />
  </div>
);
