const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];


const days: number[] = [
  1, 2, 3, 4, 5, 6, 7,
  8, 9, 10, 11, 12, 13, 14,
  15, 16, 17, 18, 19, 20, 21,
  22, 23, 24, 25, 26, 27, 28,
  29, 30, 31
];


const weekdays: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];


function CalendarObject() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const firstDay = new Date(year, month, 1);
    return (firstDay.getDay() + 6) % 7;
  };

  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  return (
    <>
      <div className="weekViewBody">
        <div className="weekViewHeader">
          {months[currentMonth]} {currentYear}
        </div>


        {weekdays.map((wd) => (
          <div key={wd} className='dayDiv'><b>{wd[0]}</b></div>
        ))}


        {[...Array(firstDayOfMonth).keys()].map((_, index) => (
          <div key={`empty-${index}`} className='dayDiv' />
        ))}


        {days.map((d) => (
          <div
            key={d}
            className={(currentDate.getDate() === d) ? 'dayDiv currentDate' : 'dayDiv'}
          >
            {d}
          </div>
        ))}
      </div>
    </>
  );
}

export default CalendarObject;
