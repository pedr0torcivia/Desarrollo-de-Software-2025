// app.js
import express from "express";

const app = express();

app.get("/saludo", (req, res) => {
  res.status(200).json({ mensaje: "Hola Galactus" });
});

export default app;
