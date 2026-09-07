import Link from "next/link";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { FadeIn } from "@/components/fade-in";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${siteConfig.name}.`,
};

const links = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    Icon: Mail,
  },
  {
    label: "GitHub",
    value: siteConfig.links.github.replace(/^https?:\/\//, ""),
    href: siteConfig.links.github,
    Icon: GithubIcon,
  },
  {
    label: "LinkedIn",
    value: siteConfig.links.linkedin.replace(/^https?:\/\//, ""),
    href: siteConfig.links.linkedin,
    Icon: LinkedinIcon,
  },
];

export default function ContactPage() {
  return (
    <section className="mx-auto w-full max-w-3xl px-6 py-20">
      <FadeIn>
        <p className="mb-2 font-mono text-xs uppercase tracking-widest text-[hsl(var(--accent))]">
          Contact
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Let&apos;s talk.
        </h1>
        <p className="mt-4 max-w-xl text-lg text-[hsl(var(--muted-foreground))]">
          The fastest way to reach me is email. I read everything and try to
          reply within a couple of days.
        </p>
      </FadeIn>

      <FadeIn delay={0.05}>
        <ul className="mt-12 divide-y divide-[hsl(var(--border))] border-y border-[hsl(var(--border))]">
          {links.map(({ label, value, href, Icon }) => (
            <li key={label}>
              <Link
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between gap-6 py-5"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] transition-colors group-hover:border-[hsl(var(--accent))]/50 group-hover:text-[hsl(var(--accent))]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                      {label}
                    </p>
                    <p className="mt-0.5 text-base transition-colors group-hover:text-[hsl(var(--accent))]">
                      {value}
                    </p>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-[hsl(var(--muted-foreground))] transition-transform group-hover:translate-x-0.5 group-hover:text-[hsl(var(--accent))]"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
