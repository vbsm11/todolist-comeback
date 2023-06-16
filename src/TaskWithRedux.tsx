import React, {ChangeEvent, memo, useCallback} from 'react';
import EditableSpan from './EditableSpan';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType} from './AppWithRedux';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasks-reducer';

type TaskWithReduxPropsType = {
    todoListId: string
    taskId: string

}

export const TaskWithRedux = memo((props: TaskWithReduxPropsType) => {

    console.log('TaskWithRedux')

    const task = useSelector<AppRootStateType, TaskType>(state => {
        const task = state.tasks[props.todoListId].find(t => t.id === props.taskId)
        if (task) {
            return task
        } else throw new Error()
    })

    const dispatch = useDispatch()

    const taskClasses = task.isDone ? 'task-done' : 'task'

    const removeTaskHandler = () => {
        dispatch(RemoveTaskAC(props.todoListId, props.taskId))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(props.todoListId, props.taskId, e.currentTarget.checked))
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(ChangeTaskTitleAC(props.todoListId, props.taskId, title))
    }, [dispatch, props.todoListId, props.taskId])

    return (
        <ListItem
            divider
            disablePadding
            secondaryAction={
                <IconButton
                    size="small"
                    onClick={removeTaskHandler}
                >
                    <DeleteForeverIcon/>
                </IconButton>
            }
        >
            <Checkbox
                size="small"
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