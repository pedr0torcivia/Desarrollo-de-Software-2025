import express from "express";
import sequelize from "./db.js";
import Barrio from "./models/barrio.js";
import Estacion from "./models/estacion.js";
import { Op } from 'sequelize';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Habilitar CORS
app.use(cors());
app.use(express.static("public"));

app.get("/api/barrios", async (req, res) => {
    try {
        const rowBarrios = await Barrio.findAll({ order: [["nombre", "ASC"]] });
        if (rowBarrios.length === 0) {
            return res.status(404).json({ error: "No se encontraron barrios" });
        }

        const barriosOrdenados = rowBarrios.map((barrio) => ({
            idBarrio: barrio.idBarrio,
            nombre: barrio.nombre,
        }));
        
        res.status(200).json(barriosOrdenados);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener barrios" });
    }
});

app.get("/api/estaciones", async (req, res) => {
    try {
        const { barrio, texto, incluirInactivas, page = 1, size = 10 } = req.query;

        if (incluirInactivas !== "true" && incluirInactivas !== "false" && incluirInactivas !== undefined) {
            return res.status(400).json({ error: "El parámetro 'incluirInactivas' debe ser 'true' o 'false'" });
        }

        if (isNaN(page) || page <= 0) {
            return res.status(400).json({ error: "El parámetro 'page' debe ser un número mayor que 0" });
        }

        if (isNaN(size) || size <= 0) {
            return res.status(400).json({ error: "El parámetro 'size' debe ser un número mayor que 0" });
        }

        const where = {
            ...(incluirInactivas === "true" ? {} : { activa: true })
        };

        if (barrio) where.barrio = barrio;

        if (texto) {
            where[Op.or] = [
                { nombre: { [Op.like]: `%${texto}%` } },
                { direccion: { [Op.like]: `%${texto}%` } }
            ];
        }

        const offset = (page - 1) * size;

        const estaciones = await Estacion.findAll({
            where,
            order: [["nombre", "ASC"]],
            limit: size,
            offset: offset,
        });

        if (estaciones.length === 0) {
            return res.status(404).json({ error: "No se encontraron estaciones con los filtros aplicados" });
        }

        res.status(200).json(estaciones);
    } catch (error) {
        console.error("Error al obtener estaciones:", error);
        res.status(500).json({ error: "Error al obtener estaciones" });
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

(async function main() {
    try {
        await sequelize.authenticate();
        console.log("✔ Conexión establecida con la base de datos");
    } catch (error) {
        console.error("❌ Error al conectar con la base de datos:", error);
        process.exit(1);
    }

    app.listen(PORT, () => {
        console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
}());
