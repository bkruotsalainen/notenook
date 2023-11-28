import '../css/Header.css';
import Clock from './Clock';

function Header({handleTodoDisplay, handleMemoDisplay, handleLogin, handleSettingsPopUp}: HeaderProps) {

  return (
    <div className="header"> 
      <div className="right">
        <ul className="headerLinks"> 
          <li className="homeLink">
            <Clock />
          </li>
          <li className="right" onClick={() => handleSettingsPopUp()}>
            🕗 Settings
          </li>
          <li className="right" onClick={() => handleLogin()}>
            🚪Logout
          </li>    
        </ul>    
      </div>  
      
      <div className="left">
        {window.innerWidth < 1200 &&
        <ul className="headerLinks">
          <li className="homeLink" onClick={() => handleTodoDisplay()}>
            📅 To do
          </li>
          <li className="homeLink" onClick={() => handleMemoDisplay()}>
            📝 Memos
          </li>
        </ul>
        }
      </div>
    </div>
  );
}

export default Header;