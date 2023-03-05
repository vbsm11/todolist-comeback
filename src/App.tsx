import React from 'react';
import './App.css';
import TodoList from './TodoList';

// create
// read
// update
// delete

// CRUD operations


function App(): JSX.Element {

    // JSX

    return (
        <div className="App">
            <TodoList title={'What to learn'}/>
            <TodoList title={'What to buy'}/>
            <TodoList title={'What to read'}/>
        </div>
    );
}

export default App;
