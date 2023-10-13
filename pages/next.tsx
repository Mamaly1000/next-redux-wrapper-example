import styles from "../styles/Home.module.css";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserAction,
  searchedUserAction,
} from "../store/users-slice/UsersActions";
import { selectUsers } from "../store/users-slice/UserReducer";
import UserCard from "../components/UserCard";
import { userType } from "../types/userType";
import { v4 as uuidv4, v4 } from "uuid";
import Link from "next/link";

export default function Home() {
  const [searchedText, setSearchedText] = useState("");
  const [formData, setFormData] = useState<userType>({
    name: "",
    age: +"",
    created_at: new Date(Date.now()) + "",
    id: uuidv4(),
    job: "",
  });
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  useMemo(() => {
    dispatch(searchedUserAction(searchedText));
  }, [searchedText, users.users]);
  const searchedData = useMemo(() => {
    return users.users.filter((user) => {
      return (
        user.name.toLowerCase().includes(users.searched_text.toLowerCase()) ||
        user.job.toLowerCase().includes(users.searched_text.toLowerCase()) ||
        (user.age + "")
          .toLowerCase()
          .includes(users.searched_text.toLowerCase())
      );
    });
  }, [searchedText, users.users]);
  return (
    <section className={styles.container}>
      <section className="users-header-section">
        <h1 className="font-bold text-[2rem] capitalize text-sky-300">
          users list
        </h1>
        <input
          type="search"
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
          className="border-sky-500 border-[1px] rounded-lg min-w-full md:min-w-[200px] px-5 py-2 outline-none"
          placeholder="search ...."
        />
      </section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(addUserAction(formData));
          setFormData({
            age: 0,
            created_at: new Date(Date.now()) + "",
            id: v4(),
            job: "",
            name: "",
          });
        }}
        className="min-w-full p-2 flex flex-col items-start justify-start gap-2"
      >
        <input
          type="text"
          className="min-w-full min-h-[40px] px-5 text-start border-sky-400 border-[1px] rounded-lg overflow-hidden"
          value={formData.name}
          onChange={(e) => {
            setFormData({ ...formData, name: e.target.value });
          }}
          placeholder="name"
        />
        <input
          type="number"
          className="min-w-full min-h-[40px] px-5 text-start border-sky-400 border-[1px] rounded-lg overflow-hidden"
          value={formData.age}
          onChange={(e) => {
            setFormData({ ...formData, age: +e.target.value });
          }}
          placeholder="age"
        />
        <input
          type="text"
          className="min-w-full min-h-[40px] px-5 text-start border-sky-400 border-[1px] rounded-lg overflow-hidden"
          value={formData.job}
          onChange={(e) => {
            setFormData({ ...formData, job: e.target.value });
          }}
          placeholder="job"
        />
        <input
          className="min-w-full py-2 bg-sky-700 rounded-lg"
          type="submit"
          value="submit"
        />
      </form>
      <section className="min-w-full flex items-start justify-center gap-5 flex-wrap p-5">
        {searchedData.map((user) => {
          return (
            <div>
              <UserCard user={user} key={user.id} />
            </div>
          );
        })}
      </section>
      <Link href="/" legacyBehavior>
        <a>last page</a>
      </Link>
      <Link href="/other" legacyBehavior>
        <a>other page</a>
      </Link>
    </section>
  );
}
