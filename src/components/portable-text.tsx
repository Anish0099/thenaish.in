import Link from "next/link";
import Image from "next/image";
import {
  PortableText as PT,
  type PortableTextComponents,
  type PortableTextBlock,
} from "@portabletext/react";
import { CodeBlock } from "@/components/code-block";
import { urlFor } from "@/sanity/image";

type LinkMark = { _type: "link"; href?: string };
type CodeValue = { _type: "codeBlock"; code?: string; language?: string };
type SanityImage = {
  _type: "image";
  asset?: { _ref: string };
  alt?: string;
  caption?: string;
};

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-10 mb-3 scroll-mt-24 text-2xl font-semibold tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-2 scroll-mt-24 text-xl font-semibold tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-6 mb-2 scroll-mt-24 text-lg font-semibold tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="my-4 leading-relaxed text-[hsl(var(--foreground))]/90">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-[hsl(var(--accent))] pl-4 italic text-[hsl(var(--muted-foreground))]">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-4 ml-6 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-4 ml-6 list-decimal space-y-2">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-[hsl(var(--muted))] px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const href = (value as LinkMark).href ?? "#";
      const external = /^https?:\/\//.test(href);
      return external ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[hsl(var(--accent))] underline-offset-4 hover:underline"
        >
          {children}
        </a>
      ) : (
        <Link
          href={href}
          className="text-[hsl(var(--accent))] underline-offset-4 hover:underline"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    codeBlock: ({ value }) => {
      const v = value as CodeValue;
      return <CodeBlock code={v.code ?? ""} language={v.language} />;
    },
    image: ({ value }) => {
      const v = value as SanityImage;
      if (!v?.asset?._ref) return null;
      const url = urlFor(v).width(1200).auto("format").url();
      return (
        <figure className="my-8">
          <Image
            src={url}
            alt={v.alt ?? ""}
            width={1200}
            height={800}
            className="w-full rounded-lg border border-[hsl(var(--border))]"
            sizes="(max-width: 768px) 100vw, 768px"
          />
          {v.caption ? (
            <figcaption className="mt-2 text-center text-sm text-[hsl(var(--muted-foreground))]">
              {v.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
};

export function PortableText({ value }: { value: PortableTextBlock[] }) {
  return <PT value={value} components={components} />;
}

/** Extract plain text from Portable Text blocks (for reading-time). */
export function portableTextToPlain(value?: PortableTextBlock[]): string {
  if (!value) return "";
  return value
    .map((block) => {
      if (block._type !== "block") return "";
      const children = (block as unknown as { children?: Array<{ text?: string }> })
        .children;
      return children?.map((c) => c.text ?? "").join("") ?? "";
    })
    .join("\n\n");
}
