// Component: TaskCard
// Purpose: Displays one task row and sends users actions to TaskBoard using callback props
//Type: Client Component
//Props: id- unique task id
//       title-task text
//       done- if task is completed 
//       onToggle- callback to switch done status
//       onDelete- callback to delete the task

'use client';

export default function TaskCard({ id, title, done, onToggle, onDelete}) {
    //This is a derived value which is not stored in state because it can be calculated from the done prop on each render
    //making it easy for users to see which tasks are done
    const textClass = done
    ? 'text-gray-400 line-through'
    : 'text-gray-800 font-medium';

    return (
        <div
        className={`flex items-center justify-between rounded-2xl border px-4 py-3 transition ${
            done
            ? 'border-pink-100 bg-pink-50/60'
            : 'border-rose-100 bg-white shadow-sm'
 }`}
 >
    <div className="flex items-center gap-3">
        <button
        //This callback does not change the state because TaskCard does not own task list
        //reports the click so the TaskBoard can update
        onClick={() => onToggle(id)}
        className={`flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs transition ${
            done
            ? 'border-pink-500 bg-pink-500 text-white'
            : 'border-pink-400 text-transparent hover:bg-pink-100'
        }`}
        >
{done && '✓'}
        </button>

        <span className={textClass}>{title}</span>
    </div>

    <button 
    //delete also flows up because TaskBoard owns the array and removes the item
    onClick={() => onDelete(id)}
    className="rounded-full px-3 py-1 text-sm font-semibold text-pink-400 transition hover:bg-pink-100 hover:text-pink-700"
   > 
    Delete
    </button>
 </div>
    );
}