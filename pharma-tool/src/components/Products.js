import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Products = () => {
 const { addToCart } = useContext(AppContext);


 const products = [
   { id: 1, name: "Product 1", price: 20 },
   { id: 2, name: "Product 2", price: 30 },
   { id: 3, name: "Product 3", price: 25 },
 ];


 return (
   <div className="products">
     <h1>Our Products</h1>
     <div className="product-grid">
       {products.map((product) => (
         <div key={product.id} className="product-card">
           <h2>{product.name}</h2>
           <p>${product.price}</p>
           <button onClick={() => addToCart(product)}>Add to Cart</button>
         </div>
       ))}
     </div>
   </div>
 );
};


export default Products;
