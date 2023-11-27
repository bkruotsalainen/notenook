import { useState } from 'react';

function Memo(props: MemoProps) {
  const [openMemo, setOpenMemo] = useState<boolean>(false);

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
        <div className="iconWrapper">
          <div className="icon" onClick={() => props.handleMemoInEdit(props.memo)}>✏️</div>
          <div className="icon" onClick={() => props.delete(props.memo.id)}>🗑️</div>
        </div> 
        <h3>{findTag(props.memo.tag)} {props.memo.title}</h3>
        <p>
          {openMemo || props.memo.content.length < 250 ? props.memo.content : props.memo.content.slice(0, 250) + '...'}
        </p>
        {props.memo.createdAt === props.memo.editedAt
          ? <i style={{fontSize: '0.7em', color: '#6d7b77'}}>From {props.getTime(props.memo.createdAt)}</i>
          : <i style={{fontSize: '0.7em', color: '#6d7b77'}}>Created {props.getTime(props.memo.createdAt)}, edited {props.getTime(props.memo.editedAt)}</i>
        }
      </div>
    </>
  );
}

export default Memo;