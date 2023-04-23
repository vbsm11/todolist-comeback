import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {AppBar, Button, IconButton, Toolbar, Typography} from '@mui/material';
import {Menu} from '@mui/icons-material';


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

export type TaskStateType = {
    [todoListId: string]: TaskType[]
}

function App(): JSX.Element {

    // BLL:

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    })


    const removeTask = (todoListId: string, taskId: string) => {
        setTasks({
            ...tasks,
            [todoListId]: tasks[todoListId].filter(t => t.id !== taskId)
        })
    }

    const addTask = (todoListId: string, title: string) => {
        setTasks({
            ...tasks,
            [todoListId]: [
                {id: v1(), title: title, isDone: false},
                ...tasks[todoListId]
            ]
        })

    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)
        })
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks,
            [todoListId]: tasks[todoListId].map(t => t.id === taskId ? {...t, title: newTitle} : t)
        })
    }

    const changeTodolistFilter = (todoListId: string, filter: FilterValueType) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId? {...tl, filter}: tl))
    }

    const changeTodolistTitle = (todoListId: string, title: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId? {...tl, title}: tl))
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodolist = (title: string) => {
        const newTodolistId = v1()
        setTodoLists([...todoLists, {id: newTodolistId, title: title, filter: 'all'}])
        setTasks({...tasks, [newTodolistId]: []})
    }

    // UI:

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


    const todoListsComponents = todoLists.map(tl => {
        const tasksForRender: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
        <TodoList
            key = {tl.id}

            todoListId = {tl.id}
            title={tl.title}
            tasks={tasksForRender}
            filter={tl.filter}

            removeTask={removeTask}
            addTask={addTask}
            changeTaskStatus={changeTaskStatus}
            changeTaskTitle={changeTaskTitle}

            changeTodolistFilter={changeTodolistFilter}
            removeTodoList={removeTodoList}
            changeTodolistTitle={changeTodolistTitle}
        />)
    })

    // JSX

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        size='large'
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    >
                        <Menu/>
                    </IconButton>
                        Todolists
                        <Typography variant="h6" component={'div'} sx={{flexGrow: 1}}>
                    </Typography>
                    <Button color="inherit" variant={'outlined'}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
            <AddItemForm addItem={addTodolist}/>
            {todoListsComponents}
        </div>
    );
}

export default App;
