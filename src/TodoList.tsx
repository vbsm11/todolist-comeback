import React, {memo, useCallback} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, IconButton, List} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {Task} from './Task';

type TodoListPropsType = {
    todoListId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValueType

    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (todoListId: string, taskId: string, newTitle: string) => void

    changeTodolistFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodoList: (todoListId: string) => void
    changeTodolistTitle: (todoListId: string, title: string) => void
}

const TodoList = memo((props: TodoListPropsType) => {

    console.log('TodoList')

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

    const tasksForRender: TaskType[] = getFilteredTasks(props.tasks, props.filter)

    const removeTask = useCallback((taskId: string) => {
        props.removeTask(props.todoListId, taskId)
    }, [props.removeTask, props.todoListId])

    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean) => {
        props.changeTaskStatus(props.todoListId, taskId, newIsDone)
    }, [props.changeTaskStatus, props.todoListId])

    const changeTaskTitle = useCallback((taskId: string, newTitle: string) => {
        props.changeTaskTitle(props.todoListId, taskId, newTitle)
    }, [props.changeTaskTitle, props.todoListId])

    const todoListItems: Array<JSX.Element> = tasksForRender.map((task: TaskType) => {

        return (
            <Task
                key={task.id}
                task={task}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}
            />
        )
    })

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListId, title)
    }, [props.addTask, props.todoListId])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodolistTitleHandler = useCallback((title: string) => {
        props.changeTodolistTitle(props.todoListId, title)
    }, [props.changeTodolistTitle, props.todoListId])


    return (
        <div className="todolist">
            <div className={'titleWithButton'}>
                <EditableSpan title={props.title} spanClasses="todoTitle" changeTitle={changeTodolistTitleHandler}/>
                <IconButton
                    size="small"
                    onClick={removeTodoListHandler}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask}/>

            <List>
                {todoListItems}
            </List>
            <div className="btn-filter-container">
                <Button
                    size="medium"
                    variant="contained"
                    disableElevation
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'all')}
                >All
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    disableElevation
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'active')}
                >Active
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    disableElevation
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'completed')}
                >Completed
                </Button>
            </div>
        </div>
    )
})

export default TodoList;