// src/pages/PublicPage.js
import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';

const PublicPage = () => {
  return (
    <Container className="my-5">
      <Row className="mb-5">
        <Col lg={6}>
          <h1>¡Bienvenido a Administrador de Productos!</h1>
          <p>
            Descubre una manera fluida de gestionar tus productos, llevar un registro del inventario,
            y entender las tendencias de tus ventas. Regístrate hoy para desbloquear todo el potencial
            del Administrador de Productos para tu negocio.
          </p>
          <Button variant="primary" href="/registro">Registrarse</Button>
        </Col>
        <Col lg={6}>
          <img src="https://source.unsplash.com/random/500x300" alt="Ilustración de producto" className="img-fluid"/>
        </Col>
      </Row>
      <Row>
        {Array.from({ length: 3 }).map((_, index) => (
          <Col md={4} key={index}>
            <Card className="mb-4">
              <Card.Img variant="top" src={`https://source.unsplash.com/random/150x150?sig=${index}`} />
              <Card.Body>
                <Card.Title>Característica {index + 1}</Card.Title>
                <Card.Text>
                  Explora las increíbles características del Administrador de Productos para optimizar las operaciones de tu negocio.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PublicPage;
