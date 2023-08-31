import { GET_TODOS_SUCCESS, POST_TODOS_SUCCESS, TODO_FAILURE, TODO_REQUEST } from "./actionTypes"

interface payload{
    payload:any
}

export const todoRequestAction=()=>{
    return {type:TODO_REQUEST}
}

export const todoFailureAction=()=>{
    return {type:TODO_FAILURE}
}

export const getTodoSuccessAction = (payload:payload)=>{
    return {type:GET_TODOS_SUCCESS,payload}
}

export const postTodoSuccessAction=(payload:payload)=>{
    return {type:POST_TODOS_SUCCESS,payload}
}

