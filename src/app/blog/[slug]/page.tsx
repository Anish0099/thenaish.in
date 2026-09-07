import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Mdx } from "@/components/mdx";
import { JsonLd, blogPostingJsonLd } from "@/components/json-ld";
import { getAllPosts, getPost } from "@/lib/content";
import { siteConfig } from "@/lib/site";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) return {};
  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      url,
      type: "article",
      publishedTime: post.frontmatter.date,
      tags: post.frontmatter.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
    },
  };
}

export default async function BlogPost(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <JsonLd
        data={blogPostingJsonLd({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          slug: post.slug,
          date: post.frontmatter.date,
          tags: post.frontmatter.tags,
        })}
      />
      <Link
        href="/blog"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
      >
        <ArrowLeft className="h-4 w-4" /> All posts
      </Link>

      <header className="mb-10">
        <div className="flex items-center gap-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span>·</span>
          <span>{post.readingTime}</span>
        </div>
        <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          {post.frontmatter.description}
        </p>
        {post.frontmatter.tags?.length ? (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.frontmatter.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        ) : null}
      </header>

      <div className="prose-content">
        <Mdx source={post.content} />
      </div>
    </article>
  );
}
