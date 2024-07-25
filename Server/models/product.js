/*const mongoose = require ("mongoose");

const productSchema = new Mongoose.Schema({
    name: String,
    type: String
});

const Product = mongoose.model('Product',productSchema);

module.exports = Product;*/
const mongoose = require('mongoose');

// Define the schema for the product
const productSchema = new mongoose.Schema({
    name: String,
    category: String,
    hours: Number,
    date: String
});

// Export the model based on the schema
module.exports = mongoose.model('Product', productSchema);
