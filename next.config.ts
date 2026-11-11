import type { NextConfig } from "next";

/**
 * Server Actions (every form in the portal, including Sign In) are rejected by
 * Next.js when the browser's Origin differs from the host the app sees. That is
 * exactly what happens behind a preview / reverse proxy, and it surfaces as
 * "This page couldn't load".
 *
 * We allow the hosted preview domains, plus anything listed in
 * SERVER_ACTION_ALLOWED_ORIGINS (comma separated, e.g. "portal.myschool.com,*.myschool.com").
 * The origin check itself stays on — it is the CSRF protection for the forms.
 */
const extraOrigins = (process.env.SERVER_ACTION_ALLOWED_ORIGINS ?? "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["**.e2b.app", "**.e2b.dev", ...extraOrigins],
    },
  },
};

export default nextConfig;
