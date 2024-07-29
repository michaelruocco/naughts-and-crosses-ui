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

  const toUser = async (response) => {
    const privateClient = new UserApiClient(response.accessToken);
    return await privateClient.get(response.username);
  };

  const updateStorage = async (response) => {
    const accessToken = response.accessToken;
    setAccessToken(accessToken);
    localStorage.setItem('accessToken', accessToken);
    const user = await toUser(response);
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const refreshAccessToken = async () => {
    if (refreshToken) {
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

  const logoutIfLoggedInAndTokensExpired = () => {
    if (!user) {
      return;
    }
    if (isExpired(accessToken)) {
      refreshAccessToken();
    }
  };

  const tokenRef = useRef(null);
  tokenRef.current = setInterval(() => {
    logoutIfLoggedInAndTokensExpired();
  }, 5000);

  const login = async (username, password) => {
    const response = await publicClient.getToken(username, password);
    await updateStorage(response);
    setRefreshToken(response.refreshToken);
    localStorage.setItem('refreshToken', response.refreshToken);
  };

  const callbackLogin = async (request) => {
    const response = await publicClient.exchangeAuthCodeForToken(request);
    await updateStorage(response);
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
        callbackLogin,
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
