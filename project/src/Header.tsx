import './css/Header.css';

function Header() {

  return (
    <div className="header">
      <div className="right">
        <a href="">Logout</a>
      </div>      
      
      <div className="left">
        <ul className="headerLinks">
          <li className="homeLink">
            <a href="">Home</a>
          </li>
          <li>
            <a href="">To-do</a>
          </li>
          <li>
            <a href="">Notes</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;