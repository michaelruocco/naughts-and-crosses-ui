import React from 'react';
import ReactDOM from 'react-dom/client';
import Keycloak from "keycloak-js";
import { ReactKeycloakProvider } from '@react-keycloak/web';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './styles/app.css';

import NaughtsAndCrossesApp from 'components/NaughtsAndCrossesApp';

const keycloakClient = new Keycloak({
  url: APP_AUTH_URL,
  realm: APP_AUTH_REALM,
  clientId: APP_AUTH_CLIENT_ID,
 });

 const keycloakInitOptions = {
  onLoad: 'login-required',
  checkLoginIframe: false,
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <ReactKeycloakProvider authClient={keycloakClient} initOptions={keycloakInitOptions}>
    <NaughtsAndCrossesApp />
  </ReactKeycloakProvider>
);
