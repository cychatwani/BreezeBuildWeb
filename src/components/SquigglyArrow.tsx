import type { SVGProps } from "react";

/*
 * Hand-drawn squiggly arrow, built to the documented cult-ui API
 * (width, height, strokeWidth, className, direction, variant). Paths are
 * generated from the given dimensions rather than hardcoded, so any size keeps
 * its proportions. Colour comes from `currentColor`.
 */

export type SquigglyArrowProps = {
  width?: number;
  height?: number;
  strokeWidth?: number;
  className?: string;
  direction?: "right" | "left" | "up" | "down";
  variant?: "wavy" | "bouncy" | "smooth";
} & Omit<SVGProps<SVGSVGElement>, "width" | "height" | "direction">;

const ROTATION = { right: 0, left: 180, down: 90, up: -90 } as const;

function buildPath(w: number, h: number, variant: string) {
  const startX = w * 0.06;
  const endX = w * 0.86;
  const midY = h / 2;
  const span = endX - startX;

  if (variant === "smooth") {
    // one gentle S, no oscillation
    return `M ${startX} ${midY + h * 0.16} C ${startX + span * 0.35} ${
      midY + h * 0.3
    }, ${startX + span * 0.6} ${midY - h * 0.28}, ${endX} ${midY - h * 0.08}`;
  }

  const humps = variant === "bouncy" ? 3 : 4;
  const amp = variant === "bouncy" ? h * 0.3 : h * 0.17;
  const step = span / humps;

  let d = `M ${startX} ${midY}`;
  for (let i = 0; i < humps; i++) {
    const dir = i % 2 === 0 ? -1 : 1;
    const cx = startX + step * i + step / 2;
    const nx = startX + step * (i + 1);
    d += ` Q ${cx} ${midY + amp * dir * 2}, ${nx} ${midY}`;
  }
  return d;
}

function buildHead(w: number, h: number) {
  const tipX = w * 0.86;
  const midY = h / 2;
  const len = Math.min(w, h) * 0.16;
  return `M ${tipX - len} ${midY - len * 0.82} L ${tipX} ${midY} L ${
    tipX - len
  } ${midY + len * 0.82}`;
}

export function SquigglyArrow({
  width = 200,
  height = 100,
  strokeWidth = 2.5,
  className,
  direction = "right",
  variant = "wavy",
  ...rest
}: SquigglyArrowProps) {
  const rotate = ROTATION[direction];

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ overflow: "visible" }}
      {...rest}
    >
      <g
        transform={
          rotate ? `rotate(${rotate} ${width / 2} ${height / 2})` : undefined
        }
      >
        <path d={buildPath(width, height, variant)} />
        <path d={buildHead(width, height)} />
      </g>
    </svg>
  );
}

export default SquigglyArrow;
