// Dependencies
const mongoose = require('mongoose');

//Mongoose Plugins
const autoIncrement = require('mongoose-sequence')(mongoose);

//Model data
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    id: {
        type: Number,
        required: [true, "El id es requerido."],
        default: 0
    },
    user:{
        type: mongoose.Types.ObjectId
    },
    products: {
        type: [mongoose.Types.ObjectId],
        ref: 'product'
    },
    quantity: {
        
    },
});


// Sale Schema Methods
orderSchema.methods.updateData = function (pNewData){
    for (const key in pNewData){
        const currentData = pNewData[key];
        this[key] = currentData;
    }
}

//Plugins Init
orderSchema.plugin(autoIncrement, {id: 'id_order', inc_field: 'id' });

// Export Model 
const OrderModel = mongoose.model('order', orderSchema, 'orders');

module.exports = OrderModel;