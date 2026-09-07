import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected engineering work — Java backend systems, event-driven architectures, and DevOps experiments.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="mx-auto w-full max-w-5xl px-6 py-20">
      <FadeIn>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
          Projects
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Things I&apos;ve built
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
          A small, honest set — with the problem, the architecture, and the
          trade-offs I actually made.
        </p>
      </FadeIn>

      {projects.length === 0 ? (
        <FadeIn delay={0.05}>
          <p className="mt-12 rounded-lg border border-dashed border-[hsl(var(--border))] p-8 text-center text-[hsl(var(--muted-foreground))]">
            No projects yet — add one from{" "}
            <Link href="/studio" className="text-[hsl(var(--accent))] underline-offset-4 hover:underline">
              Studio
            </Link>
            .
          </p>
        </FadeIn>
      ) : (
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {projects.map((project, i) => (
            <FadeIn key={project.slug} delay={i * 0.06}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block h-full"
              >
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
                      {(project.stack ?? []).slice(0, 5).map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      )}
    </section>
  );
}
