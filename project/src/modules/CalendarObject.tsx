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
  'Sunday',
  'Monday', 
  'Tuesday', 
  'Wednesday', 
  'Thursday',
  'Friday', 
  'Saturday'
];

function CalendarObject() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year: number, month: number): number => {
    // Check if it's a leap year
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    
    const daysInMonth = [
      31, // January
      isLeapYear ? 29 : 28, // February
      31, // March
      30, // April
      31, // May
      30, // June
      31, // July
      31, // August
      30, // September
      31, // October
      30, // November
      31, // December
    ];

    // Return the number of days for the specified month
    return daysInMonth[month - 1];
  }; 

  return (
    <>
      <div className="weekViewBody">

        <div className="weekViewHeader">
          {months[currentMonth]} {currentYear}
        </div>

        {weekdays.map(wd => {
          return <div key={wd} className='dayDiv'><b>{wd[0]}</b></div>;
        }
        )}

        {weekdays.map((wd, index) => {
          if(index < currentDate.getDay()-2) {
            return <div key={wd} className='dayDiv'/>;
          }
        }
        )}

        {days.map(d => {
          if(d < getDaysInMonth(currentYear, currentMonth)) {
            return <div key={d} className={(currentDate.getDate() === d )? 'dayDiv currentDate' : 'dayDiv'}>{d}</div>;
          }
        }
        )}

      </div>
    </>
  );
}

export default CalendarObject;