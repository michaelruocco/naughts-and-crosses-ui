import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  }
  return <Navigate replace to="/login" />;
};
export default PrivateRoute;
