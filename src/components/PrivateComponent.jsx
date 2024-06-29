import { useAuth } from '../hooks/AuthProvider';

const PrivateComponent = ({ children }) => {
  const { user } = useAuth();
  if (user) {
    return children;
  }
  return <></>;
};
export default PrivateComponent;
