import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The brand: a glossy white "F" mark (846×922) and a glossy white
 * "fractions" wordmark (1430×666). They sit directly on the page, never on a
 * plate. On light surfaces a very soft drop shadow lifts them; on dark they
 * read as they are. Never stretched: only the height is set and the width
 * follows the ratio.
 */

const MARK_RATIO = 846 / 922;
const WORDMARK_RATIO = 1430 / 666;

const LIFT =
  "shrink-0 select-none [filter:drop-shadow(0_6px_16px_rgba(0,0,0,0.14))_drop-shadow(0_1px_2px_rgba(0,0,0,0.10))] dark:[filter:none]";

export function BrandMark({ height = 34, className, priority }: { height?: number; className?: string; priority?: boolean }) {
  const width = Math.round(height * MARK_RATIO);
  return (
    <Image
      src={height > 96 ? "/brand/mark-512.png" : "/brand/mark-192.png"}
      alt=""
      width={width}
      height={height}
      style={{ width, height }}
      className={cn(LIFT, className)}
      priority={priority}
      draggable={false}
    />
  );
}

export function BrandWordmark({ height = 26, className, priority }: { height?: number; className?: string; priority?: boolean }) {
  const width = Math.round(height * WORDMARK_RATIO);
  return (
    <Image
      src="/brand/wordmark-1x.png"
      alt="fractions"
      width={width}
      height={height}
      style={{ width, height }}
      className={cn(LIFT, className)}
      priority={priority}
      draggable={false}
    />
  );
}
