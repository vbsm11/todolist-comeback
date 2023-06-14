import React, {ChangeEvent, KeyboardEvent, memo, useState} from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton, TextField} from '@mui/material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = memo((props: AddItemFormPropsType) => {

    console.log('AddItemForm')

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(false)

    const maxTaskTitleLength = 20
    const recommendedTaskTitleLength = 10

    const isAddNotPossible: boolean = !title.length || title.length > maxTaskTitleLength || error

    const longTitleWarningMessage = title.length > recommendedTaskTitleLength && title.length <= maxTaskTitleLength
        ? <span style={{color: 'hotpink'}}>Title should be shorter</span>
        : ''

    const longTitleErrorMessage = title.length > maxTaskTitleLength
        ? <span style={{color: 'red'}}>Title is too long</span>
        : ''

    const errorMessage = error && 'Title is required'

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
            <TextField
                variant={'outlined'}
                size={'small'}
                placeholder={'Enter title please'}
                error={error}
                helperText={errorMessage || longTitleWarningMessage || longTitleErrorMessage}
                value={title}
                onChange={setLocalTitleHandler}
                onKeyDown={onKeyDownAddItemHandler}
            />
            <IconButton
                size={'small'}
                onClick={addItemHandler}
                disabled={isAddNotPossible}
            >
                <AddCircleIcon/>
            </IconButton>
        </div>
    );
})
