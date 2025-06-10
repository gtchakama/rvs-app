'use client';

import { ReactNode, useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TodoProvider } from './contexts/TodoContext';

export default function QueryProvider({ children }: { children: ReactNode }) {
  const queryClientRef = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <TodoProvider>
        {children}
      </TodoProvider>
    </QueryClientProvider>
  );
} 