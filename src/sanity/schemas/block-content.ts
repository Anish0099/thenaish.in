import { defineType, defineArrayMember } from "sanity";

const LANGUAGES = [
  { title: "Plain text", value: "text" },
  { title: "Bash", value: "bash" },
  { title: "Docker", value: "dockerfile" },
  { title: "Go", value: "go" },
  { title: "HCL / Terraform", value: "hcl" },
  { title: "HTML", value: "html" },
  { title: "Java", value: "java" },
  { title: "JavaScript", value: "js" },
  { title: "JSON", value: "json" },
  { title: "Kotlin", value: "kotlin" },
  { title: "Markdown", value: "md" },
  { title: "Python", value: "python" },
  { title: "SQL", value: "sql" },
  { title: "TypeScript", value: "ts" },
  { title: "TSX", value: "tsx" },
  { title: "YAML", value: "yaml" },
] as const;

export const blockContent = defineType({
  title: "Body",
  name: "blockContent",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          {
            title: "Link",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (rule) =>
                  rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Alt text",
          type: "string",
          description: "Important for SEO and accessibility.",
        },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({
      type: "object",
      name: "codeBlock",
      title: "Code block",
      fields: [
        {
          name: "language",
          type: "string",
          title: "Language",
          options: { list: [...LANGUAGES] },
          initialValue: "text",
        },
        {
          name: "code",
          type: "text",
          title: "Code",
          rows: 12,
        },
      ],
      preview: {
        select: { language: "language", code: "code" },
        prepare({ language, code }) {
          return {
            title: language ? `Code · ${language}` : "Code",
            subtitle: code?.split("\n")[0]?.slice(0, 60) ?? "",
          };
        },
      },
    }),
  ],
});
