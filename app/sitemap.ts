import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const paths = [
  "",
  "/communities",
  "/forums",
  "/events",
  "/resources",
  "/partners",
  "/about",
  "/join",
  "/legal/privacy",
  "/legal/terms",
  "/legal/code-of-conduct",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/events" || p === "/resources" ? "weekly" : "monthly",
    priority: p === "" ? 1 : p.startsWith("/legal") ? 0.3 : 0.7,
  }));
}
