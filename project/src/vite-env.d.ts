/// <reference types="vite/client" />

interface Filter {
  id: number,
  name: string,
  icon: string
}

interface FilterButtonProps {
  filterIcon: string
}

interface Todo {
  id: number,
  userId: number,

  createdAt: Date,
  editedAt: Date,
  doneBy: Date,

  content: string,
  subtasks: Subtask[],

  repeatable: boolean,
  repeatInterval: string,

  todo: boolean,
  done: boolean,

  tag: number
}

interface Subtask {
  id: number,
  content: string
}

interface HomeTaskGroupProps {
  title: string
}