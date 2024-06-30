import jwt from "jsonwebtoken";

export const generarToken = (user, secretKey, expiresIn) => {
  return jwt.sign({ data: user }, secretKey, { expiresIn });
};

// Función para verificar un JSON Web Token
// Parámetros:
// - token: el token a verificar
// - secretKey: la clave secreta utilizada para verificar el token
export const verificarToken = (token, secretKey) => {
  // Devuelve una nueva Promesa para manejar el proceso de verificación asincrónica
  return new Promise((resolve, reject) => {
    // Utiliza jwt.verify para verificar el token con la clave secreta
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        // Si hay un error durante la verificación, rechaza la promesa con el error
        reject(error);
      } else {
        // Si la verificación es exitosa, resuelve la promesa con los datos decodificados del token
        resolve(decoded);
      }
    });
  });
};