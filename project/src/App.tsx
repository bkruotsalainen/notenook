import HomeTodos from './HomeTodos.tsx';
import HomeMenu from './HomeMenu.tsx';
import Header from './Header.tsx';
import HomeMemos from './HomeMemos.tsx';
import './css/App.css';
import { useState } from 'react';
import AddNew from './AddNew.tsx';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePopUp = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AddNew isOpen={isOpen} handlePopUp={handlePopUp}/>
      <Header/>
      <div className="flex-container">
        <div className="homeMenu"><HomeMenu handlePopUp={handlePopUp}/></div>
        <div className="homeTodos"><HomeTodos /></div>
        <div className="homeMemos"><HomeMemos /></div>
      </div>
    </>
  );
}

export default App;