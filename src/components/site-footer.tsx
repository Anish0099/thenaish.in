import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[hsl(var(--border))]">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-4 px-6 py-8 text-sm text-[hsl(var(--muted-foreground))] sm:flex-row sm:items-center">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js
          &amp; Tailwind.
        </p>
        <div className="flex items-center gap-5">
          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[hsl(var(--foreground))]"
          >
            GitHub
          </Link>
          <Link
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[hsl(var(--foreground))]"
          >
            LinkedIn
          </Link>
          <Link
            href={`mailto:${siteConfig.email}`}
            className="hover:text-[hsl(var(--foreground))]"
          >
            Email
          </Link>
        </div>
      </div>
    </footer>
  );
}
