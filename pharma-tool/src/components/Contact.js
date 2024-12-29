import React, { useState } from "react";
import { AppContext } from "../context/AppContext";




const Contact = () => {
 const [form, setForm] = useState({ name: "", email: "", message: "" });


 const handleChange = (e) => {
   const { name, value } = e.target;
   setForm((prevForm) => ({ ...prevForm, [name]: value }));
 };


 const handleSubmit = (e) => {
   e.preventDefault();
   alert(`Message Sent by ${form.name}`);
   setForm({ name: "", email: "", message: "" });
 };


 return (
   <div className="contact">
     <h1>Contact Us</h1>
     <form onSubmit={handleSubmit}>
       <label>
         Name:
         <input type="text" name="name" value={form.name} onChange={handleChange} required />
       </label>
       <label>
         Email:
         <input type="email" name="email" value={form.email} onChange={handleChange} required />
       </label>
       <label>
         Message:
         <textarea name="message" value={form.message} onChange={handleChange} required />
       </label>
       <button type="submit">Send</button>
     </form>
   </div>
 );
};


export default Contact;