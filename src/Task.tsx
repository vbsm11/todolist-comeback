import React, {ChangeEvent, memo, useCallback} from 'react';
import {TaskType} from './App';
import EditableSpan from './EditableSpan';
import {Checkbox, IconButton, ListItem} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    changeTaskTitle: (taskId: string, newTitle: string) => void

}

export const Task = memo((props: TaskPropsType) => {

    console.log('Task')

    const taskClasses = props.task.isDone ? 'task-done' : 'task'

    const removeTaskHandler = () => {
        props.removeTask(props.task.id)
    }

    const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.task.id, e.currentTarget.checked)

    const changeTaskTitleHandler = useCallback((title: string) => {
        props.changeTaskTitle(props.task.id, title)
    }, [props.changeTaskTitle, props.task.id])

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
                checked={props.task.isDone}
                onChange={changeTaskStatusHandler}
            />
            <EditableSpan
                title={props.task.title}
                spanClasses={taskClasses}
                changeTitle={changeTaskTitleHandler}
            />
        </ListItem>
    )
})