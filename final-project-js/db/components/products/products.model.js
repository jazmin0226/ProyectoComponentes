//Dependecies
const mongoose = require('mongoose');

//Mongoose Plugins
const uniqueValidator = require('mongoose-unique-validator');
const autoIncrement = require('mongoose-sequence')(mongoose);



//Model data
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
        require: [true, "El id es requerido"],
        default: 0
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
    },
    state: {
        type: Boolean,
        required: [true, "El estado es requerido"],
        default: true
    }
})

//Product Schema Plugins Init
productSchema.plugin(autoIncrement, {inc_field: 'id'});

// Product Schema Methods
productSchema.methods.updateData = function (pNewProductData) {
    for (const key in pNewProductData) {
        const currentData = pNewProductData[key];
        this[key] = currentData;
    }
}

productSchema.methods.updateState = function (pProductData) {
   this.state = pProductData
}

// Export Model 
const ProductModel = mongoose.model('product', productSchema, 'products'); 

module.exports = ProductModel;