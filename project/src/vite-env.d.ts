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
  userId: string,

  createdAt: Date,
  editedAt: Date,
  doneBy: Date,

  content: string,
  subtasks: Subtask[],

  repeatInterval: string,

  todo: boolean,
  done: boolean,

  tag: string
}

interface Subtask {
  id: string,
  content: string
}

interface HomeTaskGroupProps {
  title: string
}

interface AddNewProps {
  isOpen: boolean,
  handlePopUp: () => void
}

interface HomeMenuProps {
  handlePopUp: () => void
}