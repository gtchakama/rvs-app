import DashboardLayout from './components/DashboardLayout';
import TodoListServer from './components/TodoListServer';

export default function Home() {
  return (
    <DashboardLayout>
      <TodoListServer />
    </DashboardLayout>
  );
}
