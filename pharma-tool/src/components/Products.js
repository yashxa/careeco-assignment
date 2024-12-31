import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Products.css"; // Ensure your styles align with the design

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://localhost:5001/api/cart", {
        productId,
        quantity: 1,
      });
      alert("Product added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <img src={product.image} alt={product.name} className="product-image" />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product._id)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default Products;
