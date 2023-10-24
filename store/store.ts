import {
  createStore,
  combineReducers,
  applyMiddleware,
  AnyAction,
  CombinedState,
} from "redux";
import { Context, HYDRATE, createWrapper } from "next-redux-wrapper";
import userReducer, { userINITtype } from "./users-slice/UserReducer";
import logger from "redux-logger";
export interface IApplicationState {
  users: userINITtype;
}
const combinedReducers = combineReducers({
  users: userReducer,
});
const reducer = (
  state: CombinedState<{ users: userINITtype }> | undefined,
  action: any
) => {
  if (action.type === HYDRATE) {
    const nexState = {
      ...state,
      ...action.payload,
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
const makeStore = (context: Context) => {
  return createStore(reducer, bindmiddlewares([]));
};

export const Wrapper = createWrapper(makeStore, { debug: true });
export default Wrapper;
export type rootState = ReturnType<typeof combinedReducers>;
