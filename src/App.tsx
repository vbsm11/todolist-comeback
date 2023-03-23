import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';

// create
// read
// update
// delete

// CRUD operations

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const addTask = (title: string) => {
        setTasks([{
            id: v1(),
            title: title,
            isDone: false
        }, ...tasks])
    }

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskId? {...t, isDone: newIsDone} : t))
    }

    const [filter, setFilter] = useState<FilterValueType>('all')

    let tasksForRender: TaskType[] = []

    if (filter === 'all') {
        tasksForRender = tasks
    }
    if (filter === 'active') {
        tasksForRender = tasks.filter(t => !t.isDone)
    }
    if (filter === 'completed') {
        tasksForRender = tasks.filter(t => t.isDone)
    }

    const changeTodolistFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    // JSX

    return (
        <div className="App">
            <TodoList
                title={'What to learn'}
                tasks={tasksForRender}
                filter={filter}
                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTodolistFilter={changeTodolistFilter}
            />
        </div>
    );
}

export default App;
