import { useContext } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

import { AuthContext } from './context/auth-context';

function ProtectedRoute({ children }) {
  const auth = useContext(AuthContext);
  console.log('Fucker logged in ', auth.isLoggedIn);
  const location = useLocation();

  if (auth.isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace />;
}
export default ProtectedRoute;
