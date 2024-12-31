const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  sku: { type: String, required: true },
  category: { type: String, required: true }, // pharmacy or cosmetics
});

module.exports = mongoose.model("Product", productSchema);
