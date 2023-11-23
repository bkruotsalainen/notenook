import axios from 'axios';
import { useEffect, useState } from 'react';
import Memo from './Memo';

function HomeMemos() {
  const [memos, setMemos] = useState<Memo[]>([]);
  const [tags, setTags] = useState<Filter[]>([]);
  
  useEffect (() => {
    const fetchData = async () => {
      try {
        const memoResponse = await axios.get('http://localhost:3000/memos/');
        const tagResponse = await axios.get('http://localhost:3000/tags/');
        setMemos(memoResponse.data);
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

  return (
    <>
      <h1>Latest memos</h1>
      
      {memos.map(m => {
        return <Memo key={m.id} memo={m} findTag={findTag} />;
      })
      }
      
    </>
  );
}

export default HomeMemos;