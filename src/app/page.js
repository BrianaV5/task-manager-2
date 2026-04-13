// Component: Homepage
//Server that renders the main page displays the TaskBoard in the middle of the page with styling.
//Type: Server component 
//Props: none
import TaskBoard from '@/components/TaskBoard';

export default function HomePage() {
  //it renders the main layout
  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 p-6">
      <TaskBoard />
    </main>
  );
}