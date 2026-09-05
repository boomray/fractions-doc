/** Shapes shared between the server loader and the client docs widgets. */

export interface DocHeading {
  id: string;
  text: string;
  depth: 2 | 3;
}

export interface DocPageMeta {
  /** `<group>/<slug>` */
  id: string;
  group: string;
  slug: string;
  /** the route, e.g. `/use-it/fees`; the overview is `/` */
  href: string;
  title: string;
  description: string;
  /** a lucide icon name, resolved by `components/docs/icons.ts` */
  icon: string;
  order: number;
}

export interface DocGroupNav {
  id: string;
  label: string;
  pages: DocPageMeta[];
}

/** One page in the client-side search index. */
export interface DocSearchEntry {
  href: string;
  title: string;
  description: string;
  group: string;
  icon: string;
  headings: string[];
  /** the page's text with markdown syntax stripped, values substituted */
  body: string;
}
