// src/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./database/database');
const Libro = require('./models/Libro');
const libroRoutes = require('./routes/libros.routes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('¡Backend de Libros Activo!'));
app.use('/api/libros', libroRoutes);

sequelize.sync({ force: true }).then(async () => {
  console.log('Base sincronizada');
  const count = await Libro.count();
  if (count === 0) {
    await Libro.bulkCreate([
        { Titulo: 'Cien años de soledad', Autor: 'Gabriel García Márquez', AnioPublicacion: 1967 },
                { Titulo: 'Don Quijote de la Mancha', Autor: 'Miguel de Cervantes', AnioPublicacion: 1605 },
                { Titulo: '1984', Autor: 'George Orwell', AnioPublicacion: 1949 },
                { Titulo: 'Orgullo y prejuicio', Autor: 'Jane Austen', AnioPublicacion: 1813 },
                { Titulo: 'Matar a un ruiseñor', Autor: 'Harper Lee', AnioPublicacion: 1960 },
                { Titulo: 'El gran Gatsby', Autor: 'F. Scott Fitzgerald', AnioPublicacion: 1925 },
                { Titulo: 'Guerra y paz', Autor: 'León Tolstói', AnioPublicacion: 1869 },
                { Titulo: 'Crimen y castigo', Autor: 'Fiódor Dostoyevski', AnioPublicacion: 1866 },
                { Titulo: 'Un mundo feliz', Autor: 'Aldous Huxley', AnioPublicacion: 1932 },
                { Titulo: 'El principito', Autor: 'Antoine de Saint-Exupéry', AnioPublicacion: 1943 },
                { Titulo: 'El hobbit', Autor: 'J.R.R. Tolkien', AnioPublicacion: 1937 },
                { Titulo: 'Fahrenheit 451', Autor: 'Ray Bradbury', AnioPublicacion: 1953 },
                { Titulo: 'La Odisea', Autor: 'Homero', AnioPublicacion: -800 }, // Año aproximado
                { Titulo: 'Hamlet', Autor: 'William Shakespeare', AnioPublicacion: 1603 },
                { Titulo: 'En el camino', Autor: 'Jack Kerouac', AnioPublicacion: 1957 },
                { Titulo: 'Moby Dick', Autor: 'Herman Melville', AnioPublicacion: 1851 },
                { Titulo: 'Veinte mil leguas de viaje submarino', Autor: 'Julio Verne', AnioPublicacion: 1870 },
                { Titulo: 'La Divina Comedia', Autor: 'Dante Alighieri', AnioPublicacion: 1320 },
                { Titulo: 'Drácula', Autor: 'Bram Stoker', AnioPublicacion: 1897 },
                { Titulo: 'Frankenstein', Autor: 'Mary Shelley', AnioPublicacion: 1818 },
                { Titulo: 'Rebelión en la granja', Autor: 'George Orwell', AnioPublicacion: 1945 },
                { Titulo: 'Las aventuras de Tom Sawyer', Autor: 'Mark Twain', AnioPublicacion: 1876 },
                { Titulo: 'Alicia en el país de las maravillas', Autor: 'Lewis Carroll', AnioPublicacion: 1865 },
                { Titulo: 'El retrato de Dorian Gray', Autor: 'Oscar Wilde', AnioPublicacion: 1890 },
                { Titulo: 'Peter Pan', Autor: 'J.M. Barrie', AnioPublicacion: 1911 },
                { Titulo: 'Los miserables', Autor: 'Victor Hugo', AnioPublicacion: 1862 },
                { Titulo: 'La metamorfosis', Autor: 'Franz Kafka', AnioPublicacion: 1915 },
                { Titulo: 'Anna Karenina', Autor: 'León Tolstói', AnioPublicacion: 1877 },
                { Titulo: 'El guardián entre el centeno', Autor: 'J.D. Salinger', AnioPublicacion: 1951 },
                { Titulo: 'Un estudio en escarlata', Autor: 'Arthur Conan Doyle', AnioPublicacion: 1887 },
                { Titulo: 'La isla del tesoro', Autor: 'Robert Louis Stevenson', AnioPublicacion: 1883 },
                { Titulo: 'Orgullo y Prejuicio II', Autor: 'Jane Austen', AnioPublicacion: 1813 }, // Otro libro de Austen con titulo diferente
                { Titulo: 'El nombre de la rosa', Autor: 'Umberto Eco', AnioPublicacion: 1980 },
                { Titulo: 'Ensayo sobre la ceguera', Autor: 'José Saramago', AnioPublicacion: 1995 },
                { Titulo: 'Rayuela', Autor: 'Julio Cortázar', AnioPublicacion: 1963 },
                { Titulo: 'La ciudad y los perros', Autor: 'Mario Vargas Llosa', AnioPublicacion: 1963 },
                { Titulo: 'Cien años de soledad vol 2', Autor: 'Gabriel García Márquez', AnioPublicacion: 1967 }, // Similar a uno existente pero diferente título
                { Titulo: 'El amor en los tiempos del cólera', Autor: 'Gabriel García Márquez', AnioPublicacion: 1985 },
                { Titulo: 'Crónica de una muerte anunciada', Autor: 'Gabriel García Márquez', AnioPublicacion: 1981 },
                { Titulo: 'Noticia de un secuestro', Autor: 'Gabriel García Márquez', AnioPublicacion: 1996 } 
    ]);
    console.log('Datos iniciales cargados');
  }

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
});
