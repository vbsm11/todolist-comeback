import React, {ChangeEvent, FC, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    title: string
    spanClasses?: string
    inputClasses?: string
    changeTitle: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = (props) => {

    const [editMode, setEditMode] = useState<boolean>(false)

    const [localTitle, setLocalTitle] = useState<string>(props.title)

    const changeLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLocalTitle(e.currentTarget.value)
    }

    const onEditMode = () => {
        setEditMode(true)
    }

    const offEditMode = () => {
        setEditMode(false)
        props.changeTitle(localTitle)
    }

    return (
        editMode
            ? <TextField
                variant={'standard'}
                size={'small'}
                autoFocus
                value={localTitle}
                onChange={changeLocalTitleHandler}
                onBlur={offEditMode}
            />
            : <span
                onDoubleClick={onEditMode}
                className={props.spanClasses}
            >
                {props.title}
        </span>
    );
};

export default EditableSpan;