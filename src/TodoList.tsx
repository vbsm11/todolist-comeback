import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

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

const TodoList = memo((props:TodoListPropsType) => {

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {

        const taskClasses = task.isDone ? 'task-done' : 'task'

        const removeTaskHandler = () => {
            props.removeTask(props.todoListId, task.id)
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)

        const changeTaskTitleHandler = (title: string) => {
            props.changeTaskTitle(props.todoListId, task.id, title)
        }

        return (
            <ListItem
                divider
                key={task.id}
                disablePadding
                secondaryAction={
                    <IconButton
                        size='small'
                        onClick={removeTaskHandler}
                    >
                        <DeleteForeverIcon/>
                    </IconButton>
                }
            >
                <Checkbox
                    size='small'
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                    title={task.title}
                    spanClasses={taskClasses}
                    changeTitle={changeTaskTitleHandler}
                />

            </ListItem>
        )
    })

    const addTask = useCallback((title: string) => {
        props.addTask(props.todoListId, title)
    }, [props.addTask, props.todoListId])

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodolistTitleHandler = (title: string) => {
      props.changeTodolistTitle(props.todoListId, title)
    }


    return (
        <div className="todolist">
            <div className={'titleWithButton'}>
                <EditableSpan title={props.title} spanClasses='todoTitle' changeTitle={changeTodolistTitleHandler}/>
                <IconButton
                    size='small'
                    onClick={removeTodoListHandler}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTask}/>

            <List>
                {todoListItems}
            </List>
            <div className='btn-filter-container'>
                <Button
                    size='medium'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'all')}
                >All
                </Button>
                <Button
                    size='medium'
                    variant='contained'
                    disableElevation
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'active')}
                >Active
                </Button>
                <Button
                    size='medium'
                    variant='contained'
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