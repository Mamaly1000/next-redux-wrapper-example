import { userType } from "../../types/userType";
import { v4 as uuidv4 } from "uuid";

export type userINITtype = {
  users: userType[];
  totalUsers: number;
  searched_text: string;
};

const initailUserState: userINITtype = {
  users: [],
  totalUsers: 0,
  searched_text: "",
};

const userReducer = (
  state = initailUserState,
  action: {
    type: string;
    payload: userType;
  }
) => {
  switch (action.type) {
    case "ADD_USER":
      let newusers = state.users;
      const selectedAddedUser = state.users.findIndex(
        (user) =>
          action.payload.id === user.id || user.name === action.payload.name
      );
      if (selectedAddedUser > 0) {
        return state;
      } else {
        newusers.push(action.payload);
        return {
          ...state,
          totalUsers: state.totalUsers + 1,
          users: newusers,
        };
      }
    case "DELETE_USER":
      const newArray = state.users.filter(
        (user) =>
          user.id !== action.payload.id || user.name !== action.payload.name
      );
      return {
        ...state,
        users: newArray,
      };
    case "UPDATE_USER":
      const selectedUser = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      selectedUser > 0
        ? (state.users[selectedUser] = action.payload)
        : alert("there is no user with this id");
      const newUpdatedArray = state.users;
      return { ...state, users: newUpdatedArray };
    case "SEARCHED_USERS":
      return {
        ...state,
        searched_text: action.payload,
      };
    default:
      return state;
  }
};
export default userReducer;
export const selectUsers = (state: any) => {
  return state.users as userINITtype;
};
