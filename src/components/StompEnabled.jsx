import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import getStompConfig from 'adapters/StompConfig';
import { useAuth } from '../hooks/AuthProvider';

const StompEnabled = ({ children }) => {
  const { token } = useAuth();
  const stompConfig = getStompConfig(token);
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
