import nextra from "nextra";

const nextConfig = {
  basePath: "/tissue-sample-collection-details",
  assetPrefix: "/tissue-sample-collection-details",
  output: "export",
  images: {
    unoptimized: true
  }
};

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.jsx"
});

export default withNextra(nextConfig);
