import CalendarBody from "./CalendarBody.tsx"
import CalendarMenu from "./CalendarMenu.tsx"

import './css/Calendar.css'

function Calendar() {
  return (
    <>
    <div className="calendarWrapper">

      <div className="calendarMenu">
        <CalendarMenu />
      </div>

      <div className="calendarBody">
        <CalendarBody/>
      </div>
      
    </div>
    </>
  )
}

export default Calendar