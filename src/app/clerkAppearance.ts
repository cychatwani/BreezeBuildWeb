import type { ComponentProps } from "react";
import type { SignIn } from "@clerk/nextjs";

/* Derived from the component itself: @clerk/types isn't a top-level dep here. */
type Appearance = ComponentProps<typeof SignIn>["appearance"];

/*
 * Shared Clerk theme. Colours come from the BreezeBuild brand kit:
 * orange #F97316 (mid-stop of the amber -> red gradient) as the accent,
 * paper #FAFAFA as foreground, on the same near-black the landing page uses.
 */
export const clerkAppearance: Appearance = {
  variables: {
    colorPrimary: "#F97316",
    colorPrimaryForeground: "#0a0a0a",
    colorBackground: "rgba(12, 12, 12, 0.72)",
    colorForeground: "#fafafa",
    colorMuted: "rgba(255, 255, 255, 0.04)",
    colorMutedForeground: "rgba(250, 250, 250, 0.6)",
    colorInput: "rgba(255, 255, 255, 0.04)",
    colorInputForeground: "#fafafa",
    colorBorder: "rgba(250, 250, 250, 0.12)",
    colorRing: "rgba(249, 115, 22, 0.45)",
    colorShadow: "rgba(0, 0, 0, 0.6)",
    colorModalBackdrop: "rgba(0, 0, 0, 0.72)",
    colorNeutral: "#fafafa",
    colorDanger: "#EF4444",
    colorSuccess: "#FB923C",
    borderRadius: "0.75rem",
    fontFamily: "inherit",
  },
};
