// middlewares/tokenExtractor.js

import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const authorization = req.get("Authorization");
  let token = "";

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    token = authorization.substring(7);
  }
    
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET);


    req.idCuenta = decodedToken.id;
    req.admin = decodedToken.admin;

    next();
  } 
  catch (error) {
    console.log(error);
    next();
  }
};
