import { useState } from 'react';

function FilterButton({id, filterIcon, handleFilters}: FilterButtonProps) {
  const [filterStatus, setFilterStatus] = useState<boolean>(false);

  const filterStyle = {
    'backgroundColor': filterStatus ? '#FABB29' : '#F5F1EB'
  };
  
  const changeFilterStatus = () => {
    setFilterStatus(!filterStatus);
    handleFilters(id);
  };
  
  return (
    <button className="filterToggleButton" onClick={() => changeFilterStatus()} 
      style={filterStyle}>{filterIcon}</button>
  );
}

export default FilterButton;