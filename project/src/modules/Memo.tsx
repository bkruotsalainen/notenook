import { useState } from 'react';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function Memo(props: MemoProps) {
  const [openMemo, setOpenMemo] = useState<boolean>(false);

  const getDate = () => {
    const dateTime = new Date(props.memo.createdAt);
  
    const date = dateTime.getDate() + ' ' + months[dateTime.getMonth()] 
      + ' ' + dateTime.getFullYear();
  
    const time = (dateTime.getHours() < 10 ? '0' : '') + (dateTime.getHours()) + ':' + 
    (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();
  
    return date + ' ' + time;
  };

  const handleOpenMemo = () => {
    setOpenMemo(openMemo => !openMemo);
  
  };

  const findTag = (id: string) => {
    const tag = props.tags.filter(t => t.id === id);

    if (tag[0] !== undefined) {
      return tag[0].icon;
    }
  
    return '';
  };

  return (
    <>
      <div className="memoWrapper" onClick={() => handleOpenMemo()}>
        <div style={{float: 'right', width: 'auto'}}>
          <span onClick={() => props.delete(props.memo.id)}>🗑️</span>
        </div> 
        <h3>{findTag(props.memo.tag)} {props.memo.title}</h3>
        <p>
          {openMemo || props.memo.content.length < 250 ? props.memo.content : props.memo.content.slice(0, 250) + '...'}
        </p>
        <span style={{fontSize: '0.8em'}}>From {getDate()}</span>
      </div>
    </>
  );
}

export default Memo;