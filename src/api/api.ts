import axios from 'axios'

type TodolistType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

type BasicResponseType<T={}> = {
    resultCode: number
    messages: string[]
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true
})

export const todolistApi = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<BasicResponseType<{item: TodolistType}>>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<BasicResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<BasicResponseType>(`todo-lists/${todolistId}`, {title})
    }
}