import { useEffect, useState } from 'react';
import axios from 'axios';

import CalendarObject from './CalendarObject';
import FilterButton from './FilterButton';

function HomeMenu(props: HomeMenuProps) {
  const [filters, setFilters] = useState<Filter[]>([]);


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
  return (
    <>
      <div className="homeMenuWrapper">
        <CalendarObject />
        <input placeholder="🔍 Search" className="searchInput" 
          onChange={(e) => props.handleSearch(e)}>
        </input>

        <button className="addNewButton" onClick={() => props.handlePopUp()}>Add new to do</button>

        <h3 className="hideMobile">Filter</h3>
        {filters.map(f => {return <FilterButton key={f.id} filterIcon={f.icon}/>;})}
      </div>
    </>
  );
}

export default HomeMenu;