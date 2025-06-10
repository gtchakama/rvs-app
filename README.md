# Todo App – Interview Task Solution

## Overview
This project is a Todo application built with Next.js (App Router), TypeScript, and TanStack Query. It demonstrates server data fetching, React Context for state management, and a fully-typed, modular frontend architecture. The app fetches todos from the JSONPlaceholder API and provides a modern, interactive UI for managing them.

---

## Approach

**1. Next.js App Router**
- The project uses the `/app` directory and leverages both server and client components as per Next.js best practices.

**2. Data Fetching**
- Todos are fetched from the [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) API.
- Data fetching is handled on the client using TanStack Query, which provides caching, background updates, and mutation support.
- The fetching logic is encapsulated in a custom React Context (`TodoContext`) for global access.

**3. Context Provider**
- `TodoContext` is a React Context that provides the fetched todos and CRUD operations (create, update, delete) to all child components.
- The context is accessible from any component, no matter how deeply nested, avoiding prop drilling.
- The provider is set up in a top-level client component (`QueryProvider`) that wraps the app.

**4. TypeScript**
- All code is fully typed, including API responses, context values, and component props.
- Types for todos and mutations are defined in `src/app/types/todo.ts`.

**5. UI**
- The UI is built with React components and Tailwind CSS for styling.
- Features include:
  - Todo list with pagination (10 per page)
  - Add, update (toggle complete), and delete todos
  - Quick stats (total, completed, pending)
  - Loading and error states
  - Confirmation dialog for deletes
  - Optimistic UI updates for a responsive experience

**6. Bonus Features**
- All mutations (add, update, delete) are handled via TanStack Query, with automatic cache updates and optimistic UI.
- Loading states are shown for all async actions.
- Error handling is implemented for all network operations.

---

## How the Context Works
- The `TodoContext` uses TanStack Query under the hood to fetch and mutate todos.
- It exposes the todos array, loading states, and mutation functions via a custom hook (`useTodo`).
- Any component can call `const { todos, createTodo, updateTodo, deleteTodo } = useTodo();` to access and manipulate the data.
- The context ensures that all components stay in sync with the latest data, and that UI updates are instant and consistent.

---

## How TanStack Query is Used
- **Fetching:** `useQuery` is used to fetch the todos list and keep it up to date.
- **Mutations:** `useMutation` is used for create, update, and delete operations, with cache updates and optimistic UI.
- **Provider:** The app is wrapped in `QueryClientProvider` to enable TanStack Query features globally.
- **Benefits:** This approach provides automatic caching, background refetching, and a robust, scalable data layer for the app.

---

## File Structure (Key Parts)
- `src/app/contexts/TodoContext.tsx` – Context provider and hook for todos
- `src/app/components/TodoList.tsx` – Main todo list UI
- `src/app/components/TodoItem.tsx` – Single todo item
- `src/app/components/TodoForm.tsx` – Add new todo form
- `src/app/components/PaginationControls.tsx` – Pagination UI
- `src/app/components/DeleteDialog.tsx` – Delete confirmation dialog
- `src/app/components/DashboardLayout.tsx` – Dashboard layout and stats
- `src/app/QueryProvider.tsx` – Top-level provider for context and TanStack Query

---

## Running the App
1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Visit [http://localhost:3000](http://localhost:3000)

---

## Interview Task Requirements Checklist
- [x] Next.js App Router
- [x] Data fetching (JSONPlaceholder API)
- [x] React Context for data
- [x] TypeScript throughout
- [x] UI displays and updates data
- [x] Bonus: Refetch/update, loading, error states

---

## Notes
- The app is fully modular and easy to extend.
- All state and data logic is centralized in context and TanStack Query for maintainability.
- The codebase is ready for production features like authentication, theming, or more complex data models.
