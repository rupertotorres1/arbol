import { call, put, takeLatest, takeEvery, all } from "redux-saga/effects";
import {
  ADD_TODO,
  DELETE_TODO,
  FETCH_TODOS,
  UPDATE_TODO,
  loadedTodos,
  addChildTodoSuccess,
  addRootTodoSuccess,
  todosFailure
} from "../actions/todos";
import { logout } from "../actions/auth";
import fetchApi from "../apiHelper";

function* getAllTodos() {
  try {
    const res = yield call(fetchApi, "/todos", {
      credentials: "include"
    });

    if (res.status === 401) {
      yield put(logout());
    } else {
      const todos = yield res.json();
      yield put(loadedTodos(todos));
    }
  } catch (e) {
    yield put(todosFailure(e.message));
  }
}

function* saveTodo(action) {
  try {
    const options = {
      method: "POST",
      body: JSON.stringify(action.todo),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    const res = yield call(fetchApi, "/todos", options);

    if (res.status === 401) {
      yield put(logout());
    } else {
      const todo = yield res.json();
      todo.parentId
        ? yield put(addChildTodoSuccess(todo))
        : yield put(addRootTodoSuccess(todo));
    }
  } catch (e) {
    yield put(todosFailure(e.message));
  }
}

function* deleteTodo(action) {
  try {
    const res = yield call(fetchApi, `/todos/${action.id}`, {
      method: "DELETE"
    });
    if (res.status === 401) yield put(logout());
  } catch (e) {
    yield put(todosFailure(e.message));
  }
}

function* updateTodo(action) {
  try {
    const options = {
      method: "PUT",
      body: JSON.stringify({ text: action.newText }),
      headers: new Headers({
        "Content-Type": "application/json"
      })
    };

    const res = yield call(fetchApi, `/todos/${action.id}`, options);
    if (res.status === 401) yield put(logout());
  } catch (e) {
    yield put(todosFailure(e.message));
  }
}

// TODO: is this right?
function* todosSaga() {
  yield all([
    takeLatest(FETCH_TODOS, getAllTodos),
    takeLatest(ADD_TODO, saveTodo),
    takeLatest(DELETE_TODO, deleteTodo),
    takeEvery(UPDATE_TODO, updateTodo)
  ]);
}

export default todosSaga;
