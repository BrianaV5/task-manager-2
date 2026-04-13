//Component: AddTaskForm
//Purpose: A form that lets the user type new taks and submit it to the parent.
//Type: Client Component 
//Props: onAdd a callback from Taskboard used to move the new task title up.

'use client';

import { useState } from 'react';

export default function addTaskForm({ onAdd}) {
    //This state stores the current input text 
    //Its here because it only this form needs to know the live
    const [title, setTitle] = useState('');

function handleSubmit(e) {
    //preventDefault stops the browser from doing a full page reload when the form is submitted.
    //In React you want to use Javascript for the submit so the app stays efficent and interactive
    e.preventDefault();

    //trim() removes spaces from the beginning to the end so a user doesn't submit a task that appears blank 
    if (!title.trim()) return;

    //The parent component owns the task list so this form sned the new title up through the callback prop
    onAdd(title.trim());

    //After succesful submit reset the input so the user can type the next task right away
    setTitle('');

}

return (
    //using onSubmit is more efficent than using only button onClick because supports using Enter
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
        // Controlled input
        //Visible value comes from React state and stays in sync
        value={title}
        //onChange updates state each keystroke making sure Reacts always is up to date with the latest input value
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="flex-1 rounded-2x1 border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-pink-400 focus:bg-white"
        />
        <button
        type="submit"
        className="rounded-2xl bg-pink-500 px-5 py-3 text-sm font-semibold text-white  transition hover:bg-pink-600"
        >
            Add Task
        </button>
    </form>
);
}

