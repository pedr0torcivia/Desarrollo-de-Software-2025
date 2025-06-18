import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Importar Bootstrap por CDN desde index.html
// No es necesario importarlo acá si ya lo pusiste en el head

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
