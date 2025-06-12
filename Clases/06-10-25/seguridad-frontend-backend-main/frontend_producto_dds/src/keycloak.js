// src/keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
  url: 'http://localhost:8080/auth',  // URL de tu instancia de Keycloak
  realm: 'comercio',  // Tu realm
  clientId: 'frontend',  // Tu client ID
};

const keycloak = new Keycloak(keycloakConfig);

export default keycloak;
