import { useState } from "react";
import WeekView from "./WeekView"

function CalendarMenu() {
  const [filterStatus, setFilterStatus] = useState<boolean>(false);
  
  const filterStyle = {
    "backgroundColor": filterStatus ? "#FABB29" : "#F5F1EB"
  }

  const changeFilterStatus = () => {
      setFilterStatus(!filterStatus);
  }

  return (
    <>
    <div>
      <WeekView />
      <input placeholder="Search" className="searchInput"></input>

      <button className="addNewButton">Add new</button>

      <h3 className="hideMobile">Filter</h3>
        <button className="filterToggleButton" onClick={changeFilterStatus} style={filterStyle}>🎉</button>

        <button className="filterToggleButton" onClick={changeFilterStatus} style={filterStyle}>🧼</button>

        <button className="filterToggleButton" onClick={changeFilterStatus} style={filterStyle}>🌴</button>

        <button className="filterToggleButton" onClick={changeFilterStatus} style={filterStyle}>⭐</button>

        <button className="filterToggleButton" onClick={changeFilterStatus} style={filterStyle}>🎵</button>
    </div>
    </>
  )
}

export default CalendarMenu