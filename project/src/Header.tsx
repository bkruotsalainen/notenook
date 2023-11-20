import './css/Header.css'

function Header() {

  return (
    <div className="header">
      <div className="right">
       <a href="">Logout</a>
      </div>      
      
      <div className="left">
        <ul className="headerLinks">
          <li>
            <a href="">Calendar</a>
          </li>
          <li>
            <a href="">Notes</a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header