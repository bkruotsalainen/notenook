import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { compare, genSalt, hash } from 'bcrypt-ts';

import '../css/Login.css';
import userService from '../services/userService';

function Login({handleLogin}: LoginProps) {
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
      await userService.getAll().then((response) => {
        const user = response.data.filter((u: User) => u.email === email);
  
        compare(password, user[0].password).then((result) => {
          if (result) {
            setAlert('');
            setEmail('');
            setPassword('');
  
            handleLogin();
          } else {
            setAlert('Wrong password or email!');
            setMessage('');
          }
        });
      });
    } catch(error) {
      console.log(error);
    } 
  };

  const submitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    genSalt(10)
      .then((salt) => hash(password, salt))
      .then(async (hash) => {
        const newUser = {
          id: uuidv4(),
          email: email,
          password: hash,
          createdAt: Date.now(),
          timezone: new Date().getTimezoneOffset()
        };
    
        try {
          await userService.getAll().then(async (response) => {
            const user = response.data.filter((u: User) => u.email === email);
    
            if (user.length === 0) {
              await userService.create(newUser);
              setAlert('');
              setMessage('Registration was success! You can now log in. 👽');
              setEmail('');
              setPassword('');
              setLoginActive(true);
            } else {
              setAlert('User with this email already exists!');
            }
          }
          );
        } catch (error) {
          console.error(error);
        }
      });
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
    <>
      <div className="loginView">
        <div className="loginDiv">
          <h1 style={{textAlign: 'center', marginBottom: '1em'}}>{loginActive ? 'Login' : 'Register'}</h1>

          {<p className="alertText">{alert}</p>}
          {<p className="messageText">{message}</p>}

          <form onSubmit={(e) => (loginActive ? submitLogin(e) : submitRegister(e))}>
            <label>E-mail
              <input type='email' className="loginInput" value={email}
                onChange={(e) => setEmail(e.target.value)}/>
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