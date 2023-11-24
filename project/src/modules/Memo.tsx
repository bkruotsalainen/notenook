import { useState } from 'react';

function Memo(props: MemoProps) {
  const [openMemo, setOpenMemo] = useState<boolean>(false);

  const getDate = () => {
    const dateTime = new Date(props.memo.createdAt);
    
    const day = dateTime.getDate();
    const month = dateTime.getMonth();
    const year = dateTime.getFullYear();

    const hours = (dateTime.getHours() < 10 ? '0' : '') + dateTime.getHours();
    const minutes = (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();

    return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes; 
  };

  const handleOpenMemo = () => {
    setOpenMemo(openMemo => !openMemo);
  };

  return (
    <>
      <div className="memoWrapper" onClick={() => handleOpenMemo()}>
        <h3>{props.findTag(props.memo.tag)} {props.memo.title}</h3>
        <p>
          {openMemo ? props.memo.content : props.memo.content.slice(0, 250) + '...'}
        </p>
        <span style={{fontSize: '0.8em'}}>From {getDate()}</span>
      </div>
    </>
  );
}

export default Memo;