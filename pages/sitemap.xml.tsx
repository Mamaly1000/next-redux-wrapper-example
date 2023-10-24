import { GetServerSidePropsContext } from "next";
import * as fs from "fs";
import axios from "axios";
import { postDataType } from "./posts/[post_slug]";
import { glob } from "glob";
const Sitemap = () => {
  return null;
};

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const BASE_URL = "https://next-redux-wrapper.netlify.app";

  const pagesDir = "pages/**/*.tsx";
  let staticPaths = await glob.sync(pagesDir);
  staticPaths = staticPaths
    .filter((path) => !path.includes("["))
    .filter((path) => !path.includes("/_"))
    .filter((path) => !path.includes("404"));
  const { data: posts } = await axios.get(
    "https://jsonplaceholder.typicode.com/posts"
  );
  const dynamicPaths = (posts as postDataType[]).map((post) => {
    return `${BASE_URL}/posts/${post.id}`;
  });
  const allPaths = [...dynamicPaths, ...staticPaths];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${allPaths
      .map((url) => {
        return `
          <url>
            <loc>${url}</loc>
            <lastmod>${new Date().toISOString()}</lastmod>
            <changefreq>monthly</changefreq>
            <priority>1.0</priority>
          </url>
        `;
      })
      .join("")}
  </urlset>
`;

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
