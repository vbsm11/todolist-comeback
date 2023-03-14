import React, {FC, useState} from 'react';
import {FilterValueType, TaskType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {
    const [title, setTitle] = useState<string>('')

      const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) =>
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {props.removeTask(task.id)}}>x</button>
        </li>
    )

    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button
                    onClick={addTaskHandler}
                    disabled={title.length === 0}
                >+</button>
                {title.length > 10 && title.length <=20? <div style={{color: 'hotpink'}}>Title should be shorter</div> : ''}
                {title.length > 20? <div style={{color: 'red'}}>Title is too long</div> : ''}
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