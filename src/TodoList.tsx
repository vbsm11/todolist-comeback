import React, {FC, useRef} from 'react';
import {FilterValueType, TaskType} from './App';

type TodoListPropsType = {
    title: string,
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeTodolistFilter: (filter: FilterValueType) => void
    addTask: (title: string) => void
}

const TodoList: FC<TodoListPropsType> = (props) => {

    const addTaskInputRef = useRef<any>(null)

    const todoListItems: Array<JSX.Element> = props.tasks.map((task: TaskType) =>
        <li>
            <input type="checkbox" checked={task.isDone}/>
            <span>{task.title}</span>
            <button onClick={() => {props.removeTask(task.id)}}>x</button>
        </li>
    )

    const addTaskHandler = () => {
        props.addTask(addTaskInputRef.current.value)
        addTaskInputRef.current.value = ''
    }

    return (
        <div className="todolist">
            <h3>{props.title}</h3>
            <div>
                <input ref={addTaskInputRef}/>
                <button onClick={addTaskHandler}>+</button>
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