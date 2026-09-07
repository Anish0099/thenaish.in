import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn } from "@/components/fade-in";
import { Badge } from "@/components/ui/badge";
import { getAllPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Notes on backend engineering, DevOps, and the boundary between code and infrastructure.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
          Blog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Writing
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          Notes on backend engineering, DevOps, and the messy boundary in
          between.
        </p>
      </FadeIn>

      <ul className="mt-12 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 0.05}>
            <li>
              <Link
                href={`/blog/${post.slug}`}
                className="group block py-8"
              >
                <div className="flex items-center gap-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                  <time>{formatDate(post.frontmatter.date)}</time>
                  <span>·</span>
                  <span>{post.readingTime}</span>
                </div>
                <h2 className="mt-2 text-xl font-medium tracking-tight transition-colors group-hover:text-[hsl(var(--accent))]">
                  {post.frontmatter.title}
                </h2>
                <p className="mt-2 text-[hsl(var(--muted-foreground))]">
                  {post.frontmatter.description}
                </p>
                {post.frontmatter.tags?.length ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {post.frontmatter.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                ) : null}
              </Link>
            </li>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
