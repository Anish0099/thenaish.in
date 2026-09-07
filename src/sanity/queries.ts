import { groq } from "next-sanity";

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    "slug": slug.current,
    title,
    description,
    publishedAt,
    tags,
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    description,
    publishedAt,
    tags,
    body,
  }
`;

export const projectsQuery = groq`
  *[_type == "project" && defined(slug.current)] | order(order asc, title asc) {
    "slug": slug.current,
    title,
    summary,
    stack,
    role,
    period,
    featured,
    github,
    demo,
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    summary,
    stack,
    role,
    period,
    featured,
    github,
    demo,
    body,
  }
`;

export const slugsByTypeQuery = groq`
  *[_type == $type && defined(slug.current)][].slug.current
`;
