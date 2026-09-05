/**
 * The smallest frontmatter parser that covers our files: a `---` fence with
 * one `key: value` per line. Quotes around a value are optional.
 */
export interface Frontmatter {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export function parseFrontmatter(source: string, file: string): { data: Frontmatter; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!match) throw new Error(`${file}: missing frontmatter`);
  const raw: Record<string, string> = {};
  for (const line of match[1]!.split(/\r?\n/)) {
    const colon = line.indexOf(":");
    if (colon === -1) continue;
    const key = line.slice(0, colon).trim();
    let value = line.slice(colon + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    raw[key] = value;
  }
  if (!raw.title) throw new Error(`${file}: frontmatter needs a title`);
  return {
    data: {
      title: raw.title,
      description: raw.description ?? "",
      icon: raw.icon ?? "FileText",
      order: Number(raw.order ?? 0) || 0,
    },
    body: source.slice(match[0].length),
  };
}
