import Link from "next/link";
import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/components/fade-in";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.role}.`,
};

const skillGroups = [
  {
    label: "Backend",
    items: ["Java 21", "Spring Boot", "Spring Cloud Gateway", "REST", "gRPC"],
  },
  {
    label: "Data & messaging",
    items: ["PostgreSQL", "Redis", "Apache Kafka", "Flyway"],
  },
  {
    label: "Frontend",
    items: ["React", "TypeScript", "Vite", "Next.js"],
  },
  {
    label: "Cloud & DevOps",
    items: ["AWS (ECS, RDS, S3)", "Terraform", "Docker", "GitHub Actions"],
  },
  {
    label: "Practices",
    items: [
      "Event-driven design",
      "Microservices",
      "CI/CD",
      "Observability",
      "Testing",
    ],
  },
];

export default function AboutPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
          About
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          A backend engineer with a soft spot for infrastructure.
        </h1>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div className="mt-10 space-y-5 text-lg leading-relaxed text-[hsl(var(--foreground))]/90">
          <p>
            I&apos;m {siteConfig.name} — a Java backend engineer based in{" "}
            {siteConfig.location}. Most of my career has been spent building
            Spring Boot microservices: designing the service boundaries, wiring
            Kafka between them, and making the failure modes boring on purpose.
          </p>
          <p>
            The React work happened by accident and stuck around. Some services
            deserve a decent frontend, and I&apos;d rather write it than argue
            about it. The DevOps work is the same story a layer deeper — once
            you own the Dockerfile you might as well own the Terraform.
          </p>
          <p>
            Right now I&apos;m going deep on Terraform, AWS platform patterns,
            and the observability stack, with a focus on shipping cleanly to
            production without a human in the loop. If you&apos;re building
            something in that space, I&apos;d like to hear about it.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mt-10">
          <Button asChild variant="accent" size="lg">
            <Link href={siteConfig.links.resume} target="_blank" rel="noreferrer">
              <FileText className="h-4 w-4" /> Download résumé (PDF)
            </Link>
          </Button>
        </div>
      </FadeIn>

      <FadeIn delay={0.15}>
        <div className="mt-16">
          <h2 className="text-2xl font-semibold tracking-tight">Skills</h2>
          <dl className="mt-6 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
            {skillGroups.map((group) => (
              <div
                key={group.label}
                className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:items-baseline"
              >
                <dt className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                  {group.label}
                </dt>
                <dd className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </FadeIn>
    </section>
  );
}
