import TaskGroup from "./TaskGroup"

function CalendarBody() {
    return (
    <>
      <h1 className="hideMobile">Calendar</h1>
      <TaskGroup title="Today"/>
      <TaskGroup title="Tomorrow"/>
    </>
  )
}

export default CalendarBody