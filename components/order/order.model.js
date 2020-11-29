// Dependencies
const mongoose = require('mongoose');

//Mongoose Plugins
const autoIncrement = require('mongoose-sequence')(mongoose);

//Model data
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user:{
        type: mongoose.Types.ObjectId,
        require: [true, "El usuario es requerido"]
    },
    products: {
        type: String,
        require: [true, "los productos es requerido"]
    },
    quantity: {
        type: String,
        require : [true, "la cantidad es requerida"]
    },
    state: {
        type: Boolean,
        default: true,
        required: [true, 'el estado es requerido']
    }
});


// Order Schema Methods
orderSchema.methods.updateData = function (pNewData){
    for (const key in pNewData){
        const currentData = pNewData[key];
        this[key] = currentData;
    }
}


// Export Model 
const Model = mongoose.model('order', orderSchema, 'orders');

module.exports = Model;