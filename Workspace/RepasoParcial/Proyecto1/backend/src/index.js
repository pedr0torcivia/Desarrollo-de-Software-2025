import app from "./app.js"; // 5- Importar aplicación express
const PORT = 3000; // 6- Declarar puerto

// 7- Mostrar mensaje por pantalla de que esta corriendo el servidor
app.get("/", (req, res) => {
    const htmlresponse = `<html><head><title>API REST</title></head><body><h1>API LEVANTADA</h1></body></html>`;
    res.send(htmlresponse);
})

//8- Mostrar por terminal que el servidor funciona
app.listen(PORT, () => {
    console.log(`Server corriendo en: http:/localhost:${PORT}`);
})