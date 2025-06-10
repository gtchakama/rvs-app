import React from 'react';
import { type Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number, completed: boolean) => void;
  onDelete: (todo: Todo) => void;
  updating: boolean;
  updatingTodoId: number | null;
}

export default function TodoItem({ todo, onToggle, onDelete, updating, updatingTodoId }: TodoItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg relative">
      {updating && updatingTodoId === todo.id && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex items-center gap-2 text-blue-600">
            <div className="animate-spin h-5 w-5 border-3 border-blue-600 border-t-transparent rounded-full"></div>
            <span className="text-sm font-medium">Updating...</span>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id, !todo.completed)}
          disabled={updating && updatingTodoId === todo.id}
          className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 disabled:opacity-50"
        />
        <span
          className={`text-gray-900 ${todo.completed ? 'line-through text-gray-500' : ''}`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo)}
        className="text-red-600 hover:text-red-700 focus:outline-none"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
      </button>
    </div>
  );
} 