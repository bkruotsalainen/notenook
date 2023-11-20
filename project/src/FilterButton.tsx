import { useState } from "react";

function FilterButton(props: FilterButtonProps) {
  const [filterStatus, setFilterStatus] = useState<boolean>(false);

  const filterStyle = {
    "backgroundColor": filterStatus ? "#FABB29" : "#F5F1EB"
  }
  
  const changeFilterStatus = () => {
      setFilterStatus(!filterStatus);
  }

  return (
    <button className="filterToggleButton" onClick={() => changeFilterStatus()} style={filterStyle}>{props.filterIcon}</button>
  )
}

export default FilterButton