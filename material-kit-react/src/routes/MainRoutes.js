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
import GridPage from 'src/pages/GridPage';
import Book from 'src/pages/Book';
import NewBook from 'src/pages/book/NewBook';

function MainRoutes() {
  const element = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <Navigate to="/dashboard/app" /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        {
          path: 'book',
          children: [
            { index: true, element: <Book /> },
            { path: 'new', element: <NewBook /> },
          ],
        },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
        { path: 'grid', element: <GridPage /> },
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
