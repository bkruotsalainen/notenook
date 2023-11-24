import '../css/Header.css';

function Header() {
  const displayStyle = {
    display: 'none'
  };

  return (
    <div className="header">
      <div className="right">
          Logout
      </div>      
      
      <div className="left">
        <ul className="headerLinks" style={displayStyle}>
          <li className="homeLink">
            To do
          </li>
          <li className="homeLink">
            Notes
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;