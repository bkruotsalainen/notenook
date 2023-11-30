import CalendarObject from './CalendarObject';
import FilterButton from './FilterButton';

function HomeMenu(props: HomeMenuProps) {
  return (
    <>
      <div className="homeMenuWrapper">
        <CalendarObject todos={props.todos}/>
        <input placeholder="🔍 Search" className="searchInput" 
          onChange={(e) => props.handleSearch(e)}>
        </input>
        
        {props.showTodo &&
          <button className="addNewButton" onClick={() => props.handleTodoPopup()}>Add new to do</button>
        }

        {!props.showTodo &&
          <button className="addNewButton" onClick={() => props.handleMemoPopup()}>Add memo</button>
        }

        <h3 className="hideMobile">Filter</h3>
        {props.tags.map(f => {return <FilterButton key={f.id} id={f.id}
          filterIcon={f.icon} handleFilters={props.handleFilters}/>;})}
      </div>
    </>
  );
}

export default HomeMenu;