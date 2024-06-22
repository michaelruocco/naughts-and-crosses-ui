import { useContext, createContext, useState } from 'react';
import PublicApiClient from 'adapters/PublicApiClient';
import PrivateApiClient from 'adapters/PrivateApiClient';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const publicClient = new PublicApiClient();

  const login = async (username, password) => {
    const response = await publicClient.getToken(username, password);
    setToken(response.accessToken);
    localStorage.setItem('token', response.accessToken);

    const privateClient = new PrivateApiClient(response.accessToken);
    const decoded = jwtDecode(response.accessToken);
    const user = await privateClient.getUser(decoded.username);
    setUser(user);
    return;
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
