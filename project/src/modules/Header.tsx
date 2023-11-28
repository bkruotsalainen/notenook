import '../css/Header.css';

function Header({handleTodoDisplay, handleMemoDisplay}: HeaderProps) {

  return (
    <div className="header">
      <div className="right">
          Logout
      </div>      
      
      <div className="left">
        <ul className="headerLinks">
          <li className="homeLink" onClick={() => handleTodoDisplay()}>
            To do
          </li>
          <li className="homeLink" onClick={() => handleMemoDisplay()}>
            Memos
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;