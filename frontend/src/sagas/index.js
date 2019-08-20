import { all } from "redux-saga/effects";
import todosSaga from "./todos";
import authSaga from "./auth";

export default function* rootSaga() {
  yield all([todosSaga(), authSaga()]);
}
