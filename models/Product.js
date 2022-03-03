const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
    },
    description :{
        type:String,
        required:true
    },
   
    sku_code:{
        type:String,
        required:true,
        unique:true
    },
   
    model:{
        type:Number,
        required:true,
       
    },
    stock:{
        type:Boolean,
        required:true
    },
    delivery:{
        type:Number,
        required:true
    }
})
const Product = new mongoose.model("Product",productSchema);
module.exports = Product;