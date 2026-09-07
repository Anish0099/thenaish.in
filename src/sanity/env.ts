/**
 * Sanity env vars. When unset (first-run before the user has created
 * their Sanity project), we fall back to placeholder values so the
 * build succeeds — the site renders with empty lists and `/studio`
 * will show a friendly error. Once .env.local is filled in, everything
 * works.
 */

const PLACEHOLDER_PROJECT_ID = "placeholder";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || PLACEHOLDER_PROJECT_ID;

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

export const isConfigured = projectId !== PLACEHOLDER_PROJECT_ID;

if (!isConfigured && process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line no-console
  console.warn(
    "[sanity] NEXT_PUBLIC_SANITY_PROJECT_ID is not set — running with placeholder. See README.md."
  );
}
