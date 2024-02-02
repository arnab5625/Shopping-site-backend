const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required:true},
  description: {
    type: String, 
    required:true},
  price: {
    type: Number,
    required: true},
  imgUrl:{
    type: String, 
    required: true},
});

const ProductModel = mongoose.model("Product", productSchema);

module.exports = ProductModel;