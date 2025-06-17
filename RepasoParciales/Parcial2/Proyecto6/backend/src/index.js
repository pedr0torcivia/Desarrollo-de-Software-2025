// backend/src/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database');
const ticketRoutes = require('./routes/tickets.routes');
const Ticket = require('./models/Ticket');

const app = express();
app.use(cors());
app.use(express.json());

app.use(ticketRoutes);

// 👉 Función de carga inicial
async function seedTickets() {
  const count = await Ticket.count();
  if (count === 0) {
    await Ticket.bulkCreate([
      { nombreTarea: 'Revisar router', fecha: '2025-06-10', prioridad: 5 },
      { nombreTarea: 'Actualizar antivirus', fecha: '2025-06-12', prioridad: 8 },
      { nombreTarea: 'Instalar impresora', fecha: '2025-06-15', prioridad: 3 }
    ]);
    console.log('🌱 Tickets iniciales insertados');
  }
}

sequelize.sync().then(async () => {
  console.log('🎲 Base de datos sincronizada');
  await seedTickets(); // 🌱 Ejecutar seeding
  app.listen(3000, () => {
    console.log('🚀 Servidor backend escuchando en http://localhost:3000');
  });
}).catch(err => {
  console.error('❌ Error al sincronizar la base de datos:', err);
});
