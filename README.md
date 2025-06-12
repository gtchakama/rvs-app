# Todo App

## Overview
This application provides a seamless experience for managing todos with real-time updates, optimistic UI, and a beautiful, responsive interface.

## Features

### Core Functionality
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Pagination (10 items per page)
- Real-time updates with optimistic UI
- Quick stats dashboard (total, completed, pending todos)

### User Experience
- Modern, responsive design
- Smooth animations and transitions
- Loading states for all operations
- Error handling with user-friendly messages
- Delete confirmation dialogs
- Instant feedback on all actions

### Technical Highlights
- Server-side rendering
- Type-safe development with TypeScript
- Efficient data management with TanStack Query
- Responsive design with Tailwind CSS
- Modular component architecture

## Getting Started

### Prerequisites
- Node.js 18.x or later
- npm or yarn package manager

### Installation
1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
src/
├── app/
│   ├── components/         # UI Components
│   │   ├── TodoList.tsx   # Main todo list
│   │   ├── TodoItem.tsx   # Individual todo
│   │   ├── TodoForm.tsx   # Add/Edit form
│   │   └── ...
│   ├── contexts/          # State management
│   ├── types/            # TypeScript definitions
│   └── ...
```

## Key Components

### TodoList
The main component that displays the list of todos with pagination and filtering capabilities.

### TodoItem
Individual todo items with complete/incomplete toggle and delete functionality.

### TodoForm
Form component for adding new todos with validation and error handling.

### DashboardLayout
Main layout component that includes the todo list and quick stats.

## Data Management
- Uses TanStack Query for efficient data fetching and caching
- Implements optimistic updates for instant feedback
- Handles loading and error states gracefully
