import {FilterValueType, TodoListType} from '../App';
import {v1} from 'uuid';

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}

type ChangeTodoListTitleAT = {
    type : 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string
}

type ChangeTodoListFilterAT = {
    type : 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValueType
}

export type TodoListsActionType = RemoveTodoListAT | AddTodoListAT | ChangeTodoListTitleAT | ChangeTodoListFilterAT

export const todoListsReducer = (todoLists: TodoListType[], action: TodoListsActionType): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            return [...todoLists, {id: action.id, title: action.title, filter: 'all'}]
        case 'CHANGE-TODOLIST-TITLE':
            return todoLists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return todoLists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todoLists
    }
}

export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
  return {
      type: 'REMOVE-TODOLIST',
      id: id
  }
}

export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title: title,
        id: v1()
    }
}

export const ChangeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        id: id,
        title: title
    }
}

export const ChangeTodoListFilterAC = (id: string, filter: FilterValueType): ChangeTodoListFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id: id,
        filter: filter
    }
}