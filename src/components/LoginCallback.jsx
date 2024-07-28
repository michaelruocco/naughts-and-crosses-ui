import { useAuth } from '../hooks/AuthProvider';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const LoginCallback = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const parseAuthCode = (params) => {
    return new URLSearchParams(params).get('code');
  };

  const handleCallback = async () => {
    const uriParts = window.location.href.split('?');
    const request = {
      redirectUri: uriParts[0],
      authCode: parseAuthCode(uriParts[1]),
    };
    await auth.callbackLogin(request);
    navigate('/');
  };

  useEffect(() => {
    handleCallback();
  }, []);
};
export default LoginCallback;
