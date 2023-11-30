const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
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

function CalendarObject({todos}: CalendarObjectProps) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const days = [31, (isLeapYear(currentYear) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const getFirstDayOfMonth = (year: number, month: number): number => {
    const firstDay = new Date(year, month, 1);
    return (firstDay.getDay() + 6) % 7;
  };

  function isLeapYear(year: number) {
    return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
  }

  const getAllDays = () => {
    const array: number[] = [];

    for (let i = 1; i <= days[currentMonth]; i++){
      array.push(i);
    }

    return array;
  };
  
  const daysInThisMonth = getAllDays();

  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  // Check if day match with to do date
  const checkNotes = (dayNumber: number) => {
    let datesMatch = false;
    const todoDates = todos!.map(td => {return new Date(td.doneBy);});

    const thisMonthDates = todoDates.map(td => {
      if (td.getMonth() === currentMonth) {
        {return td.getDate();}
      }
    }
    );

    thisMonthDates.map(date => { 
      if (date === dayNumber){
        datesMatch = true;
      } 
    });

    return datesMatch;
  };

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


        {daysInThisMonth.map((d) => (
          <div
            key={d} style={checkNotes(d) === true ? {boxSizing: 'border-box', border: '3px solid #86DEDE'} : {}}
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
