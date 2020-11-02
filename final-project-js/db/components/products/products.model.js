//Dependecies
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


//Model data
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product:{
        type: String
    },
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    color:{
        type: String,
        required: [true, "El color es requerido"]
    },
    description: {
        type: String,
        required: [true, "La descripción es requerido"]
    }
})

// Export Model 
const ProductModel = mongoose.model('product', productSchema, 'products'); 

module.exports = ProductModel;