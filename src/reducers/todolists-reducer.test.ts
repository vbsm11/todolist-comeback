import {v1} from 'uuid';
import {TodoListType} from '../App';
import {ActionType, AddTodoListAC, RemoveTodoListAC, todoListsReducer} from './todolists-reducer';

test('correct todolist should be removed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, RemoveTodoListAC(todoListId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})

test('todolist should be added', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const newTodoListTitle = 'New TodoList';

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, AddTodoListAC(newTodoListTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodoListTitle)
})

test('correct todolist should be renamed', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const newTodoListTitle = 'New TodoList';

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-TITLE',
        id: todoListId2,
        title: newTodoListTitle
    }

    const endState = todoListsReducer(startState, action)

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodoListTitle)
})

test('correct todolist should be changed filter', () => {
    const todoListId1 = v1()
    const todoListId2 = v1()

    const newTodoListFilter = 'completed';

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const action: ActionType = {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todoListId1,
        filter: newTodoListFilter
    }

    const endState = todoListsReducer(startState, action)

    expect(endState[0].filter).toBe(newTodoListFilter)
    expect(endState[1].filter).toBe('all')
})