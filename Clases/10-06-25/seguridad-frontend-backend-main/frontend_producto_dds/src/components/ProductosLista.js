import React, { useEffect, useState } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { keycloak } = useKeycloak(); // Obtén la instancia de Keycloak

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (keycloak.authenticated) {
          // Asegúrate de que el usuario esté autenticado
          const response = await axios.get("http://localhost:4000/productos", {
            headers: {
              Authorization: `Bearer ${keycloak.token}`, // Usa el token de acceso de Keycloak
            },
          });
          setProducts(response.data);
        }
      } catch (error) {
        console.error("Hubo un error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, [keycloak]); // Añade keycloak como dependencia para que useEffect se ejecute nuevamente si keycloak cambia

  return (
    <Container className="my-5">
      <h1>Lista de Productos</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Código de Barra</th>
            <th>Stock</th>
            <th>Fecha de Alta</th>
            <th>Activo</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.Nombre}</td>
              <td>${product.Precio.toFixed(2)}</td>
              <td>{product.CodigoDeBarra}</td>
              <td>{product.Stock}</td>
              <td>{product.FechaAlta}</td>
              <td>{product.Activo ? "Sí" : "No"}</td>
              <td>
                <LinkContainer to={`/editar/${product.IdProducto}`}>
                  <Button variant="primary" disabled={!keycloak.hasRealmRole('admin')}>Editar</Button>
                </LinkContainer>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductsPage;
