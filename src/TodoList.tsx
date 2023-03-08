import React, {FC} from 'react';
import {TaskType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) =>
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {alert(task.id)}}>x</button>
        </li>
    )

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {todoListItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};

export default TodoList;