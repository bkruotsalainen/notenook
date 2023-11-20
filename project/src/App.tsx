import HomeTodos from './HomeTodos.tsx'
import HomeMenu from './HomeMenu.tsx'
import Header from './Header.tsx'
import HomeNotes from './HomeNotes.tsx'
import './css/App.css'

function App() {
  return (
    <>    
    <Header/>
    <div className="flex-container">
      <div className="allMenu"><HomeMenu /></div>
      <div className="allCalendar"><HomeTodos /></div>
      <div className="allNotes"><HomeNotes /></div>
   </div>
    </>
  )
}

export default App