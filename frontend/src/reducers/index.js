import { combineReducers } from "redux";
import todos, { TODOS_DEFAULT_STATE } from "./todos";
import auth, { AUTH_DEFAULT_STATE } from "./auth";

const rootReducer = combineReducers({
  todos,
  auth
});

export const DEFAULT_STATE = {
  todos: TODOS_DEFAULT_STATE,
  auth: AUTH_DEFAULT_STATE
};

export default rootReducer;
