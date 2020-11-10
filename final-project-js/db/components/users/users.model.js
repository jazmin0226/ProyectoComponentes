//Dependecies
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Mongoose Plugins
const uniqueValidator = require('mongoose-unique-validator');

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
    role: {
        type: mongoose.Types.ObjectId,
        ref:'role',
        require: [true, "El rol es requerido"],
       
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

//Password Encryption
userSchema.pre('save',function(next){

    this.password = bcrypt.hashSync(this.password);
    next();

})

//User Schema methods
userSchema.methods.comparePassword = function (pCompare) {
    const isMatch = bcrypt.compareSync(pCompare, this.password);
    return isMatch;
}

userSchema.methods.updateData = function(user){

    for (const key in user) {

        const currentData = user[key];
        this[key]=currentData;
    }
}

userSchema.methods.deleteData = function(state){

    this.state = state;
}

userSchema.methods.enableData = function(state){

    this.state = state;
}



// Export Model 
const UserModel = mongoose.model('user', userSchema, 'users'); 
module.exports = UserModel;