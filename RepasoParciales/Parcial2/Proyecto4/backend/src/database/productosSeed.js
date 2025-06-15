// backend/src/database/productosSeed.js
const Producto = require('../models/Producto');

const productosIniciales = [
  { nombre: "Mouse Logitech", precio: 3500.50, stock: 20, fechaAlta: "2024-06-01" },
  { nombre: "Teclado Redragon", precio: 7800.00, stock: 10, fechaAlta: "2024-06-02" },
  { nombre: "Monitor Samsung", precio: 55000.00, stock: 5, fechaAlta: "2024-06-03" },
];

const cargarDatosIniciales = async () => {
  const cantidad = await Producto.count();
  if (cantidad === 0) {
    await Producto.bulkCreate(productosIniciales);
    console.log("🌱 Datos iniciales cargados");
  } else {
    console.log("📦 Datos ya existen, no se cargan duplicados");
  }
};

module.exports = cargarDatosIniciales;
