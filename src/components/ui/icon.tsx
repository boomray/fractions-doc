import type { LucideIcon, LucideProps } from "lucide-react";
import { cn } from "@/lib/cn";

/**
 * The icon primitive. Every icon on the site is a lucide glyph drawn through
 * this one component, so the stroke is decided once: 1.5px, product-wide.
 * Emphasis is size and colour, never weight.
 */

export type IconGlyph = LucideIcon;

/** The one stroke width every icon renders with. */
export const ICON_STROKE_WIDTH = 1.5;

export interface GlyphProps extends Omit<LucideProps, "size" | "strokeWidth" | "ref"> {
  /** the lucide component to draw */
  icon: IconGlyph;
  /** pixel size; defaults to 16 */
  size?: number;
}

/**
 * A bare glyph: the right size, the one stroke, no tooltip. For a glyph that
 * sits beside text that already says what it means. Decorative by default —
 * pass `aria-label` to make it announce.
 */
export function Glyph({ icon: Component, size = 16, className, ...props }: GlyphProps) {
  const named = "aria-label" in props && props["aria-label"];
  return (
    <Component
      size={size}
      strokeWidth={ICON_STROKE_WIDTH}
      {...(named ? { role: "img" } : { "aria-hidden": true })}
      className={cn("shrink-0", className)}
      {...props}
    />
  );
}
