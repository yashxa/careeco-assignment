import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Fetch cart data from backend
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Add to cart function
  const addToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5001/api/cart", { productId, quantity: 1 });
      fetchCart(); // Refresh the cart silently
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  

  // Fetch cart on initial load
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <AppContext.Provider value={{ cart, addToCart, fetchCart }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
