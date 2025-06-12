import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Form, Button, Container } from "react-bootstrap";
import { useKeycloak } from "@react-keycloak/web";
import { useNavigate } from "react-router-dom";
const ProductForm = () => {

  const { keycloak } = useKeycloak(); 

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:4000/productos",data, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`, // Usa el token de acceso de Keycloak
        },
      });

      navigate("/productos")
    } catch (error) {
      console.error("Hubo un error al agregar el producto:", error);
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: "500px" }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            {...register("Nombre", { required: true })}
            isInvalid={!!errors.Nombre}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            {...register("Precio", { required: true })}
            isInvalid={!!errors.Precio}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Código de Barra</Form.Label>
          <Form.Control
            type="text"
            {...register("CodigoDeBarra", { required: true })}
            isInvalid={!!errors.CodigoDeBarra}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            {...register("Stock", { required: true })}
            isInvalid={!!errors.Stock}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha de Alta</Form.Label>
          <Form.Control
            type="date"
            {...register("FechaAlta", { required: true })}
            isInvalid={!!errors.FechaAlta}
          />
          <Form.Control.Feedback type="invalid">
            Este campo es requerido
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Activo" {...register("Activo")} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
