import CalendarObject from "./CalendarObject"
import FilterButton from "./FilterButton"

function HomeMenu() {
  return (
    <>
    <div>
      <CalendarObject />
      <input placeholder="Search" className="searchInput"></input>

      <button className="addNewButton">Add new</button>

      <h3 className="hideMobile">Filter</h3>
        <FilterButton filterIcon="🎉" />
        <FilterButton filterIcon="👽" />
        <FilterButton filterIcon="🍕" />
        <FilterButton filterIcon="🧼" />
        <FilterButton filterIcon="⭐" />
    </div>
    </>
  )
}

export default HomeMenu