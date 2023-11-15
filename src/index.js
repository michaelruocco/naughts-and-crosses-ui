import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { StompSessionProvider } from 'react-stomp-hooks';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/app.css';

import NaughtsAndCrossesApp from 'components/NaughtsAndCrossesApp';

const buildWebsocketUrl = () => {
  return `${APP_WEB_SOCKET_BASE_URL}/v1/game-events`;
};

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
const webSocketUrl = buildWebsocketUrl();
console.log('webSocketUrl', webSocketUrl);

root.render(
  <React.StrictMode>
    <CssBaseline />
    <BrowserRouter>
      <StompSessionProvider url={webSocketUrl}>
        <NaughtsAndCrossesApp />
      </StompSessionProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
