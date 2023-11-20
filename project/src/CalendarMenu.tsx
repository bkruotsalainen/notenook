import WeekView from "./WeekView"

function CalendarMenu() {
  return (
    <>
    <div>
      <WeekView />
      <input placeholder="Search" className="searchInput"></input>

      <button className="addNewButton">Add new</button>

      <h3>Filter</h3>
        <button className="filterToggleButton">🎉</button>
        <button className="filterToggleButton">🧼</button>
        <button className="filterToggleButton">🌴</button>
        <button className="filterToggleButton">⭐</button>
        <button className="filterToggleButton">🎵</button>
    </div>
    </>
  )
}

export default CalendarMenu