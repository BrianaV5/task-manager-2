// Component: TaskList
// Purpose: Renders the current visible task collection
// Type: Client Component
// Props: tasks- filtered array of tasks to display
//        onToggle- callback passed down to TaskCard
//        onDelete- callback passed down to Taskcard
'use client';
import TaskCard from './TaskCard';

export default function TaskList({ tasks, onToggle, onDelete }) {
  // This condtional render shows a plain message when there are no tasks in the current filtered view
  if (tasks.length === 0) {
    return (
        <div className="rounded-2xl border border-dashed border-pink-200 bg-pink-50 px-4 py-8 text-center text-sm text-pink-500">
            No tasks to show right now.
        </div>
    );
  }

  return (
    <ul className="space-y-3">
        {tasks.map((task) => (
         //key helps React indetify which item is which through updates
         //A stable unique id is better than an array index because list order and item count can change after being deleted and filters
         <li key={task.id}>
            <TaskCard
            id={task.id}
            title={task.title}
            done={task.done}
            onToggle={onToggle}
            onDelete={onDelete}
            />
         </li>
        ))}
    </ul>
  );
}