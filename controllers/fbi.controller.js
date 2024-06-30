// Import the dotenv module to load environment variables from a .env file into process.env
import dotenv from "dotenv/config";

// Import the 'results' array from the agentes.js file
import { results } from "../data/agentes.js";

// Import the generarToken and verificarToken functions from jwt.until.js
import { generarToken, verificarToken } from "../utils/jwt.until.js";

// Retrieve the secret key from the environment variables
const secretKey = process.env.MY_SECRETKEY;

// Define the signIn function to handle user sign-in
export const signIn = (req, res) => {
  try {
    // Extract email and password from the request query parameters
    const { email, password } = req.query;
    
    // Find the user in the results array that matches the provided email and password
    const user = results.find((u) => u.email && u.password === password);
    
    // If a matching user is found, generate a token and send a response with the token
    if (user) {
      const token = generarToken(user, secretKey, "2m"); // Token expires in 2 minutes
      console.log("Token generated:", token);
      res.send(/*html*/ `
        <a href="/dashboard?token=${token}"></a>
        <h2>Bienvenido agente secreto: ${email}.</h2>

        <script>localStorage.setItem('token', JSON.stringify('${token}')) </script>
      `);
    } else {
      // If no matching user is found, send an error message
      res.send("⛔⛔⛔Usuario o contraseña no válidos⛔⛔⛔");
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
  }
};

// Define the veryfyTokenUser function to verify the token
export const veryfyTokenUser = async () => {
  // Extract the token from the request query parameters
  const { token } = req.query;

  try {
    // Verify the token using the verificarToken function
    const data = await verificarToken(token, secretKey);
    res.send(data); // Send the decoded token data as the response
  } catch (error) {
    // Log any errors that occur during the verification process
    console.log(error);
    alert("error"); // Display an error alert (note: alert may not work in server-side code)
  }
};
