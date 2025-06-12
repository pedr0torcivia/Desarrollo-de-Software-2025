const Keycloak = require('keycloak-connect');

const keycloak = new Keycloak({}, {
    clientId: '////',
    bearerOnly: true,
    serverUrl: 'http://localhost:8080/auth',
    realm: 'comercio',
    credentials: {
        secret: '///'
    }
});

module.exports = { keycloak };
