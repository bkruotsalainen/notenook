import Calendar from './Calendar.tsx'
import Header from './Header.tsx'
import Notes from './Notes.tsx'

import './css/App.css'

function App() {
  return (
    <>    
      <Header/>
      <Calendar />
      <Notes />
    </>
  )
}

export default App