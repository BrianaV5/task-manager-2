// Component: TaskStats
// Purpose:  Shows live task totals and gives the user a way to clear all their completed tasks at once.
// Type: Client Component
// Props: total-number of all tasks
//        active- number of incomplete tasks 
//        completed- number of finsihed tasks
//        onClearDone- callback to remove completed 
'use client';

export default function TaskStats({ total, active, completed, onClearDone }) {
  return (
    <div className="flex  flex-col gap-3 rounded-2xl bg-gradient-to-r from-pink-100 to-rose-100 p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-3 text-sm text-gray-700">
        {/* These values are computed in Taskboard from the task array. They are passed down as props because TaskStats only displays them and doesn't own the task data */}
        <span className="rounded-full bg-white px-3 py-1">
          Total: <strong className="text-pink-600">{total}</strong>
        </span>

        <span className="rounded-full bg-white px-3 py-1">
          Active: <strong className="text-pink-600">{active}</strong>
        </span>

        <span className="rounded-full bg-white px-3 py-1">
          Done: <strong className="text-pink-600">{completed}</strong>
        </span>
      </div>

      {/* This button only appears when completed is greater than 0 */}
      {completed > 0 && (
        <button
          onClick={onClearDone}
          className="text-sm font-semibold text-pink-600 transition hover:text-pink-800"
          >
          Clear Completed
        </button>
      )}
    </div>
  );
}