const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express App
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
const PORT = process.env.PORT || 5001; // Ensuring the default port is consistent
mongoose
  .connect(process.env.MONGO_URI, {
    // Removed deprecated options
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Define Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Product = mongoose.model("Product", productSchema);

// Seed Products Endpoint
app.post('/api/products/seed', async (req, res) => {
  const sampleProducts = [
    {
      name: "Pain Reliever",
      price: 10.99,
      sku: "PR001",
      category: "Pharmacy",
      description: "A fast-acting pain reliever.",
      image: "https://example.com/pain-reliever.jpg",
    },
    {
      name: "Face Cream",
      price: 15.49,
      sku: "FC002",
      category: "Cosmetics",
      description: "A hydrating face cream for all skin types.",
      image: "https://example.com/face-cream.jpg",
    },
    {
      name: "Vitamin Tablets",
      price: 12.99,
      sku: "VT003",
      category: "Pharmacy",
      description: "Daily essential multivitamin tablets.",
      image: "https://example.com/vitamin-tablets.jpg",
    },
  ];

  try {
    await Product.deleteMany(); // Clear existing products
    const createdProducts = await Product.insertMany(sampleProducts);
    res.status(201).json({ createdProducts });
  } catch (error) {
    res.status(500).json({ error: "Failed to seed products" });
  }
});

// Fetch Products Endpoint
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// In-Memory Cart Data
let cart = []; // Temporary in-memory cart for simplicity

// Add to Cart Endpoint
app.post("/api/cart", async (req, res) => {
  const { productId, quantity } = req.body;

  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }

  // Check if product exists in cart
  const existingItem = cart.find((item) => item.productId === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  res.status(200).json({ message: "Product added to cart" });
});

// Fetch Cart Data Endpoint
app.get("/api/cart", async (req, res) => {
  try {
    const cartDetails = await Promise.all(
      cart.map(async (item) => {
        const product = await Product.findById(item.productId);
        return {
          ...product.toObject(),
          quantity: item.quantity,
        };
      })
    );

    res.json(cartDetails);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart data" });
  }
});

// Remove from Cart Endpoint
app.delete('/api/cart/:productId', async (req, res) => {
  const { productId } = req.params;

  // Find the product in the cart
  const itemIndex = cart.findIndex((item) => item.productId === productId);

  if (itemIndex === -1) {
    return res.status(404).json({ error: "Product not found in cart" });
  }

  // Remove the product from the cart
  cart.splice(itemIndex, 1);

  res.status(200).json({ message: "Product removed from cart" });
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
