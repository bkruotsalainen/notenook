/// <reference types="vite/client" />

interface Filter {
  id: string,
  name: string,
  icon: string
}

interface FilterButtonProps {
  id: string,
  filterIcon: string,
  handleFilters: (string) => void
}

interface Todo {
  id: string,
  userId: string,

  createdAt: number,
  editedAt: number,
  doneBy: number,

  content: string,
  subtasks: Subtask[],

  repeatInterval: string,

  todo: boolean,
  deadline: boolean,
  done: boolean,

  tag: string
}

interface TodoProps {
  td: Todo,
  updateTaskColor: (boolean, number) => string,
  getIcon: (string) => string,
  getTime: (number) => string,
  deleteToDo: (string) => void
}

interface Memo {
  id: string,
  userId: string,

  createdAt: number,
  editedAt: number,

  title: string,
  content: string,

  tag: string
}

interface MemoProps {
  memo: Memo
  findTag: (string) => string
}

interface Subtask {
  id: string,
  content: string
}

interface AddNewTodoProps {
  isOpen: boolean,
  handlePopUp: () => void
}

interface AddNewMemoProps {
  isOpen: boolean,
  handlePopUp: () => void
}


interface HomeTaskGroupProps {
  title: string
}

interface HomeMenuProps {
  handlePopUp: () => void,
  handleSearch: (e) => void,
  handleFilters: (string) => void
}

interface HomeMemoProps {
  handlePopUp: () => void,
  handleSearch: (e) => void,
  handleFilters: (string) => void
}

interface HomeTodoProps {
  searchValue: string,
  filterValues: string[]
}