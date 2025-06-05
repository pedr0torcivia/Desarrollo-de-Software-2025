import { Mueble } from '../models/mueble.js';

export async function seedDatabase() {
  const count = await Mueble.count();
  if (count === 0) {
    const mueblesIniciales = [
        { Nombre: 'Silla Escandinava', Material: 'Madera de Haya', FechaFabricacion: '2022-03-15', PrecioEstimado: 75.99 },
        { Nombre: 'Mesa de Comedor Industrial', Material: 'Hierro y Madera Maciza', FechaFabricacion: '2021-11-01', PrecioEstimado: 320.50 },
        { Nombre: 'Sofá Chesterfield', Material: 'Cuero Genuino', FechaFabricacion: '2020-07-20', PrecioEstimado: 850.00 },
        { Nombre: 'Estantería Modular', Material: 'Melamina Blanca', FechaFabricacion: '2023-01-10', PrecioEstimado: 120.75 },
        { Nombre: 'Cama Queen Size', Material: 'Madera de Roble', FechaFabricacion: '2022-05-05', PrecioEstimado: 450.00 },
        { Nombre: 'Escritorio Minimalista', Material: 'Acero y Vidrio Templado', FechaFabricacion: '2023-02-28', PrecioEstimado: 180.90 },
        { Nombre: 'Sillón Reclinable', Material: 'Tela Microfibra', FechaFabricacion: '2021-09-12', PrecioEstimado: 299.99 },
        { Nombre: 'Mesa de Centro Elevable', Material: 'MDF Lacado', FechaFabricacion: '2022-08-18', PrecioEstimado: 150.00 },
        { Nombre: 'Aparador Vintage', Material: 'Madera de Pino Restaurada', FechaFabricacion: '1975-04-01', PrecioEstimado: 220.00 },
        { Nombre: 'Lámpara de Pie Trípode', Material: 'Madera y Tela', FechaFabricacion: '2023-03-05', PrecioEstimado: 89.50 },
        { Nombre: 'Set de Jardín', Material: 'Rattán Sintético', FechaFabricacion: '2022-06-20', PrecioEstimado: 399.00 },
        { Nombre: 'Biblioteca Clásica', Material: 'Caoba', FechaFabricacion: '2005-10-10', PrecioEstimado: 550.00 },
        { Nombre: 'Mueble TV Flotante', Material: 'Aglomerado Enchapado', FechaFabricacion: '2023-04-15', PrecioEstimado: 175.25 },
        { Nombre: 'Puff Redondo', Material: 'Terciopelo', FechaFabricacion: '2022-12-01', PrecioEstimado: 65.00 },
        { Nombre: 'Cómoda 5 Cajones', Material: 'Pino Macizo', FechaFabricacion: '2021-07-07', PrecioEstimado: 190.80 },
        { Nombre: 'Espejo de Cuerpo Entero', Material: 'Marco de Aluminio', FechaFabricacion: '2023-01-25', PrecioEstimado: 99.99 },
        { Nombre: 'Mesa Auxiliar Nido', Material: 'Metal Dorado y Mármol', FechaFabricacion: '2022-11-30', PrecioEstimado: 130.40 },
        { Nombre: 'Cabecero Capitoné', Material: 'Lino', FechaFabricacion: '2021-06-14', PrecioEstimado: 160.00 },
        { Nombre: 'Banco Descalzador', Material: 'Madera y Algodón', FechaFabricacion: '2023-05-02', PrecioEstimado: 70.00 },
        { Nombre: 'Vitrina Iluminada', Material: 'Vidrio y Metal Cromado', FechaFabricacion: '2020-09-09', PrecioEstimado: 310.00 },
        { Nombre: 'Mesa Plegable de Pared', Material: 'Contrachapado', FechaFabricacion: '2023-03-22', PrecioEstimado: 55.50 },
        { Nombre: 'Silla Gamer Ergonómica', Material: 'Cuero Sintético y Malla', FechaFabricacion: '2022-10-10', PrecioEstimado: 250.00 },
        { Nombre: 'Estante Flotante Invisible', Material: 'Acero Inoxidable', FechaFabricacion: '2023-02-10', PrecioEstimado: 30.99 },
        { Nombre: 'Sofá Cama Italiano', Material: 'Tela Antimanchas', FechaFabricacion: '2021-05-19', PrecioEstimado: 620.00 },
        { Nombre: 'Recibidor con Espejo', Material: 'Melamina Efecto Madera', FechaFabricacion: '2022-07-25', PrecioEstimado: 110.00 },
        { Nombre: 'Carrito Bar con Ruedas', Material: 'Bambú y Cristal', FechaFabricacion: '2023-04-01', PrecioEstimado: 95.00 },
        { Nombre: 'Mesa de Noche Colgante', Material: 'Madera de Nogal', FechaFabricacion: '2022-09-05', PrecioEstimado: 85.75 },
        { Nombre: 'Biombo Divisor', Material: 'Tela y Madera Ligera', FechaFabricacion: '2021-03-11', PrecioEstimado: 78.00 },
        { Nombre: 'Estantería Escalera', Material: 'Hierro Forjado', FechaFabricacion: '2023-01-18', PrecioEstimado: 140.00 },
        { Nombre: 'Sillón Colgante Huevo', Material: 'Mimbre y Acero', FechaFabricacion: '2022-04-23', PrecioEstimado: 350.50 },
        { Nombre: 'Escritorio Infantil', Material: 'Plástico Reciclado', FechaFabricacion: '2023-06-01', PrecioEstimado: 60.00 },
        { Nombre: 'Zapatero con Asiento', Material: 'MDF y Cojín de Tela', FechaFabricacion: '2022-02-15', PrecioEstimado: 90.20 },
        { Nombre: 'Librero Bajo', Material: 'Madera de Cerezo', FechaFabricacion: '2019-11-08', PrecioEstimado: 280.00 },
        { Nombre: 'Mueble Bar Esquinero', Material: 'Cristal y Acero Inox', FechaFabricacion: '2022-01-20', PrecioEstimado: 330.00 },
        { Nombre: 'Mesa Alta de Cocina', Material: 'Silestone y Patas Metálicas', FechaFabricacion: '2023-05-15', PrecioEstimado: 480.70 },
        { Nombre: 'Cuna Convertible', Material: 'Madera Lacada Blanca', FechaFabricacion: '2022-03-30', PrecioEstimado: 290.00 },
        { Nombre: 'Hamaca Paraguaya', Material: 'Algodón Trenzado', FechaFabricacion: '2021-08-02', PrecioEstimado: 45.99 },
        { Nombre: 'Perchero de Pie Metálico', Material: 'Acero Pintado', FechaFabricacion: '2023-02-05', PrecioEstimado: 35.00 },
        { Nombre: 'Mesa de Centro Redonda', Material: 'Terrazo', FechaFabricacion: '2022-06-10', PrecioEstimado: 165.00 },
        { Nombre: 'Silla de Oficina Ejecutiva', Material: 'Piel y Aluminio Pulido', FechaFabricacion: '2023-04-28', PrecioEstimado: 380.00 }
    ];
    await Mueble.bulkCreate(mueblesIniciales);
    console.log('40 datos iniciales de muebles insertados correctamente.');

  } else {
    console.log('✔ Base ya contiene datos.');
  }
}
