// import mongoose from 'mongoose';
const mongoose =require("mongoose");
// or productSchema
 const productModel = new mongoose.Schema({
    name:String,
    price: String,
    company : String,
    color: String      
 });

 

 exports.Product = mongoose.model('products', productModel);
 