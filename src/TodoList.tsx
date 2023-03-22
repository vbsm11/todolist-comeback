import React, {ChangeEvent, FC, useState, KeyboardEvent} from 'react';
import {FilterValueType, TaskType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
    changeTaskStatus: (taskId: string) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) => {
        const removeTaskHandler = () => {props.removeTask(task.id)}
        const changeTaskStatusHandler = () => {
            props.changeTaskStatus(task.id)
        }
        return (
            <li>
                <input type="checkbox" checked={task.isDone} onChange={changeTaskStatusHandler}/>
                <span>{task.title}</span>
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
                >+</button>
                {longTitleWarningMessage}
                {longTitleErrorMessage}
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button onClick={() => props.changeTodolistFilter('all')}>All</button>
                <button onClick={() => props.changeTodolistFilter('active')}>Active</button>
                <button onClick={() => props.changeTodolistFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;