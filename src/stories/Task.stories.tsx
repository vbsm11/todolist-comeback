import type {Meta, StoryObj} from '@storybook/react';
import {Task, TaskPropsType} from '../Task';
import {action} from '@storybook/addon-actions';
import {FC, useState} from 'react';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    args: {
        task: {id: 'sds', title: 'js', isDone: true},
        removeTask: action('removeTask'),
        changeTaskStatus: action('changeTaskStatus'),
        changeTaskTitle: action('changeTaskTitle')
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const TaskIsDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
};

export const TaskIsNotDoneStory: Story = {
    // More on args: https://storybook.js.org/docs/react/writing-stories/args
    args: {
        task: {id: 'sds', title: 'js', isDone: false}
    }
};

const TaskWithHook: FC<TaskPropsType> = (args) => {
    const [task, setTask] = useState(args.task)

    const changeTaskStatus = (taskId: string, newIsDone: boolean) => {
      setTask({...task, isDone: newIsDone})
    }

    const changeTaskTitle = (taskId: string, newTitle: string) => {
        setTask({...task, title: newTitle})
    }

    return <Task task={args.task} removeTask={args.removeTask} changeTaskStatus={changeTaskStatus} changeTaskTitle={changeTaskTitle}/>
}

export const TaskWithHookStory: Story = {
    render: (args => <TaskWithHook task={args.task} removeTask={args.removeTask} changeTaskStatus={args.changeTaskStatus} changeTaskTitle={args.changeTaskTitle} />)
}