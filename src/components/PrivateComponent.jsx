import { useAuth } from '../hooks/AuthProvider';

const PrivateComponent = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <></>;
  }
  return children;
};
export default PrivateComponent;
