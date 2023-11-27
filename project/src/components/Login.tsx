import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import '../css/Login.css';
import axios from 'axios';

function Login() {
  const [loginActive, setLoginActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<string>('password');

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handlePasswordShown = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();

    if (showPassword === 'password') {
      setShowPassword('text');
    } else {
      setShowPassword('password');
    }
  };

  const submitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get('http://localhost:3000/users/');
      if (response.data.password === (password)) {
        setUsername('');
        setPassword('');

        console.log(response.status);
      } else {
        console.log('Wrong password or username!');
        console.error(401);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newUser = {
      id: uuidv4(),
      username: username,
      password: password,
      createdAt: Date.now(),
      timezone: new Date().getTimezoneOffset()
    };

    try {
      const response = await axios.post('http://localhost:3000/users', newUser);
      console.log(response);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="loginView">
        <div className="loginDiv">
          <h1 style={{textAlign: 'center', marginBottom: '1em'}}>{loginActive ? 'Login' : 'Register'}</h1>

          <form onSubmit={(e) => (loginActive ? submitLogin(e) : submitRegister(e))}>
            <label>Username
              <input type='text' className="loginInput" value={username}
                onChange={(e) => setUsername(e.target.value)}/>
            </label>

            <label>Password
              <input type={showPassword} className="loginInput" value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </label>

            {(password !== '') &&
            <div className="showPasswordDiv">
              <span onClick={(e) => handlePasswordShown(e)}
                className="loginPasswordButton">
                👁️ 
                {(showPassword === 'password')
                  ? ' Show password'
                  : ' Hide password'
                }
              </span>
            </div>
            }

            <div style={{marginBottom: '3em'}} />

            <button className="loginButton" type="submit">
              {loginActive ? 'Login' : 'Register'}
            </button>
          </form>
          
          <div style={{marginBottom: '2em'}} />

          { (loginActive) 
            ? 'No account? '
            : 'Already have an account? '
          }
          
          { (loginActive) 
            ? <a onClick={() => setLoginActive(false)}>Create one!</a>
            : <a onClick={() => setLoginActive(true)}>Login!</a>
          }
          <div style={{marginBottom: '2em'}} />

        </div>
      </div>
    </>
  );
}

export default Login;