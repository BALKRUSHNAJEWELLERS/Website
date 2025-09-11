import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/private/",
          "/*.phtml$", // block random .phtml URLs
        ],
      },
    ],
    sitemap: "https://balkrushnajewellers.com/sitemap.xml",
  };
}
