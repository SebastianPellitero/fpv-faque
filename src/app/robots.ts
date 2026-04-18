import type { MetadataRoute } from "next";

// TODO: Replace with your production domain before deploying
const BASE_URL = "https://yourdomain.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
