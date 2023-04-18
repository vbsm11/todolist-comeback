import React, {ChangeEvent, FC} from 'react';
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

    const removeTodoListHandler = () => {
        props.removeTodoList(props.todoListId)
    }

    const addTask = (title: string) => {
        props.addTask(props.todoListId, title)
    }

    return (
        <div className="todolist">
            <div className={'titleWithButton'}>
                <span className={'todoTitle'}>{props.title}</span>
                <button onClick={removeTodoListHandler}>Х</button>
            </div>
            <AddItemForm addItem={addTask}/>

            <ul>
                {todoListItems}
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'all')}
                >All
                </button>
                <button
                    className={props.filter === 'active' ? 'btn-active' : ''}
                    onClick={() => props.changeTodolistFilter(props.todoListId, 'active')}
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