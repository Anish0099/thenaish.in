/**
 * Sanity Studio route — the CMS UI at /studio.
 * Logged-in editors write posts here; publish is instant.
 */
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
