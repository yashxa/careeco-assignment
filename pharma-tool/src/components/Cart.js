import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import "./Cart.css"; // Add styling for the table


const Cart = () => {
 const { cart, addToCart, removeFromCart } = useContext(AppContext);


 // Calculate total price
 const calculateTotal = () =>
   cart.reduce((acc, item) => acc + item.price * item.quantity, 0);


 return (
   <div className="cart">
     <h1>Your Cart</h1>
     {cart.length === 0 ? (
       <p>Your cart is empty!</p>
     ) : (
       <table>
         <thead>
           <tr>
             <th>Product</th>
             <th>Price</th>
             <th>Quantity</th>
             <th>Total</th>
             <th>Actions</th>
           </tr>
         </thead>
         <tbody>
           {cart.map((item) => (
             <tr key={item.id}>
               <td>{item.name}</td>
               <td>${item.price.toFixed(2)}</td>
               <td>{item.quantity}</td>
               <td>${(item.price * item.quantity).toFixed(2)}</td>
               <td>
                 <button onClick={() => addToCart(item)}>+</button>
                 <button onClick={() => removeFromCart(item.id)}>-</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     )}
     {cart.length > 0 && (
       <div className="cart-total">
         <h2>Total: ${calculateTotal().toFixed(2)}</h2>
       </div>
     )}
   </div>
 );
};


export default Cart;
