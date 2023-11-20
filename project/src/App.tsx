import Calendar from './Calendar.tsx'
import CalendarMenu from './CalendarMenu.tsx'
import Header from './Header.tsx'
import Notes from './Notes.tsx'
import './css/App.css'

function App() {
  return (
    <>    
    <Header/>
    <div className="flex-container">
      <div className="allMmenu"><CalendarMenu /></div>
      <div className="allCalendar"><Calendar /></div>
      <div className="allNotes"><Notes /></div>
   </div>
    </>
  )
}

export default App