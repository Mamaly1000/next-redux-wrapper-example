import React from "react";
import Wrapper from "../store/store";
import { GetServerSideProps } from "next";
import axios from "axios";
import { fakeUserType } from "../types/userType";
import { addUserAction } from "../store/users-slice/UsersActions";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/users-slice/UserReducer";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { v4 } from "uuid";

const other = () => {
  const users = useSelector(selectUsers);
  return (
    <div className="p-5 min-w-full flex items-start justify-start gap-5 flex-wrap">
      {users.users && users.users.length > 0 ? (
        users.users.map((user) => {
          return <UserCard user={user} key={user.id} />;
        })
      ) : (
        <span>loading ....</span>
      )}{" "}
      <Link href="/" legacyBehavior>
        <a>main page</a>
      </Link>
      <Link href="/next" legacyBehavior>
        <a>next page</a>
      </Link>
    </div>
  );
};

export default other;
export const getServerSideProps = Wrapper.getServerSideProps(
  (store): GetServerSideProps<any> =>
    async (): Promise<any> => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      data.map((user: fakeUserType) => {
        store.dispatch(
          addUserAction({
            age: Math.floor(Math.random() * 100),
            created_at: new Date(Date.now()) + "",
            id: v4(),
            job: "random job-" + Math.floor(Math.random() * 50),
            name: user.name,
          })
        );
      });
    }
);
