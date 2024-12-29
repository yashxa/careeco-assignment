import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Products from "./components/Products";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import "./components/Navbar.css";
import "./components/About.css";
import "./components/Cart.css";
import "./components/Contact.css";
import "./components/Home.css";
import "./components/Products.css";


function App() {
 return (
   <Router>
     <div className="App">
       {/* Navigation Bar */}
       <nav>
         <ul>
           <li>
             <Link to="/">Home</Link>
           </li>
           <li>
             <Link to="/products">Products</Link>
           </li>
           <li>
             <Link to="/about">About Us</Link>
           </li>
           <li>
             <Link to="/contact">Contact Us</Link>
           </li>
           <li>
             <Link to="/cart">Cart</Link>
           </li>
         </ul>
       </nav>


       {/* Routes */}
       <Routes>
         <Route path="/" element={<Home companyName="PharmaCare" tagline="Your Health, Our Priority" bannerImage="https://via.placeholder.com/1200x400" />} />
         <Route path="/products" element={<Products />} />
         <Route path="/about" element={<About />} />
         <Route path="/contact" element={<Contact />} />
         <Route path="/cart" element={<Cart />} />
       </Routes>
     </div>
   </Router>
 );
}


export default App;