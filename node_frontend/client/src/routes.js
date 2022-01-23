import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/Page404';

// ----------------------------------------------------------------------

const Route = () => {
  const route = useRoutes([
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { element: <Navigate to="/login" replace /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> }
        // { path: '/', element: <Navigate to="/dashboard" /> },
        // { path: '*', element: <Navigate to="/404" /> }
      ]
    }
    // { path: '*', element: <Navigate to="/404" replace /> }
  ]);

  return route;
};

export default Route;
