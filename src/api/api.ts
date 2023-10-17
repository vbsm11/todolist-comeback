import axios from 'axios'

type TodolistType = {
    "id": string
    "title": string
    "addedDate": string
    "order": number
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
       return instance.post('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete(`todo-lists/${todolistId}`)
    },
    updateTodolistTitle(todolistId: string, title: string) {
        return instance.put(`todo-lists/${todolistId}`, {title})
    }
}