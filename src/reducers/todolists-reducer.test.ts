import {v1} from 'uuid';
import {TodoListType} from '../App';
import {todoListsReducer} from './todolists-reducer';

test('correct todolist should be removed', () => {
    const todoListId1 = v1();
    const todoListId2 = v1()

    const startState: TodoListType[] = [
        {id: todoListId1, title: 'What to learn', filter: 'all'},
        {id: todoListId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todoListsReducer(startState, {type: 'REMOVE-TODOLIST', id: todoListId1})

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todoListId2)
})