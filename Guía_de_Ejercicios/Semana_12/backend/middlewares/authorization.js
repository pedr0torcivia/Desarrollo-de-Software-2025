export const soloUsuarios = (req, res, next) => {
  if (!req.idCuenta) {
    return res.status(401).json({ error: "Acceso no autorizado. Se requiere autenticación." });
  }
  next();
};


export const soloAdmins = (req, res, next) => {
  if (req.admin !== 1) {
    return res.status(403).json({ error: "Acceso restringido a administradores" });
  }
  next();
};
