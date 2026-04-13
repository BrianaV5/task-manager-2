//Component: TaskBoard
//Purpose: Main client component that owns all of the task data, filer state, and updates the logic
//Type: Client Component
//Props: None

'use client';

import { useState, useEffect } from 'react';
import TaskStats from './TaskStats';
import AddTaskForm from './AddTaskForm';
import TaskList from './TaskList';

export default function TaskBoard() {
    // This state stores the full task list because multiple child compnents to have access in order to change it
    //Keeping it here lets component be the single source for the app
    const [tasks, setTasks] = useState(() => {
        //Next.js can render the server first
        //localStorage only is in the browswer
        //prevents crash during render
        if (typeof window === 'undefined') return [];
        //Read saved tasks only once during the first render so when you refresh it doesnt get rid of task list
        const saved = localStorage.getItem('tasks');
        //if saved data exists convert JSON string back into a Javascript array.
        //This is needed to not start with a empty list
        return saved ? JSON.parse(saved) : [];
    });
    //Filter is seperate state because it chnages seperately from the tasks themselves
    //User can switch views without altering any task data
    const [filter, setFilter] = useState('all');

    useEffect (() => {
        //This synchronizes React state to localStorage so tasks stay during a browser refresh
        //dependency array only includes tasks 
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    //These counts are from tasks so they can't be saved separately
    //avoids duplicate data getting out of sync
    const completedCount = tasks.filter((task) => task.done).length;
    const activeCount = tasks.length - completedCount;

    //visible is derived not stored
    const visible = 
    filter === 'done'
    ? tasks.filter((task) => task.done)
    :filter === 'active'
    ? tasks.filter((task) => !task.done)
    :tasks;

    function handleToggle(id) {
        //map() returns a new array which is needed becayse React detet=cts state changes by reference
        setTasks(
            tasks.map((task) =>
            task.id === id ? {...task, done: !task.done } : task
        )
    );
    }
    function handleDelete(id) {
        //filter() creates a new array without matching task
        setTasks(tasks.filter((task) => task.id !== id));
    }
    function handleAdd(title) {
        //spread creates a new array and appends the new task
        //crypto.randomUUID() gives each task a stable unique id so React can track items accurately
        setTasks([
            ...tasks,
            {
                id: crypto.randomUUID(),
                title,
                done: false,
            },
        ]);
    }

    function handleClearDone() {
        //this removes all completed tasks in a single action by keeping onlytasks whose done value is false.
        setTasks(tasks.filter((task)=> !task.done));
    }
    return (
        <section className="mx-auto max-w-2xl">
            <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-[0_20px_60px_rgba(244,113,182,0.17)]">
                <div className="bg-gradient-to-r from-pink-500 via-rose-400 px-6 py-7">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Task Manager
                    </h1>
                <p className="mt-2 text-sm text-pink-50">
                    Your daily game plan
                </p>
            </div>
            <div className="space-y-5 p-5 sm:p-6">
                <TaskStats
                total={tasks.length}
                active={activeCount}
                completed={completedCount}
                onClearDone={handleClearDone}
                />
                <AddTaskForm onAdd={handleAdd} />
                <div className="flex flex-wrap gap-2">
                    {['all','active','done'].map((currentFilter) => (
                        <button
                        key={currentFilter}
                        //This callback sends the chosen filter into state so the task list updates
                        onClick={() => setFilter(currentFilter)}
                        className={`rounded-full px-4 py-2 text-sm font-semibold capitalize transition ${
                            filter === currentFilter
                            ? 'bg-pink-500 text-white shadow-md'
                            : 'bg-pink-100 text-pink-700 hover:bg-pink-200'
                        }`}
                        >
                            {currentFilter}
                        </button>
                    ))}

                </div>

                <TaskList 
                tasks={visible}
                onToggle={handleToggle}
                onDelete={handleDelete}
                />
            </div>
            </div>
        </section>

    );
}
           
