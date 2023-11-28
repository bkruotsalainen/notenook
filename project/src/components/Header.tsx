import '../css/Header.css';

function Header({handleTodoDisplay, handleMemoDisplay, handleLogin}: HeaderProps) {

  return (
    <div className="header">
      <div className="right" onClick={() => handleLogin()}>
          Logout
      </div>      
      
      <div className="left">
        {window.innerWidth < 1200 &&
        <ul className="headerLinks">
          <li className="homeLink" onClick={() => handleTodoDisplay()}>
            To do
          </li>
          <li className="homeLink" onClick={() => handleMemoDisplay()}>
            Memos
          </li>
        </ul>
        }
      </div>
    </div>
  );
}

export default Header;