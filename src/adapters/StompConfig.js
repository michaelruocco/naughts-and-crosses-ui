const getStompConfig = (token) => {
  if (!token) {
    return null;
  }
  return {
    websocketUrl: `${APP_WEB_SOCKET_BASE_URL}/v1/game-events`,
    connectHeaders: { Authorization: token },
  };
};

export default getStompConfig;
