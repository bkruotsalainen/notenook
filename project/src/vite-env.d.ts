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
  deleteToDo: (id: string) => void,
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
  refreshMemos: () => void,
  getTime: (number) => string,
  handleMemoInEdit: (string) => void
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
  refreshTodos: () => void,
  timezone: number,
  userId: string
}

interface AddNewMemoProps {
  tags: Filter[],
  isOpen: boolean,
  handlePopUp: () => void,
  refreshMemos: () => void,
  timezone: number,
  userId: string
}

interface HomeTaskGroupProps {
  title: string
}

interface HomeMenuProps {
  tags: Filter[],
  showTodo: boolean,
  handleSearch: (e) => void,
  handleTodoPopup: () => void,
  handleMemoPopup: () => void,
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
  timezone: number
}

interface HomeTodoProps {
  todos: Todo[],
  tags: Filter[], 
  searchValue: string,
  filterValues: string[],
  refreshTodos: () => void,
  isOpen: boolean,
  handleTodoInEdit: (string) => void,
  timezone: number
}

interface EditMemoProps {
  memoInEdit: Memo,
  isOpen: boolean
  handleMemoInEdit: (Memo) => void,
  refreshMemos: () => void,
  tags: Filter[],
  timezone: number
}

interface EditTodoProps {
  isOpen: boolean,
  handleTodoInEdit: (Todo) => void,
  todoInEdit: Todo,
  refreshTodos: () => void,
  tags: Filter[],
  timezone: number
}

interface HeaderProps {
  handleTodoDisplay: () => void,
  handleMemoDisplay: () => void,
  handleLogin: () => void,
  handleSettingsPopUp: () => void,
  collapseWidth: number
}

interface User {
  id: string,
  email: string,
  password: argon2id,
  timezone: number,
  createdAt: number
}

interface LoginProps {
  handleLogin: () => void,
  handleId: (id: string) => void
}

interface HomeProps {
  handleLogin: () => void,
  id: string
}

interface SettingsProps {
  isOpen: boolean,
  handleSettingsPopUp: () => void,
  timezone: number,
  refreshTodos: () => void,
  refreshMemos: () => void,
  user: User
}

interface Timezone {
  id: string,
  offset: string,
  text: string
}