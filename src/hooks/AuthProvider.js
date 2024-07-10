import { useContext, createContext, useState } from 'react';
import PublicApiClient from 'adapters/PublicApiClient';
import UserApiClient from 'adapters/UserApiClient';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem('accessToken'),
  );
  const navigate = useNavigate();
  const publicClient = new PublicApiClient();

  const isExpired = (token) => {
    if (!token) {
      return true;
    }
    const { exp } = jwtDecode(token);
    return exp < Date.now() / 1000;
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (isExpired(refreshToken)) {
      autoLogout();
      return;
    }
    const response = await publicClient.refreshToken(refreshToken);
    await updateStorage(response);
  };

  const updateStorage = async (response) => {
    setAccessToken(response.accessToken);
    localStorage.setItem('accessToken', response.accessToken);

    const privateClient = new UserApiClient(response.accessToken);
    const { username } = jwtDecode(response.accessToken);
    const user = await privateClient.get(username);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
    setTimeout(refreshAccessToken, toExpiryMillis(response.accessToken, 5));
  };

  const login = async (username, password) => {
    const response = await publicClient.getToken(username, password);
    await updateStorage(response);
    localStorage.setItem('refreshToken', response.refreshToken);
    setTimeout(autoLogout, toExpiryMillis(response.refreshToken, 60));
  };

  const toExpiryMillis = (token, bufferSeconds) => {
    const { exp } = jwtDecode(token);
    const millis = (exp - Date.now() / 1000 - bufferSeconds) * 1000;
    return millis;
  };

  const autoLogout = () => {
    logout();
    navigate('/login');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  const userIsMemberOfAtLeastOne = (permittedGroups) => {
    return user && user.groups.some((group) => permittedGroups.includes(group));
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
        userIsMemberOfAtLeastOne,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
