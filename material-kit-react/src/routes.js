import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from 'src/layouts/dashboard';
import LogoOnlyLayout from 'src/layouts/LogoOnlyLayout';
//
import Login from 'src/pages/Login';
import NotFound from 'src/pages/Page404';
import Register from 'src/pages/Register';
import Products from 'src/pages/Products';
import DashboardApp from 'src/pages/DashboardApp';
import User from 'src/pages/User';
import Blog from 'src/pages/Blog';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: 'login',
      element: <Login />,
    },
    {
      path: 'register',
      element: <Register />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
