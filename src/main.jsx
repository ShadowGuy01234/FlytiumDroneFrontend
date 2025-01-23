import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/auth.jsx";
import { CartProvider } from "./Context/cart.jsx";
import { StyledEngineProvider } from "@mui/material/styles";
createRoot(document.getElementById("root")).render(
  
  <AuthProvider>
    <CartProvider>
    <StyledEngineProvider injectFirst>
      <App />
     </StyledEngineProvider>  
    </CartProvider>
  </AuthProvider>
);
