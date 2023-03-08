import React from 'react';
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

function App(): JSX.Element {

    const tasks: Array<TaskType> = [
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ]

    // JSX

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks}/>
        </div>
    );
}

export default App;
