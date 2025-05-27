const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const auth = require("../auth");

const usuarios = [
  {
    usuario: "admin",
    clave: "123",
    rol: "jefe",
  },
  {
    usuario: "juan",
    clave: "123",
    rol: "empleado",
  },
];

router.post("/api/login", (req, res) => {
  // #swagger.tags = ['Seguridad']
  // #swagger.summary = 'Login de usuarios: admin:123 (rol jefe), juan:123 (rol empleado)'

  const { usuario, clave } = req.body;

  // buscar el usuario en el array
  const item = usuarios.find((u) => {
    return u.usuario === usuario && u.clave === clave;
  });

  if (item) {
    // Generate an access token
    const accessToken = auth.GenerateToken(item.usuario, item.rol);

    res.json({
      accessToken,
      message: "Bienvenido " + item.usuario + " (rol: " + item.rol + ")",
    });
  } else {
    res.json({ message: "usuario or clave incorrecto" });
  }
});

// el logout no es necesario, ya que el token se almacena en el cliente
// y se elimina cuando se cierra el navegador
// pero si se quiere hacer, simplemente se elimina el token del cliente
// recordar que en el servidor el token sigue siendo válido hasta que expire

// router.post("/api/logout", (req, res) => {
//   res.json({ 'message': 'Si el token se almacena localmente en el cliente, simplemente eliminarlo: no hace falta este metodo' });
// });


module.exports = router;

