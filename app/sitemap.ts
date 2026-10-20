import type { MetadataRoute } from "next";
import { brand } from "@/lib/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const agora = new Date();
  return ["", "/comecar", "/termos", "/privacidade"].map((p) => ({
    url: `${brand.url}${p}`,
    lastModified: agora,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : p === "/comecar" ? 0.9 : 0.3,
  }));
}
