import { useState } from 'react';
import NoteSettings from './NoteSettings';

function Memo(props: MemoProps) {
  const [openMemo, setOpenMemo] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const handleOpenMemo = () => {
    setOpenMemo(openMemo => !openMemo);
    console.log(props.memo);
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
      <div className="memoWrapper" onClick={() => handleOpenMemo()} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>        
        { hover &&
        <NoteSettings handleNoteInEdit={props.handleMemoInEdit} 
          handleDeleteClick={props.delete} note={props.memo} />
        }
        <h3>{findTag(props.memo.tag)} {props.memo.title}</h3>
        <p>
          {openMemo || props.memo.content.length < 250 ? props.memo.content : props.memo.content.slice(0, 250) + '...'}
        </p>
        {props.memo.createdAt === props.memo.editedAt
          ? <span style={{fontSize: '0.8em'}}>From {props.getTime(props.memo.createdAt)}</span>
          : <span style={{fontSize: '0.8em'}}>From {props.getTime(props.memo.createdAt)}, edited {props.getTime(props.memo.editedAt)}</span>
        }
      </div>
    </>
  );
}

export default Memo;