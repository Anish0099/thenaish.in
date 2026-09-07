import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PortableText } from "@/components/portable-text";
import { GithubIcon } from "@/components/icons";
import { getAllProjects, getProject } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) return {};
  const url = `${siteConfig.url}/projects/${project.slug}`;
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: url },
    openGraph: {
      title: project.title,
      description: project.summary,
      url,
      type: "article",
    },
  };
}

export default async function ProjectDetail(
  props: PageProps<"/projects/[slug]">
) {
  const { slug } = await props.params;
  const project = await getProject(slug);
  if (!project) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-6 py-16">
      <Link
        href="/projects"
        className="mb-8 inline-flex items-center gap-1 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <header className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-4 text-lg text-[hsl(var(--muted-foreground))]">
          {project.summary}
        </p>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-[hsl(var(--border))] py-6 text-sm sm:grid-cols-3">
          {project.role ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Role
              </dt>
              <dd className="mt-1">{project.role}</dd>
            </div>
          ) : null}
          {project.period ? (
            <div>
              <dt className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                Period
              </dt>
              <dd className="mt-1">{project.period}</dd>
            </div>
          ) : null}
          <div className="sm:col-span-1 col-span-2">
            <dt className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
              Links
            </dt>
            <dd className="mt-1 flex flex-wrap gap-3">
              {project.github ? (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[hsl(var(--accent))] hover:underline"
                >
                  <GithubIcon className="h-3.5 w-3.5" /> GitHub
                </Link>
              ) : null}
              {project.demo ? (
                <Link
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-[hsl(var(--accent))] hover:underline"
                >
                  <ExternalLink className="h-3.5 w-3.5" /> Demo
                </Link>
              ) : null}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {(project.stack ?? []).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
      </header>

      {project.body ? (
        <div className="prose-content">
          <PortableText value={project.body} />
        </div>
      ) : null}
    </article>
  );
}
