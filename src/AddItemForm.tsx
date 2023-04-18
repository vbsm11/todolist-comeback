import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

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

    const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTitle(e.currentTarget.value)
    }

    const addItemHandler = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    const onKeyDownAddItemHandler = isAddNotPossible
        ? undefined
        : (e: KeyboardEvent<HTMLInputElement>) => {
            e.key === 'Enter' && addItemHandler()
        }

    return (
        <div>
            <input
                placeholder={'Enter title'}
                className={error? 'input-error' : ''}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddItemHandler}
            />
            <button
                onClick={addItemHandler}
                disabled={isAddNotPossible}
            >+
            </button>
            {longTitleWarningMessage}
            {longTitleErrorMessage}
            {errorMessage}
        </div>
    );
}
