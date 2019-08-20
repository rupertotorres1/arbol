import {
  REGISTER,
  LOGIN,
  LOGIN_SUCCESS,
  LOGOUT,
  CHECK_AUTHENTICATED,
  CHECK_AUTHENTICATED_TRUE,
  CHECK_AUTHENTICATED_FALSE
} from "../actions/auth";

export const AUTH_DEFAULT_STATE = {
  loggedIn: false,
  loading: true
};

export default function auth(state = AUTH_DEFAULT_STATE, action) {
  switch (action.type) {
    case REGISTER:
    case LOGIN:
    case CHECK_AUTHENTICATED:
      return { ...state, loading: true };

    case LOGIN_SUCCESS:
    case CHECK_AUTHENTICATED_TRUE:
      return { ...state, loggedIn: true, loading: false };

    case LOGOUT:
    case CHECK_AUTHENTICATED_FALSE:
      return { ...state, loggedIn: false, loading: false };

    default:
      return state;
  }
}
