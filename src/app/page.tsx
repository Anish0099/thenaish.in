import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { GithubIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";
import { getAllPosts, getAllProjects } from "@/lib/content";
import { formatDate } from "@/lib/utils";

export default async function HomePage() {
  const [projects, posts] = await Promise.all([
    getAllProjects(),
    getAllPosts(),
  ]);
  const featuredProjects = projects
    .filter((p) => p.frontmatter.featured !== false)
    .slice(0, 4);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 pb-20 pt-24 sm:pt-32">
          <FadeIn>
            <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--accent))] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--accent))]" />
              </span>
              Open to new opportunities
            </div>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
              Hi, I&apos;m {siteConfig.name}.
              <br />
              <span className="text-[hsl(var(--muted-foreground))]">
                I build backend systems that don&apos;t page you at 3am.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
              {siteConfig.tagline}
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild variant="accent" size="lg">
                <Link href="/projects">
                  See my work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GithubIcon className="h-4 w-4" /> GitHub
                </Link>
              </Button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured projects */}
      <section className="border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
                  Selected work
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Featured projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="hidden items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))] sm:inline-flex"
              >
                All projects <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project, i) => (
              <FadeIn key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  className="group block h-full"
                >
                  <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-[hsl(var(--accent))]/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="group-hover:text-[hsl(var(--accent))]">
                          {project.frontmatter.title}
                        </CardTitle>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {project.frontmatter.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.frontmatter.stack.slice(0, 5).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Latest posts */}
      <section className="border-t border-[hsl(var(--border))]">
        <div className="mx-auto w-full max-w-5xl px-6 py-20">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
                  Writing
                </p>
                <h2 className="text-3xl font-semibold tracking-tight">
                  Latest posts
                </h2>
              </div>
              <Link
                href="/blog"
                className="hidden items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))] sm:inline-flex"
              >
                All posts <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <ul className="divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
            {latestPosts.map((post, i) => (
              <FadeIn key={post.slug} delay={i * 0.05}>
                <li>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
                  >
                    <div className="flex-1">
                      <h3 className="text-lg font-medium transition-colors group-hover:text-[hsl(var(--accent))]">
                        {post.frontmatter.title}
                      </h3>
                      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        {post.frontmatter.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                      <time>{formatDate(post.frontmatter.date)}</time>
                      <span>·</span>
                      <span>{post.readingTime}</span>
                    </div>
                  </Link>
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
