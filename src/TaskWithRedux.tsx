import React, {ChangeEvent, memo, useCallback} from 'react';
import EditableSpan from './EditableSpan';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch} from 'react-redux';
import {TaskType} from './AppWithRedux';
import {ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasks-reducer';

type TaskWithReduxPropsType = {
    todoListId: string
    task: TaskType

}

export const TaskWithRedux = memo(({todoListId, task}: TaskWithReduxPropsType) => {

    console.log('TaskWithRedux')

    const dispatch = useDispatch()

    const taskClasses = task.isDone ? 'task-done' : 'task'

    const removeTaskHandler = () => {
        dispatch(RemoveTaskAC(todoListId, task.id))
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(ChangeTaskStatusAC(todoListId, task.id, e.currentTarget.checked))
    }

    const changeTaskTitleHandler = useCallback((title: string) => {
        dispatch(ChangeTaskTitleAC(todoListId, task.id, title))
    }, [dispatch, todoListId, task.id])

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