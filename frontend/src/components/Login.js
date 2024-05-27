import React, { useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken, setUsername }) => {
  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const toast = useRef(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_AUTH_API}/users/login`, {
        username: localUsername,
        password,
      });
      const token = response.data.token;
      setToken(token);
      setUsername(localUsername);
      localStorage.setItem('token', token);
      localStorage.setItem('username', localUsername);
      toast.current.show({ severity: 'success', summary: 'Login Successful', detail: 'Welcome!' });
      navigate('/workouts');
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Login Failed', detail: 'Please check your credentials.' });
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-flex-column p-align-items-center">
      <Toast ref={toast} />
      <Card title="Login" className="p-shadow-3 form-container">
        <form onSubmit={handleLogin}>
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText id="username" value={localUsername} onChange={(e) => setLocalUsername(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required toggleMask />
          </div>
          <Button type="submit" label="Login" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
};

export default Login;