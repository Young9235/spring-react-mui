import React from 'react';
import NotFound from 'src/pages/Page404';
import Products from 'src/pages/Products';
import DashboardApp from 'src/pages/DashboardApp';
import User from 'src/pages/User';
import Blog from 'src/pages/Blog';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';

function MainRoutes() {
  const element = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
  return element;
}

export default MainRoutes;
