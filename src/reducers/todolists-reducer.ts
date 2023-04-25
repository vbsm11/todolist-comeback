import {TodoListType} from '../App';
import {v1} from 'uuid';

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export const todoListsReducer = (todoLists: TodoListType[], action: RemoveTodoListAT | AddTodoListAT): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodolistId = v1()
            return [...todoLists, {id: newTodolistId, title: action.title, filter: 'all'}]
        default:
            return todoLists
    }
}