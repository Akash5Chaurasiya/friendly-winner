import { GET_TODOS_SUCCESS, POST_TODOS_SUCCESS, TODO_FAILURE, TODO_REQUEST } from "./actionTypes";

interface Todo {
    // Define your Todo properties and types here
}

interface State {
    isLoading: boolean;
    isError: boolean;
    todos: Todo[];
}

const initialState: State = {
    isLoading: false,
    isError: false,
    todos: []
};

interface Action {
    type: string;
    payload: any;
}

export const reducer = (state: State = initialState, action: Action) => {
    const { type, payload } = action;
    switch (type) {
        // Define your cases here
        case TODO_REQUEST:
            return { ...state, isLoading: true }
        case TODO_FAILURE:
            return { ...state, isError: true, isLoading: false }
        case GET_TODOS_SUCCESS:
            return { ...state, isLoading: false, todos: payload }
        case POST_TODOS_SUCCESS:
            return {...state,isLoading: false,todos:[...state.todos,payload]}
        default:
            return state;
    }
};
