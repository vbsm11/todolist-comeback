import React, {useState} from 'react';
import './App.css';
import TodoList from './TodoList';
import {AddItemForm} from './AddItemForm';
import {
    AppBar,
    Button,
    Checkbox,
    Container,
    createTheme,
    CssBaseline,
    FormControlLabel,
    FormGroup,
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
    RemoveTodoListAC
} from './state/todolists-reducer';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasks-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import TodoListWithRedux from './TodoListWithRedux';


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

function AppWithRedux(): JSX.Element {

    // BLL:

    const todoLists = useSelector<AppRootStateType, TodoListType[]>(state => state.todoLists)
    // const tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    const [isDarkMode, setDarkMode] = useState<boolean>()

    const removeTask = (todoListId: string, taskId: string) => {
        dispatch(RemoveTaskAC(todoListId, taskId))
    }

    const addTask = (todoListId: string, title: string) => {
        dispatch(AddTaskAC(todoListId, title))
    }

    const changeTaskStatus = (todoListId: string, taskId: string, newIsDone: boolean) => {
        dispatch(ChangeTaskStatusAC(todoListId, taskId, newIsDone))
    }

    const changeTaskTitle = (todoListId: string, taskId: string, newTitle: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, taskId, newTitle))
    }

    const changeTodolistFilter = (todoListId: string, filter: FilterValueType) => {
        dispatch(ChangeTodoListFilterAC(todoListId, filter))
    }

    const changeTodolistTitle = (todoListId: string, title: string) => {
        dispatch(ChangeTodoListTitleAC(todoListId, title))
    }

    const removeTodoList = (todoListId: string) => {
        dispatch(RemoveTodoListAC(todoListId))
    }

    const addTodolist = (title: string) => {
        dispatch(AddTodoListAC(title))
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
        // const tasksForRender: TaskType[] = getFilteredTasks(tasks[tl.id], tl.filter)
        return (
            <Grid key={tl.id} item>
                <Paper elevation={8}>
                    {/*<TodoList*/}
                    {/*    key={tl.id}*/}

                    {/*    todoListId={tl.id}*/}
                    {/*    title={tl.title}*/}
                    {/*    tasks={tasksForRender}*/}
                    {/*    filter={tl.filter}*/}

                    {/*    removeTask={removeTask}*/}
                    {/*    addTask={addTask}*/}
                    {/*    changeTaskStatus={changeTaskStatus}*/}
                    {/*    changeTaskTitle={changeTaskTitle}*/}

                    {/*    changeTodolistFilter={changeTodolistFilter}*/}
                    {/*    removeTodoList={removeTodoList}*/}
                    {/*    changeTodolistTitle={changeTodolistTitle}*/}
                    {/*/>*/}
                    <TodoListWithRedux todoList={tl}/>
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

export default AppWithRedux;
