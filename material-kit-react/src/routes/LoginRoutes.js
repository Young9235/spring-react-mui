import React from 'react';
import Login from 'src/pages/Login';
import Register from 'src/pages/Register';
import { Navigate, useRoutes } from 'react-router-dom';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';

function LoginRoutes() {
  const element = useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/login" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/login" replace />,
    },
  ]);
  return element;
}

export default LoginRoutes;
