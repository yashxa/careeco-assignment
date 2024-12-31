import React, { useEffect, useState } from "react";
import axios from "axios";

const Cart = () => {
  const [cart, setCart] = useState([]);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/cart");
      setCart(response.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  // Remove item from cart
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5001/api/cart/${productId}`);
      setCart(cart.filter((item) => item._id !== productId)); // Update the cart state
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (cart.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => (
            <tr key={item._id}>
              <td>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
