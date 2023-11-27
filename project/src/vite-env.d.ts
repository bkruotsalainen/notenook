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
  refreshTodos: () => void,
  getIcon: (string) => string,
  getTime: (number) => string,
  deleteToDo: (string) => void,
  handleTodoInEdit: (string) => void,
  updateTaskColor: (boolean, number) => string,
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
  tags: Filter[],
  delete: (string) => void,
  handleMemoInEdit: (string) => void,
  refreshMemos: () => void
}

interface Subtask {
  id: string,
  content: string,
  done: boolean
}

interface AddNewTodoProps {
  isOpen: boolean,
  tags: Filter[],
  handlePopUp: () => void,
  refreshTodos: () => void
}

interface AddNewMemoProps {
  tags: Filter[],
  isOpen: boolean,
  handlePopUp: () => void,
  refreshMemos: () => void
}

interface HomeTaskGroupProps {
  title: string
}

interface HomeMenuProps {
  tags: Filter[],
  handlePopUp: () => void,
  handleSearch: (e) => void,
  handleFilters: (string) => void
}

interface HomeMemoProps {
  tags: Filter[],
  memos: Memo[],
  isOpen: boolean,
  searchValue: string,
  filterValues: string[]
  handlePopUp: () => void,
  refreshMemos: () => void,
  handleMemoInEdit: (string) => void,
}

interface HomeTodoProps {
  todos: Todo[],
  tags: Filter[], 
  searchValue: string,
  filterValues: string[],
  refreshTodos: () => void,
  isOpen: boolean,
  handleTodoInEdit: (string) => void
}

interface EditMemoProps {
  memoInEdit: Memo,
  isOpen: boolean
  handleMemoInEdit: (Memo) => void,
  refreshMemos: () => void,
  tags: Filter[]
}

interface EditTodoProps {
  isOpen: boolean,
  handleTodoInEdit: (Todo) => void,
  todoInEdit: Todo,
  refreshTodos: () => void,
  tags: Filter[]
}