'use client';

import { useState, useRef } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { type Todo } from '../types/todo';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';
import PaginationControls from './PaginationControls';
import DeleteDialog from './DeleteDialog';

const ITEMS_PER_PAGE = 10;

function errorToString(err: unknown): string {
  if (!err) return '';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  return String(err);
}

interface TodoListProps {
  initialTodos: Todo[];
}

export default function TodoList({ initialTodos }: TodoListProps) {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);
  const [updatingTodoId, setUpdatingTodoId] = useState<number | null>(null);
  const deleteDialogRef = useRef<HTMLDialogElement>(null);

  const {
    todos,
    isLoading,
    error,
    createTodo,
    updateTodo,
    deleteTodo,
    isCreating,
    isUpdating,
    isDeleting,
    createError,
    updateError,
    deleteError,
    refetch,
  } = useTodo(initialTodos);

  function getAllErrors() {
    const messages = [];
    if (errorToString(error)) messages.push(`Failed to fetch todos: ${errorToString(error)}`);
    if (errorToString(createError)) messages.push(`Failed to create todo: ${errorToString(createError)}`);
    if (errorToString(updateError)) messages.push(`Failed to update todo: ${errorToString(updateError)}`);
    if (errorToString(deleteError)) messages.push(`Failed to delete todo: ${errorToString(deleteError)}`);
    return messages.join('\n');
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      try {
        await createTodo({
          title: newTodoTitle,
          completed: false,
          userId: 1,
        });
        setNewTodoTitle('');
        setCurrentPage(1);
      } catch (error) {
        console.error('Failed to create todo:', error);
      }
    }
  };

  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
    deleteDialogRef.current?.showModal();
  };

  const handleDeleteConfirm = async () => {
    if (todoToDelete) {
      try {
        await deleteTodo(todoToDelete.id);
        deleteDialogRef.current?.close();
        setTodoToDelete(null);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  const handleDeleteCancel = () => {
    deleteDialogRef.current?.close();
    setTodoToDelete(null);
  };

  // Calculate pagination
  const totalPages = Math.ceil(todos.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTodos = todos.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Error Banner and Refetch Button */}
      {getAllErrors() && (
        <div className="mb-4 p-4 bg-red-100 border border-red-300 text-red-700 rounded flex items-center justify-between">
          <div style={{ whiteSpace: 'pre-line' }}>{getAllErrors()}</div>
          <button
            onClick={() => refetch()}
            disabled={isLoading}
            className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Refetching...' : 'Refetch'}
          </button>
        </div>
      )}

      <TodoForm
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        onSubmit={handleSubmit}
        loading={isCreating}
      />

      <div className="space-y-4">
        {currentTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={async (id, completed) => {
              setUpdatingTodoId(id);
              try {
                await updateTodo(id, { completed });
              } catch (error) {
                console.error('Failed to update todo:', error);
              } finally {
                setUpdatingTodoId(null);
              }
            }}
            onDelete={handleDeleteClick}
            updating={isUpdating}
            updatingTodoId={updatingTodoId}
          />
        ))}
      </div>

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={todos.length}
      />

      <DeleteDialog
        open={!!todoToDelete}
        todoTitle={todoToDelete?.title}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        loading={isDeleting}
        dialogRef={deleteDialogRef}
      />
    </div>
  );
} 