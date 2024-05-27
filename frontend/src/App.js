import 'primeicons/primeicons.css';

import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import React, { useState } from 'react';

import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import Login from './components/Login';
import { Menubar } from 'primereact/menubar';
import PrivateRoute from './Routes/PrivateRoute';
import Progress from './components/Progress';
import Register from './components/Register';
import Workouts from './components/Workouts';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogout = () => {
    setToken('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  };

  const items = [
    { label: 'Workouts', icon: 'pi pi-fw pi-briefcase', command: () => window.location = '/workouts', visible: !!token },
    { label: 'Progress', icon: 'pi pi-fw pi-chart-line', command: () => window.location = '/progress', visible: !!token }
  ];

  const end = token ? (
    <div className="menubar-end p-d-flex p-ai-center">
      <Avatar icon="pi pi-user" className="p-mr-2 menubar-item" />
      <span className="p-mr-2 menubar-item">{username}</span>
      <i className="pi pi-sign-out menubar-item" style={{ cursor: 'pointer' }} onClick={handleLogout} />
    </div>
  ) : null;

  return (
    <Router>
      <div className="p-d-flex p-jc-center p-flex-column p-align-items-center">
        <Menubar model={items} end={end} className="menubar-custom" />
        <Routes>
          <Route path="/login" element={<Login setToken={setToken} setUsername={setUsername} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/workouts" element={<PrivateRoute token={token}><Workouts token={token} /></PrivateRoute>} />
          <Route path="/progress" element={<PrivateRoute token={token}><Progress token={token} /></PrivateRoute>} />
          <Route path="/" element={<h2>Welcome to the Fitness Tracker App</h2>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;