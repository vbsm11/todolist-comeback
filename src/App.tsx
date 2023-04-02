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

export type TodoListType = {
    id: string
    title: string
    filter: FilterValueType
}

function App(): JSX.Element {

    const todoListId_1 = v1()
    const todoListId_2 = v1()
    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

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

    const changeTodolistFilter = (filter: FilterValueType) => {
        setFilter(filter)
    }

    const getFilteredTasks = (tasks: TaskType[], filter: FilterValueType) => {
      switch (filter) {
          case 'active':
              return tasks.filter(t => !t.isDone)
          case 'completed':
              return tasks.filter(t => t.isDone)
          default:
              return tasks
      }
    }

    const tasksForRender: TaskType[] = getFilteredTasks(tasks, filter)

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
