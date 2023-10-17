import React, {useEffect, useState} from 'react'
import axios from 'axios';
import {todolistApi} from '../api/api';

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => setState(res.data))

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists', {title: 'React'}, {withCredentials: true}).
            then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '37d3e39a-360c-442f-b5a7-5f1a4bd65b59'
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {withCredentials: true})
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = `8f308b8-7d5d-4214-a0d5-c29252cdacc3`
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`, {title: 'Redux'}, {withCredentials: true}).
        then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

