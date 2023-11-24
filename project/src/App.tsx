import HomeTodos from './modules/HomeTodos.tsx';
import HomeMenu from './modules/HomeMenu.tsx';
import Header from './modules/Header.tsx';
import HomeMemos from './modules/HomeMemos.tsx';
import './css/App.css';
import { useState } from 'react';
import AddNew from './modules/AddNewTodo.tsx';
import AddNewMemo from './modules/AddNewMemo.tsx';

function App() {
  const [isTodoOpen, setIsTodoOpen] = useState<boolean>(false);
  const [isMemoOpen, setIsMemoOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  // Open and close popup
  const handleTodoPopUp = () => {
    setIsTodoOpen(!isTodoOpen);
  };
  const handleMemoPopUp = () => {
    setIsMemoOpen(!isMemoOpen);
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
      <AddNew isOpen={isTodoOpen} handlePopUp={handleTodoPopUp}/>
      <AddNewMemo isOpen={isMemoOpen} handlePopUp={handleMemoPopUp}/>
      <Header/>
      <div className="flex-container">
        <div className="homeMenu"><HomeMenu handlePopUp={handleTodoPopUp} 
          handleSearch={handleSearchChange} handleFilters={handleFilterSelected}/></div>
        <div className="homeTodos"><HomeTodos searchValue={searchValue} 
          filterValues={filterSelected} /></div>
        <div className="homeMemos"><HomeMemos handlePopUp={handleMemoPopUp} 
          handleSearch={handleSearchChange} handleFilters={handleFilterSelected}/></div>
      </div>
    </>
  );
}

export default App;