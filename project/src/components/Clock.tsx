import React from 'react';

function Clock() {
  const [time, setTime] = React.useState(new Date());
 
  React.useEffect(() => {
    setInterval(() => {
      setTime(new Date());
    }, 1000);
  }, []);
 
  return (
    <span>
      {time.toLocaleTimeString('en-GB')}
    </span>
  );
}

export default Clock;

