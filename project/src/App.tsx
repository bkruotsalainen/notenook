import { useState } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import './css/App.css';

function App() {
  const [login, setLogin] = useState<boolean>(true);
  const [id, setId] = useState<string>('');
  
  const handleLogin = () => {
    setLogin(!login);
  };

  const handleId = (userId: string) => {
    setId(userId);
  };


  return (
    <>
      {login
        ? <Login handleLogin={handleLogin} handleId={handleId}/> 
        : <Home handleLogin={handleLogin} id={id}/>
      }
    </>
  );
}

export default App;