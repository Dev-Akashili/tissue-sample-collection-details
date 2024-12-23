/** @type {import('next').NextConfig} */
import nextra from "nextra";

const nextConfig = {
  basePath: "/tissue-sample-collection-details",
  assetPrefix: "/tissue-sample-collection-details",
  output: "export",
  images: {
    unoptimized: true
  },
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx"
});

export default withNextra(nextConfig);

// If you have other Next.js configurations, you can pass them as the parameter:
// export default withNextra({ /* other next.js config */ })
