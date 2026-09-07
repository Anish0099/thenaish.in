import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
  tags?: string[];
  published?: boolean;
};

export type ProjectFrontmatter = {
  title: string;
  summary: string;
  stack: string[];
  role?: string;
  period?: string;
  featured?: boolean;
  github?: string;
  demo?: string;
};

export type Post = {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
};

export type Project = {
  slug: string;
  frontmatter: ProjectFrontmatter;
  content: string;
};

async function readCollection(dir: string): Promise<
  Array<{ slug: string; raw: string; source: string }>
> {
  const full = path.join(CONTENT_ROOT, dir);
  const entries = await fs.readdir(full).catch(() => [] as string[]);
  const files = entries.filter((f) => f.endsWith(".mdx"));
  return Promise.all(
    files.map(async (file) => {
      const source = await fs.readFile(path.join(full, file), "utf8");
      return { slug: file.replace(/\.mdx$/, ""), raw: file, source };
    })
  );
}

export async function getAllPosts(): Promise<Post[]> {
  const items = await readCollection("posts");
  const posts = items.map(({ slug, source }) => {
    const { data, content } = matter(source);
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: readingTime(content).text,
    };
  });
  return posts
    .filter((p) => p.frontmatter.published !== false)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

export async function getPost(slug: string): Promise<Post | null> {
  const posts = await getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getAllProjects(): Promise<Project[]> {
  const items = await readCollection("projects");
  const projects = items.map(({ slug, source }) => {
    const { data, content } = matter(source);
    return { slug, frontmatter: data as ProjectFrontmatter, content };
  });
  return projects.sort((a, b) => a.frontmatter.title.localeCompare(b.frontmatter.title));
}

export async function getProject(slug: string): Promise<Project | null> {
  const items = await getAllProjects();
  return items.find((p) => p.slug === slug) ?? null;
}
