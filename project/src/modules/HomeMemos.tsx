import axios from 'axios';
import { useEffect, useState } from 'react';
import Memo from './Memo';

function HomeMemos(props: HomeMemoProps) {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);
  
  useEffect (() => {
    const fetchData = async () => {
      try {
        const memoResponse = await axios.get('http://localhost:3000/memos/');
        const tagResponse = await axios.get('http://localhost:3000/tags/');
        const sortedData = memoResponse.data.sort((a: Memo, b: Memo) => 
          a.createdAt < b.createdAt ? 1 : -1);
        setMemos(sortedData);
        setTags(tagResponse.data);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  },
  []);

  const findTag = (id: string) => {
    const tag = tags.filter(t => t.id === id);
    return tag[0].icon;
  };

  const deleteMemo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/memos/${id}`);
      const newMemos = memos.filter(m => m.id !== id);
      setMemos(newMemos);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  return (
    <>
      <button className="addNewButton" 
        style={{width: '125px', float: 'right', marginTop: '1.3em', marginRight: '1em'}}
        onClick={() => props.handlePopUp()}>
        Add new memo
      </button>
      
      <h1>Latest memos</h1>

      {memos.map(m => {
        return <Memo key={m.id} memo={m} findTag={findTag} delete={deleteMemo} />;
      })
      }
      
    </>
  );
}

export default HomeMemos;