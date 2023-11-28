import memoService from '../services/memoService';
import Memo from './Memo';

const months: string[] = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function HomeMemos(props: HomeMemoProps) {
  const deleteMemo = async (id: string) => {
    try {
      await memoService.remove(id)
        .then(() => {
          props.refreshMemos();
        }
        );
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }; 

  const timezone = 0;

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
  
  // Get string time from unix
  const getTime = (unix: number): string => {
    const dateTime = new Date(unix + timezone);

    const date = dateTime.getDate() + ' ' + months[dateTime.getMonth()] 
    + ' ' + dateTime.getFullYear();

    const time = (dateTime.getHours() < 10 ? '0' : '') + (dateTime.getHours()) + ':' + 
    (dateTime.getMinutes() < 10 ? '0' : '') + dateTime.getMinutes();

    return date + ' ' + time;
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
    <div className="homeMemoWrapper">
      {window.innerWidth > 1500 &&
      <button className="addNewButton" 
        style={{width: '125px', float: 'right', marginRight: '1em'}}
        onClick={() => props.handlePopUp()}>
          Add new memo
      </button>
      }
      
      <h1>Memos</h1>
      {props.memos.map(m => 
        checkSearchValue(m) && checkFilter(m) && (
          <Memo key={m.id} memo={m} delete={deleteMemo} tags={props.tags} 
            handleMemoInEdit={props.handleMemoInEdit} refreshMemos={props.refreshMemos}
            getTime={getTime}/>
        ))}
    </div>
  );
}

export default HomeMemos;