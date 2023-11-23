import HomeTodos from './modules/HomeTodos.tsx';
import HomeMenu from './modules/HomeMenu.tsx';
import Header from './modules/Header.tsx';
import HomeMemos from './modules/HomeMemos.tsx';
import './css/App.css';
import { useState } from 'react';
import AddNew from './modules/AddNew.tsx';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePopUp = () => {
    setIsOpen(!isOpen);
  };

  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  return (
    <>
      <AddNew isOpen={isOpen} handlePopUp={handlePopUp}/>
      <Header/>
      <div className="flex-container">
        <div className="homeMenu"><HomeMenu handlePopUp={handlePopUp} handleSearch={handleSearchChange}/></div>
        <div className="homeTodos"><HomeTodos searchValue={searchValue} /></div>
        <div className="homeMemos"><HomeMemos /></div>
      </div>
    </>
  );
}

export default App;