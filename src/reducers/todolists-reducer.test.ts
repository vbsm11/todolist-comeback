import {v1} from 'uuid';
import {TodoListType} from '../App';
import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodoListTitleAC,
    RemoveTodoListAC,
    todoListsReducer
} from './todolists-reducer';

let todoListId1: string
let todoListId2: string

let startState: TodoListType[]

beforeEach(() => {
    todoListId1 = v1()
    todoListId2 = v1()

    startState = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]
})

test('correct todolist should be removed', () => {


    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('todolist should be added', () => {

    const newTodoListTitle = 'New TodoList';

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should be renamed', () => {

    const newTodoListTitle = 'New TodoList';

    const endState = todoListsReducer(startState, ChangeTodoListTitleAC(todoListId2, newTodoListTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should be changed filter', () => {

    const newTodoListFilter = 'completed';

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC(todoListId1, newTodoListFilter))

    expect(endState[0].filter).toBe(newTodoListFilter)
    expect(endState[1].filter).toBe('all')
})