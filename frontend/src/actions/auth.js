// action types
export const REGISTER = "REGISTER";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const CHECK_AUTHENTICATED = "CHECK_AUTHENTICATED";
export const CHECK_AUTHENTICATED_TRUE = "CHECK_AUTHENTICATED_TRUE";
export const CHECK_AUTHENTICATED_FALSE = "CHECK_AUTHENTICATED_FALSE";

// action creators
export function register(user) {
  return { type: REGISTER, user };
}

export function login(user) {
  return { type: LOGIN, user };
}

export function loginSuccess() {
  return { type: LOGIN_SUCCESS };
}

export function logout() {
  return { type: LOGOUT };
}

export function checkAuthenticated() {
  return { type: CHECK_AUTHENTICATED };
}

export function checkAuthenticatedTrue() {
  return { type: CHECK_AUTHENTICATED_TRUE };
}

export function checkAuthenticatedFalse() {
  return { type: CHECK_AUTHENTICATED_FALSE };
}
