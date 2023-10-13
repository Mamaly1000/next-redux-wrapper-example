import { userType } from "../../types/userType";

const addUserAction = (data: userType) => {
  const newData = data;
  if (!data.created_at) {
    newData.created_at = new Date(Date.now()) + "";
  }
  return {
    type: "ADD_USER",
    payload: data.created_at ? data : newData,
  };
};
const deleteUserAction = (data: userType) => {
  return {
    type: "DELETE_USER",
    payload: data,
  };
};
const updateUserAction = (data: userType) => {
  return {
    type: "UPDATE_USER",
    payload: data,
  };
};
const searchedUserAction = (data: string) => {
  return { type: "SEARCHED_USERS", payload: data };
};
export {
  addUserAction,
  deleteUserAction,
  updateUserAction,
  searchedUserAction,
};
