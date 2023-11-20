const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function CalendarObject() {
  const currentDate = new Date();

  return (
    <>
    <div className="weekViewBody">
      <div className="weekViewHeader">
        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>
    </>
  )
}

export default CalendarObject