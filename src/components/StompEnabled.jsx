import React from 'react';
import { StompSessionProvider } from 'react-stomp-hooks';
import getStompConfig from 'adapters/StompConfig';

const StompEnabled = ({ children }) => {
  const stompConfig = getStompConfig();
  console.log(`stomp config ${JSON.stringify(stompConfig)}`);
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
