import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth.jsx";
const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { auth } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCart = localStorage.getItem("Flytium");
    if (existingCart) {
      try {
        const parsedCart = JSON.parse(existingCart);
        setCart(parsedCart.map(item => ({ 
          ...item, 
          quantity: item.quantity || 1 
        })));
      } catch (error) {
        console.error("Error parsing cart:", error);
        localStorage.removeItem("Flytium");
      }
    }
  }, []);

  // Add a function to update cart in localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("Flytium", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
