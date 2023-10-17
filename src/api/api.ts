import axios from 'axios'
import {GetTodolists} from '../stories/todolists-api.stories';

export const todolistApi = {
    getTodolists() {
        return axios.get('https://social-network.samuraijs.com/api/1.1/todo-lists', {withCredentials: true})
    }
}