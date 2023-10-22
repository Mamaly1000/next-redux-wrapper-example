import Head from "next/head";
import React from "react";

const SEO = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
    </Head>
  );
};

export default SEO;
