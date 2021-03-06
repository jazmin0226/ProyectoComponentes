//Dependecies
const mongoose = require('mongoose');

//Model data
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: Number,
        default:0
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
});

// Product Schema Method
productSchema.methods.updateState = function (pNewState) {
   this.state = pNewState;
}

// Export Model 
const ProductModel = mongoose.model('product', productSchema, 'products'); 

module.exports = ProductModel;