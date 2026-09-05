import {
  BadgeCheck,
  BookOpen,
  Calculator,
  CircleHelp,
  Coins,
  Compass,
  FileCode2,
  FileText,
  Gauge,
  Layers,
  Percent,
  Rocket,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserRound,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/**
 * The lucide glyphs a docs page may name in its frontmatter (`icon:`). A
 * curated map rather than the whole library, so the client bundle carries
 * only what the sidebar draws. Unknown names fall back to a plain page.
 */
const DOC_ICONS: Record<string, LucideIcon> = {
  BadgeCheck,
  BookOpen,
  Calculator,
  CircleHelp,
  Coins,
  Compass,
  FileCode2,
  FileText,
  Gauge,
  Layers,
  Percent,
  Rocket,
  Share2,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  UserRound,
  Wallet,
};

export function docIcon(name: string): LucideIcon {
  return DOC_ICONS[name] ?? FileText;
}
