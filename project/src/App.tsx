import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './css/App.css';

function App() {
  const [login, setLogin] = useState<boolean>(false);
  
  const handleLogin = () => {
    setLogin(!login);
  };

  return (
    <>
      {login
        ? <Login handleLogin={handleLogin}/> 
        : <Home handleLogin={handleLogin}/>
      }
    </>
  );
}

export default App;