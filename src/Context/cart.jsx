import { useState, useContext, createContext, useEffect } from "react";
import { useAuth } from "./auth.jsx";
import toast from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const { auth, authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load cart from localStorage only if user is authenticated
  useEffect(() => {
    if (auth?.user?.id) {
      const userCartKey = `Flytium_cart_${auth.user.id}`;
      const existingCart = localStorage.getItem(userCartKey);
      if (existingCart) {
        try {
          const parsedCart = JSON.parse(existingCart);
          setCart(parsedCart.map(item => ({ 
            ...item, 
            quantity: item.quantity || 1,
            userId: auth.user.id
          })));
        } catch (error) {
          console.error("Error parsing cart:", error);
          localStorage.removeItem(userCartKey);
        }
      }
    } else {
      // Clear cart if user is not authenticated
      setCart([]);
    }
  }, [auth?.user?.id]);

  // Save cart to localStorage whenever it changes (only for authenticated users)
  useEffect(() => {
    if (auth?.user?.id) {
      const userCartKey = `Flytium_cart_${auth.user.id}`;
      if (cart.length > 0) {
        localStorage.setItem(userCartKey, JSON.stringify(cart));
      } else {
        localStorage.removeItem(userCartKey);
      }
    }
  }, [cart, auth?.user?.id]);

  // Add item to cart with authentication check
  const addToCart = (product, quantity = 1) => {
    if (!auth?.user?.id) {
      toast.error("Please login to add items to cart");
      return false;
    }

    if (!product || !product._id) {
      toast.error("Invalid product");
      return false;
    }

    setLoading(true);
    try {
      setCart(prevCart => {
        const existingItemIndex = prevCart.findIndex(item => item._id === product._id);
        
        if (existingItemIndex !== -1) {
          // Update existing item quantity
          const updatedCart = [...prevCart];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
            userId: auth.user.id
          };
          toast.success("Cart updated successfully");
          return updatedCart;
        } else {
          // Add new item
          const newItem = {
            ...product,
            quantity,
            userId: auth.user.id,
            addedAt: new Date().toISOString()
          };
          toast.success("Item added to cart");
          return [...prevCart, newItem];
        }
      });
      return true;
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    if (!auth?.user?.id) {
      toast.error("Please login to manage cart");
      return;
    }

    setCart(prevCart => {
      const updatedCart = prevCart.filter(item => item._id !== productId);
      toast.success("Item removed from cart");
      return updatedCart;
    });
  };

  // Update item quantity
  const updateQuantity = (productId, newQuantity) => {
    if (!auth?.user?.id) {
      toast.error("Please login to manage cart");
      return;
    }

    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart => {
      const updatedCart = prevCart.map(item => 
        item._id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      );
      return updatedCart;
    });
  };

  // Clear cart
  const clearCart = () => {
    if (!auth?.user?.id) {
      return;
    }
    
    setCart([]);
    const userCartKey = `Flytium_cart_${auth.user.id}`;
    localStorage.removeItem(userCartKey);
    toast.success("Cart cleared");
  };

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Get cart count
  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  // Check if user can access cart
  const canAccessCart = () => {
    // Return null while auth is loading, false if not authenticated, true if authenticated
    if (authLoading) return null;
    return auth?.user?.id ? true : false;
  };

  const value = {
    cart,
    setCart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    canAccessCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => {
  return useContext(CartContext);
};

export { CartProvider, useCart };
