import React, {ChangeEvent, useState} from 'react';

const AddItemForm = () => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const maxTaskTitleLength = 20
    const recommendedTaskTitleLength = 10

    const isAddNotPossible: boolean = !title.length || title.length > maxTaskTitleLength || error

    const longTitleWarningMessage = title.trim().length > recommendedTaskTitleLength && title.trim().length <= maxTaskTitleLength
        ? <div style={{color: 'hotpink'}}>Title should be shorter</div>
        : ''

    const longTitleErrorMessage = title.trim().length > maxTaskTitleLength
        ? <div style={{color: 'red'}}>Title is too long</div>
        : ''

    const errorMessage = error && <div style={{color: 'red'}}>Title is required</div>

    return (
        <div>
            <input
                placeholder={'Enter task title'}
                className={error? 'input-error' : ''}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddTaskHandler}
            />
            <button
                onClick={addTaskHandler}
                disabled={isAddNotPossible}
            >+
            </button>
            {longTitleWarningMessage}
            {longTitleErrorMessage}
            {errorMessage}
        </div>
    );
};

export default AddItemForm;