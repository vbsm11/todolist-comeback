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

function App(): JSX.Element {

    const [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
    ])

    const removeTask = (taskId: number) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    // JSX

    return (
        <div className="App">
            <TodoList title={'What to learn'} tasks={tasks} removeTask={removeTask}/>
        </div>
    );
}

export default App;
