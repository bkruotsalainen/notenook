import HomeTodos from './HomeTodos.tsx'
import HomeMenu from './HomeMenu.tsx'
import Header from './Header.tsx'
import HomeNotes from './HomeNotes.tsx'
import './css/App.css'
import { useState } from 'react'
import AddNew from './AddNew.tsx'

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handlePopUp = () => {
    setIsOpen(!isOpen);
    console.log(isOpen);
  }

  return (
    <div className="fullScreen">
    <AddNew isOpen={isOpen} handlePopUp={handlePopUp}/>
    <Header/>
    <div className="flex-container">
      <div className="homeMenu"><HomeMenu handlePopUp={handlePopUp}/></div>
      <div className="homeTodos"><HomeTodos /></div>
      <div className="homeNotes"><HomeNotes /></div>
    </div>
    </div>
  )
}

export default App