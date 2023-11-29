import '../css/Header.css';
import Clock from './Clock';

function Header({collapseWidth, handleTodoDisplay, handleMemoDisplay, handleLogin, handleSettingsPopUp}: HeaderProps) {

  return (
    <div className="header"> 
      <div className="right">
        <ul className="headerLinks"> 
          {window.innerWidth > 800 &&
          <li className="homeLink">
            <Clock />
          </li>
          }
          <li className="right" onClick={() => handleSettingsPopUp()}>
            🕗 Settings
          </li>
          <li className="right" onClick={() => handleLogin()}>
            🚪Logout
          </li>    
        </ul>    
      </div>  
      
      <div className="left">
        <ul className="headerLinks">
          {window.innerWidth > 800 &&
          <li className="headerTitle">
            NoteNook
          </li>
          }
          {window.innerWidth < collapseWidth &&
        <>
          <li className="homeLink" onClick={() => handleTodoDisplay()}>
            📅 To do
          </li>
          <li className="homeLink" onClick={() => handleMemoDisplay()}>
            📝 Memos
          </li>
        </>}
        </ul>
      </div>
    </div>
  );
}

export default Header;