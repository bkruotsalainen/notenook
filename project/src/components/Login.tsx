import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { compare, genSalt, hash } from 'bcrypt-ts';

import '../css/Login.css';
import userService from '../services/userService';
import axios from 'axios';

function Login({handleLogin, handleId}: LoginProps) {
  const [loginActive, setLoginActive] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<string>('password');

  const [alert, setAlert] = useState<string>('');
  const [message, setMessage] = useState<string>('');
 
  const [email, setEmail] = useState<string>('');
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
      const response = await userService.getAll();
      const user = response.find((u: User) => u.email === email);
  
      if (user) {
        const result = await compare(password, user.password);
  
        if (result) {
          setAlert('');
          setEmail('');
          setPassword('');
          handleId(user.id);
          handleLogin();
        } else {
          setAlert('Wrong password!');
          setMessage('');
        }
      } else {
        if (email === '' || password === '') {
          setAlert('Do not forget your email or password!');
          setMessage('');     
        } else {
          setAlert('User with this e-mail was not found!');
          setMessage('');
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };  

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const salt = await genSalt(10);
      const hashedPassword = await hash(password, salt);
  
      const newUser = {
        id: uuidv4(),
        email: email,
        password: hashedPassword,
        createdAt: Date.now(),
        timezone: new Date().getTimezoneOffset(),
      };

      const response = await axios.get('http://localhost:3000/users');
      const existingUser = response.data.find((u: User) => u.email === email);
 
      if (!existingUser && email !== '' && password !== '') {
        await userService.create(newUser);
        setAlert('');
        setMessage('Success! You can now log in. 👽');
        setEmail('');
        setPassword('');
        setLoginActive(true);
      } else {
        if (email === '' || password === '') {
          setAlert('No empty fields!');
        } else {
          setAlert('User with this email already exists!');
        }
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };
  
  const handleLoginActive = () => {
    setLoginActive(!loginActive);
    setEmail('');
    setPassword('');
    setAlert('');
    setMessage('');
    setShowPassword('password');
  };

  return (
    <div style={{width: '100vw'}}>
      <div className="loginImg">
      </div>

      <div className="loginView">
        
        <div className="hideMobile">
          <p className="loginTitleSmall">Welcome to</p>
          <p className="loginTitle">NoteNook!</p>
        </div>
        
        <div className="loginDiv">


          <div className="loginFormWrapper">
        
            <div className="showMobile">
              <p className="loginTitleSmall">Welcome to</p>
              <p className="loginTitle">NoteNook!</p>
            </div>

            {<p className="alertText">{alert}</p>}
            {<p className="messageText">{message}</p>}

            <form onSubmit={(e) => (loginActive ? submitLogin(e) : submitRegister(e))}>
              <label>E-mail
                <input type='email' className="loginInput" value={email}
                  onChange={(e) => setEmail(e.target.value)} autoComplete="username"/>
              </label>

              <label>Password
                <input type={showPassword} className="loginInput" value={password}
                  onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"/>
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
                {loginActive ? 'LOGIN' : 'REGISTER'}
              </button>
            </form>
          
            <div style={{marginBottom: '2em'}} />

            <center>
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
            </center>

            <div style={{marginBottom: '2em'}} />

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;