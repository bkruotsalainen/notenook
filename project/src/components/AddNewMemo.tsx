import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import memoService from '../services/memoService';

function AddNewMemo({userId, isOpen, handlePopUp, tags, refreshMemos, timezone}: AddNewMemoProps) {  
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  
  const [activeTag, setActiveTag] = useState<string>('1');  

  const filterStyle = {
    backgroundColor: 'transparent',
  };

  const activeFilterStyle = {
    backgroundColor: '#FABC2A'
  };
  
  // Close popup
  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    emptyFields();
    handlePopUp();
  };

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const newMemo: Memo = {
      id: uuidv4(),
      userId: userId,
      title: title,
      content: content,
      createdAt: new Date().getTime() - timezone,
      editedAt: new Date().getTime() - timezone,
      tag: activeTag
    };

    try {
      await memoService.create(newMemo).then((response) => {
        console.log('Memo created:', response.data);
        emptyFields();
        closePopup();
        refreshMemos();
      }
      );
    } catch (error) {
      console.error('Error creating memo:', error);
    }
  };

  const emptyFields = () => {
    setTitle('');
    setContent('');
    setActiveTag('1');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };
    
  return (
    <>
      <div className={(isOpen) ? 'addNewBackground' : 'hidden'}>
        <div className="addNewBase">

          <button type="button" className="closeForm floatRight" 
            onClick={() => closePopup()}>X</button>

          <p className="formTitle">Add new memo</p>

          <center>
            {tags.map((f: Filter) => 
            {
              return <div key={f.id} style={f.id !== activeTag ? filterStyle : activeFilterStyle}
                onClick={() => handleTagSelection(f.id)} className="addNewIcons">
                {f.icon}
              </div>;
            }
            )}
          </center>

          <br />

          <form onSubmit={(e) => handleSubmit(e)}>

            <input className="addNewInput fullWidth" 
              placeholder="Title" value={title} 
              onChange={(e) => handleTitleChange(e)}/>

            <textarea className="addNewInput fullWidth" 
              placeholder="Write whatever you want!" 
              value={content} onChange={(e) => handleContentChange(e)}/>
            
            <div className="marginTop" />

            <button type="submit" 
              className="submitNew floatRight">Submit</button>
          </form>

        </div>
      </div>  
    </>
  );
}

export default AddNewMemo;