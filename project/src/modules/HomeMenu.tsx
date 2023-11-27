import CalendarObject from './CalendarObject';
import FilterButton from './FilterButton';

function HomeMenu(props: HomeMenuProps) {
  return (
    <>
      <div className="homeMenuWrapper">
        <CalendarObject />
        <input placeholder="🔍 Search" className="searchInput" 
          onChange={(e) => props.handleSearch(e)}>
        </input>
        
        {props.showTodo &&
          <button className="addNewButton" onClick={() => props.handlePopUp()}>Add new to do</button>
        }

        <h3 className="hideMobile">Filter</h3>
        {props.tags.map(f => {return <FilterButton key={f.id} id={f.id}
          filterIcon={f.icon} handleFilters={props.handleFilters}/>;})}
      </div>
    </>
  );
}

export default HomeMenu;