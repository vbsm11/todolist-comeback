import axios from 'axios'

export const todolistApi = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
    },
    createTodolist(title: string) {
       return axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title}, {withCredentials: true})
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {withCredentials: true})
    }
}