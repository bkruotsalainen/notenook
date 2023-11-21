/// <reference types="vite/client" />

interface Filter {
  id: string,
  name: string,
  icon: string
}

interface FilterButtonProps {
  filterIcon: string
}

interface Todo {
  id: string,
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
  id: string,
  content: string
}

interface HomeTaskGroupProps {
  title: string
}