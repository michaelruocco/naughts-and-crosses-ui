import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import getStompConfig from 'adapters/StompConfig';
import { useAuth } from '../hooks/AuthProvider';

const StompEnabled = ({ children }) => {
  const { accessToken } = useAuth();
  const stompConfig = getStompConfig(accessToken);
  if (!stompConfig) {
    return children;
  }
  return (
    <StompSessionProvider
      url={stompConfig.websocketUrl}
      connectHeaders={stompConfig.connectHeaders}
    >
      {children}
    </StompSessionProvider>
  );
};
export default StompEnabled;
