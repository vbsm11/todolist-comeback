import {TaskStateType} from '../App';
import {v1} from 'uuid';
import {AddTodoListAT, RemoveTodoListAT} from './todolists-reducer';

type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    todoListId: string,
    taskId: string
}

type AddTaskAT = {
    type: 'ADD-TASK'
    todoListId: string
    title: string
}

type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    todoListId: string
    taskId: string
    newIsDone: boolean
}

type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    todoListId: string
    taskId: string
    newTitle: string
}

export type TasksActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | RemoveTodoListAT | AddTodoListAT

const initialState: TaskStateType = {}


export const tasksReducer = (tasks: TaskStateType = initialState, action: TasksActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...tasks,
                [action.todoListId]: tasks[action.todoListId].filter(t => t.id !== action.taskId)
            }
        case 'ADD-TASK':
            return {
                ...tasks,
                [action.todoListId]: [
                    {id: v1(), title: action.title, isDone: false},
                    ...tasks[action.todoListId]
                ]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...tasks,
                [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.taskId? {...t, isDone: action.newIsDone}: t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...tasks, [action.todoListId]: tasks[action.todoListId].map(t => t.id === action.taskId? {...t, title: action.newTitle}: t)
            }
        case 'REMOVE-TODOLIST':
            const copyTasks = {...tasks};
            delete copyTasks[action.id];
            return copyTasks
        case 'ADD-TODOLIST':
            return {
                ...tasks,
                [action.id]: []
            }
        default:
            return tasks
    }
}

export const RemoveTaskAC = (todoListId: string, taskId: string): RemoveTaskAT => {
  return {
      type: 'REMOVE-TASK',
      todoListId,
      taskId
  }
}

export const AddTaskAC = (todoListId: string, title: string): AddTaskAT => {
    return {
        type: 'ADD-TASK',
        todoListId,
        title
    }
}

export const ChangeTaskStatusAC = (todoListId: string, taskId: string, newIsDone: boolean): ChangeTaskStatusAT => {
    return {
        type: 'CHANGE-TASK-STATUS',
        todoListId,
        taskId,
        newIsDone
    }
}

export const ChangeTaskTitleAC = (todoListId: string, taskId: string, newTitle: string): ChangeTaskTitleAT => {
    return {
        type: 'CHANGE-TASK-TITLE',
        todoListId,
        taskId,
        newTitle
    }
}