import React from 'react';

interface DeleteDialogProps {
  open: boolean;
  todoTitle?: string;
  onCancel: () => void;
  onConfirm: () => void;
  loading: boolean;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}

export default function DeleteDialog({ open, todoTitle, onCancel, onConfirm, loading, dialogRef }: DeleteDialogProps) {
  return (
    <dialog
      ref={dialogRef}
      open={open}
      className="p-6 rounded-lg shadow-lg backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md w-full mx-auto bg-white"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Delete Todo</h3>
        <p className="text-gray-600">
          Are you sure you want to delete "{todoTitle}"? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </dialog>
  );
} 