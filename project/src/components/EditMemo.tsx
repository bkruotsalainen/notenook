import { useEffect, useState } from 'react';
import memoService from '../services/memoService';

function EditMemo({ memoInEdit, isOpen, handleMemoInEdit, refreshMemos, tags, timezone }: EditMemoProps) {
  const [title, setTitle] = useState<string>(memoInEdit === undefined ? 'Test title' : memoInEdit.title);
  const [content, setContent] = useState<string>(memoInEdit === undefined ? 'Test content' : memoInEdit.content);

  const [activeTag, setActiveTag] = useState<string>(memoInEdit === undefined ? '1' : memoInEdit.tag);  

  const filterStyle = {
    fontSize: '1.8em',
    margin: '0.2em',
    padding: '0.2em',
    display: 'inline',
    backgroundColor: '#F5F1EB'
  };

  const activeFilterStyle = {
    fontSize: '1.8em',
    margin: '0.2em',
    padding: '0.2em',
    display: 'inline',
    backgroundColor: '#FABC2A',
    borderRadius: '25px'
  };

  useEffect(() => {
    setTitle(memoInEdit.title);
    setContent(memoInEdit.content);
    setActiveTag(memoInEdit.tag);
  }, [memoInEdit]);

  const closePopup = () => {
    handleMemoInEdit(memoInEdit);
  };

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMemo: Memo = {
      id: memoInEdit.id,
      userId: memoInEdit.userId,
      title: title,
      content: content,
      createdAt: memoInEdit.createdAt - timezone,
      editedAt: new Date().getTime() - timezone,
      tag: activeTag
    };

    try {
      await memoService.update(updatedMemo.id, updatedMemo).then((response) => {
        console.log('Memo updated:', response.data);
        closePopup();
        refreshMemos();
      }
      );
    } catch (error) {
      console.error('Error updating memo:', error);
    }
  };

  return (
    <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <div className="addNewHeader">
          <p className="formTitle">Edit memo</p> 
          
          <center>
            {tags.map((f: Filter) => 
            {
              return <div key={f.id} style={f.id !== activeTag ? filterStyle : activeFilterStyle}
                onClick={() => handleTagSelection(f.id)}>{f.icon}</div>;
            }
            )}
          </center>

          <button type="button" className="closeForm floatRight" onClick={() => closePopup()}>X</button>
        </div>
        <div className="addNewBody">
          <div className="addNewForm">
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <label>Title
                <input className="addNewInput fullWidth" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
              </label>
              <label>Content
                <textarea className="addNewInput fullWidth" style={{ height: '300px' }} placeholder="Write whatever you want!" value={content} onChange={(e) => setContent(e.target.value)} />
              </label>
              <button type="submit" className="submitNew floatRight">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMemo;