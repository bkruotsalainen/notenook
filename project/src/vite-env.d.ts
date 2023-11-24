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
  memo: Memo,
  delete: (string) => void,
  tags: Filter[]
}

interface Subtask {
  id: string,
  content: string,
  done: boolean
}

interface AddNewTodoProps {
  isOpen: boolean,
  handlePopUp: () => void,
  tags: Filter[]
}

interface AddNewMemoProps {
  isOpen: boolean,
  handlePopUp: () => void,
  tags: Filter[]
}

interface HomeTaskGroupProps {
  title: string
}

interface HomeMenuProps {
  handlePopUp: () => void,
  handleSearch: (e) => void,
  handleFilters: (string) => void,
  tags: Filter[]
}

interface HomeMemoProps {
  handlePopUp: () => void,
  tags: Filter[],
  memos: Memo[]
}

interface HomeTodoProps {
  searchValue: string,
  filterValues: string[],
  tags: Filter[], 
  todos: Todo[]
}