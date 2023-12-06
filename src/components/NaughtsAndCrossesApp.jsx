

import { StompSessionProvider } from 'react-stomp-hooks';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import ResponsiveAppBar from 'components/ResponsiveAppBar';
import { Box } from '@mui/system';
import { Routes, Route } from 'react-router-dom';
import GameListPage from 'components/GameListPage';
import GameDetailPage from 'components/GameDetailPage';
import { useKeycloak } from '@react-keycloak/web';

const NaughtsAndCrossesApp = () => {
  const { keycloak } = useKeycloak();

  if (!keycloak.authenticated) {
    console.debug(`not authenticated so returning null`);
    return null;
  }

  const buildWebsocketUrl = () => {
    return `${APP_WEB_SOCKET_BASE_URL}/v1/game-events`;
  };
  
  const websocketUrl = buildWebsocketUrl();
  const connectHeaders = {Authorization: keycloak.token};
  console.debug(`configuring websocket with url ${websocketUrl} and connect headers ${JSON.stringify(connectHeaders)}`);

  return (
      <StompSessionProvider url={buildWebsocketUrl()} connectHeaders={connectHeaders}>
        <CssBaseline />
        <BrowserRouter>
          <ResponsiveAppBar />
          <Box m={5}>
            <Routes>
              <Route path="/" element={<GameListPage />} />
              <Route path="/game/:id" element={<GameDetailPage />} />
            </Routes>
          </Box>
        </BrowserRouter>
      </StompSessionProvider>
  );
};
export default NaughtsAndCrossesApp;





