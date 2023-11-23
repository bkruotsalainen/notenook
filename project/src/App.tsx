import HomeTodos from './modules/HomeTodos.tsx';
import HomeMenu from './modules/HomeMenu.tsx';
import Header from './modules/Header.tsx';
import HomeMemos from './modules/HomeMemos.tsx';
import './css/App.css';
import { useState } from 'react';
import AddNew from './modules/AddNew.tsx';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterSelected, setFilterSelected] = useState<string[]>([]);

  const handlePopUp = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

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
      <AddNew isOpen={isOpen} handlePopUp={handlePopUp}/>
      <Header/>
      <div className="flex-container">
        <div className="homeMenu"><HomeMenu handlePopUp={handlePopUp} 
          handleSearch={handleSearchChange} handleFilters={handleFilterSelected}/></div>
        <div className="homeTodos"><HomeTodos searchValue={searchValue} 
          filterValues={filterSelected} /></div>
        <div className="homeMemos"><HomeMemos /></div>
      </div>
    </>
  );
}

export default App;