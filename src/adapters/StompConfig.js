const getStompConfig = (accessToken) => {
  if (!accessToken) {
    return null;
  }
  return {
    websocketUrl: `${APP_WEB_SOCKET_BASE_URL}/v1/game-events`,
    connectHeaders: { Authorization: accessToken },
  };
};

export default getStompConfig;
