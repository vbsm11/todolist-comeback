import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    filter: FilterValueType
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean) => void
    changeTodolistFilter: (filter: FilterValueType) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {
            props.removeTask(task.id)
        }
        const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

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

    const isAddTaskNotPossible: boolean = title.length === 0 || title.length > maxTaskTitleLength

    const longTitleWarningMessage = title.length > recommendedTaskTitleLength && title.length <= maxTaskTitleLength
        ? <div style={{color: 'hotpink'}}>Title should be shorter</div>
        : ''

    const longTitleErrorMessage = title.length > maxTaskTitleLength
        ? <div style={{color: 'red'}}>Title is too long</div>
        : ''

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }


    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyDownAddTaskHandler = isAddTaskNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && addTaskHandler()
        }


    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder={'Enter task title'}
                    value={title}
                    onChange={setLocalTitleHandler}
                    onKeyDown={onKeyDownAddTaskHandler}
                />
                <button
                    onClick={addTaskHandler}
                    disabled={isAddTaskNotPossible}
                >+
                </button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter('all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter('active')}
                >Active
                </button>
                <button
                    className={props.filter === 'completed' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter('completed')}
                >Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;