import {v1} from 'uuid';
import {TaskStateType} from '../App';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reducer';
import {AddTodoListAC, RemoveTodoListAC} from './todolists-reducer';


let todoListId_1: string
let todoListId_2: string

let startState: TaskStateType

beforeEach(() => {
    todoListId_1 = v1()
    todoListId_2 = v1()

    startState = {
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false}
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Bread', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Milk', isDone: true},
        ]
    }
})

test('correct task should be removed', () => {

    const endState = tasksReducer(startState, RemoveTaskAC(todoListId_1, startState[todoListId_1][0].id))

    expect(endState[todoListId_1].length).toBe(3)
    expect(endState[todoListId_1][0].title).toBe('JS')
})

test('task should be added', () => {

    const endState = tasksReducer(startState, AddTaskAC(todoListId_2, 'Water'))

    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_2][0].title).toBe('Water')
})

test('correct task should change status', () => {

    const endState = tasksReducer(startState, ChangeTaskStatusAC(todoListId_1, startState[todoListId_1][2].id, !startState[todoListId_1][2].isDone))

    expect(endState[todoListId_1][2].title).toBe('React')
    expect(endState[todoListId_1][2].isDone).toBe(true)
})

test('correct task should change title', () => {

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todoListId_2, startState[todoListId_2][1].id, 'Fish'))

    expect(endState[todoListId_2][1].title).toBe('Fish')
    expect(endState[todoListId_1][1].title).toBe('JS')
})

test('tasks for current todolist should be removed', () => {

    const endState = tasksReducer(startState, RemoveTodoListAC(todoListId_2))
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState[todoListId_2]).toBe(undefined)
})

test('array for task for new todolist should be added', () => {

    const endState = tasksReducer(startState, AddTodoListAC('What to eat'))
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != todoListId_1 && k != todoListId_2)
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})