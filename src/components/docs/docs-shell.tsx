import type { DocGroupNav } from "@/lib/docs/types";
import { DocsSidebar } from "./docs-sidebar";

/**
 * The docs frame: a 1200px column with the sidebar on the left and the page
 * (article plus its table of contents) on the right. The sidebar folds into
 * a row above the article below `lg`.
 */
export function DocsShell({ nav, children }: { nav: DocGroupNav[]; children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-4 pt-6 pb-16 lg:grid lg:grid-cols-[232px_minmax(0,1fr)] lg:gap-10">
      <DocsSidebar nav={nav} />
      <div className="mt-6 min-w-0 lg:mt-0">{children}</div>
    </div>
  );
}
