import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: "Card blurb — one to two sentences.",
      validation: (rule) => rule.required().max(280),
    }),
    defineField({
      name: "stack",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
      description: "Tech stack tags shown on the card.",
    }),
    defineField({ name: "role", type: "string" }),
    defineField({ name: "period", type: "string" }),
    defineField({
      name: "featured",
      type: "boolean",
      description: "Show on the homepage's Featured projects section.",
      initialValue: false,
    }),
    defineField({ name: "github", type: "url" }),
    defineField({ name: "demo", type: "url" }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first. Leave blank to sort by title.",
    }),
    defineField({ name: "body", type: "blockContent" }),
  ],
  orderings: [
    {
      title: "Manual order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }, { field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "summary", featured: "featured" },
    prepare({ title, subtitle, featured }) {
      return {
        title: featured ? `★ ${title}` : title,
        subtitle,
      };
    },
  },
});
