import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate replace to="/login" />;
  }
  return children;
};
export default PrivateRoute;
