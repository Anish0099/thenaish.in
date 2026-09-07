import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { ComponentProps } from "react";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

const rehypePrettyCodeOptions = {
  theme: { light: "github-light", dark: "github-dark-dimmed" },
  keepBackground: false,
  defaultLang: "plaintext",
} as const;

const components = {
  h1: (props: ComponentProps<"h1">) => (
    <h1
      className="mt-10 mb-4 scroll-mt-24 text-3xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h2: (props: ComponentProps<"h2">) => (
    <h2
      className="mt-10 mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3
      className="mt-8 mb-2 scroll-mt-24 text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props: ComponentProps<"p">) => (
    <p className="my-4 leading-relaxed text-[hsl(var(--foreground))]/90" {...props} />
  ),
  a: ({ href, ...props }: ComponentProps<"a">) => {
    const to = href ?? "#";
    const external = /^https?:\/\//.test(to);
    return external ? (
      <a
        {...props}
        href={to}
        target="_blank"
        rel="noreferrer"
        className="text-[hsl(var(--accent))] underline-offset-4 hover:underline"
      />
    ) : (
      <Link
        {...(props as Omit<ComponentProps<typeof Link>, "href">)}
        href={to}
        className="text-[hsl(var(--accent))] underline-offset-4 hover:underline"
      />
    );
  },
  ul: (props: ComponentProps<"ul">) => (
    <ul className="my-4 ml-6 list-disc space-y-2" {...props} />
  ),
  ol: (props: ComponentProps<"ol">) => (
    <ol className="my-4 ml-6 list-decimal space-y-2" {...props} />
  ),
  blockquote: (props: ComponentProps<"blockquote">) => (
    <blockquote
      className="my-6 border-l-2 border-[hsl(var(--accent))] pl-4 italic text-[hsl(var(--muted-foreground))]"
      {...props}
    />
  ),
  hr: (props: ComponentProps<"hr">) => (
    <hr className="my-10 border-[hsl(var(--border))]" {...props} />
  ),
  code: ({ className, ...props }: ComponentProps<"code">) => (
    <code
      className={cn(
        "font-mono text-[0.9em]",
        !className &&
          "rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 text-[hsl(var(--foreground))]",
        className
      )}
      {...props}
    />
  ),
  pre: ({ className, ...props }: ComponentProps<"pre">) => (
    <pre
      className={cn(
        "my-6 overflow-x-auto rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-4 text-sm leading-relaxed",
        className
      )}
      {...props}
    />
  ),
  table: (props: ComponentProps<"table">) => (
    <div className="my-6 overflow-x-auto">
      <table
        className="w-full border-collapse text-sm"
        {...props}
      />
    </div>
  ),
  th: (props: ComponentProps<"th">) => (
    <th
      className="border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-2 text-left font-semibold"
      {...props}
    />
  ),
  td: (props: ComponentProps<"td">) => (
    <td
      className="border border-[hsl(var(--border))] px-3 py-2"
      {...props}
    />
  ),
} satisfies MDXRemoteProps["components"];

export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypePrettyCode, rehypePrettyCodeOptions]],
        },
      }}
    />
  );
}
