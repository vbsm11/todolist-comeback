import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';
import AddItemForm from './AddItemForm';

type TodoListPropsType = {
    todoListId: string
    title: string,
    tasks: TaskType[]
    filter: FilterValueType
    removeTask: (todoListId: string, taskId: string) => void
    addTask: (todoListId: string, title: string) => void
    changeTaskStatus: (todoListId: string, taskId: string, newIsDone: boolean) => void
    changeTodolistFilter: (todoListId: string, filter: FilterValueType) => void
    removeTodoList: (todoListId: string) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {


    const [error, setError] = useState<boolean>(false)

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {
            props.removeTask(props.todoListId, task.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(props.todoListId, task.id, e.currentTarget.checked)

        return (
            <li>
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={changeTaskStatusHandler}
                />
                <span className={task.isDone ? 'task-done' : 'task'}>{task.title}</span>
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const maxTaskTitleLength = 20
    const recommendedTaskTitleLength = 10

    const isAddTaskNotPossible: boolean = title.length === 0 || title.length > maxTaskTitleLength || error

    const longTitleWarningMessage = title.trim().length > recommendedTaskTitleLength && title.trim().length <= maxTaskTitleLength
        ? <div style={{color: 'hotpink'}}>Title should be shorter</div>
        : ''

    const longTitleErrorMessage = title.trim().length > maxTaskTitleLength
        ? <div style={{color: 'red'}}>Title is too long</div>
        : ''

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

    const addTaskHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addTask(props.todoListId, title)
        } else {
            setError(true)
        }
        setTitle('')
    }




    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && addTaskHandler()
        }

        const removeTodoListHandler = () => {
          props.removeTodoList(props.todoListId)
        }


    return (
        <div className="todolist">
            <button onClick={removeTodoListHandler}>Х</button>
            <h3>{props.title}</h3>

            <AddItemForm/>

            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId,'all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId,'active')}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;