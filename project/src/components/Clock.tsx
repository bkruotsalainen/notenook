import React from 'react';

function Clock() {
  const [time, setTime] = React.useState(new Date());
 
  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
 
  return (
    <span>{time.toLocaleString('en-GB', {
      dateStyle: 'medium',
      timeStyle: 'medium',
      hour12: false,
    })} 
    </span>
  );
}

export default Clock;

