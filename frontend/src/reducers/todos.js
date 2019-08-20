import {
  ADD_TODO,
  ADD_CHILD_TODO_SUCCESS,
  ADD_ROOT_TODO_SUCCESS,
  TODOS_FAILURE,
  UPDATE_TODO,
  DELETE_TODO,
  LOADED_TODOS,
  FETCH_TODOS
} from "../actions/todos";

export const TODOS_DEFAULT_STATE = {
  loading: false,
  saving: false,
  error: "",
  items: {},
  newTodoId: null
};

export default function todos(state = TODOS_DEFAULT_STATE, action) {
  switch (action.type) {
    case LOADED_TODOS: {
      const todos = action.todos;

      // Map todos by ID for easy lookup, plus initialize childrenIds array for rendering
      const todosById = Object.assign(
        {},
        ...todos.map((todo) => ({ [todo.id]: { ...todo, childrenIds: [] } }))
      );

      // Add childrenIds to each parent
      todos.forEach((todo) => {
        if (todo.parentId) todosById[todo.parentId].childrenIds.push(todo.id);
      });

      return { ...state, items: todosById, loading: false };
    }

    case FETCH_TODOS: {
      return { ...state, loading: true };
    }

    case ADD_TODO:
      return { ...state, saving: true };

    case ADD_CHILD_TODO_SUCCESS: {
      const prevItems = state.items;
      const newTodo = action.todo;
      const parentId = newTodo.parentId;

      // If it's not a root node, we have to add the new
      // todo and add its id to its parent's childrenIds
      return {
        ...state,
        items: {
          ...prevItems,
          [parentId]: {
            ...prevItems[parentId],
            childrenIds: [newTodo.id, ...prevItems[parentId].childrenIds]
          },
          [newTodo.id]: { ...newTodo, childrenIds: [] }
        },
        saving: false,
        newTodoId: newTodo.id
      };
    }

    case ADD_ROOT_TODO_SUCCESS: {
      // If root node, just add the new todo
      const newTodo = action.todo;

      return {
        ...state,
        items: {
          ...state.items,
          [newTodo.id]: { ...newTodo, childrenIds: [] }
        },
        saving: false,
        newTodoId: newTodo.id
      };
    }

    case TODOS_FAILURE:
      console.log("todos error", action.error);
      return { ...state, loading: false, saving: false, error: action.error };

    case UPDATE_TODO:
      return {
        ...state,
        items: {
          ...state.items,
          [action.id]: {
            ...state.items[action.id],
            text: action.newText
          }
        }
      };

    case DELETE_TODO: {
      const parentId = state.items[action.id].parentId;

      // remove the deleted todo from state
      const { [action.id]: deletedTodo, ...rest } = state.items;

      // If it's a root node, we're done
      if (!parentId) return { ...state, items: rest };

      // Else, remove reference to todo from its parent
      const parent = state.items[parentId];
      const updatedParent = {
        ...parent,
        childrenIds: parent.childrenIds.filter(
          (childId) => childId !== action.id
        )
      };

      const newTodos = { ...rest, [parentId]: updatedParent };

      return { ...state, items: newTodos };
    }

    default:
      return state;
  }
}
