//Dependecies
const mongoose = require('mongoose');

//Mongoose Plugins
const uniqueValidator = require('mongoose-unique-validator');

//Model data
const Schema = mongoose.Schema;

const roleSchema = new Schema({
    id: {
        type: String,
        require: [true, "El id es requerido"],
       
    },
    name: {
        type: String,
        require: [true, "El nombre es requerido"],
       
    },
    state: {
        type: Boolean,
        require: [true, "El estado es requerido"],
        default:true
       
    },
   
})
//User Schema methods
roleSchema.methods.deleteData = function(state){

    this.state = state;
}

roleSchema.methods.enableData = function(state){

    this.state = state;
}

// Export Model 
const rolModel = mongoose.model('role', roleSchema, 'roles'); 
module.exports = rolModel;