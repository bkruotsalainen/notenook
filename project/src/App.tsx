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
      <div className="homeMenu"><HomeMenu /></div>
      <div className="homeTodos"><HomeTodos /></div>
      <div className="homeNotes"><HomeNotes /></div>
   </div>
    </>
  )
}

export default App