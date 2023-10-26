import axios from "axios";
import { GetServerSidePropsContext } from "next";
import React from "react";
export type postDataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const SinglePost = ({ postData }: { postData: postDataType | null }) => {
  return (
    postData && (
      <div>
        <h1>{postData.title}</h1>
        <p>{postData.body}</p>
        <div>{JSON.stringify(postData)}</div>
      </div>
    )
  );
};

export default SinglePost;

export const getServerSideProps = async ({
  query,
}: GetServerSidePropsContext) => {
  const { data } = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${query.post_slug}`
  );
  return {
    props: {
      postData: data,
    },
  };
};
