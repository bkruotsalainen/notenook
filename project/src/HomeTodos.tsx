import HomeTaskGroup from "./HomeTaskGroup.tsx"
import './css/Home.css'

function HomeTodos() {
  return (
      <div className="calendarBody">
        <h1 className="hideMobile">To-do</h1>
        <HomeTaskGroup title="Today"/>
        <HomeTaskGroup title="Tomorrow"/>
        <HomeTaskGroup title="Friday 13th"/>
      </div>
  )
}

export default HomeTodos