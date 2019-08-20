import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  REGISTER,
  LOGIN,
  LOGOUT,
  CHECK_AUTHENTICATED,
  loginSuccess,
  checkAuthenticatedTrue,
  checkAuthenticatedFalse
} from "../actions/auth";
import fetchApi from "../apiHelper";

function* register(action) {
  const options = {
    method: "POST",
    body: JSON.stringify(action.user),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  const res = yield call(fetchApi, "/auth/register", options);
  if (res.status === 201) yield put(loginSuccess());
}

function* login(action) {
  const options = {
    method: "POST",
    body: JSON.stringify(action.user),
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    credentials: "include"
  };

  const res = yield call(fetchApi, "/auth/login", options);
  if (res.status === 200) yield put(loginSuccess());
}

function* logoutSaga() {
  yield call(fetchApi, "/auth/logout", { method: "POST" });
}

function* checkAuthenticated() {
  const res = yield call(fetchApi, "/auth/is-authenticated", {
    credentials: "include"
  });
  const { isLoggedIn } = yield res.json();
  if (isLoggedIn) {
    yield put(checkAuthenticatedTrue());
  } else {
    yield put(checkAuthenticatedFalse());
  }
}

// TODO: is this right?
function* authSaga() {
  yield all([
    takeLatest(REGISTER, register),
    takeLatest(LOGIN, login),
    takeLatest(LOGOUT, logoutSaga),
    takeLatest(CHECK_AUTHENTICATED, checkAuthenticated)
  ]);
}

export default authSaga;
