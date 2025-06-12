import { type Todo } from '../types/todo';
import TodoList from './TodoList';

async function getTodos(): Promise<Todo[]> {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
    next: { revalidate: 60 }, // Revalidate every minute
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch todos');
  }
  
  return response.json();
}

export default async function TodoListServer() {
  try {
    const initialTodos = await getTodos();
    return <TodoList initialTodos={initialTodos} />;
  } catch (e) {
    return <div className="p-6 text-red-600">Failed to load todos. Please try again later.</div>;
  }
} 