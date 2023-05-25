import {v1} from 'uuid';
import {TaskStateType} from '../App';
import {AddTaskAC, ChangeTaskStatusAC, ChangeTaskTitleAC, RemoveTaskAC, tasksReducer} from './tasks-reducer';
import {RemoveTodoListAC} from './todolists-reducer';

test('correct task should be removed', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, RemoveTaskAC(todoListId_1, startState[todoListId_1][0].id))

    expect(endState[todoListId_1].length).toBe(3)
    expect(endState[todoListId_1][0].title).toBe('JS')
})

test('task should be added', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, AddTaskAC(todoListId_2, 'Water'))

    expect(endState[todoListId_2].length).toBe(4)
    expect(endState[todoListId_2][0].title).toBe('Water')
})

test('correct task should change status', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, ChangeTaskStatusAC(todoListId_1, startState[todoListId_1][2].id, !startState[todoListId_1][2].isDone))

    expect(endState[todoListId_1][2].isDone).toBe(true)
})

test('correct task should change title', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, ChangeTaskTitleAC(todoListId_2, startState[todoListId_2][1].id, 'Fish'))

    expect(endState[todoListId_2][1].title).toBe('Fish')
})

test('tasks for current todolist should be removed', () => {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const startState: TaskStateType = {
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

    const endState = tasksReducer(startState, RemoveTodoListAC(todoListId_2))

    expect(endState[todoListId_2]).toBe(undefined)
})