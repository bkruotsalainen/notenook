import '../css/Home.css';

import { useEffect, useState } from 'react';
import tagService from '../services/tagService';
import memoService from '../services/memoService';
import todoService from '../services/todoService';

import Header from './Header.tsx';

import HomeMenu from './HomeMenu.tsx';
import HomeMemos from './HomeMemos.tsx';
import HomeTodos from './HomeTodos.tsx';

import EditMemo from './EditMemo.tsx';
import EditTodo from './EditTodo.tsx';
import AddNewTodo from './AddNewTodo.tsx';
import AddNewMemo from './AddNewMemo.tsx';

function Home() {
  const [isTodoOpen, setIsTodoOpen] = useState<boolean>(false);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  
  const [isMemoEditOpen, setIsMemoEditOpen] = useState<boolean>(false);
  const [isTodoEditOpen, setIsTodoEditOpen] = useState<boolean>(false);

  const [searchValue, setSearchValue] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  const [todos, setTodos] = useState<Todo[]>([]);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showTodo, setShowTodo] = useState<boolean>(true);

  const handleResize = () => {
    const newWidth = window.innerWidth;
    setWindowWidth(newWidth);

    setShowTodo(newWidth > 1200);
  };

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [todoInEdit, setTodoInEdit] = useState<Todo>(    {
    'id': '29f5b13d-9eaa-4599-8a15-1d83c4e0deea',
    'userId': '1',
    'createdAt': 1700813408344,
    'editedAt': 1700813408344,
    'doneBy': 1702454400000,
    'content': 'If you see this, something went wrong :(',
    'subtasks': [],
    'repeatInterval': 'never',
    'todo': false,
    'deadline': true,
    'done': false,
    'tag': '1'
  });

  const [memoInEdit, setMemoInEdit] = useState<Memo>({
    id: '2b8dd605-c961-4ddf-affc-d4c1bf13eb77',
    userId: '1',
    title: 'This is a test!',
    content: 'If you see this, something went wrong :(',
    createdAt: 1700837066500,
    editedAt: 1700837066500,
    tag: '1'
  });

  const todoDisplay = {
    display: showTodo ? 'inline-block' : 'none'
  };

  const memoDisplay = {
    display: !showTodo || (showTodo && windowWidth > 1200) ? 'inline-block' : 'none'
  };

  const handleTodoDisplay = () => {
    setShowTodo(true);
  };

  const handleMemoDisplay = () => {
    setShowTodo(false);
  };

  useEffect (() => {
    const fetchData = async () => {
      try {
        await todoService.getAll().then((todoResponse) => {
          const sortedTodos = todoResponse.data.sort((a: Todo, b: Todo) => 
            a.doneBy < b.doneBy ? 1 : -1);
          setTodos(sortedTodos);
        }
        );
        
        await memoService.getAll().then((memoResponse) => {
          const sortedMemos = memoResponse.data.sort((a: Memo, b: Memo) => 
            a.createdAt < b.createdAt ? 1 : -1);
          setMemos(sortedMemos);
        }
        );

        await tagService.getAll().then((tagResponse) => {
          setTags(tagResponse.data);
        }
        );
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

  const refreshTodos = async () => {
    try {
      await todoService.getAll().then((todoResponse) => {
        const sortedTodos = todoResponse.data.sort((a: Todo, b: Todo) => 
          a.doneBy < b.doneBy ? 1 : -1);
        setTodos(sortedTodos);
      }
      );
    }catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const refreshMemos = async () => {
    try {
      await memoService.getAll().then((memoResponse) => {
        const sortedMemos = memoResponse.data.sort((a: Memo, b: Memo) => 
          a.createdAt < b.createdAt ? 1 : -1);
        setMemos(sortedMemos);
      }
      );
    }catch (error) {
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

  const handleTodoInEdit = (todo: Todo) => {
    if (todo !== undefined) {
      setTodoInEdit(todo);
    }

    console.log(todo);

    setIsTodoEditOpen(!isTodoEditOpen);
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
      <EditTodo isOpen={isTodoEditOpen} handleTodoInEdit={handleTodoInEdit} todoInEdit={todoInEdit} 
        refreshTodos={refreshTodos} tags={tags}/>
      <EditMemo isOpen={isMemoEditOpen} handleMemoInEdit={handleMemoInEdit} memoInEdit={memoInEdit} 
        refreshMemos={refreshMemos} tags={tags}/>

      <AddNewTodo isOpen={isTodoOpen} handlePopUp={handleTodoPopUp} tags={tags} refreshTodos={refreshTodos}/>
      <AddNewMemo isOpen={isMemoOpen} handlePopUp={handleMemoPopUp} tags={tags} refreshMemos={refreshMemos}/>

      <Header handleTodoDisplay={handleTodoDisplay} handleMemoDisplay={handleMemoDisplay}/>
      <div className="flex-container">
        <div className="homeMenu">
          <HomeMenu handleTodoPopup={handleTodoPopUp} handleSearch={handleSearchChange} 
            handleFilters={handleFilterSelected} tags={tags} showTodo={showTodo}
            handleMemoPopup={handleMemoPopUp} />
        </div>

        <div className="homeTodos" style={todoDisplay}>
          <HomeTodos searchValue={searchValue} filterValues={filterSelected} tags={tags} 
            todos={todos} refreshTodos={refreshTodos} isOpen={isTodoEditOpen} handleTodoInEdit={handleTodoInEdit}/>
        </div>

        <div className="homeMemos" style={memoDisplay}>
          <HomeMemos handlePopUp={handleMemoPopUp} tags={tags} memos={memos}
            refreshMemos={refreshMemos} isOpen={isMemoEditOpen} handleMemoInEdit={handleMemoInEdit} 
            searchValue={searchValue} filterValues={filterSelected} />
        </div>
      </div>
    </>
  );
}

export default Home;