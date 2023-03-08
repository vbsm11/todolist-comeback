import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';

// create
// read
// update
// delete

// CRUD operations

export type TaskType = {
    id: number,
    title: string,
    isDone: boolean
}

export type FilterValueType = 'all' | 'active' | 'completed'

function App(): JSX.Element {

    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
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
            <TodoList title={'What to learn'} tasks={tasksForRender} removeTask={removeTask} changeTodolistFilter={changeTodolistFilter}/>
        </div>
    );
}

export default App;
