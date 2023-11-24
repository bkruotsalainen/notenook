import axios from "axios";
import { useEffect, useState } from "react";

function EditMemo({ memoInEdit, isOpen, handleMemoInEdit, refreshMemos }: any) {
  const [title, setTitle] = useState<string>(memoInEdit === undefined ? 'Test title' : memoInEdit.title);
  const [content, setContent] = useState<string>(memoInEdit === undefined ? 'Test content' : memoInEdit.content);

  useEffect(() => {
    setTitle(memoInEdit.title);
    setContent(memoInEdit.content);
  }, [memoInEdit]);

  const closePopup = () => {
    handleMemoInEdit();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMemo = {
      id: memoInEdit.id,
      userid: memoInEdit.userid,
      title: title,
      content: content,
      createdAt: memoInEdit.createdAt,
      editedAt: Date.now(),
      tag: memoInEdit.tag
    };

    try {
      const response = await axios.put(`http://localhost:3000/memos/${updatedMemo.id}`, updatedMemo);
      console.log('Memo updated:', response.data);
      closePopup();
      refreshMemos();
    } catch (error) {
      console.error('Error updating memo:', error);
    }
  };

  return (
    <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
      <div className="addNewBase">
        <div className="addNewHeader">
          <h1>Edit memo</h1>
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
              <button type="submit">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditMemo;