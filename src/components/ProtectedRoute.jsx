import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    return <Navigate replace to="/login" />;
  }
  return children;
};
export default ProtectedRoute;
