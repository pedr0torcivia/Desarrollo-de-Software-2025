const jwt = require("jsonwebtoken");

const accessTokenSecret = "youraccesstokensecret";

// middleware para verificar el token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        return res.status(403).json({ message: "token no valido" });
      }
      
      res.locals.user = user;
      next();
    });
  } else {
    res.status(401).json({ message: "Acceso denegado" });
  }
};

// función para generar el token
const GenerateToken = (usuario, rol) => {
  return jwt.sign(
    { usuario, rol },
    accessTokenSecret,
    { expiresIn: "20m" }
  );
};

module.exports = { authenticateJWT, GenerateToken };
