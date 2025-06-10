'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DashboardLayout from './components/DashboardLayout';
import TodoList from './components/TodoList';

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <DashboardLayout>
        <TodoList />
      </DashboardLayout>
    </QueryClientProvider>
  );
}
