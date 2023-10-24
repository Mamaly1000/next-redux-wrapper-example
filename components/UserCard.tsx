import React from "react";
import { userType } from "../types/userType";
import { useDispatch } from "react-redux";
import { deleteUserAction } from "../store/users-slice/UsersActions";

const UserCard = ({ user }: { user: userType }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-sky-950 border-[1px] border-sky-950 p-2 rounded-lg flex flex-wrap items-start justify-start gap-2 text-[1rem] max-w-[300px] max-h-[300px]">
      <h3>{user.name}</h3>
      <div>
        <span>age: {user.age}</span>
        <span>job: {user.job}</span>
        <span>
          created-at: {new Date(user.created_at).toLocaleDateString()}
        </span>
      </div>
      <button
        className="p-2 rounded-lg capitalize min-w-fit h-fit bg-red-500"
        onClick={() => dispatch(deleteUserAction(user))}
      >
        delete user
      </button>
    </div>
  );
};

export default UserCard;
