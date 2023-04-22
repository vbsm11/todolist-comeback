import React, {ChangeEvent, FC} from 'react';
import {FilterValueType, TaskType} from './App';
import {AddItemForm} from './AddItemForm';
import EditableSpan from './EditableSpan';
import {Button} from '@mui/material';

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

const TodoList: FC<TodoListPropsType> = (props) => {

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
            <li>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                />
                <EditableSpan
                    title={task.title}
                    spanClasses={taskClasses}
                    changeTitle={changeTaskTitleHandler}
                />
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const changeTodolistTitleHandler = (title: string) => {
      props.changeTodolistTitle(props.todoListId, title)
    }


    return (
        <div className="todolist">
            <div className={'titleWithButton'}>
                <EditableSpan title={props.title} spanClasses={'todoTitle'} changeTitle={changeTodolistTitleHandler}/>
                <button onClick={removeTodoListHandler}>Х</button>
            </div>
            <AddItemForm addItem={addTask}/>

            <ul>
                {todoListItems}
            </ul>
            <div>
                <Button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'all')}
                >All
                </Button>
                <Button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'active')}
                >Active
                </Button>
                <Button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'completed')}
                >Completed
                </Button>
            </div>
        </div>
    );
};

export default TodoList;