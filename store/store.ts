import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
} from "redux";
import { Context, HYDRATE, createWrapper } from "next-redux-wrapper";
import userReducer from "./users-slice/UserReducer";
import logger from "redux-logger";
const combinedReducers = combineReducers({
  users: userReducer,
});
const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nexState = {
      ...state,
      users: {
        ...state.users,
        users: [
          ...new Set([...state.users.users, ...action.payload.users.users]),
        ],
      },
    };

    return nexState;
  } else {
    return combinedReducers(state, action as any);
  }
};
const bindmiddlewares = (middleWares: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    return applyMiddleware(...middleWares, logger);
  } else {
    return applyMiddleware(...middleWares);
  }
};
const makeStore = (context: Context) =>
  createStore(reducer, bindmiddlewares([]));

export const Wrapper = createWrapper(makeStore, { debug: true });
export default Wrapper;
