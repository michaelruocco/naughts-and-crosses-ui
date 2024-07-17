import { useContext, createContext, useState, useRef } from 'react';
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
  const [refreshToken, setRefreshToken] = useState(
    localStorage.getItem('refreshToken'),
  );
  const navigate = useNavigate();
  const publicClient = new PublicApiClient();

  const autoLogout = () => {
    logout();
    navigate('/login');
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

  const refreshAccessToken = async () => {
    if (isExpired(refreshToken)) {
      autoLogout();
      return;
    }
    try {
      const response = await publicClient.refreshToken(refreshToken);
      await updateStorage(response);
    } catch (e) {
      autoLogout();
    }
  };

  const isExpired = (token) => {
    if (!token) {
      return true;
    }
    const { exp } = jwtDecode(token);
    return exp < Date.now() / 1000;
  };

  const logoutIfTokensExpired = () => {
    if (!user) {
      return;
    }
    if (isExpired(refreshToken)) {
      autoLogout();
    }
    if (isExpired(accessToken)) {
      refreshAccessToken();
    }
  };

  const tokenRef = useRef(null);
  tokenRef.current = setInterval(() => {
    logoutIfTokensExpired();
  }, 5000);

  const login = async (username, password) => {
    const response = await publicClient.getToken(username, password);
    await updateStorage(response);
    setRefreshToken(response.refreshToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    setTimeout(autoLogout, toExpiryMillis(response.refreshToken, 60));
  };

  const toExpiryMillis = (token, bufferSeconds) => {
    const { exp } = jwtDecode(token);
    const millis = (exp - Date.now() / 1000 - bufferSeconds) * 1000;
    return millis;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    setRefreshToken(null);
    localStorage.removeItem('refreshToken');
  };

  const userIsMemberOfAtLeastOne = (permittedGroups) => {
    return user && user.groups.some((group) => permittedGroups.includes(group));
  };

  const isAuthedUsername = (username) => {
    return user.username === username;
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        user,
        login,
        logout,
        userIsMemberOfAtLeastOne,
        isAuthedUsername,
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
