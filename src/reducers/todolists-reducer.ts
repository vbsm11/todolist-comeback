import {TodoListType} from '../App';

type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}


export const todoListsReducer = (todoLists: TodoListType[], action: RemoveTodoListAT): TodoListType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return todoLists.filter(tl => tl.id !== action.id)
        default:
            return todoLists
    }
}