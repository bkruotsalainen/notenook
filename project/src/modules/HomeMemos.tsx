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

  // Check if search matches with content
  const checkSearchValue = (m: Memo) => {
    if (m !== undefined && m.content.toLowerCase().includes(props.searchValue.toLowerCase())) {
      return true;
    }

    if (m !== undefined && m.title.toLowerCase().includes(props.searchValue.toLowerCase())) {
      return true;
    }

    if (props.searchValue === '') {
      return true;
    }

    return false;
  };

  // Check if tag matches with filter
  const checkFilter = (m: Memo) => {
    if (props.filterValues.length === 0) {
      return true;
    }

    const findTag = props.filterValues.filter(filter => filter === m.tag);
    if (findTag.length > 0) {
      return true;
    }

    return false;
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
        checkSearchValue(m) && checkFilter(m) && (
          <Memo key={m.id} memo={m} delete={deleteMemo} tags={props.tags} handleMemoInEdit={props.handleMemoInEdit} refreshMemos={props.refreshMemos}/>
        ))}
    </>
  );
}

export default HomeMemos;