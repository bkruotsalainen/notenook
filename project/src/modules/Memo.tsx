import { useState } from 'react';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const timezone = 7200000;

function Memo(props: MemoProps) {
  const [openMemo, setOpenMemo] = useState<boolean>(false);

  const getDate = () => {
    const dateTime = new Date(props.memo.createdAt + timezone);
  
    const date = dateTime.getDate() + ' ' + months[dateTime.getMonth()] 
      + ' ' + dateTime.getFullYear();
  
    const time = (dateTime.getHours() < 10 ? '0' : '') + (dateTime.getHours()) + ':' + 
    (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
  
    return date + ' ' + time;
  };

  const handleOpenMemo = () => {
    setOpenMemo(openMemo => !openMemo);
  };

  return (
    <>
      <div className="memoWrapper" onClick={() => handleOpenMemo()}>
        <h3>{props.findTag(props.memo.tag)} {props.memo.title}</h3>
        <p>
          {openMemo || props.memo.content.length < 250 ? props.memo.content : props.memo.content.slice(0, 250) + '...'}
        </p>
        <span style={{fontSize: '0.8em'}}>From {getDate()}</span>
      </div>
    </>
  );
}

export default Memo;