import React, { useRef, useState } from 'react';

import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Toast } from 'primereact/toast';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useRef(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.current.show({ severity: 'warn', summary: 'Passwords do not match!' });
      return;
    }
    try {
      await axios.post(`${process.env.REACT_APP_AUTH_API}/users/register`, {
        username,
        password,
        confirmPassword,
      });
      toast.current.show({ severity: 'success', summary: 'Registration Successful', detail: 'Please login.' });
    } catch (error) {
      toast.current.show({ severity: 'error', summary: 'Registration Failed', detail: 'Please try again.' });
    }
  };

  return (
    <div className="p-d-flex p-jc-center p-flex-column p-align-items-center">
      <Toast ref={toast} />
      <Card title="Register" className="p-shadow-3 form-container">
        <form onSubmit={handleRegister}>
          <div className="p-field">
            <label htmlFor="username">Username</label>
            <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="p-field">
            <label htmlFor="password">Password</label>
            <Password id="password" value={password} onChange={(e) => setPassword(e.target.value)} required toggleMask />
          </div>
          <div className="p-field">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <Password id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required toggleMask />
          </div>
          <Button type="submit" label="Register" className="p-mt-2" />
        </form>
      </Card>
    </div>
  );
};

export default Register;
