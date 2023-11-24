import './css/App.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import Header from './modules/Header.tsx';

import HomeMenu from './modules/HomeMenu.tsx';
import HomeMemos from './modules/HomeMemos.tsx';
import HomeTodos from './modules/HomeTodos.tsx';

import AddNew from './modules/AddNewTodo.tsx';
import AddNewMemo from './modules/AddNewMemo.tsx';
import EditMemo from './modules/EditMemo.tsx';

function App() {
  const [isTodoOpen, setIsTodoOpen] = useState<boolean>(false);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false)
  
  const [isMemoEditOpen, setIsMemoEditOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  const [todoEdit, setTodoEdit] = useState<Todo>();
  const [memoInEdit, setMemoInEdit] = useState<Memo>({
    id: "2b8dd605-c961-4ddf-affc-d4c1bf13eb77",
    userId: "1",
    title: "This is a test!",
    content: "If you see this, something went wrong :(",
    createdAt: 1700837066500,
    editedAt: 1700837066500,
    tag: "4"
  });

  useEffect (() => {
    const fetchData = async () => {
      try {
        const todoResponse = await axios.get('http://localhost:3000/todos/');
        const memoResponse = await axios.get('http://localhost:3000/memos/');
        const tagResponse = await axios.get('http://localhost:3000/tags/');

        const sortedTodos = todoResponse.data.sort((a: Todo, b: Todo) => 
          a.createdAt < b.createdAt ? 1 : -1);

        const sortedMemos = memoResponse.data.sort((a: Todo, b: Todo) => 
          a.createdAt < b.createdAt ? 1 : -1);

        setTodos(sortedTodos);
        setMemos(sortedMemos);
        setTags(tagResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

  const refreshTodos = async () => {
    try {
      const todoResponse = await axios.get('http://localhost:3000/todos/');

      const sortedTodos = todoResponse.data.sort((a: Todo, b: Todo) => 
        a.createdAt < b.createdAt ? 1 : -1);

      setTodos(sortedTodos);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const refreshMemos = async () => {
    try {
      const memoResponse = await axios.get('http://localhost:3000/memos/');

      const sortedMemos = memoResponse.data.sort((a: Memo, b: Memo) => 
        a.createdAt < b.createdAt ? 1 : -1);

      setMemos(sortedMemos);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Open and close popup
  const handleTodoPopUp = () => {
    setIsTodoOpen(!isTodoOpen);
  };
  
  const handleMemoPopUp = () => {
    setIsMemoOpen(!isMemoOpen);
  };

  const handleMemoInEdit = (memo: Memo) => {
    if (memo !== undefined) {
      setMemoInEdit(memo);
    }

    console.log(memo);

    setIsMemoEditOpen(!isMemoEditOpen);
  };

  // Save value from search field
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  // Handle selected filters
  const handleFilterSelected = (id: string) => {
    console.log(id);
    const checkIfFiltered = filterSelected.filter(f => f === id);

    if (checkIfFiltered.length > 0) {
      const newFilterSelected = filterSelected.filter(f => f !== id);
      setFilterSelected(newFilterSelected);
    } else {
      setFilterSelected([...filterSelected, id]);
    }
  };

  return (
    <>
      <EditMemo isOpen={isMemoEditOpen} handleMemoInEdit={handleMemoInEdit} memoInEdit={memoInEdit} refreshMemos={refreshMemos}/>
      <AddNew isOpen={isTodoOpen} handlePopUp={handleTodoPopUp} tags={tags} refreshTodos={refreshTodos}/>
      <AddNewMemo isOpen={isMemoOpen} handlePopUp={handleMemoPopUp} tags={tags} refreshMemos={refreshMemos}/>

      <Header/>

      <div className="flex-container">

        <div className="homeMenu">
          <HomeMenu handlePopUp={handleTodoPopUp} handleSearch={handleSearchChange} 
            handleFilters={handleFilterSelected} tags={tags}/>
        </div>

        <div className="homeTodos">
          <HomeTodos searchValue={searchValue} filterValues={filterSelected} tags={tags} 
            todos={todos} refreshTodos={refreshTodos}/>
        </div>

        <div className="homeMemos">
          <HomeMemos handlePopUp={handleMemoPopUp} tags={tags} memos={memos}
            refreshMemos={refreshMemos} isOpen={isMemoEditOpen} handleMemoInEdit={handleMemoInEdit} />
        </div>

      </div>
    </>
  );
}

export default App;