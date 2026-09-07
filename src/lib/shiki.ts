import "server-only";
import { type BundledLanguage, createHighlighter, type Highlighter } from "shiki";

const LANGUAGES: BundledLanguage[] = [
  "bash",
  "dockerfile",
  "go",
  "hcl",
  "html",
  "java",
  "js",
  "json",
  "kotlin",
  "md",
  "python",
  "sql",
  "ts",
  "tsx",
  "yaml",
];

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-light", "github-dark-dimmed"],
      langs: LANGUAGES,
    });
  }
  return highlighterPromise;
}

const LANG_ALIASES: Record<string, BundledLanguage> = {
  text: "md",
  plaintext: "md",
  javascript: "js",
  typescript: "ts",
  py: "python",
  terraform: "hcl",
  yml: "yaml",
  shell: "bash",
  sh: "bash",
};

export async function highlightCode(
  code: string,
  langInput?: string
): Promise<string> {
  const highlighter = await getHighlighter();
  const key = (langInput ?? "text").toLowerCase();
  const lang = (LANG_ALIASES[key] ??
    (LANGUAGES.includes(key as BundledLanguage) ? (key as BundledLanguage) : "md")) as BundledLanguage;

  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: "github-light", dark: "github-dark-dimmed" },
    defaultColor: false,
  });
}
