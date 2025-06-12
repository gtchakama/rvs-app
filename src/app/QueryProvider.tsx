'use client';

import { ReactNode, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoProvider } from './contexts/TodoContext';
import { type Todo } from './types/todo';

interface QueryProviderProps {
  children: ReactNode;
  initialTodos?: Todo[];
}

export default function QueryProvider({ children, initialTodos }: QueryProviderProps) {
  const queryClientRef = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <TodoProvider initialTodos={initialTodos}>
        {children}
      </TodoProvider>
    </QueryClientProvider>
  );
} 