import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/*
 * Standard shadcn `cn`. This project is not a shadcn project, but the
 * MacbookScroll component is written against this helper and genuinely relies
 * on tailwind-merge semantics: the keypad passes `w-10` / `w-[2.8rem]` over a
 * base `w-6`, and without merging both classes survive and the wrong one can win.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
