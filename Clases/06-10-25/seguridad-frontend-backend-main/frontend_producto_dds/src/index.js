// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactKeycloakProvider } from '@react-keycloak/web';
import keycloak from './keycloak';
import App from './App';

const keycloakProviderInitConfig = {
  // que valores posibles tiene onLoad
  // onLoad: 'check-sso',
  // onLoad: 'login-required',
  // onLoad: 'login-required',
  // onLoad: 'none',
  onLoad: 'none',
  checkLoginIframe: false,
  redirectUri: "http://localhost:3000/callback",
};

const root = createRoot(document.getElementById('root'));

root.render(
  <ReactKeycloakProvider authClient={keycloak} initOptions={keycloakProviderInitConfig}>
    <App />
  </ReactKeycloakProvider>
);
