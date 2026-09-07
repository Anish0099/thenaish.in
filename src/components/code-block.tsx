import { highlightCode } from "@/lib/shiki";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export async function CodeBlock({ code, language }: CodeBlockProps) {
  const html = await highlightCode(code, language);
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))]">
      {language ? (
        <div className="flex items-center justify-between border-b border-[hsl(var(--border))] px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
          <span>{language}</span>
        </div>
      ) : null}
      <div
        className="shiki-wrapper overflow-x-auto p-4 text-sm leading-relaxed"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
