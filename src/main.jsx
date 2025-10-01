import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./Context/auth.jsx";
import { CartProvider } from "./Context/cart.jsx";
import { StyledEngineProvider } from "@mui/material/styles";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <AuthProvider>
      <CartProvider>
        <StyledEngineProvider injectFirst>
          <App />
        </StyledEngineProvider>
      </CartProvider>
    </AuthProvider>
  </HelmetProvider>
);
