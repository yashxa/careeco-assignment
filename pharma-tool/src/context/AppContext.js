import React, { createContext, useState } from 'react';


// Create the AppContext
export const AppContext = createContext();


// Define the AppProvider
export const AppProvider = ({ children }) => {
 const [cart, setCart] = useState([]);


 // Add an item to the cart
 const addToCart = (item) => {
   setCart((prevCart) => {
     const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
     if (existingItem) {
       return prevCart.map((cartItem) =>
         cartItem.id === item.id
           ? { ...cartItem, quantity: cartItem.quantity + 1 }
           : cartItem
       );
     }
     return [...prevCart, { ...item, quantity: 1 }];
   });
 };


 // Remove an item from the cart
 const removeFromCart = (itemId) => {
   setCart((prevCart) => {
     const existingItem = prevCart.find((cartItem) => cartItem.id === itemId);
     if (existingItem?.quantity > 1) {
       return prevCart.map((cartItem) =>
         cartItem.id === itemId
           ? { ...cartItem, quantity: cartItem.quantity - 1 }
           : cartItem
       );
     }
     return prevCart.filter((cartItem) => cartItem.id !== itemId);
   });
 };


 return (
   <AppContext.Provider value={{ cart, addToCart, removeFromCart }}>
     {children}
   </AppContext.Provider>
 );
};
