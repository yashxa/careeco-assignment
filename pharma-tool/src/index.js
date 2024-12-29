import React from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom/client" for React 18+
import App from "./App";
import { AppProvider } from "./context/AppContext";


const root = ReactDOM.createRoot(document.getElementById("root")); // Use createRoot
root.render(
 <React.StrictMode>
   <AppProvider>
     <App />
   </AppProvider>
 </React.StrictMode>
);
