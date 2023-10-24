import React from "react";
import Wrapper from "../store/store";
import { GetServerSideProps } from "next";
import axios from "axios";
import { fakeUserType, userType } from "../types/userType";
import { addAllUsers, addUserAction } from "../store/users-slice/UsersActions";
import { useSelector } from "react-redux";
import { selectUsers } from "../store/users-slice/UserReducer";
import UserCard from "../components/UserCard";
import Link from "next/link";
import { v4 } from "uuid";

const Other = () => {
  const Users = useSelector(selectUsers);
  return (
    <section className="p-5 min-w-full flex items-start justify-start gap-5 flex-wrap">
      <div className="  min-w-full flex items-start justify-start gap-5 flex-wrap">
        {Users.users.length > 0 ? (
          Users.users.map((user) => {
            return <UserCard user={user} key={user.id} />;
          })
        ) : (
          <div>loading ....</div>
        )}
      </div>
      <div className="p-5 min-w-full flex items-start justify-start gap-5 flex-wrap">
        <Link href="/" legacyBehavior>
          <a>main page</a>
        </Link>
        <Link href="/next" legacyBehavior>
          <a>next page</a>
        </Link>
      </div>
    </section>
  );
};

export default Other;
export const getServerSideProps = Wrapper.getServerSideProps(
  (store): GetServerSideProps<any> =>
    async (): Promise<any> => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      store.dispatch(
        addAllUsers(
          data.map((user: fakeUserType) => {
            return {
              age: Math.floor(Math.random() * 100),
              created_at: new Date(Date.now()) + "",
              id: v4(),
              job: "random job-" + Math.floor(Math.random() * 50),
              name: user.name,
            };
          }) as userType[]
        )
      );
    }
);
