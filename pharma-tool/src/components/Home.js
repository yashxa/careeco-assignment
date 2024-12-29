import React from "react";
import { AppContext } from "../context/AppContext";




const Home = ({ companyName, tagline, bannerImage }) => {
 return (
   <div className="home">
     <header style={{ backgroundImage: `url(${bannerImage})` }}>
       <div className="header-content">
         <h1>Welcome to {companyName}</h1>
         <p>{tagline}</p>
       </div>
     </header>
     <section className="highlights">
       <div className="highlight">
         <h2>High Quality Products</h2>
         <p>We offer the best quality products for your needs.</p>
       </div>
       <div className="highlight">
         <h2>Easy Online Ordering</h2>
         <p>Order from the comfort of your home.</p>
       </div>
       <div className="highlight">
         <h2>Fast Delivery</h2>
         <p>Get your orders delivered quickly and reliably.</p>
       </div>
     </section>
   </div>
 );
};


export default Home;