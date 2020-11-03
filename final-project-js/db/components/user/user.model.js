//Dependecies
const mongoose = require('mongoose');

//Mongoose Plugins
const uniqueValidator = require('mongoose-unique-validator');
//const autoIncrement = require('mongoose-sequence')(mongoose);

//Model data
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: String,
        require: [true, "El id es requerido"],
       
    },
    type: {
        type: String,
        require: [true, "El tipo es requerido"],
       
    },
    name: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    phone:{
        type: String,
        required: [true, "El telefono es requerido"]
    },
    mail: {
        type: String,
        required: [true, "El correo es requerido"]
    },
    address: {
        type: String,
        required: [true, "La dirección es requerida"]
    },
    password: {
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    state: {
        type: Boolean,
        required: [true, "El estado es requerido"],
        default: true
    }
})

//Users Schema Plugins Init
//productSchema.plugin(autoIncrement, {id: 'id_seq', inc_field: 'id'});



// Export Model 
const UserModel = mongoose.model('user', userSchema, 'users'); 

module.exports = UserModel;