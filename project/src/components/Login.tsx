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
      const user = response.data.filter((u: User) => u.email === username);
      console.log(user);

      if (user[0].password === (password)) {
        setUsername('');
        setPassword('');

        console.log(response.status);
        console.log('Login!');
      } else {
        console.log('Wrong password or username!');
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
      const response = await axios.get('http://localhost:3000/users/');
      const user = response.data.filter((u: User) => u.email === username);

      if (user.length === 0) {
        await axios.post('http://localhost:3000/users', newUser);
        setUsername('');
        setPassword('');
      } else {
        console.log('User with this email already exists!');
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleLoginActive = () => {
    setLoginActive(!loginActive);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <div className="loginView">
        <div className="loginDiv">
          <h1 style={{textAlign: 'center', marginBottom: '1em'}}>{loginActive ? 'Login' : 'Register'}</h1>

          <form onSubmit={(e) => (loginActive ? submitLogin(e) : submitRegister(e))}>
            <label>E-mail
              <input type='email' className="loginInput" value={username}
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
          
          <a onClick={() => handleLoginActive()}>
            { (loginActive) 
              ? 'Create one!'
              : 'Login!'
            }
          </a>

          <div style={{marginBottom: '2em'}} />

        </div>
      </div>
    </>
  );
}

export default Login;