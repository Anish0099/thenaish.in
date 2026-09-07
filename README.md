# Portfolio

Personal portfolio and blog for Anish Kumar. Next.js 16 (App Router),
TypeScript, Tailwind, shadcn-style primitives, Framer Motion, and Sanity
CMS for authoring content directly from the browser.

## First-time setup (one-off, ~5 minutes)

The site reads its blog posts and projects from Sanity, so you need to
create a free Sanity project once. After that, every new post is written
in the browser at `/studio`.

### 1. Create a Sanity project

1. Go to <https://www.sanity.io/manage> and sign in with Google or GitHub.
2. Click **Create new project**. Give it any name (e.g. "Portfolio").
3. When it asks for a dataset, keep the default (`production`).
4. Copy the **Project ID** from the project's dashboard.

### 2. Wire up local env

Copy the example env file and paste your project id:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id-here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
```

### 3. Add your domain to Sanity CORS

Sanity blocks unknown origins by default. On <https://www.sanity.io/manage>:

1. Open your project → **API** tab → **CORS origins** → **Add CORS origin**.
2. Add `http://localhost:3000` (credentials: allow) for local dev.
3. Once deployed, add your production URL too (e.g. `https://anishkumar.dev`).

### 4. Run the dev server

```bash
npm install
npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/studio>
for the CMS. Log into Studio with the same account you used to create the
Sanity project.

## Writing content

- `/studio` → the CMS. Publish a post there and it appears on `/blog`
  within a minute (ISR revalidates in the background). Same for projects.
- The site fetches from Sanity's CDN, so reads are fast globally.
- The old MDX files under `src/content/` are kept in the repo as a
  backup but are no longer read by the site.

## Deploy to Vercel

1. Push this repo to GitHub.
2. Import it at <https://vercel.com/new>.
3. In Vercel's project settings, add the three env vars from `.env.local`.
4. Deploy. Add the Vercel URL to Sanity CORS origins.
5. (Optional) Wire a Sanity webhook to a Vercel Deploy Hook so a
   published post triggers a rebuild instantly instead of waiting for
   ISR: <https://www.sanity.io/docs/webhooks>.

## Scripts

```bash
npm run dev       # dev server at :3000
npm run build     # production build
npm run start     # start built server
npm run lint      # ESLint
```

## Structure

```
src/
  app/                    Next.js App Router routes
    studio/[[...tool]]    Sanity Studio CMS (auth-gated)
  components/             UI + PortableText renderers
  content/                Legacy MDX (unused; kept as backup)
  lib/                    site config, content loader, shiki
  sanity/                 client, env, schemas, GROQ queries
sanity.config.ts          Studio config (schemas, plugins)
```
