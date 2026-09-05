export const siteConfig = {
  name: "Anish Kumar",
  role: "Backend Engineer → DevOps",
  tagline:
    "Java backend engineer building resilient microservices with Spring Boot, React and AWS — leaning into DevOps with Terraform.",
  url: "https://anishkumar.dev",
  ogImage: "/og.png",
  email: "kanish92729@gmail.com",
  location: "India",
  links: {
    github: "https://github.com/anishkumar",
    linkedin: "https://www.linkedin.com/in/anishkumar",
    resume: "/resume.pdf",
  },
  nav: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
