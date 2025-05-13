import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "../.data/pymes.db");

if (!fs.existsSync(path.dirname(dbPath))) {
  fs.mkdirSync(path.dirname(dbPath));
}

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) throw err;
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS articulosfamilias (
    IdArticuloFamilia INTEGER PRIMARY KEY AUTOINCREMENT,
    Nombre TEXT NOT NULL
  )`);

  db.run(`INSERT INTO articulosfamilias (Nombre)
    SELECT 'Accesorios'
    WHERE NOT EXISTS (SELECT 1 FROM articulosfamilias WHERE Nombre = 'Accesorios')`);
});

db.close();
