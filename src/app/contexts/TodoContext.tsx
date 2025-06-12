'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { type Todo, type CreateTodoInput, type UpdateTodoInput } from '../types/todo';

const API_URL = 'https://jsonplaceholder.typicode.com/todos';

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: unknown;
  createTodo: (input: CreateTodoInput) => Promise<Todo>;
  updateTodo: (id: number, input: UpdateTodoInput) => Promise<Todo>;
  deleteTodo: (id: number) => Promise<void>;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  createError: unknown;
  updateError: unknown;
  deleteError: unknown;
  refetch: () => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: ReactNode;
  initialTodos?: Todo[];
}

export function TodoProvider({ children, initialTodos }: TodoProviderProps) {
  const queryClient = useQueryClient();

  // Fetch todos
  const { data: todos = initialTodos || [], isLoading, error, refetch } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    initialData: initialTodos,
  });

  // Create todo mutation
  const createMutation = useMutation({
    mutationFn: async (newTodo: CreateTodoInput) => {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(newTodo),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) => [newTodo, ...oldTodos]);
    },
  });

  // Update todo mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: UpdateTodoInput & { id: number }) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) =>
        oldTodos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
      );
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    },
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Todo[]>(['todos'], (oldTodos = []) =>
        oldTodos.filter((todo) => todo.id !== deletedId)
      );
    },
  });

  const value = {
    todos,
    isLoading,
    error,
    createTodo: createMutation.mutateAsync,
    updateTodo: (id: number, input: UpdateTodoInput) => updateMutation.mutateAsync({ id, ...input }),
    deleteTodo: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    refetch,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
} 