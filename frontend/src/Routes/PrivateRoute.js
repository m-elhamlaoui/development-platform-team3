import { Navigate } from 'react-router-dom';
import React from 'react';

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;