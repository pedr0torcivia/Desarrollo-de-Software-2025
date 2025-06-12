
// src/components/Navbar.js
import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useKeycloak } from "@react-keycloak/web";

const AppNavbar = () => {

  const { keycloak } = useKeycloak();

  const handleLogout = () => {
    keycloak.logout();
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Administrador de Productos</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/productos">
              <Nav.Link>Lista Productos</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/productos/editar">
              <Nav.Link disabled={!keycloak.hasRealmRole('admin')}>Nuevo Producto</Nav.Link>
            </LinkContainer>
          </Nav>
          {keycloak.authenticated ? (
            <Nav>
              <NavDropdown title={keycloak.tokenParsed?.preferred_username || 'User'} id="basic-nav-dropdown">
                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
