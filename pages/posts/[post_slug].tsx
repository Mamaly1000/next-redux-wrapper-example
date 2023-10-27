import axios from "axios";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React, { useEffect, useState } from "react";
import Wrapper from "../../store/store";
import { useSelector } from "react-redux";
import { selectUsers } from "../../store/users-slice/UserReducer";
export type postDataType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
const SinglePost = () => {
  const { post } = useSelector(selectUsers);
  const [hydrate, setHydrate] = useState(false);
  useEffect(() => {
    setHydrate(true);
  }, []);
  return post && hydrate ? (
    <section className="p-5 flex flex-col gap-2 justify-center items-center">
      <h1>{post?.title}</h1>
      <div>{post?.body}</div>
    </section>
  ) : (
    <section>loading....</section>
  );
};

export default SinglePost;

export const getServerSideProps = Wrapper.getServerSideProps(
  (store): GetServerSideProps<any> =>
    async ({ query }: GetServerSidePropsContext): Promise<any> => {
      const { data } = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${query.post_slug}`
      );
      store.dispatch({ type: "GET_POST", payload: data });
    }
);
