import axios from 'axios';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function AddNewMemo({isOpen, handlePopUp}: AddNewMemoProps) {  
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  
  const [filters, setFilters] = useState<Filter[]>([]);
  const [activeTag, setActiveTag] = useState<string>('1');  

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

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags/');
        setFilters(response.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

  // Close popup
  const closePopup = () => {
    /* Find a way to reset form when popup is closed */
    handlePopUp();
  };

  const handleTagSelection = (id: string) => {
    setActiveTag(id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 
    
    const newMemo = {
      id: uuidv4(),
      userid: '1',
      title: title,
      content: content,
      createdAt: Date.now(),
      editedAt: Date.now(),
      tag: activeTag
    };

    try {
      const response = await axios.post('http://localhost:3000/memos', newMemo);
      console.log('Memo created:', response.data);
      closePopup();
    } catch (error) {
      console.error('Error creating memo:', error);
    }
    
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
            {filters.map(f => 
            {
              return <div key={f.id} style={f.id !== activeTag ? filterStyle : activeFilterStyle}
                onClick={() => handleTagSelection(f.id)}>{f.icon}</div>;
            }
            )}
          </center>

          <br />

          <form onSubmit={(e) => handleSubmit(e)}>

            <input className="addNewInput fullWidth" 
              placeholder="Title" value={title} 
              onChange={(e) => handleTitleChange(e)}/>

            <textarea className="addNewInput fullWidth" 
              style={{height: '300px'}} placeholder="Write whatever you want!" 
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