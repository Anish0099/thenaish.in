import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { siteConfig } from "@/lib/site";

const featuredProjects = [
  {
    slug: "ai-fitness-app",
    title: "AI Fitness App",
    summary:
      "Event-driven fitness coach built on Spring Boot microservices, Kafka and a React client — with an AI service that generates personalized workout plans.",
    stack: ["Spring Boot", "Kafka", "React", "PostgreSQL", "Docker"],
    href: "/projects/ai-fitness-app",
    repo: "https://github.com/anishkumar/ai-fitness-app",
  },
];

const latestPosts = [
  {
    slug: "hello-world",
    title: "From Backend to DevOps: Why I'm Making the Jump",
    date: "2026-01-14",
    readingTime: "4 min read",
    summary:
      "Six years shipping Java microservices taught me that the interesting problems live at the boundary between code and infrastructure. Here's what I'm learning next.",
  },
];

export default function HomePage() {
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
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-1.9c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.28 1.19-3.09-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.18-1.18 3.18-1.18.62 1.59.23 2.77.11 3.06.74.81 1.19 1.83 1.19 3.09 0 4.43-2.69 5.4-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>{" "}
                  GitHub
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
                <Link href={project.href} className="group block h-full">
                  <Card className="h-full transition-all group-hover:-translate-y-0.5 group-hover:border-[hsl(var(--accent))]/50">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <CardTitle className="group-hover:text-[hsl(var(--accent))]">
                          {project.title}
                        </CardTitle>
                        <ArrowUpRight className="h-4 w-4 shrink-0 text-[hsl(var(--muted-foreground))] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]" />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech) => (
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
                        {post.title}
                      </h3>
                      <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
                        {post.summary}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">
                      <time>{post.date}</time>
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
