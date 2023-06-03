import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {v1} from 'uuid';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button, Checkbox,
    Container, createTheme,
    CssBaseline, FormControlLabel, FormGroup,
    Grid,
    IconButton,
    Paper,
    ThemeProvider,
    Toolbar,
    Typography
} from '@mui/material';
import {Menu} from '@mui/icons-material';
import {lime, teal} from '@mui/material/colors';
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC, TodoListsActionType,
    todoListsReducer
} from './reducers/todolists-reducer';
import {
    AddTaskAC,
    ChangeTaskStatusAC,
    ChangeTaskTitleAC,
    RemoveTaskAC,
    TasksActionType,
    tasksReducer
} from './reducers/tasks-reducer';


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


function AppWithReducers(): JSX.Element {

    // BLL:

    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchToTodoListsReducer] = useReducer<Reducer<TodoListType[], TodoListsActionType>>(todoListsReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasksReducer] = useReducer<Reducer<TaskStateType, TasksActionType>>(tasksReducer, {
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

    const [isDarkMode, setDarkMode] = useState<boolean>()

    const removeTask = (todoListId: string, taskId: string) => {
        dispatchToTasksReducer(RemoveTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatchToTasksReducer(AddTaskAC(todoListId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        dispatchToTasksReducer(ChangeTaskStatusAC(todoListId, taskId, newIsDone))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatchToTasksReducer(ChangeTaskTitleAC(todoListId, taskId, newTitle))
    }

    const changeTodolistFilter = (todoListId: string, filter: FilterValueType) => {
        dispatchToTodoListsReducer(ChangeTodoListFilterAC(todoListId, filter))
    }

    const changeTodolistTitle = (todoListId: string, title: string) => {
        dispatchToTodoListsReducer(ChangeTodoListTitleAC(todoListId, title))
    }

    const removeTodoList = (todoListId: string) => {
        const action = RemoveTodoListAC(todoListId)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
    }

    const addTodolist = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTodoListsReducer(action)
        dispatchToTasksReducer(action)
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
            <Grid item>
                <Paper elevation={8}>
                    <TodoList
                        key={tl.id}

                        todoListId={tl.id}
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
                    />
                </Paper>
            </Grid>)
    })

    const mode = isDarkMode ? 'dark' : 'light'

    const customTheme = createTheme({
        palette: {
            primary: lime,
            secondary: teal,
            mode: mode
        }
    })

    // JSX

    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <div className="App">
                <AppBar position="static">
                    <Toolbar style={{justifyContent: 'space-between'}}>
                        <IconButton
                            size="large"
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
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        onChange={(e) => setDarkMode(e.currentTarget.checked)}
                                    />
                                }
                                label={isDarkMode ? 'Turn off dark mode' : 'Turn on dark mode'}
                            />
                        </FormGroup>
                        <Button color="inherit" variant={'outlined'}>
                            Login
                        </Button>
                    </Toolbar>
                </AppBar>
                <Container fixed>
                    <Grid container sx={{p: '15px 0'}}>
                        <AddItemForm addItem={addTodolist}/>
                    </Grid>
                    <Grid container spacing={2}>
                        {todoListsComponents}
                    </Grid>
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default AppWithReducers;
