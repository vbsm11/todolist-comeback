import {tasksReducer} from './tasks-reducer';
import {TaskStateType, TodoListType} from '../App';
import {AddTodoListAC, todoListsReducer} from './todolists-reducer';

const startTasksState: TaskStateType = {}
const startTodolistsState: Array<TodoListType> = []

test('ids should be equals', () => {

    const action = AddTodoListAC('new todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.id)
    expect(idFromTodolists).toBe(action.id)
})