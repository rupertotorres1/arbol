// action types
export const ADD_TODO = "ADD_TODO";
export const ADD_CHILD_TODO_SUCCESS = "ADD_CHILD_TODO_SUCCESS";
export const ADD_ROOT_TODO_SUCCESS = "ADD_ROOT_TODO_SUCCESS";
export const TODOS_FAILURE = "TODOS_FAILURE";
export const UPDATE_TODO = "UPDATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const LOADED_TODOS = "LOADED_TODOS";
export const FETCH_TODOS = "FETCH_TODOS";
export const CHANGE_CURRENT_GOAL_ID = "CHANGE_CURRENT_GOAL_ID";

// action creators
export function addTodo(todo) {
  return { type: ADD_TODO, todo };
}

export function addChildTodoSuccess(todo) {
  return { type: ADD_CHILD_TODO_SUCCESS, todo };
}

export function addRootTodoSuccess(todo) {
  return { type: ADD_ROOT_TODO_SUCCESS, todo };
}

export function todosFailure(error) {
  return { type: TODOS_FAILURE, error };
}

export function updateTodo(id, newText) {
  return { type: UPDATE_TODO, id, newText };
}

export function deleteTodo(id) {
  return { type: DELETE_TODO, id };
}

export function loadedTodos(todos) {
  return { type: LOADED_TODOS, todos };
}

export function fetchTodos() {
  return { type: FETCH_TODOS };
}

export function changeCurrentGoalId(newId) {
  return { type: CHANGE_CURRENT_GOAL_ID, newId };
}
