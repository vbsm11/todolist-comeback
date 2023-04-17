import React, {ChangeEvent, useState} from 'react';

const AddItemForm = () => {

    const [title, setTitle] = useState<string>('')

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const isAddNotPossible: boolean = title.length === 0 || title.length > maxTaskTitleLength || error

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