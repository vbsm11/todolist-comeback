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

    const onAllClickHandler = useCallback(() => {
      props.changeTodolistFilter(props.todoListId, 'all')
    }, [props.changeTodolistFilter, props.todoListId])

    const onCompletedClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.todoListId, 'completed')
    }, [props.changeTodolistFilter, props.todoListId])

    const onActiveClickHandler = useCallback(() => {
        props.changeTodolistFilter(props.todoListId, 'active')
    }, [props.changeTodolistFilter, props.todoListId])

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
                <ButtonWithMemo
                    title={'All'}
                    color={props.filter === 'all' ? 'secondary' : 'primary'}
                    callBack={onAllClickHandler}
                />
                <ButtonWithMemo
                    title={'Active'}
                    color={props.filter === 'active' ? 'secondary' : 'primary'}
                    callBack={onActiveClickHandler}
                />
                <ButtonWithMemo
                    title={'Completed'}
                    color={props.filter === 'completed' ? 'secondary' : 'primary'}
                    callBack={onCompletedClickHandler}
                />
            </div>
        </div>
    )
})

export default TodoList;

type ButtonWithMemoPropsType = {
    title: string
    color: 'secondary' | 'primary'
    callBack: () => void
}

const ButtonWithMemo = memo((props: ButtonWithMemoPropsType) => {
    return (
        <Button
        size="medium"
        variant="contained"
        disableElevation
        color={props.color}
        onClick={props.callBack}
    >{props.title}
    </Button>
    )
})