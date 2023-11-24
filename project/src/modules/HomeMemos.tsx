import axios from 'axios';
import Memo from './Memo';

function HomeMemos(props: HomeMemoProps) {
  const deleteMemo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/memos/${id}`);
      props.refreshMemos();
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
      {props.memos.map(m => 
        <Memo key={m.id} memo={m} delete={deleteMemo} tags={props.tags}/>
      )};
      
    </>
  );
}

export default HomeMemos;