import React, {ChangeEvent, FC} from 'react';
import {TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button, Checkbox, IconButton, List, ListItem} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC} from './state/tasks-reducer';
import {ChangeTodoListFilterAC, ChangeTodoListTitleAC, RemoveTodoListAC} from './state/todolists-reducer';
import {FilterValueType, TodoListType} from './AppWithRedux';

type TodoListWithReduxPropsType = {
    todoList: TodoListType
}

const TodoListWithRedux: FC<TodoListWithReduxPropsType> = ({todoList}) => {

    const {id, title, filter} = todoList

    const tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[id])

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

    const tasksForRender = getFilteredTasks(tasks, filter)

    const dispatch = useDispatch()

    const todoListItems: Array<JSX.Element> = tasksForRender.map((task: TaskType) => {

        const taskClasses = task.isDone ? 'task-done' : 'task'

        const removeTaskHandler = () => {
            dispatch(RemoveTaskAC(id, task.id))
        }

        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(ChangeTaskStatusAC(id, task.id, e.currentTarget.checked))
        }

        const changeTaskTitleHandler = (title: string) => {
            dispatch(ChangeTaskTitleAC(id, task.id, title))
        }

        return (
            <ListItem
                divider
                key={task.id}
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

    const addTask = (title: string) => {
        dispatch(AddTaskAC(id, title))
    }

    const removeTodoListHandler = () => {
        dispatch(RemoveTodoListAC(id))
    }

    const changeTodolistTitleHandler = (title: string) => {
        dispatch(ChangeTodoListTitleAC(id, title))
    }

    const changeTodolistFilterHandler = (filter: FilterValueType) => {
       dispatch(ChangeTodoListFilterAC(id, filter))
    }



    return (
        <div className="todolist">
            <div className={'titleWithButton'}>
                <EditableSpan title={title} spanClasses="todoTitle" changeTitle={changeTodolistTitleHandler}/>
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
                    color={filter === 'all' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilterHandler('all')}
                >All
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    disableElevation
                    color={filter === 'active' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilterHandler('active')}
                >Active
                </Button>
                <Button
                    size="medium"
                    variant="contained"
                    disableElevation
                    color={filter === 'completed' ? 'secondary' : 'primary'}
                    onClick={() => changeTodolistFilterHandler('completed')}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoListWithRedux;