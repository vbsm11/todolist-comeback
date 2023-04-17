import React from 'react';

const AddItemForm = () => {
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
                disabled={isAddTaskNotPossible}
            >+
            </button>
            {longTitleWarningMessage}
            {longTitleErrorMessage}
            {errorMessage}
        </div>
    );
};

export default AddItemForm;