import type {Meta, StoryObj} from '@storybook/react';
import {AddItemForm, AddItemFormPropsType} from '../AddItemForm';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AddItemForm> = {
    title: 'TODOLISTS/AddItemForm',
    component: AddItemForm,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        addItem: {
            description: 'Button clicked inside form',
            // action: 'clicked'
        }
    }
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const AddItemFormStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        addItem: action('Button clicked inside form')
    }
};

export const AddItemFormError: FC<AddItemFormPropsType> = (args) => {

    const [title, setTitle] = useState<string>('')
    const [error, setError] = useState<boolean>(true)

    const maxTaskTitleLength = 20
    const recommendedTaskTitleLength = 10

    const isAddNotPossible: boolean = !title.length || title.length > maxTaskTitleLength || error

    const longTitleWarningMessage = title.length > recommendedTaskTitleLength && title.length <= maxTaskTitleLength
        ? <span style={{color: 'hotpink'}}>Title should be shorter</span> : ''

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
            args.addItem(title)
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
    )
}

export const AddItemErrorStory: Story = {
    render: args => <AddItemFormError addItem={args.addItem}/>
}