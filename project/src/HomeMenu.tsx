import { useEffect, useState } from "react";
import axios from "axios";

import CalendarObject from "./CalendarObject"
import FilterButton from "./FilterButton"

function HomeMenu() {
  const [filters, setFilters] = useState<Filter[]>([]);

  useEffect (() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tags/');
        setFilters(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data', error)
      }
    };

    fetchData();
  },
    []);

  return (
    <>
    <div className="homeMenuWrapper">
      <CalendarObject />
      <input placeholder="🔍 Search" className="searchInput">
      </input>

      <button className="addNewButton">Add new</button>

      <h3 className="hideMobile">Filter</h3>
        {filters.map(f => {return <FilterButton key={f.id} filterIcon={f.icon}/>})}
    </div>
    </>
  )
}

export default HomeMenu