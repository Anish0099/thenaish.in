import "server-only";
import readingTime from "reading-time";
import type { PortableTextBlock } from "@portabletext/react";
import { client } from "@/sanity/client";
import { isConfigured as SANITY_CONFIGURED } from "@/sanity/env";
import {
  postBySlugQuery,
  postsQuery,
  projectBySlugQuery,
  projectsQuery,
} from "@/sanity/queries";
import { portableTextToPlain } from "@/components/portable-text";

export type PostSummary = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  tags?: string[];
};

export type Post = PostSummary & {
  body?: PortableTextBlock[];
  readingTime: string;
};

export type ProjectSummary = {
  slug: string;
  title: string;
  summary: string;
  stack: string[];
  role?: string;
  period?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
};

export type Project = ProjectSummary & {
  body?: PortableTextBlock[];
};

export async function getAllPosts(): Promise<PostSummary[]> {
  if (!SANITY_CONFIGURED) return [];
  return client.fetch<PostSummary[]>(postsQuery, {}, { next: { revalidate: 60 } });
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!SANITY_CONFIGURED) return null;
  const raw = await client.fetch<
    (PostSummary & { body?: PortableTextBlock[] }) | null
  >(postBySlugQuery, { slug }, { next: { revalidate: 60 } });
  if (!raw) return null;
  const plain = portableTextToPlain(raw.body);
  return { ...raw, readingTime: readingTime(plain).text };
}

export async function getAllProjects(): Promise<ProjectSummary[]> {
  if (!SANITY_CONFIGURED) return [];
  return client.fetch<ProjectSummary[]>(projectsQuery, {}, { next: { revalidate: 60 } });
}

export async function getProject(slug: string): Promise<Project | null> {
  if (!SANITY_CONFIGURED) return null;
  return client.fetch<Project | null>(
    projectBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
}

export function isSanityConfigured() {
  return SANITY_CONFIGURED;
}
